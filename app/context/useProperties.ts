'use client';

import { create } from 'zustand';
import { useEffect } from 'react';

// Define the interface to match what admin page expects
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
  
  // ADD fields that admin page expects:
  heroImage?: string;
  currency?: string;
  complianceStatus?: string;
  areaUnit?: string;
  city?: string;
  country?: string;
  area?: number;
}

interface PropertyStore {
  properties: Property[];
  loading: boolean;
  error: string | null;

  // Actions
  loadProperties: () => Promise<void>;
  addProperty: (propertyData: Omit<Property, 'id'>) => Promise<void>;
  updateProperty: (id: string, updates: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  getPropertyById: (id: string) => Property | undefined;
}

export const useProperties = create<PropertyStore>((set, get) => ({
  properties: [],
  loading: false,
  error: null,

  loadProperties: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/properties');

      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.status}`);
      }

      const data = await response.json();
      set({ properties: data });
    } catch (error) {
      console.error('Failed to load properties from API:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      set({ loading: false });
    }
  },

  addProperty: async (propertyData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add property: ${response.status}`);
      }

      const newProperty = await response.json();

      // Add the new property to the local state
      set((state) => ({
        properties: [...state.properties, newProperty],
      }));
    } catch (error) {
      console.error('Failed to add property:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error; // Re-throw so the UI can handle it
    } finally {
      set({ loading: false });
    }
  },

  updateProperty: async (id: string, updates: Partial<Property>) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update property: ${response.status}`);
      }

      const updatedProperty = await response.json();

      // Update the property in local state
      set((state) => ({
        properties: state.properties.map((p) =>
          p.id === id ? { ...p, ...updatedProperty } : p
        ),
      }));
    } catch (error) {
      console.error('Failed to update property:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteProperty: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete property: ${response.status}`);
      }

      // Remove the property from local state
      set((state) => ({
        properties: state.properties.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete property:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getPropertyById: (id: string) => {
    return get().properties.find((p) => p.id === id);
  },
}));

// Optional: Create a hook that auto-loads properties on mount
export const usePropertiesLoader = () => {
  const { loadProperties, loading, properties, error } = useProperties();

  useEffect(() => {
    loadProperties();
  }, []);

  return { loading, properties, error };
};
