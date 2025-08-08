import { Category } from '../types';

export const categories: Category[] = [
  // Revenus
  {
    id: 'salary',
    name: 'Salaire',
    type: 'income',
    icon: 'Briefcase',
    color: '#95DAC1'
  },
  {
    id: 'bonus',
    name: 'Bonus',
    type: 'income',
    icon: 'Gift',
    color: '#FFEBA1'
  },
  {
    id: 'rental',
    name: 'Locations',
    type: 'income',
    icon: 'Building2',
    color: '#6FB2D2'
  },
  {
    id: 'investment',
    name: 'Investissements',
    type: 'income',
    icon: 'PiggyBank',
    color: '#85C88A'
  },
  {
    id: 'freelance',
    name: 'Freelance',
    type: 'income',
    icon: 'Trophy',
    color: '#FFB2A6'
  },
  {
    id: 'other_income',
    name: 'Autres revenus',
    type: 'income',
    icon: 'Plus',
    color: '#B5E4CA'
  },

  // Dépenses
  {
    id: 'housing',
    name: 'Logement',
    type: 'expense',
    icon: 'Home',
    color: '#4ECDC4'
  },
  {
    id: 'utilities',
    name: 'Factures',
    type: 'expense',
    icon: 'Lightbulb',
    color: '#FFD93D'
  },
  {
    id: 'food',
    name: 'Alimentation',
    type: 'expense',
    icon: 'Utensils',
    color: '#96CEB4'
  },
  {
    id: 'transport',
    name: 'Transport',
    type: 'expense',
    icon: 'Car',
    color: '#45B7D1'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    type: 'expense',
    icon: 'ShoppingBag',
    color: '#FF6B6B'
  },
  {
    id: 'health',
    name: 'Santé',
    type: 'expense',
    icon: 'Heart',
    color: '#FF9999'
  },
  {
    id: 'leisure',
    name: 'Loisirs',
    type: 'expense',
    icon: 'Gamepad2',
    color: '#D4A5A5'
  },
  {
    id: 'other_expense',
    name: 'Autres dépenses',
    type: 'expense',
    icon: 'Plus',
    color: '#FFB4B4'
  }
];