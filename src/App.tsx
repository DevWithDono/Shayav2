import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Balance from './components/Balance';
import TransactionList from './components/TransactionList';
import AddTransactionButton from './components/AddTransactionButton';
import LandingPage from './components/LandingPage';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Balance />
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <TransactionList
            title="Revenus"
            icon="transfer"
            type="income"
          />
          <TransactionList
            title="Dépenses"
            icon="debit"
            type="expense"
          />
        </div>
      </main>
      
      <AddTransactionButton />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CustomizationProvider>
        <FinanceProvider>
          <AppContent />
        </FinanceProvider>
      </CustomizationProvider>
    </AuthProvider>
  );
}

export default App;