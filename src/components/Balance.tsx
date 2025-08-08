import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, Clock, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCustomization } from '../context/CustomizationContext';

export default function Balance() {
  const { state } = useFinance();
  const { widgets } = useCustomization();
  const { currentMonth } = state;
  
  const monthData = state.months.find(
    (m) => m.year === currentMonth.year && m.month === currentMonth.month
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const transactions = monthData?.transactions ?? [];
  const currentTransactions = transactions.filter(t => new Date(t.date) <= today);
  const futureTransactions = transactions.filter(t => new Date(t.date) > today);
  
  const currentBalance = currentTransactions.reduce((sum, t) => sum + t.amount, 0);
  const futureBalance = futureTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  const currentIncome = currentTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const currentExpenses = currentTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => Math.abs(sum + t.amount), 0);

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const visibleWidgets = widgets.filter(w => w.visible);

  return (
    <motion.div 
      className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Solde actuel */}
      {visibleWidgets.find(w => w.id === 'balance') && (
        <motion.div
          variants={itemVariants}
          className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          style={{ backgroundColor: widgets.find(w => w.id === 'balance')?.backgroundColor }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="h-5 w-5 text-blue-600" />
            <h2 className="text-gray-600">Solde actuel</h2>
          </div>
          <motion.div 
            className="text-3xl font-bold mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </motion.div>
          <div className="text-sm text-gray-500">
            {months[currentMonth.month]} {currentMonth.year}
          </div>
          {futureBalance !== 0 && (
            <motion.div 
              className="mt-3 flex items-center gap-1 text-sm text-gray-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Clock className="h-4 w-4" />
              <span>Solde à venir: </span>
              <span>{(currentBalance + futureBalance).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Revenus du mois */}
      {visibleWidgets.find(w => w.id === 'income') && (
        <motion.div
          variants={itemVariants}
          className="bg-emerald-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
          style={{ backgroundColor: widgets.find(w => w.id === 'income')?.backgroundColor }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-emerald-700">Revenus du mois</h2>
            <ArrowUpRight className="h-5 w-5 text-emerald-600" />
          </div>
          <motion.div 
            className="text-3xl font-bold text-emerald-700 mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {currentIncome.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </motion.div>
          <div className="text-sm text-emerald-600/80">
            {transactions.filter(t => t.type === 'income').length} transaction{transactions.filter(t => t.type === 'income').length !== 1 ? 's' : ''}
          </div>
        </motion.div>
      )}

      {/* Dépenses du mois */}
      {visibleWidgets.find(w => w.id === 'expenses') && (
        <motion.div
          variants={itemVariants}
          className="bg-rose-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
          style={{ backgroundColor: widgets.find(w => w.id === 'expenses')?.backgroundColor }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-rose-700">Dépenses du mois</h2>
            <ArrowDownRight className="h-5 w-5 text-rose-600" />
          </div>
          <motion.div 
            className="text-3xl font-bold text-rose-700 mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {currentExpenses.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </motion.div>
          <div className="text-sm text-rose-600/80">
            {transactions.filter(t => t.type === 'expense').length} transaction{transactions.filter(t => t.type === 'expense').length !== 1 ? 's' : ''}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}