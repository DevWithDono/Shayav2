import React, { useState } from 'react';
import { X, Upload, Save, Send, FileText, Image, Link } from 'lucide-react';
import { useCreations } from '../context/CreationsContext';
import { creationCategories } from '../data/categories';
import { Creation } from '../types';

interface AddCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'new' | 'upload';
}

export default function AddCreationModal({ isOpen, onClose, type }: AddCreationModalProps) {
  const { addCreation } = useCreations();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'scripts',
    tags: '',
    imageUrl: '',
    fileUrl: '',
    status: 'draft' as Creation['status']
  });

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      const creationData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        status: saveAsDraft ? 'draft' as const : formData.status,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        imageUrl: formData.imageUrl || undefined,
        fileUrl: formData.fileUrl || undefined
      };

      await addCreation(creationData);
      onClose();
      setFormData({
        title: '',
        description: '',
        category: 'scripts',
        tags: '',
        imageUrl: '',
        fileUrl: '',
        status: 'draft'
      });
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-40 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FileText size={24} />
            {type === 'new' ? 'Nouvelle création' : 'Importer une création'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => handleSubmit(e, false)} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nom de votre création"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Décrivez votre création..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {creationCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleInputChange('category', category.id)}
                  className={`flex items-center p-2 sm:p-3 rounded-lg transition-colors ${
                    formData.category === category.id
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: category.color }}
                  ></span>
                  <span className="text-sm font-medium truncate">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="automation, farming, script (séparés par des virgules)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Séparez les tags par des virgules
            </p>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Image size={16} />
              Image d'aperçu
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://exemple.com/image.png"
            />
          </div>

          {/* File URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Link size={16} />
              Lien du fichier
            </label>
            <input
              type="url"
              value={formData.fileUrl}
              onChange={(e) => handleInputChange('fileUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://exemple.com/fichier.zip"
            />
          </div>

          {/* File Upload for 'upload' type */}
          {type === 'upload' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Glissez votre fichier ici ou cliquez pour sélectionner
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Formats supportés: .zip, .rar, .7z (max 50MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".zip,.rar,.7z"
                />
              </div>
            </div>
          )}

          {/* Status for non-draft submission */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="mr-2"
                />
                Sauvegarder comme brouillon
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  checked={formData.status === 'pending'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="mr-2"
                />
                Soumettre pour validation
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Annuler
            </button>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading || !formData.title.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                Brouillon
              </button>
              
              <button
                type="submit"
                disabled={loading || !formData.title.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : formData.status === 'pending' ? (
                  <Send size={16} />
                ) : (
                  <Save size={16} />
                )}
                {formData.status === 'pending' ? 'Soumettre' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}