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

  const countryCode = gulfProp.jurisdiction.substring(0, 2);
  const countryMap: Record<string, string> = {
    'AE': 'UAE',
    'SA': 'Saudi',
    'QA': 'Qatar',
    'KW': 'Kuwait',
    'OM': 'Oman',
    'BH': 'Bahrain'
  };

  const backendProperty: Omit<Property, 'id' | 'createdAt' | 'updatedAt'> = {
    title: gulfProp.title,
    price: price || 0,
    currency: gulfProp.currency,
    type: gulfProp.propertyType,
    country: countryMap[countryCode] || 'UAE',
    state: '',
    city: gulfProp.city,
    address: gulfProp.address,
    lat: lat,
    lng: lng,
    beds: gulfProp.beds,
    baths: gulfProp.baths,
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
    agentName: gulfProp.agentName || '',
    agentLicense: gulfProp.agentLicense || '',
    agentPhone: gulfProp.agentPhone || undefined,
    agentEmail: gulfProp.agentEmail || undefined,
    agentPicture: gulfProp.agentPicture || undefined,
    complianceStatus: gulfProp.complianceStatus || 'pending',
    isPublished: gulfProp.isPublished || false,
  };

  if (gulfProp.agentId) {
    backendProperty.agentId = gulfProp.agentId;
  }

  return backendProperty;
};

// Convert backend Property to GulfProperty format
const toGulfProperty = (property: Property): GulfProperty => {
  const gulfProperty: GulfProperty = {
    id: property.id,
    title: property.title,
    price: property.price,
    currency: property.currency || 'AED',
    heroImage: property.heroImage || null,
    gallery: property.gallery || [],
    address: property.address || '',
    city: property.city,
    jurisdiction: property.jurisdiction || 'AE-DU',
    lat: property.lat?.toString() || '',
    long: property.lng?.toString() || '',
    beds: property.beds || 0,
    baths: property.baths || 0,
    area: property.area || 0,
    areaUnit: property.areaUnit || 'sqft',
    propertyType: property.propertyType || "",
    reraNumber: property.reraNumber || "",
    escrowRequired: property.escrowRequired || false,
    offPlan: property.offPlan || false,
    description: property.description || "",
    agentId: property.agentId,
    agentName: property.agentName || property.agentName || '',
    agentPhone: property.agentPhone || '',
    agentEmail: property.agentEmail || '',
    agentLicense: property.agentLicense || '',
    agentPicture: property.agentPicture || '',
    commissionRate: property.commissionRate || 2.0,
    complianceStatus: (property.complianceStatus as "verified" | "draft" | "pending" | "rejected" | undefined) || "pending",
    isPublished: property.isPublished || false,
  };

  return gulfProperty;
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
  agentId?: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agentLicense: string;
  agentPicture?: string; // Made optional to match form
  commissionRate: number;
  complianceStatus?: 'pending' | 'verified' | 'rejected' | 'draft';
  isPublished?: boolean;
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
    const saved = getStorageItem('gulf_properties');
    if (saved) {
      try {
        const localProperties = JSON.parse(saved) as GulfProperty[];
        set({ properties: localProperties });
      } catch (e) {
        console.error('Failed to parse local properties:', e);
      }
    }

    set({ loading: true, error: null });
    try {
      const apiProperties = await propertyApi.fetchProperties();
      const gulfProperties = apiProperties.map(toGulfProperty);

      const currentProperties = get().properties;
      const apiIds = new Set(gulfProperties.map((p: GulfProperty) => p.id));

      const mergedProperties = [
        ...currentProperties.filter((p: GulfProperty) => p.id?.startsWith('local_') || !apiIds.has(p.id)),
        ...gulfProperties
      ];

      set({ properties: mergedProperties, loading: false });
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
      const backendProperty = toBackendProperty(property);
      const newProperty = await propertyApi.createProperty(backendProperty);
      const gulfProperty = toGulfProperty(newProperty);
      const updated = [...get().properties, gulfProperty];
      set({ properties: updated, loading: false });
      setStorageItem('gulf_properties', JSON.stringify(updated));
    } catch (error: any) {
      console.error('Failed to add property via API:', error);
      const localProperty: GulfProperty = {
        ...property,
        id: property.id || generateId(),
        complianceStatus: 'draft' as const,
        isPublished: false
      };
      const updated = [...get().properties, localProperty];
      setStorageItem('gulf_properties', JSON.stringify(updated));
      set({
        properties: updated,
        loading: false,
        error: error.message || 'Property saved locally as draft'
      });
    }
  },

  deleteProperty: async (id) => {
    set({ loading: true, error: null });
    const isLocalDraft = id?.startsWith('local_');
    try {
      if (!isLocalDraft) {
        await propertyApi.deleteProperty(id!);
      }
      const updated = get().properties.filter((p: GulfProperty) => p.id !== id);
      set({ properties: updated, loading: false });
      setStorageItem('gulf_properties', JSON.stringify(updated));
    } catch (error: any) {
      console.error('Failed to delete property:', error);
      const updated = get().properties.filter((p: GulfProperty) => p.id !== id);
      setStorageItem('gulf_properties', JSON.stringify(updated));
      set({
        properties: updated,
        loading: false,
        error: isLocalDraft ? null : error.message || 'Deleted locally'
      });
    }
  },

  clearError: () => set({ error: null }),
}));
