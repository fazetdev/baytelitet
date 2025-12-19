'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
}

interface PropertiesContextValue {
  // Data
  properties: Property[];
  filteredProperties: Property[];
  
  // States
  loading: boolean;
  error: string | null;
  
  // Filters
  searchQuery: string;
  selectedType: string;
  selectedCity: string;
  priceRange: [number, number];
  
  // Setters
  setSearchQuery: (value: string) => void;
  setSelectedType: (value: string) => void;
  setSelectedCity: (value: string) => void;
  setPriceRange: (value: [number, number]) => void;
  
  // Actions
  refresh: () => void;
}

const PropertiesContext = createContext<PropertiesContextValue | undefined>(undefined);

export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);

  // Fetch properties from API
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedType !== 'all') params.append('type', selectedType);
      if (selectedCity !== 'all') params.append('city', selectedCity);
      params.append('minPrice', priceRange[0].toString());
      params.append('maxPrice', priceRange[1].toString());

      const res = await fetch(`/api/properties?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch properties');
      const data: Property[] = await res.json();
      setProperties(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Client-side search filtering
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || property.type.toLowerCase() === selectedType.toLowerCase();
      const matchesCity = selectedCity === 'all' || property.location.toLowerCase().includes(selectedCity.toLowerCase());
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      return matchesSearch && matchesType && matchesCity && matchesPrice;
    });
  }, [properties, searchQuery, selectedType, selectedCity, priceRange]);

  // Fetch on filter change (server-side)
  useEffect(() => {
    fetchProperties();
  }, [selectedType, selectedCity, priceRange]); // Note: searchQuery not here (client-side only)

  const refresh = () => {
    fetchProperties();
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        filteredProperties,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        selectedCity,
        setSelectedCity,
        priceRange,
        setPriceRange,
        refresh,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) throw new Error('useProperties must be used within PropertiesProvider');
  return context;
};
