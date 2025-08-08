import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronRight, LineChart, Shield, Smartphone } from 'lucide-react';
import AuthModal from './AuthModal';

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const features = [
    {
      icon: <LineChart className="h-6 w-6 text-blue-500" />,
      title: "Suivi en temps réel",
      description: "Visualisez vos finances en temps réel avec des graphiques intuitifs"
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-500" />,
      title: "Sécurisé",
      description: "Vos données sont cryptées et sécurisées avec Firebase"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-purple-500" />,
      title: "Multi-plateformes",
      description: "Accédez à vos finances depuis n'importe quel appareil"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Shaya
            </span>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => handleAuthClick('register')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              S'inscrire
            </button>
            <button
              onClick={() => handleAuthClick('login')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Se connecter
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Gérez vos finances en toute simplicité
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Shaya vous aide à suivre vos dépenses, gérer votre budget et atteindre vos objectifs financiers.
            </p>
            <motion.button
              onClick={() => handleAuthClick('register')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center gap-2 mx-auto group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Commencer maintenant
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 inline-block p-3 bg-gray-50 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Prêt à mieux gérer vos finances ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Rejoignez des milliers d'utilisateurs qui font confiance à Shaya
            </p>
            <motion.button
              onClick={() => handleAuthClick('register')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium text-lg flex items-center gap-2 mx-auto group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Créer un compte gratuit
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </section>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}