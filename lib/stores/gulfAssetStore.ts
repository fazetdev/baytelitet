'use client';

import { create } from 'zustand';

export interface GulfProperty {
  id?: string;
  title: string;
  price: number | string;
  currency: string;
  heroImage: string | null;
  gallery: string[];
  virtualTour?: string | null;
  address: string;
  city: string;
  jurisdiction: string;
  lat: string;
  long: string;
  beds: number;
  baths: number;
  area: number;
  areaUnit: string;
  propertyType: string;
  reraNumber: string;
  escrowRequired: boolean;
  offPlan: boolean;
  description: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agentLicense: string;
  commissionRate: number;
  complianceStatus?: 'pending' | 'verified' | 'rejected' | 'draft';
}

interface GulfAssetStore {
  properties: GulfProperty[];
  loading: boolean;
  addProperty: (property: GulfProperty) => void;
  deleteProperty: (id: string) => void;
  loadProperties: () => void;
}

export const useGulfAssetStore = create<GulfAssetStore>((set, get) => ({
  properties: [],
  loading: false,

  loadProperties: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gulf_properties');
      if (saved) {
        set({ properties: JSON.parse(saved) });
      }
    }
  },

  addProperty: (property) => {
    const updated = [...get().properties, { ...property, id: property.id || Date.now().toString() }];
    if (typeof window !== 'undefined') {
      localStorage.setItem('gulf_properties', JSON.stringify(updated));
    }
    set({ properties: updated });
  },

  deleteProperty: (id) => {
    const updated = get().properties.filter(p => p.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gulf_properties', JSON.stringify(updated));
    }
    set({ properties: updated });
  }
}));
