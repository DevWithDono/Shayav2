import React, { useMemo } from 'react';
import { useCreations } from '../context/CreationsContext';
import { Creation } from '../types';
import { creationCategories } from '../data/categories';
import { 
  Eye, 
  ShoppingCart, 
  Edit, 
  Trash2, 
  Copy, 
  Send, 
  AlertCircle,
  Calendar,
  Search,
  Filter,
  SortDesc,
  SortAsc
} from 'lucide-react';

interface CreationsListProps {
  title: string;
}

function StatusBadge({ status }: { status: Creation['status'] }) {
  const statusConfig = {
    draft: { label: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    published: { label: 'Publié', color: 'bg-green-100 text-green-800' },
    rejected: { label: 'Rejeté', color: 'bg-red-100 text-red-800' }
  };

  const config = statusConfig[status];
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}

function CreationCard({ creation }: { creation: Creation }) {
  const { updateCreation, deleteCreation, duplicateCreation, changeStatus } = useCreations();
  
  const category = creationCategories.find(c => c.id === creation.category);

  const handleStatusChange = async (newStatus: Creation['status']) => {
    if (newStatus === 'rejected') {
      const reason = prompt('Raison du rejet:');
      if (reason) {
        await changeStatus(creation.id, newStatus, reason);
      }
    } else {
      await changeStatus(creation.id, newStatus);
    }
  };

  const getContextualActions = () => {
    switch (creation.status) {
      case 'draft':
        return (
          <>
            <button
              onClick={() => handleStatusChange('pending')}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              <Send size={14} />
              Soumettre
            </button>
            <button
              onClick={() => {/* TODO: Open edit modal */}}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              <Edit size={14} />
              Modifier
            </button>
          </>
        );
      case 'pending':
        return (
          <button
            onClick={() => handleStatusChange('draft')}
            className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
            Retirer
          </button>
        );
      case 'published':
        return (
          <>
            <button
              onClick={() => handleStatusChange('draft')}
              className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            >
              Dépublier
            </button>
            <button
              onClick={() => duplicateCreation(creation.id)}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            >
              <Copy size={14} />
              Dupliquer
            </button>
          </>
        );
      case 'rejected':
        return (
          <>
            <button
              onClick={() => alert(`Raison du rejet: ${creation.rejectionReason}`)}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              <AlertCircle size={14} />
              Voir motif
            </button>
            <button
              onClick={() => {/* TODO: Open edit modal */}}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              <Edit size={14} />
              Corriger
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg text-gray-900">{creation.title}</h3>
            <StatusBadge status={creation.status} />
          </div>
          <p className="text-gray-600 text-sm mb-2">{creation.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category?.color || '#gray' }}
              ></span>
              {category?.name || creation.category}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(creation.date).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
        
        {creation.imageUrl && (
          <img 
            src={creation.imageUrl} 
            alt={creation.title}
            className="w-16 h-16 object-cover rounded-lg ml-4"
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{creation.views || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingCart size={16} />
            <span>{creation.sales || 0}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {getContextualActions()}
          <button
            onClick={() => deleteCreation(creation.id)}
            className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {creation.tags && creation.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {creation.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterBar() {
  const { filter, setFilter } = useCreations();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Rechercher par titre..."
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <select
            value={filter.status}
            onChange={(e) => setFilter({ status: e.target.value as any })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="all">Tous les statuts</option>
            <option value="draft">Brouillons</option>
            <option value="pending">En attente</option>
            <option value="published">Publiés</option>
            <option value="rejected">Rejetés</option>
          </select>
        </div>

        {/* Category Filter */}
        <select
          value={filter.category}
          onChange={(e) => setFilter({ category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Toutes les catégories</option>
          {creationCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <div className="relative">
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter({ sortBy: e.target.value as any })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="date-desc">Plus récent</option>
            <option value="date-asc">Plus ancien</option>
            <option value="popularity">Popularité</option>
          </select>
          {filter.sortBy.includes('desc') ? (
            <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          ) : (
            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreationsList({ title }: CreationsListProps) {
  const { creations, filter, loading } = useCreations();

  const filteredAndSortedCreations = useMemo(() => {
    let filtered = creations;

    // Filter by status
    if (filter.status !== 'all') {
      filtered = filtered.filter(creation => creation.status === filter.status);
    }

    // Filter by category
    if (filter.category !== 'all') {
      filtered = filtered.filter(creation => creation.category === filter.category);
    }

    // Filter by search
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(creation =>
        creation.title.toLowerCase().includes(searchLower) ||
        creation.description.toLowerCase().includes(searchLower) ||
        creation.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filter.sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popularity':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [creations, filter]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      
      <FilterBar />
      
      <div className="space-y-4">
        {filteredAndSortedCreations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-500">
              <p className="text-lg font-medium mb-2">Aucune création trouvée</p>
              <p className="text-sm">
                {filter.status !== 'all' || filter.category !== 'all' || filter.search
                  ? 'Essayez de modifier vos filtres'
                  : 'Commencez par créer votre première création !'}
              </p>
            </div>
          </div>
        ) : (
          filteredAndSortedCreations.map((creation) => (
            <CreationCard key={creation.id} creation={creation} />
          ))
        )}
      </div>
    </div>
  );
}