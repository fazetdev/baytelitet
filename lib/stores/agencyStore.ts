import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agency {
  id: string;
  name: string;
  licenseNumber: string;
  jurisdiction: string;
  licenseExpiry: string;
  status: 'active' | 'expiring' | 'expired' | 'suspended';
  totalAgents: number;
  activeProperties: number;
  complianceScore: number;
  lastAudit: string;
  revenue: string;
}

interface AgencyStore {
  agencies: Agency[];
  addAgency: (agency: Omit<Agency, 'id'>) => void;
  deleteAgency: (id: string) => void;
  updateAgency: (id: string, updates: Partial<Agency>) => void;
}

export const useAgencyStore = create<AgencyStore>()(
  persist(
    (set) => ({
      agencies: [
        {
          id: '1',
          name: 'Bayt Real Estate',
          licenseNumber: 'BRE-2023-001',
          jurisdiction: 'AE-DU (Dubai)',
          licenseExpiry: '2024-12-31',
          status: 'active',
          totalAgents: 24,
          activeProperties: 156,
          complianceScore: 98,
          lastAudit: '2024-11-15',
          revenue: 'AED 42.5M'
        },
        {
          id: '2',
          name: 'Gulf Properties LLC',
          licenseNumber: 'GPL-2023-002',
          jurisdiction: 'AE-AZ (Abu Dhabi)',
          licenseExpiry: '2024-06-30',
          status: 'expiring',
          totalAgents: 18,
          activeProperties: 89,
          complianceScore: 92,
          lastAudit: '2024-10-22',
          revenue: 'AED 28.3M'
        }
      ],
      addAgency: (data) => set((state) => ({
        agencies: [...state.agencies, { ...data, id: Math.random().toString(36).substr(2, 9) }]
      })),
      deleteAgency: (id) => set((state) => ({
        agencies: state.agencies.filter(a => a.id !== id)
      })),
      updateAgency: (id, updates) => set((state) => ({
        agencies: state.agencies.map(a => a.id === id ? { ...a, ...updates } : a)
      })),
    }),
    { name: 'gulf-agency-storage' }
  )
);
