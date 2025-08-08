import React, { useState } from 'react';
import { Palette, Shield, Smartphone, Sparkles, Code, Users, Star } from 'lucide-react';
import AuthModal from './AuthModal';

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);

  const features = [
    {
      icon: <Code className="text-blue-600" size={32} />,
      title: "Partagez vos créations",
      description: "Publiez scripts, maps, GUI et bien plus sur la marketplace StoreBlox"
    },
    {
      icon: <Shield className="text-green-600" size={32} />,
      title: "Plateforme sécurisée",
      description: "Vos créations sont protégées avec un système de validation rigoureux"
    },
    {
      icon: <Users className="text-purple-600" size={32} />,
      title: "Communauté active",
      description: "Rejoignez une communauté de créateurs passionnés et talentueux"
    },
    {
      icon: <Smartphone className="text-orange-600" size={32} />,
      title: "Interface moderne",
      description: "Gérez vos créations avec une interface intuitive et responsive"
    },
    {
      icon: <Star className="text-yellow-600" size={32} />,
      title: "Système de notation",
      description: "Recevez des avis et améliorez vos créations grâce aux retours"
    },
    {
      icon: <Sparkles className="text-pink-600" size={32} />,
      title: "Outils avancés",
      description: "Filtres, recherche, statistiques pour optimiser vos performances"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StoreBlox
            </h1>
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
          >
            Se connecter
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Votre plateforme de
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}créations{" "}
            </span>
            pour Minecraft
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Partagez, vendez et découvrez des créations incroyables : scripts, maps, textures, plugins et bien plus encore.
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center gap-2 mx-auto group"
          >
            Commencer à créer
            <Sparkles className="group-hover:rotate-12 transition-transform" size={20} />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir StoreBlox ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Catégories populaires
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {['Scripts', 'Maps', 'GUI', 'Plugins', 'Textures'].map((category) => (
              <div
                key={category}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Code className="text-white" size={20} />
                </div>
                <p className="font-medium text-gray-900">{category}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium text-lg flex items-center gap-2 mx-auto group"
          >
            Découvrir toutes les catégories
            <Star className="group-hover:rotate-12 transition-transform" size={20} />
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-4xl font-bold mb-4">
            Prêt à partager vos créations ?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez dès maintenant la communauté StoreBlox et commencez à monétiser votre créativité.
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Créer un compte gratuitement
          </button>
        </div>
      </section>

      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          initialMode="register"
        />
      )}
    </div>
  );
}
