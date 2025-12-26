'use client';

import { create } from 'zustand';
import { Property } from '@/types/property';

interface GulfAssetStore {
  properties: (Property & { 
    reraNumber?: string; 
    escrowRequired?: boolean; 
    complianceStatus?: string;
  })[];
  addProperty: (property: Property & { 
    reraNumber?: string; 
    escrowRequired?: boolean; 
    complianceStatus?: string;
  }) => void;
  deleteProperty: (id: string) => void;
  assets: any[];
  addAsset: (asset: any) => void;
}

export const useGulfAssetStore = create<GulfAssetStore>((set) => ({
  properties: [],
  assets: [],
  addProperty: (property) => set((state) => ({ 
    properties: [...state.properties, { ...property, id: property.id || Date.now().toString() }] 
  })),
  deleteProperty: (id) => set((state) => ({
    properties: state.properties.filter(p => p.id !== id)
  })),
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
}));
