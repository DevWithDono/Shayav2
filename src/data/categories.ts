import { Category } from '../types';

export const creationCategories: Category[] = [
  {
    id: 'scripts',
    name: 'Scripts',
    type: 'creation',
    icon: 'Code',
    color: '#4ECDC4'
  },
  {
    id: 'maps',
    name: 'Maps',
    type: 'creation',
    icon: 'Map',
    color: '#45B7D1'
  },
  {
    id: 'gui',
    name: 'GUI',
    type: 'creation',
    icon: 'Layout',
    color: '#96CEB4'
  },
  {
    id: 'models',
    name: 'Modèles',
    type: 'creation',
    icon: 'Box',
    color: '#FFD93D'
  },
  {
    id: 'tools',
    name: 'Outils',
    type: 'creation',
    icon: 'Wrench',
    color: '#FF6B6B'
  },
  {
    id: 'plugins',
    name: 'Plugins',
    type: 'creation',
    icon: 'Plug',
    color: '#D4A5A5'
  },
  {
    id: 'textures',
    name: 'Textures',
    type: 'creation',
    icon: 'Palette',
    color: '#95DAC1'
  },
  {
    id: 'animations',
    name: 'Animations',
    type: 'creation',
    icon: 'Play',
    color: '#FFEBA1'
  },
  {
    id: 'sounds',
    name: 'Sons',
    type: 'creation',
    icon: 'Volume2',
    color: '#FFB2A6'
  },
  {
    id: 'other',
    name: 'Autres',
    type: 'creation',
    icon: 'Plus',
    color: '#B5E4CA'
  }
];

// Keep old categories for backwards compatibility during transition
export const categories: Category[] = creationCategories;