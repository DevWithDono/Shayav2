import React, { useState } from 'react';
import { Plus, FileText, Upload } from 'lucide-react';
import AddCreationModal from './AddCreationModal';

export default function AddCreationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'upload'>('new');

  const handleOptionClick = (type: 'new' | 'upload') => {
    setModalType(type);
    setIsOpen(true);
    setShowOptions(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
        {showOptions && (
          <div className="flex flex-col items-stretch space-y-2 mb-2 animate-fade-in min-w-[200px]">
            <button
              onClick={() => handleOptionClick('new')}
              className="flex items-center justify-between bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 w-full"
            >
              <span className="font-medium">Nouvelle création</span>
              <FileText size={20} />
            </button>
            <button
              onClick={() => handleOptionClick('upload')}
              className="flex items-center justify-between bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 w-full"
            >
              <span className="font-medium">Importer fichier</span>
              <Upload size={20} />
            </button>
          </div>
        )}
        
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={`w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 flex items-center justify-center ${
            showOptions ? 'rotate-45' : ''
          }`}
        >
          <Plus size={24} />
        </button>
      </div>

      {isOpen && (
        <AddCreationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type={modalType}
        />
      )}
    </>
  );
}