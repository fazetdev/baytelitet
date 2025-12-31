'use client';

import { create } from 'zustand';
import { propertyApi } from '@/lib/api';
import { Property } from '@/app/types/property';
import { 
  getStorageItem, 
  setStorageItem, 
  removeStorageItem 
} from '@/lib/api/utils/storage';

// Helper to generate unique IDs (fallback for local drafts)
const generateId = () => {
  return `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Safe number parsing with fallback
const safeParseFloat = (value: string | number | undefined): number | undefined => {
  if (value === undefined || value === null) return undefined;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? undefined : num;
};

// Convert GulfProperty to backend Property format
const toBackendProperty = (gulfProp: GulfProperty): Omit<Property, 'id' | 'createdAt' | 'updatedAt'> => {
  const lat = safeParseFloat(gulfProp.lat);
  const lng = safeParseFloat(gulfProp.long);
  const price = typeof gulfProp.price === 'string' ? safeParseFloat(gulfProp.price) : gulfProp.price;
  
  // Derive country from jurisdiction (first 2 letters)
  const countryCode = gulfProp.jurisdiction.substring(0, 2);
  const countryMap: Record<string, string> = {
    'AE': 'UAE',
    'SA': 'Saudi',
    'QA': 'Qatar', 
    'KW': 'Kuwait',
    'OM': 'Oman',
    'BH': 'Bahrain'
  };
  
  return {
    title: gulfProp.title,
    price: price || 0,
    currency: gulfProp.currency,
    type: gulfProp.propertyType, // Maps to Property.type (general field)
    country: countryMap[countryCode] || 'UAE',
    state: '', // Will be populated from location data if available
    city: gulfProp.city,
    address: gulfProp.address,
    lat: lat,
    lng: lng,
    bedrooms: gulfProp.beds,
    bathrooms: gulfProp.baths,
    area: gulfProp.area,
    areaUnit: (gulfProp.areaUnit === 'sqm' ? 'sqm' : 'sqft') as 'sqft' | 'sqm',
    propertyType: gulfProp.propertyType as Property['propertyType'],
    heroImage: gulfProp.heroImage || undefined,
    gallery: gulfProp.gallery,
    reraNumber: gulfProp.reraNumber,
    jurisdiction: gulfProp.jurisdiction,
    commissionRate: gulfProp.commissionRate,
    offPlan: gulfProp.offPlan,
    escrowRequired: gulfProp.escrowRequired,
    description: gulfProp.description,
    agentName: gulfProp.agentName,
    agentLicense: gulfProp.agentLicense,
    agentPhone: gulfProp.agentPhone || undefined,
    agentEmail: gulfProp.agentEmail || undefined,
    complianceStatus: gulfProp.complianceStatus || 'pending',
    isPublished: false,
  };
};

// Convert backend Property to GulfProperty format
const toGulfProperty = (property: Property): GulfProperty => {
  return {
    id: property.id,
    title: property.title,
    price: property.price,
    currency: property.currency,
    heroImage: property.heroImage || null,
    gallery: property.gallery || [],
    address: property.address,
    city: property.city,
    jurisdiction: property.jurisdiction || 'AE-DU',
    lat: property.lat?.toString() || '',
    long: property.lng?.toString() || '',
    beds: property.bedrooms,
    baths: property.bathrooms,
    area: property.area,
    areaUnit: property.areaUnit || 'sqft',
    propertyType: property.propertyType,
    reraNumber: property.reraNumber,
    escrowRequired: property.escrowRequired || false,
    offPlan: property.offPlan || false,
    description: property.description,
    agentName: property.agentName,
    agentPhone: property.agentPhone || '',
    agentEmail: property.agentEmail || '',
    agentLicense: property.agentLicense,
    commissionRate: property.commissionRate,
    complianceStatus: property.complianceStatus,
  };
};

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
  error: string | null;
  addProperty: (property: GulfProperty) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  loadProperties: () => Promise<void>;
  clearError: () => void;
}

export const useGulfAssetStore = create<GulfAssetStore>((set, get) => ({
  properties: [],
  loading: false,
  error: null,

  loadProperties: async () => {
    // First try to load from localStorage for offline support (SSR-safe)
    const saved = getStorageItem('gulf_properties');
    if (saved) {
      try {
        const localProperties = JSON.parse(saved) as GulfProperty[];
        set({ properties: localProperties });
      } catch (e) {
        console.error('Failed to parse local properties:', e);
      }
    }

    // Then load from API
    set({ loading: true, error: null });
    try {
      const apiProperties = await propertyApi.fetchProperties();
      const gulfProperties = apiProperties.map(toGulfProperty);
      
      // Merge strategy: API properties replace local ones with same ID
      // Keep local drafts (IDs starting with 'local_')
      const currentProperties = get().properties;
      const apiIds = new Set(gulfProperties.map(p => p.id));
      
      const mergedProperties = [
        // Keep local drafts that aren't in API
        ...currentProperties.filter(p => p.id?.startsWith('local_') || !apiIds.has(p.id)),
        // Add all API properties (overwrites local non-drafts)
        ...gulfProperties
      ];
      
      set({ properties: mergedProperties, loading: false });
      
      // Sync to localStorage for offline access (SSR-safe)
      setStorageItem('gulf_properties', JSON.stringify(mergedProperties));
    } catch (error: any) {
      console.error('Failed to load properties from API:', error);
      set({ 
        error: error.message || 'Failed to load properties',
        loading: false 
      });
    }
  },

  addProperty: async (property) => {
    set({ loading: true, error: null });
    
    try {
      // Convert to backend format
      const backendProperty = toBackendProperty(property);
      
      // Submit to API
      const newProperty = await propertyApi.createProperty(backendProperty);
      const gulfProperty = toGulfProperty(newProperty);
      
      // Update local state
      const updated = [...get().properties, gulfProperty];
      set({ properties: updated, loading: false });
      
      // Update localStorage (SSR-safe)
      setStorageItem('gulf_properties', JSON.stringify(updated));
      
    } catch (error: any) {
      console.error('Failed to add property via API:', error);
      
      // Fallback: save locally as draft if API fails
      const localProperty: GulfProperty = {
        ...property,
        id: property.id || generateId(),
        complianceStatus: 'draft' as const
      };
      
      const updated = [...get().properties, localProperty];
      setStorageItem('gulf_properties', JSON.stringify(updated));
      
      set({ 
        properties: updated, 
        loading: false,
        error: error.message || 'Property saved locally as draft (API unavailable)'
      });
    }
  },

  deleteProperty: async (id) => {
    set({ loading: true, error: null });
    
    // Check if it's a local draft (no need to call API)
    const isLocalDraft = id?.startsWith('local_');
    
    try {
      // Only call API for non-local properties
      if (!isLocalDraft) {
        await propertyApi.deleteProperty(id!);
      }
      
      // Update local state
      const updated = get().properties.filter(p => p.id !== id);
      set({ properties: updated, loading: false });
      
      // Update localStorage (SSR-safe)
      setStorageItem('gulf_properties', JSON.stringify(updated));
      
    } catch (error: any) {
      console.error('Failed to delete property:', error);
      
      // Still remove from local state even if API fails
      const updated = get().properties.filter(p => p.id !== id);
      setStorageItem('gulf_properties', JSON.stringify(updated));
      
      set({ 
        properties: updated, 
        loading: false,
        error: isLocalDraft ? null : error.message || 'Deleted locally (API unavailable)'
      });
    }
  },

  clearError: () => set({ error: null }),
}));
