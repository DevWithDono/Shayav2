import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Transaction, MonthData } from '../types';
import { useAuth } from './AuthContext';

interface State {
  currentMonth: { year: number; month: number };
  months: MonthData[];
}

type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: number }
  | { type: 'SET_CURRENT_MONTH'; payload: { year: number; month: number } }
  | { type: 'LOAD_TRANSACTIONS'; payload: MonthData[] };

const initialState: State = {
  currentMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
  months: [],
};

function financeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const transactionDate = new Date(action.payload.date);
      const year = transactionDate.getFullYear();
      const month = transactionDate.getMonth();

      let updatedMonths = [...state.months];
      const monthsToUpdate = [];

      if (action.payload.isRecurring) {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 12);

        let currentDate = new Date(transactionDate);
        while (currentDate <= endDate) {
          monthsToUpdate.push({
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
          });
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      } else {
        monthsToUpdate.push({ year, month });
      }

      monthsToUpdate.forEach(({ year, month }) => {
        const existingMonthIndex = updatedMonths.findIndex(
          m => m.year === year && m.month === month
        );

        const newTransaction = {
          ...action.payload,
          id: action.payload.isRecurring ? Date.now() + Math.random() : action.payload.id,
          date: new Date(year, month, transactionDate.getDate()).toISOString(),
        };

        if (existingMonthIndex !== -1) {
          updatedMonths[existingMonthIndex] = {
            ...updatedMonths[existingMonthIndex],
            transactions: [...updatedMonths[existingMonthIndex].transactions, newTransaction],
          };
        } else {
          updatedMonths.push({
            year,
            month,
            transactions: [newTransaction],
          });
        }
      });

      return {
        ...state,
        months: updatedMonths,
      };
    }

    case 'UPDATE_TRANSACTION':
    case 'DELETE_TRANSACTION':
    case 'SET_CURRENT_MONTH':
    case 'LOAD_TRANSACTIONS':
      return {
        ...state,
        months: action.type === 'LOAD_TRANSACTIONS' ? action.payload : state.months,
        currentMonth: action.type === 'SET_CURRENT_MONTH' ? action.payload : state.currentMonth,
      };

    default:
      return state;
  }
}

const FinanceContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const transactionsRef = collection(db, 'transactions');
    const q = query(transactionsRef, where('userId', '==', user.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];

      // Group transactions by month
      const monthsMap = new Map<string, MonthData>();
      
      transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const key = `${year}-${month}`;

        if (!monthsMap.has(key)) {
          monthsMap.set(key, {
            year,
            month,
            transactions: []
          });
        }

        monthsMap.get(key)?.transactions.push(transaction);
      });

      dispatch({
        type: 'LOAD_TRANSACTIONS',
        payload: Array.from(monthsMap.values())
      });
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}