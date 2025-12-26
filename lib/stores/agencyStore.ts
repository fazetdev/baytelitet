'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agency {
  id: string;
  name: string;
  licenseNumber: string;
  jurisdiction: string;
  licenseExpiry: string;
  status: 'active' | 'expiring' | 'expired' | 'suspended';
  contactEmail: string;
  contactPhone: string;
  website?: string;
  address: string;
  city: string;
  totalAgents: number;
  activeProperties: number;
  complianceScore: number;
  lastAudit: string;
  createdAt: string;
  updatedAt: string;
}

interface AgencyStore {
  agencies: Agency[];
  selectedAgency: Agency | null;
  isLoading: boolean;
  
  // Actions
  addAgency: (agency: Omit<Agency, 'id' | 'createdAt' | 'updatedAt' | 'complianceScore' | 'lastAudit' | 'activeProperties'>) => void;
  updateAgency: (id: string, updates: Partial<Agency>) => void;
  deleteAgency: (id: string) => void;
  setSelectedAgency: (agency: Agency | null) => void;
  calculateAgencyStats: () => {
    totalAgencies: number;
    activeAgencies: number;
    expiringLicenses: number;
    totalAgents: number;
    avgCompliance: number;
  };
}

export const useAgencyStore = create<AgencyStore>()(
  persist(
    (set, get) => ({
      agencies: [],
      selectedAgency: null,
      isLoading: false,

      addAgency: (agencyData) => {
        const newAgency: Agency = {
          ...agencyData,
          id: `agency_${Date.now()}`,
          complianceScore: 85 + Math.floor(Math.random() * 15), // Initial compliance score 85-99
          activeProperties: Math.floor(Math.random() * 50) + 10, // Mock for now
          lastAudit: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          agencies: [...state.agencies, newAgency],
        }));
      },

      updateAgency: (id, updates) => {
        set((state) => ({
          agencies: state.agencies.map((agency) =>
            agency.id === id
              ? { ...agency, ...updates, updatedAt: new Date().toISOString() }
              : agency
          ),
        }));
      },

      deleteAgency: (id) => {
        set((state) => ({
          agencies: state.agencies.filter((agency) => agency.id !== id),
          selectedAgency: state.selectedAgency?.id === id ? null : state.selectedAgency,
        }));
      },

      setSelectedAgency: (agency) => {
        set({ selectedAgency: agency });
      },

      calculateAgencyStats: () => {
        const { agencies } = get();
        const totalAgencies = agencies.length;
        const activeAgencies = agencies.filter(a => a.status === 'active').length;
        const expiringLicenses = agencies.filter(a => a.status === 'expiring').length;
        const totalAgents = agencies.reduce((sum, a) => sum + a.totalAgents, 0);
        const avgCompliance = agencies.length > 0 
          ? agencies.reduce((sum, a) => sum + a.complianceScore, 0) / agencies.length
          : 0;

        return {
          totalAgencies,
          activeAgencies,
          expiringLicenses,
          totalAgents,
          avgCompliance: Math.round(avgCompliance * 10) / 10,
        };
      },
    }),
    {
      name: 'agency-store',
    }
  )
);
