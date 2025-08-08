import React, { useState } from 'react';
import { CalendarMinus, ArrowLeftRight, Clock } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Transaction } from '../types';
import { categories } from '../data/categories';
import { LucideIcon } from '../utils/icons';
import AddTransactionModal from './AddTransactionModal';

interface TransactionListProps {
  title: string;
  icon: 'transfer' | 'debit';
  type: 'income' | 'expense';
}

export default function TransactionList({ title, icon, type }: TransactionListProps) {
  const { state } = useFinance();
  const { currentMonth } = state;
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  const monthData = state.months.find(
    (m) => m.year === currentMonth.year && m.month === currentMonth.month
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const transactions = monthData?.transactions.filter((t) => t.type === type) ?? [];
  const currentTransactions = transactions.filter(t => new Date(t.date) <= today);
  const futureTransactions = transactions.filter(t => new Date(t.date) > today);

  const currentTotal = currentTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const futureTotal = futureTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getTransactionIcon = (transaction: Transaction) => {
    const category = categories.find(c => c.id === transaction.category);
    if (category) {
      const Icon = LucideIcon[category.icon];
      return <Icon className="h-5 w-5" style={{ color: category.color }} />;
    }
    return icon === 'transfer' ? 
      <ArrowLeftRight className="h-5 w-5 text-blue-600" /> : 
      <CalendarMinus className="h-5 w-5 text-blue-600" />;
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Non catégorisé';
  };

  const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
    <button
      onClick={() => setEditingTransaction(transaction)}
      className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-3">
          {getTransactionIcon(transaction)}
          <div>
            <div className="font-medium text-gray-800">{transaction.title}</div>
            <div className="text-sm text-gray-500">
              {getCategoryName(transaction.category)}
            </div>
          </div>
        </div>
        <div className={`font-semibold ${transaction.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {Math.abs(transaction.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {new Date(transaction.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        {transaction.note && (
          <div className="text-sm text-gray-500 italic">
            {transaction.note}
          </div>
        )}
      </div>
    </button>
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {icon === 'transfer' ? (
                <ArrowLeftRight className="h-5 w-5 text-blue-600 mr-2" />
              ) : (
                <CalendarMinus className="h-5 w-5 text-blue-600 mr-2" />
              )}
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            </div>
            <div className="text-sm font-medium text-gray-500">
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Total actuel: {currentTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </div>
            {futureTotal > 0 && (
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                À venir: {futureTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </div>
            )}
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <CalendarMinus className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Aucune transaction
              </h3>
              <p className="text-gray-500 max-w-sm">
                Commencez à ajouter des {type === 'income' ? 'revenus' : 'dépenses'} pour suivre vos finances.
              </p>
            </div>
          ) : (
            <>
              {currentTransactions.length > 0 && (
                <div>
                  {currentTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
                </div>
              )}
              
              {futureTransactions.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">À venir</span>
                  </div>
                  {futureTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AddTransactionModal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        initialType={type}
        editTransaction={editingTransaction || undefined}
      />
    </>
  );
}