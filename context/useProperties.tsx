'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: 'villa' | 'apartment' | 'penthouse' | 'townhouse' | 'all';
  city: string;
  images: string[];
  description: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  rentalYield?: string;
  virtualTour?: boolean;
}

interface PropertiesContextType {
  properties: Property[];
  addProperty: (p: Property) => void;
  filteredProperties: Property[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);

  // Load from LocalStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('bayt_properties');
    if (saved) {
      setProperties(JSON.parse(saved));
    } else {
      // Default sample property
      setProperties([{
        id: 1,
        title: 'Sample Luxury Villa',
        location: 'Palm Jumeirah, Dubai',
        price: 15000000,
        type: 'villa',
        city: 'Dubai',
        images: ['https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg'],
        description: 'Default sample description.',
        latitude: 25.1124,
        longitude: 55.1390,
        bedrooms: 5,
        bathrooms: 6,
        rentalYield: '5.2%',
        virtualTour: true
      }]);
    }
  }, []);

  const addProperty = (newProp: Property) => {
    const updated = [newProp, ...properties];
    setProperties(updated);
    localStorage.setItem('bayt_properties', JSON.stringify(updated));
  };

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesCity = selectedCity === 'all' || p.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesType && matchesCity && matchesPrice;
  });

  return (
    <PropertiesContext.Provider value={{ 
      properties, addProperty, filteredProperties, 
      searchQuery, setSearchQuery, selectedType, setSelectedType,
      selectedCity, setSelectedCity, priceRange, setPriceRange 
    }}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) throw new Error('useProperties must be used within Provider');
  return context;
};
