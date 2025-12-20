'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// EXPANDED Property interface with all needed fields
export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  description?: string;
  city?: string;
  area?: number;
  features?: string[];
  status?: string;
  virtualTour?: boolean;
  goldenVisaEligible?: boolean;
  rentalYield?: string;
  images?: string[];
  latitude?: number;
  longitude?: number;
}

interface PropertiesContextValue {
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

const PropertiesContext = createContext<PropertiesContextValue | undefined>(undefined);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([
    // Example properties with all fields
    {
      id: 1,
      title: 'Luxury Villa in Palm Jumeirah',
      price: 12500000,
      location: 'Palm Jumeirah, Dubai',
      type: 'villa',
      bedrooms: 5,
      bathrooms: 6,
      description: 'Stunning luxury villa with private beach access',
      city: 'Dubai',
      area: 8500,
      features: ['Private Pool', 'Beach Access', 'Smart Home'],
      status: 'ready',
      virtualTour: true,
      goldenVisaEligible: true,
      rentalYield: '7.2%',
      images: ['/images/properties/villa1.jpg'],
      latitude: 25.113194,
      longitude: 55.138294
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesCity = selectedCity === 'all' || property.city === selectedCity;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesCity && matchesPrice;
  });

  return (
    <PropertiesContext.Provider value={{
      properties,
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
  if (!context) throw new Error('useProperties must be used within PropertiesProvider');
  return context;
};
