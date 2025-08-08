import React, { useState } from 'react';
import { Wallet, User, LogOut, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import CustomizeModal from './CustomizeModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { state, dispatch } = useFinance();

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const goToPreviousMonth = () => {
    const currentDate = new Date(state.currentMonth.year, state.currentMonth.month);
    currentDate.setMonth(currentDate.getMonth() - 1);
    dispatch({
      type: 'SET_CURRENT_MONTH',
      payload: { year: currentDate.getFullYear(), month: currentDate.getMonth() },
    });
  };

  const goToNextMonth = () => {
    const currentDate = new Date(state.currentMonth.year, state.currentMonth.month);
    currentDate.setMonth(currentDate.getMonth() + 1);
    dispatch({
      type: 'SET_CURRENT_MONTH',
      payload: { year: currentDate.getFullYear(), month: currentDate.getMonth() },
    });
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-800">Shaya</span>
          </div>
          
          {user && (
            <div className="flex items-center gap-4">
              <button onClick={goToPreviousMonth} className="p-1 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="text-gray-700 font-medium">
                {months[state.currentMonth.month]} {state.currentMonth.year}
              </div>
              
              <button onClick={goToNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button 
                  onClick={() => setIsCustomizeModalOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100"
                  >
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.username}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100"
              >
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Connexion</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CustomizeModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
      />
    </header>
  );
}