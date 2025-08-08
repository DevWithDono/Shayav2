export interface Transaction {
  id: number;
  title: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
  note?: string;
  isRecurring?: boolean;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
}

export interface MonthData {
  year: number;
  month: number;
  balance: number;
  transactions: Transaction[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  settings?: {
    currency: string;
    theme: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}