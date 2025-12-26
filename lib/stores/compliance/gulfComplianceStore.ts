'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import validateGulfReraNumber, { ReraValidationResult } from '@/lib/validators/rera-validator';
import calculateGulfCommission, { CommissionCalculation, GULF_COMMISSION_RULES } from '@/lib/calculators/gulf-commission';

export type JurisdictionCode = 
  | 'AE-DU' | 'AE-AZ' | 'AE-SH' | 'AE-AJ' | 'AE-RAK' | 'AE-FU' | 'AE-UQ'
  | 'SA-RY' | 'SA-JZ' | 'SA-DM' | 'SA-MB'
  | 'QA-DA'
  | 'BH-MA'
  | 'OM-MU' | 'OM-SH'
  | 'KW-KU';

export interface ComplianceRecord {
  id: string;
  timestamp: string;
  action: 'RERA_VALIDATION' | 'COMMISSION_CALCULATION' | 'DLD_API_CALL' | 'COMPLIANCE_CHECK';
  jurisdictionCode: JurisdictionCode;
  entityId?: string; // Property ID, Agent ID, etc.
  entityType?: 'PROPERTY' | 'AGENT' | 'AGENCY' | 'TRANSACTION';
  inputData: Record<string, any>;
  outputData: Record<string, any>;
  success: boolean;
  error?: string;
  performedBy: string; // User ID or system
}

export interface GulfComplianceData {
  jurisdictionCode: JurisdictionCode;
  jurisdictionName: string;
  pendingReraApprovals: number;
  expiredLicenses: Array<{ agentId: string; daysUntilExpiry: number }>;
  escrowDeficits: Array<{ projectId: string; amountShort: number }>;
  violations: Array<{ type: 'commission_cap' | 'disclosure_missing' | 'rera_invalid' | 'license_expired'; count: number }>;
  lastSync: string | null;
}

interface GulfComplianceState {
  // Core state
  complianceData: GulfComplianceData[];
  auditLog: ComplianceRecord[];
  lastUpdated: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Validator integrations
  validateRera: (reraNumber: string, jurisdictionCode: JurisdictionCode, entityId?: string) => ReraValidationResult;
  
  // Calculator integrations
  calculateCommission: (propertyValue: number, jurisdictionCode: JurisdictionCode, requestedRate?: number) => CommissionCalculation;
  
  // API actions
  fetchDLDData: (jurisdiction: JurisdictionCode) => Promise<void>;
  syncComplianceData: () => Promise<void>;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  addAuditRecord: (record: Omit<ComplianceRecord, 'id' | 'timestamp'>) => void;
  getComplianceSummary: () => {
    totalViolations: number;
    pendingApprovals: number;
    expiringLicenses: number;
    jurisdictions: string[];
  };
}

export const useGulfComplianceStore = create<GulfComplianceState>()(
  persist(
    (set, get) => ({
      // Initial state
      complianceData: [],
      auditLog: [],
      lastUpdated: null,
      isLoading: false,
      error: null,

      // RERA Validation with audit logging
      validateRera: (reraNumber, jurisdictionCode, entityId) => {
        const validationResult = validateGulfReraNumber(reraNumber, jurisdictionCode);
        
        // Log the validation attempt
        get().addAuditRecord({
          action: 'RERA_VALIDATION',
          jurisdictionCode,
          entityId,
          entityType: entityId ? 'PROPERTY' : undefined,
          inputData: { reraNumber, jurisdictionCode },
          outputData: validationResult,
          success: validationResult.valid,
          error: validationResult.error,
          performedBy: 'system'
        });

        return validationResult;
      },

      // Commission Calculation with audit logging
      calculateCommission: (propertyValue, jurisdictionCode, requestedRate) => {
        const calculation = calculateGulfCommission(propertyValue, jurisdictionCode, requestedRate);
        
        // Log the calculation
        get().addAuditRecord({
          action: 'COMMISSION_CALCULATION',
          jurisdictionCode,
          inputData: { propertyValue, jurisdictionCode, requestedRate },
          outputData: calculation,
          success: calculation.isCompliant,
          error: calculation.warnings.length > 0 ? calculation.warnings.join(', ') : undefined,
          performedBy: 'system'
        });

        return calculation;
      },

      // DLD API Integration (placeholder for actual implementation)
      fetchDLDData: async (jurisdiction) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement actual DLD API integration
          // This is a placeholder - replace with actual API call
          console.log(`Fetching DLD data for ${jurisdiction}`);
          
          // Mock successful API call
          setTimeout(() => {
            get().addAuditRecord({
              action: 'DLD_API_CALL',
              jurisdictionCode: jurisdiction,
              inputData: { jurisdiction },
              outputData: { status: 'success', data: 'mock' },
              success: true,
              performedBy: 'system'
            });
            
            set({ 
              lastUpdated: new Date().toISOString(),
              isLoading: false 
            });
          }, 500);
          
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Unknown DLD API error';
          
          get().addAuditRecord({
            action: 'DLD_API_CALL',
            jurisdictionCode: jurisdiction,
            inputData: { jurisdiction },
            outputData: { status: 'error' },
            success: false,
            error: errorMsg,
            performedBy: 'system'
          });
          
          set({ 
            error: `DLD API Error for ${jurisdiction}: ${errorMsg}`,
            isLoading: false 
          });
        }
      },

      // Sync all compliance data
      syncComplianceData: async () => {
        set({ isLoading: true });
        
        try {
          // TODO: Implement comprehensive sync with all Gulf authorities
          const jurisdictions: JurisdictionCode[] = ['AE-DU', 'AE-AZ', 'SA-RY', 'QA-DA', 'BH-MA', 'KW-KU', 'OM-MU'];
          
          const promises = jurisdictions.map(jurisdiction => get().fetchDLDData(jurisdiction));
          await Promise.all(promises);
          
          set({ 
            lastUpdated: new Date().toISOString(),
            isLoading: false 
          });
          
        } catch (err) {
          set({ 
            error: 'Failed to sync compliance data',
            isLoading: false 
          });
        }
      },

      // Utility methods
      setLoading: (loading) => set({ isLoading: loading }),
      
      clearError: () => set({ error: null }),
      
      addAuditRecord: (record) => {
        const newRecord: ComplianceRecord = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          ...record
        };
        
        set((state) => ({
          auditLog: [newRecord, ...state.auditLog].slice(0, 1000) // Keep last 1000 records
        }));
      },

      getComplianceSummary: () => {
        const state = get();
        let totalViolations = 0;
        let pendingApprovals = 0;
        let expiringLicenses = 0;
        const jurisdictions: string[] = [];

        state.complianceData.forEach(data => {
          totalViolations += data.violations.reduce((sum, v) => sum + v.count, 0);
          pendingApprovals += data.pendingReraApprovals;
          expiringLicenses += data.expiredLicenses.length;
          jurisdictions.push(data.jurisdictionName);
        });

        return {
          totalViolations,
          pendingApprovals,
          expiringLicenses,
          jurisdictions: [...new Set(jurisdictions)] // Remove duplicates
        };
      }
    }),
    {
      name: 'gulf-compliance-store',
      partialize: (state) => ({
        complianceData: state.complianceData,
        auditLog: state.auditLog,
        lastUpdated: state.lastUpdated
      })
    }
  )
);

// Helper function to get commission rules for a jurisdiction
export const getCommissionRules = (jurisdictionCode: JurisdictionCode) => {
  return GULF_COMMISSION_RULES[jurisdictionCode] || null;
};

// Helper function to validate if commission rate is compliant
export const isCommissionRateCompliant = (
  rate: number, 
  jurisdictionCode: JurisdictionCode
): { compliant: boolean; minRate: number; maxRate: number; reason?: string } => {
  const rules = GULF_COMMISSION_RULES[jurisdictionCode];
  
  if (!rules) {
    return {
      compliant: false,
      minRate: 0,
      maxRate: 0,
      reason: `No rules found for jurisdiction: ${jurisdictionCode}`
    };
  }

  if (rate < rules.minRate) {
    return {
      compliant: false,
      minRate: rules.minRate,
      maxRate: rules.maxRate,
      reason: `Rate ${rate}% is below minimum ${rules.minRate}% for ${rules.jurisdictionName}`
    };
  }

  if (rate > rules.maxRate) {
    return {
      compliant: false,
      minRate: rules.minRate,
      maxRate: rules.maxRate,
      reason: `Rate ${rate}% exceeds maximum ${rules.maxRate}% for ${rules.jurisdictionName}`
    };
  }

  return {
    compliant: true,
    minRate: rules.minRate,
    maxRate: rules.maxRate
  };
};

export default useGulfComplianceStore;
