import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Transaction } from '../types';
import { categories } from '../data/categories';
import { LucideIcon } from '../utils/icons';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: 'income' | 'expense';
  editTransaction?: Transaction;
}

const initialFormState = {
  title: '',
  amount: '',
  type: 'expense' as const,
  category: '',
  date: new Date().toISOString().split('T')[0],
  note: '',
  isRecurring: false,
};

export default function AddTransactionModal({ isOpen, onClose, initialType, editTransaction }: AddTransactionModalProps) {
  const { dispatch } = useFinance();
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        title: editTransaction.title,
        amount: Math.abs(editTransaction.amount).toString(),
        type: editTransaction.type,
        category: editTransaction.category,
        date: new Date(editTransaction.date).toISOString().split('T')[0],
        note: editTransaction.note || '',
        isRecurring: editTransaction.isRecurring || false,
      });
    } else {
      setFormData({ ...initialFormState, type: initialType });
    }
  }, [isOpen, initialType, editTransaction]);

  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction: Transaction = {
      id: editTransaction?.id || Date.now(),
      title: formData.title,
      amount: formData.type === 'expense' 
        ? -Math.abs(Number(formData.amount))
        : Math.abs(Number(formData.amount)),
      date: new Date(formData.date).toISOString(),
      type: formData.type,
      category: formData.category,
      note: formData.note,
      isRecurring: formData.isRecurring,
    };

    dispatch({ 
      type: editTransaction ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION', 
      payload: transaction 
    });
    onClose();
  };

  const handleDelete = () => {
    if (editTransaction && window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: editTransaction.id });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-40 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-xl my-2 sm:my-8 max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h2 className="text-lg font-semibold">
            {editTransaction ? 'Modifier la transaction' : formData.type === 'income' ? 'Nouveau revenu' : 'Nouvelle dépense'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredCategories.map((category) => {
                const Icon = LucideIcon[category.icon];
                const isSelected = category.id === formData.category;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.id })}
                    className={`flex items-center p-2 sm:p-3 rounded-lg transition-colors ${
                      isSelected 
                        ? 'bg-gray-100 ring-2 ring-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" style={{ color: category.color }} />
                    <span className="text-gray-700 text-sm truncate">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (optionnel)
            </label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="recurring"
              checked={formData.isRecurring}
              onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
              Transaction récurrente mensuelle
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className={`flex-1 py-2 px-4 rounded-lg text-white transition-all duration-200 transform hover:scale-[1.02] ${
                formData.type === 'income'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700'
              }`}
            >
              {editTransaction ? 'Modifier' : 'Ajouter'}
            </button>
            
            {editTransaction && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Supprimer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}