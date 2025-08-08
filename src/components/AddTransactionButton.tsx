import React, { useState } from 'react';
import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AddTransactionModal from './AddTransactionModal';

export default function AddTransactionButton() {
  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('expense');

  const handleTypeSelect = (type: 'income' | 'expense') => {
    setSelectedType(type);
    setIsModalOpen(true);
    setShowOptions(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
        {showOptions && (
          <div className="flex flex-col items-stretch space-y-2 mb-2 animate-fade-in min-w-[200px]">
            <button
              onClick={() => handleTypeSelect('income')}
              className="flex items-center justify-between bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 w-full"
            >
              <span>Nouveau revenu</span>
              <ArrowUpRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleTypeSelect('expense')}
              className="flex items-center justify-between bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 w-full"
            >
              <span>Nouvelle dépense</span>
              <ArrowDownRight className="h-5 w-5" />
            </button>
          </div>
        )}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110 ${
            showOptions ? 'rotate-45' : ''
          }`}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={selectedType}
      />
    </>
  );
}