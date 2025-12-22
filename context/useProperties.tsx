'use client';

import React, { createContext, useContext, ReactNode } from 'react';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: 'villa' | 'apartment' | 'penthouse' | 'townhouse';
  city: 'dubai' | 'abu-dhabi' | 'sharjah';
  images: string[];
  description: string;
  latitude: number;
  longitude: number;
  rentalYield?: string;
  virtualTour?: boolean;
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Luxury Villa in Palm Jumeirah',
    location: 'Palm Jumeirah, Dubai',
    price: 15000000,
    type: 'villa',
    city: 'dubai',
    // REAL 360 PANORAMA IMAGE FOR TESTING
    images: ['https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg'],
    description: 'A stunning 5-bedroom villa with private beach access and sunset views.',
    latitude: 25.1124,
    longitude: 55.1390,
    rentalYield: '5.2%',
    virtualTour: true
  }
];

const PropertiesContext = createContext({ properties });

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PropertiesContext.Provider value={{ properties }}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => useContext(PropertiesContext);
