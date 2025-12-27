'use client';

import { create } from 'zustand';

// Define the interface locally to ensure the build passes even if the alias is broken
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  description: string;
  images: string[];
  agentId: string;
  status: 'available' | 'sold' | 'pending';
  features: string[];
}

interface PropertyStore {
  properties: Property[];
  loading: boolean;
  loadProperties: () => void;
  getPropertyById: (id: string) => Property | undefined;
}

export const useProperties = create<PropertyStore>((set, get) => ({
  properties: [],
  loading: false,

  loadProperties: () => {
    set({ loading: true });
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('bayt_properties');
        if (saved) {
          set({ properties: JSON.parse(saved) });
        }
      }
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      set({ loading: false });
    }
  },

  getPropertyById: (id: string) => {
    return get().properties.find(p => p.id === id);
  }
}));
