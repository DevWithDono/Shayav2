import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CreationsProvider } from './context/CreationsContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import CreationsStats from './components/CreationsStats';
import CreationsList from './components/CreationsList';
import AddCreationButton from './components/AddCreationButton';
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
          <CreationsStats />
        </div>
        
        <div className="grid gap-6 grid-cols-1">
          <CreationsList title="Mes créations" />
        </div>
      </main>
      
      <AddCreationButton />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CustomizationProvider>
        <CreationsProvider>
          <AppContent />
        </CreationsProvider>
      </CustomizationProvider>
    </AuthProvider>
  );
}

export default App;