'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  addProperty: (property: Property) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  loading: boolean;
  error: string | null;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load properties from API
  const loadProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/properties');
      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.status}`);
      }
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      console.error('Failed to load properties:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // Add property via API
  const addProperty = async (property: Property) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });

      if (!response.ok) {
        throw new Error(`Failed to add property: ${response.status}`);
      }

      const newProperty = await response.json();
      setProperties(prev => [newProperty, ...prev]);
    } catch (err) {
      console.error('Failed to add property:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete property via API
  const deleteProperty = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete property: ${response.status}`);
      }

      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete property:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesCity = selectedCity === 'all' || p.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesType && matchesCity;
  });

  return (
    <PropertiesContext.Provider value={{
      properties,
      filteredProperties,
      addProperty,
      deleteProperty,
      searchQuery,
      setSearchQuery,
      selectedType,
      setSelectedType,
      selectedCity,
      setSelectedCity,
      loading,
      error
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
