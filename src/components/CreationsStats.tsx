import React from 'react';
import { useCreations } from '../context/CreationsContext';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  ShoppingCart, 
  TrendingUp,
  Package
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function CreationsStats() {
  const { stats } = useCreations();

  const statCards = [
    {
      title: 'Total créations',
      value: stats.totalCreations,
      icon: <Package className="text-white" size={24} />,
      color: 'bg-blue-500',
      subtitle: 'Toutes vos créations'
    },
    {
      title: 'Publiées',
      value: stats.published,
      icon: <CheckCircle className="text-white" size={24} />,
      color: 'bg-green-500',
      subtitle: 'En ligne actuellement'
    },
    {
      title: 'En attente',
      value: stats.pending,
      icon: <Clock className="text-white" size={24} />,
      color: 'bg-yellow-500',
      subtitle: 'En cours de validation'
    },
    {
      title: 'Brouillons',
      value: stats.drafts,
      icon: <FileText className="text-white" size={24} />,
      color: 'bg-gray-500',
      subtitle: 'Non soumis'
    },
    {
      title: 'Rejetées',
      value: stats.rejected,
      icon: <XCircle className="text-white" size={24} />,
      color: 'bg-red-500',
      subtitle: 'À corriger'
    },
    {
      title: 'Total vues',
      value: stats.totalViews,
      icon: <Eye className="text-white" size={24} />,
      color: 'bg-purple-500',
      subtitle: 'Visibilité totale'
    },
    {
      title: 'Total ventes',
      value: stats.totalSales,
      icon: <ShoppingCart className="text-white" size={24} />,
      color: 'bg-emerald-500',
      subtitle: 'Revenus générés'
    },
    {
      title: 'Taux de réussite',
      value: stats.totalCreations > 0 ? Math.round((stats.published / stats.totalCreations) * 100) : 0,
      icon: <TrendingUp className="text-white" size={24} />,
      color: 'bg-indigo-500',
      subtitle: 'Créations publiées'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h2>
        <p className="text-gray-600">Vue d'ensemble de vos créations et performances</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Nouvelle création</h4>
                <p className="text-sm text-gray-600">Commencer un nouveau projet</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Finaliser brouillons</h4>
                <p className="text-sm text-gray-600">{stats.drafts} en attente</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-red-300 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="text-red-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Corriger rejetées</h4>
                <p className="text-sm text-gray-600">{stats.rejected} à traiter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}