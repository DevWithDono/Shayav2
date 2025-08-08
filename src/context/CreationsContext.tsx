import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Creation, CreationFilter, CreationStats } from '../types';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

interface CreationsState {
  creations: Creation[];
  filter: CreationFilter;
  stats: CreationStats;
  loading: boolean;
}

interface CreationsContextType extends CreationsState {
  addCreation: (creation: Omit<Creation, 'id' | 'date' | 'lastModified'>) => Promise<void>;
  updateCreation: (id: number, updates: Partial<Creation>) => Promise<void>;
  deleteCreation: (id: number) => Promise<void>;
  duplicateCreation: (id: number) => Promise<void>;
  setFilter: (filter: Partial<CreationFilter>) => void;
  changeStatus: (id: number, status: Creation['status'], rejectionReason?: string) => Promise<void>;
}

type CreationsAction =
  | { type: 'SET_CREATIONS'; payload: Creation[] }
  | { type: 'ADD_CREATION'; payload: Creation }
  | { type: 'UPDATE_CREATION'; payload: { id: number; updates: Partial<Creation> } }
  | { type: 'DELETE_CREATION'; payload: number }
  | { type: 'SET_FILTER'; payload: Partial<CreationFilter> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STATS'; payload: CreationStats };

const initialState: CreationsState = {
  creations: [],
  filter: {
    status: 'all',
    category: 'all',
    search: '',
    sortBy: 'date-desc'
  },
  stats: {
    totalCreations: 0,
    published: 0,
    pending: 0,
    drafts: 0,
    rejected: 0,
    totalViews: 0,
    totalSales: 0
  },
  loading: false
};

function creationsReducer(state: CreationsState, action: CreationsAction): CreationsState {
  switch (action.type) {
    case 'SET_CREATIONS':
      return { ...state, creations: action.payload };
    case 'ADD_CREATION':
      return { ...state, creations: [...state.creations, action.payload] };
    case 'UPDATE_CREATION':
      return {
        ...state,
        creations: state.creations.map(creation =>
          creation.id === action.payload.id
            ? { ...creation, ...action.payload.updates, lastModified: new Date().toISOString() }
            : creation
        )
      };
    case 'DELETE_CREATION':
      return {
        ...state,
        creations: state.creations.filter(creation => creation.id !== action.payload)
      };
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    default:
      return state;
  }
}

function calculateStats(creations: Creation[]): CreationStats {
  return {
    totalCreations: creations.length,
    published: creations.filter(c => c.status === 'published').length,
    pending: creations.filter(c => c.status === 'pending').length,
    drafts: creations.filter(c => c.status === 'draft').length,
    rejected: creations.filter(c => c.status === 'rejected').length,
    totalViews: creations.reduce((sum, c) => sum + (c.views || 0), 0),
    totalSales: creations.reduce((sum, c) => sum + (c.sales || 0), 0)
  };
}

const CreationsContext = createContext<CreationsContextType | undefined>(undefined);

export function CreationsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(creationsReducer, initialState);
  const { user } = useAuth();

  // Mock data for demonstration - replace with actual Firebase/Supabase calls
  const mockCreations: Creation[] = [
    {
      id: 1,
      title: "Script d'auto-farm",
      description: "Script automatique pour farmer des ressources",
      date: "2024-08-08",
      category: "scripts",
      status: "published",
      views: 1250,
      sales: 45,
      tags: ["automation", "farming"],
      lastModified: "2024-08-08"
    },
    {
      id: 2,
      title: "Map Skyblock Custom",
      description: "Une map skyblock avec des défis uniques",
      date: "2024-08-07",
      category: "maps",
      status: "pending",
      views: 320,
      sales: 0,
      tags: ["skyblock", "survival"],
      lastModified: "2024-08-07"
    },
    {
      id: 3,
      title: "Interface de shop",
      description: "GUI moderne pour shop en jeu",
      date: "2024-08-06",
      category: "gui",
      status: "draft",
      views: 0,
      sales: 0,
      tags: ["shop", "ui"],
      lastModified: "2024-08-08"
    },
    {
      id: 4,
      title: "Plugin de protection",
      description: "Plugin de protection avancée pour serveur",
      date: "2024-08-05",
      category: "plugins",
      status: "rejected",
      views: 89,
      sales: 0,
      tags: ["protection", "security"],
      rejectionReason: "Code insuffisamment documenté",
      lastModified: "2024-08-05"
    }
  ];

  useEffect(() => {
    if (user) {
      // For now, use mock data. Later replace with actual database calls
      dispatch({ type: 'SET_CREATIONS', payload: mockCreations });
      dispatch({ type: 'SET_STATS', payload: calculateStats(mockCreations) });
    }
  }, [user]);

  useEffect(() => {
    // Recalculate stats when creations change
    dispatch({ type: 'SET_STATS', payload: calculateStats(state.creations) });
  }, [state.creations]);

  const addCreation = async (creationData: Omit<Creation, 'id' | 'date' | 'lastModified'>) => {
    const now = new Date().toISOString();
    const newCreation: Creation = {
      ...creationData,
      id: Date.now(),
      date: now,
      lastModified: now,
      views: 0,
      sales: 0
    };

    dispatch({ type: 'ADD_CREATION', payload: newCreation });
    
    // TODO: Add to Firebase/Supabase
    // await addDoc(collection(db, 'creations'), newCreation);
  };

  const updateCreation = async (id: number, updates: Partial<Creation>) => {
    dispatch({ type: 'UPDATE_CREATION', payload: { id, updates } });
    
    // TODO: Update in Firebase/Supabase
    // await updateDoc(doc(db, 'creations', id.toString()), updates);
  };

  const deleteCreation = async (id: number) => {
    dispatch({ type: 'DELETE_CREATION', payload: id });
    
    // TODO: Delete from Firebase/Supabase
    // await deleteDoc(doc(db, 'creations', id.toString()));
  };

  const duplicateCreation = async (id: number) => {
    const original = state.creations.find(c => c.id === id);
    if (!original) return;

    const duplicate = {
      ...original,
      title: `${original.title} (Copie)`,
      status: 'draft' as const,
      views: 0,
      sales: 0
    };

    await addCreation(duplicate);
  };

  const setFilter = (filterUpdates: Partial<CreationFilter>) => {
    dispatch({ type: 'SET_FILTER', payload: filterUpdates });
  };

  const changeStatus = async (id: number, status: Creation['status'], rejectionReason?: string) => {
    const updates: Partial<Creation> = { status };
    if (status === 'rejected' && rejectionReason) {
      updates.rejectionReason = rejectionReason;
    }
    await updateCreation(id, updates);
  };

  return (
    <CreationsContext.Provider
      value={{
        ...state,
        addCreation,
        updateCreation,
        deleteCreation,
        duplicateCreation,
        setFilter,
        changeStatus
      }}
    >
      {children}
    </CreationsContext.Provider>
  );
}

export function useCreations() {
  const context = useContext(CreationsContext);
  if (context === undefined) {
    throw new Error('useCreations must be used within a CreationsProvider');
  }
  return context;
}