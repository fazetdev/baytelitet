import { useState, useEffect, useCallback } from 'react';
import { Lead } from '@/lib/types/agent';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Phase 2 Logic: Environment-Aware Data Fetching
      if (process.env.NODE_ENV === 'development') {
        const mockData: Lead[] = [
          {
            id: 'L-7782',
            name: 'Omar Al-Hashimi',
            email: 'omar.h@dubaimail.ae',
            phone: '+971505551234',
            whatsappEnabled: true,
            budget: 3200000,
            currency: 'AED',
            nationality: 'Emirati',
            interestType: 'Investment',
            visaCandidate: true,
            source: 'GoldenVisaChecker',
            status: 'New',
            createdAt: new Date().toISOString(),
            lastInteraction: 'Now'
          },
          {
            id: 'L-9901',
            name: 'Elena Volkov',
            email: 'e.volkov@invest.com',
            phone: '+971581234567',
            whatsappEnabled: true,
            budget: 5500000,
            currency: 'AED',
            nationality: 'Russian',
            interestType: 'Investment',
            visaCandidate: true,
            source: 'RentalCalculator',
            status: 'New',
            createdAt: new Date().toISOString(),
            lastInteraction: '5m ago'
          }
        ];
        setLeads(mockData);
        setLoading(false);
        return;
      }

      // PRODUCTION PATH (API Bridge)
      const res = await fetch('/api/agent/leads');
      if (!res.ok) throw new Error('Failed to synchronize lead vault');
      const data = await res.json();
      setLeads(data);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown connection error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLeadStatus = async (id: string, newStatus: Lead['status']) => {
    // Optimistic Update: Reflect change immediately in UI
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    
    if (process.env.NODE_ENV === 'production') {
      await fetch(`/api/agent/leads/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
    }
  };

  return { leads, loading, error, updateLeadStatus, refetch: fetchLeads };
}
