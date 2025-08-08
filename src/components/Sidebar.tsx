import React from 'react';
import { X } from 'lucide-react';
import { categories } from '../data/categories';
import { LucideIcon } from '../utils/icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  selectedType: 'income' | 'expense';
}

export default function Sidebar({ isOpen, onClose, onSelectCategory, selectedType }: SidebarProps) {
  const filteredCategories = categories.filter(cat => cat.type === selectedType);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform z-30">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {selectedType === 'income' ? 'Catégories de revenus' : 'Catégories de dépenses'}
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4 space-y-2">
        {filteredCategories.map((category) => {
          const Icon = LucideIcon[category.icon];
          return (
            <button
              key={category.id}
              onClick={() => {
                onSelectCategory(category.id);
                onClose();
              }}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ color: category.color }}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="text-gray-700">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}