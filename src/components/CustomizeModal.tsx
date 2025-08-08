import React, { useState } from 'react';
import { X, Move, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { motion, Reorder } from 'framer-motion';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizeModal({ isOpen, onClose }: CustomizeModalProps) {
  const { widgets, layout, updateWidget, updateLayout, resetCustomization } = useCustomization();
  const [activeTab, setActiveTab] = useState<'layout' | 'style'>('layout');

  if (!isOpen) return null;

  const handleColorChange = (id: string, color: string) => {
    updateWidget(id, { backgroundColor: color });
  };

  const handleVisibilityToggle = (id: string, visible: boolean) => {
    updateWidget(id, { visible });
  };

  const handleSpanChange = (id: string, span: number) => {
    updateLayout(id, { span });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        className="bg-white rounded-xl w-full max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Personnalisation des widgets</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={resetCustomization}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
              title="Réinitialiser"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('layout')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'layout'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              Disposition
            </button>
            <button
              onClick={() => setActiveTab('style')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'style'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              Style
            </button>
          </div>

          <div className="space-y-4">
            {widgets.map((widget) => (
              <motion.div
                key={widget.id}
                className="bg-gray-50 rounded-lg p-4"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Move className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{widget.name}</span>
                  </div>
                  <button
                    onClick={() => handleVisibilityToggle(widget.id, !widget.visible)}
                    className="p-2 hover:bg-gray-200 rounded-full"
                  >
                    {widget.visible ? (
                      <Eye className="h-5 w-5 text-gray-600" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {activeTab === 'style' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Couleur de fond
                      </label>
                      <input
                        type="color"
                        value={widget.backgroundColor}
                        onChange={(e) => handleColorChange(widget.id, e.target.value)}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Largeur
                      </label>
                      <select
                        value={layout[widget.id]?.span || 1}
                        onChange={(e) => handleSpanChange(widget.id, Number(e.target.value))}
                        className="w-full rounded-lg border-gray-300"
                      >
                        <option value={1}>Normal (1/3)</option>
                        <option value={2}>Large (2/3)</option>
                        <option value={3}>Pleine largeur</option>
                      </select>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}