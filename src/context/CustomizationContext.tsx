import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Widget {
  id: string;
  name: string;
  backgroundColor: string;
  visible: boolean;
}

interface Layout {
  [key: string]: {
    span: number;
    order: number;
  };
}

interface CustomizationContextType {
  widgets: Widget[];
  layout: Layout;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  updateLayout: (id: string, updates: Partial<Layout[string]>) => void;
  resetCustomization: () => void;
}

const defaultWidgets: Widget[] = [
  {
    id: 'balance',
    name: 'Solde actuel',
    backgroundColor: 'rgb(239 246 255 / 0.8)',
    visible: true,
  },
  {
    id: 'income',
    name: 'Revenus du mois',
    backgroundColor: 'rgb(240 253 244)',
    visible: true,
  },
  {
    id: 'expenses',
    name: 'Dépenses du mois',
    backgroundColor: 'rgb(254 242 242)',
    visible: true,
  },
];

const defaultLayout: Layout = {
  balance: { span: 1, order: 0 },
  income: { span: 1, order: 1 },
  expenses: { span: 1, order: 2 },
};

const CustomizationContext = createContext<CustomizationContextType | null>(null);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [layout, setLayout] = useState<Layout>(defaultLayout);

  // Load customization on mount
  useEffect(() => {
    if (user) {
      const savedWidgets = localStorage.getItem(`widgets_${user.id}`);
      const savedLayout = localStorage.getItem(`layout_${user.id}`);
      
      if (savedWidgets) setWidgets(JSON.parse(savedWidgets));
      if (savedLayout) setLayout(JSON.parse(savedLayout));
    }
  }, [user]);

  // Save customization on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`widgets_${user.id}`, JSON.stringify(widgets));
      localStorage.setItem(`layout_${user.id}`, JSON.stringify(layout));
    }
  }, [widgets, layout, user]);

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    setWidgets(current =>
      current.map(widget =>
        widget.id === id ? { ...widget, ...updates } : widget
      )
    );
  };

  const updateLayout = (id: string, updates: Partial<Layout[string]>) => {
    setLayout(current => ({
      ...current,
      [id]: { ...current[id], ...updates },
    }));
  };

  const resetCustomization = () => {
    setWidgets(defaultWidgets);
    setLayout(defaultLayout);
  };

  return (
    <CustomizationContext.Provider value={{
      widgets,
      layout,
      updateWidget,
      updateLayout,
      resetCustomization,
    }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
}