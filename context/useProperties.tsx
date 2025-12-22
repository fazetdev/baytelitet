'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: 'villa' | 'apartment' | 'penthouse' | 'townhouse';
  city: string;
  images: string[];
  description: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  virtualTour: boolean;
  premium?: boolean;
}

interface PropertiesContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bayt_properties');
    if (saved) setProperties(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('bayt_properties', JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property: Property) => setProperties(prev => [property, ...prev]);
  const deleteProperty = (id: number) => setProperties(prev => prev.filter(p => p.id !== id));

  return (
    <PropertiesContext.Provider value={{ properties, addProperty, deleteProperty }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) throw new Error('useProperties must be used within PropertiesProvider');
  return context;
};
