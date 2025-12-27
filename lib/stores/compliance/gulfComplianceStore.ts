import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import validateGulfReraNumber, { ReraValidationResult } from '@/lib/validators/rera-validator';
import { calculateGulfCommission, CommissionResult as CommissionCalculation } from '@/lib/calculators/gulf-commission';

export type JurisdictionCode =
  | 'AE-DU' | 'AE-AZ' | 'AE-SH' | 'AE-AJ' | 'AE-RAK' | 'AE-FU' | 'AE-UQ'
  | 'SA-RY' | 'SA-JZ' | 'SA-DM' | 'SA-MK' | 'SA-MD'
  | 'QA-DA' | 'BH-MA' | 'KW-KU' | 'OM-MU';

export interface ComplianceRecord {
  id: string;
  propertyId: string;
  jurisdiction: JurisdictionCode;
  reraNumber: string;
  reraStatus: ReraValidationResult;
  commission: CommissionCalculation;
  status: 'pending' | 'verified' | 'rejected' | 'flagged';
  lastChecked: string;
  notes?: string;
}

interface GulfComplianceStore {
  records: ComplianceRecord[];
  addRecord: (record: Omit<ComplianceRecord, 'id' | 'lastChecked'>) => void;
  updateRecord: (id: string, updates: Partial<ComplianceRecord>) => void;
  getRecordByProperty: (propertyId: string) => ComplianceRecord | undefined;
}

export const useGulfComplianceStore = create<GulfComplianceStore>()(
  persist(
    (set, get) => ({
      records: [],
      addRecord: (recordData) => set((state) => ({
        records: [
          ...state.records,
          {
            ...recordData,
            id: Math.random().toString(36).substr(2, 9),
            lastChecked: new Date().toISOString()
          }
        ]
      })),
      updateRecord: (id, updates) => set((state) => ({
        records: state.records.map(r => r.id === id ? { ...r, ...updates, lastChecked: new Date().toISOString() } : r)
      })),
      getRecordByProperty: (propertyId) => get().records.find(r => r.propertyId === propertyId),
    }),
    { name: 'gulf-compliance-storage' }
  )
);
