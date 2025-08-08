import React, { useState } from 'react';
import { Palette, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StoreBlox
            </span>
          </div>
          
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:block">
                Bienvenue, {user.username}
              </span>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                    <div className="py-1">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Paramètres
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {!user && (
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100"
              >
                Se connecter
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}

