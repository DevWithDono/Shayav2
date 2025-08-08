export interface Creation {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  views?: number;
  sales?: number;
  tags?: string[];
  imageUrl?: string;
  fileUrl?: string;
  rejectionReason?: string;
  lastModified: string;
}

// Keep Transaction for backwards compatibility during transition
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
  type: 'creation';
  icon: string;
  color: string;
}

export interface CreationFilter {
  status: 'all' | 'draft' | 'pending' | 'published' | 'rejected';
  category: string;
  search: string;
  sortBy: 'date-desc' | 'date-asc' | 'popularity';
}

export interface CreationStats {
  totalCreations: number;
  published: number;
  pending: number;
  drafts: number;
  rejected: number;
  totalViews: number;
  totalSales: number;
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