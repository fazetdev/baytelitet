'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EscrowAccount {
  id: string;
  projectName: string;
  developer: string;
  jurisdiction: string;
  totalAmount: number;
  currentBalance: number;
  requiredBalance: number;
  status: 'healthy' | 'deficient' | 'critical' | 'frozen';
  lastDeposit: string;
  nextAudit: string;
  propertiesCount: number;
  buyersCount: number;
  complianceScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface EscrowTransaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'fee';
  amount: number;
  description: string;
  projectId: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed' | 'reversed';
}

interface EscrowStore {
  accounts: EscrowAccount[];
  transactions: EscrowTransaction[];
  selectedAccount: EscrowAccount | null;
  
  // Actions
  addAccount: (accountData: Omit<EscrowAccount, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAccount: (id: string, updates: Partial<EscrowAccount>) => void;
  deleteAccount: (id: string) => void;
  addTransaction: (transaction: Omit<EscrowTransaction, 'id'>) => void;
  setSelectedAccount: (account: EscrowAccount | null) => void;
  
  // Calculations
  calculateStats: () => {
    totalAccounts: number;
    totalAmount: number;
    totalBalance: number;
    deficientAccounts: number;
    healthyAccounts: number;
    avgCompliance: number;
  };
  
  // Generate from properties (helper function)
  generateFromProperties: (properties: Array<{id: string, title: string, price: string, city: string, escrowRequired?: boolean}>) => void;
}

export const useEscrowStore = create<EscrowStore>()(
  persist(
    (set, get) => ({
      accounts: [],
      transactions: [],
      selectedAccount: null,

      addAccount: (accountData) => {
        const newAccount: EscrowAccount = {
          ...accountData,
          id: `escrow_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          accounts: [...state.accounts, newAccount],
        }));
      },

      updateAccount: (id, updates) => {
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === id
              ? { ...account, ...updates, updatedAt: new Date().toISOString() }
              : account
          ),
        }));
      },

      deleteAccount: (id) => {
        set((state) => ({
          accounts: state.accounts.filter((account) => account.id !== id),
          selectedAccount: state.selectedAccount?.id === id ? null : state.selectedAccount,
        }));
      },

      addTransaction: (transactionData) => {
        const newTransaction: EscrowTransaction = {
          ...transactionData,
          id: `txn_${Date.now()}`,
        };
        
        set((state) => ({
          transactions: [newTransaction, ...state.transactions].slice(0, 50), // Keep last 50
        }));
      },

      setSelectedAccount: (account) => {
        set({ selectedAccount: account });
      },

      calculateStats: () => {
        const { accounts } = get();
        const totalAccounts = accounts.length;
        const totalAmount = accounts.reduce((sum, a) => sum + a.totalAmount, 0);
        const totalBalance = accounts.reduce((sum, a) => sum + a.currentBalance, 0);
        const deficientAccounts = accounts.filter(a => a.status === 'deficient' || a.status === 'critical').length;
        const healthyAccounts = accounts.filter(a => a.status === 'healthy').length;
        const avgCompliance = accounts.length > 0 
          ? accounts.reduce((sum, a) => sum + a.complianceScore, 0) / accounts.length
          : 0;

        return {
          totalAccounts,
          totalAmount,
          totalBalance,
          deficientAccounts,
          healthyAccounts,
          avgCompliance: Math.round(avgCompliance * 10) / 10,
        };
      },

      generateFromProperties: (properties) => {
        const escrowProperties = properties.filter(p => p.escrowRequired);
        
        if (escrowProperties.length === 0) return;

        const newAccounts: EscrowAccount[] = escrowProperties.map((prop, index) => {
          const price = parseFloat(prop.price) || 1000000;
          const totalAmount = price * 10; // Assume project has 10 units
          const currentBalance = totalAmount * (0.7 + Math.random() * 0.3); // 70-100% funded
          const requiredBalance = totalAmount * 0.8; // 80% required
          
          const status: 'healthy' | 'deficient' | 'critical' | 'frozen' = 
            currentBalance >= requiredBalance ? 'healthy' :
            currentBalance >= requiredBalance * 0.7 ? 'deficient' : 'critical';
          
          const jurisdiction = prop.city === 'Dubai' ? 'AE-DU' :
                              prop.city === 'Abu Dhabi' ? 'AE-AZ' :
                              prop.city === 'Riyadh' ? 'SA-RY' :
                              prop.city === 'Doha' ? 'QA-DA' : 'AE-DU';
          
          return {
            id: `escrow_auto_${Date.now()}_${index}`,
            projectName: prop.title || `Project ${index + 1}`,
            developer: 'Developer',
            jurisdiction: `${jurisdiction} (${prop.city})`,
            totalAmount,
            currentBalance,
            requiredBalance,
            status,
            lastDeposit: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            nextAudit: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            propertiesCount: Math.floor(Math.random() * 50) + 10,
            buyersCount: Math.floor(Math.random() * 40) + 5,
            complianceScore: 80 + Math.floor(Math.random() * 20),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        });

        set((state) => ({
          accounts: [...state.accounts, ...newAccounts.slice(0, 2)], // Max 2 as requested
        }));
      },
    }),
    {
      name: 'escrow-store',
    }
  )
);
