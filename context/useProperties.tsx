'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: 'villa' | 'apartment' | 'penthouse' | 'townhouse' | 'all';
  city: 'dubai' | 'abu-dhabi' | 'sharjah';
  images: string[];
  description: string;
  latitude: number;
  longitude: number;
  bedrooms: number;  // Required to match PropertyCard
  bathrooms: number; // Required to match PropertyCard
  rentalYield?: string;
  virtualTour?: boolean;
}

interface PropertiesContextType {
  properties: Property[];
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

const propertiesData: Property[] = [
  {
    id: 1,
    title: 'Luxury Villa in Palm Jumeirah',
    location: 'Palm Jumeirah, Dubai',
    price: 15000000,
    type: 'villa',
    city: 'dubai',
    images: ['https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg'],
    description: 'A stunning 5-bedroom villa with private beach access and sunset views.',
    latitude: 25.1124,
    longitude: 55.1390,
    bedrooms: 5,
    bathrooms: 6,
    rentalYield: '5.2%',
    virtualTour: true
  }
];

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);

  const filteredProperties = useMemo(() => {
    return propertiesData.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || property.type === selectedType;
      const matchesCity = selectedCity === 'all' || property.city === selectedCity;
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      
      return matchesSearch && matchesType && matchesCity && matchesPrice;
    });
  }, [searchQuery, selectedType, selectedCity, priceRange]);

  return (
    <PropertiesContext.Provider value={{ 
      properties: propertiesData, 
      filteredProperties, 
      searchQuery, 
      setSearchQuery, 
      selectedType, 
      setSelectedType,
      selectedCity,
      setSelectedCity,
      priceRange,
      setPriceRange
    }}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};
