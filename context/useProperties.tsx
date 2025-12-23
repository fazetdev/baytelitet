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
  rentalYield?: string;
  sqft?: number;
  area?: number;
  features?: string[];
  videoUrl?: string;
  status?: 'available' | 'sold' | 'rented';
}

interface PropertiesContextType {
  properties: Property[];
  filteredProperties: Property[];
  addProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: React.ReactNode }) {
  // Start with empty array as requested
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  useEffect(() => {
    // SSR Safe check
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bayt_properties');
      if (saved) {
        try {
          setProperties(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse properties", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && properties.length >= 0) {
      localStorage.setItem('bayt_properties', JSON.stringify(properties));
    }
  }, [properties]);

  const addProperty = (property: Property) => setProperties(prev => [property, ...prev]);
  const deleteProperty = (id: number) => setProperties(prev => prev.filter(p => p.id !== id));

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesCity = selectedCity === 'all' || p.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesType && matchesCity;
  });

  return (
    <PropertiesContext.Provider value={{ 
      properties, filteredProperties, addProperty, deleteProperty,
      searchQuery, setSearchQuery, selectedType, setSelectedType, 
      selectedCity, setSelectedCity 
    }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) throw new Error('useProperties must be used within PropertiesProvider');
  return context;
};
