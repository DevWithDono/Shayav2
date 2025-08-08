import React from 'react';
import { categories } from '../data/categories';
import { LucideIcon } from '../utils/icons';

interface CategorySelectorProps {
  selectedType: 'income' | 'expense';
  onSelectCategory: (category: string) => void;
}

export default function CategorySelector({ selectedType, onSelectCategory }: CategorySelectorProps) {
  const filteredCategories = categories.filter(cat => cat.type === selectedType);

  return (
    <div className="h-full bg-gray-50">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-700">
          Sélectionner une catégorie
        </h3>
      </div>
      
      <div className="px-2 pb-4 space-y-1">
        {filteredCategories.map((category) => {
          const Icon = LucideIcon[category.icon];
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="w-full flex items-center p-2 rounded-lg hover:bg-white transition-colors"
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