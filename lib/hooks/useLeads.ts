import { useState, useEffect, useCallback } from 'react';
import { Lead } from '@/lib/types/agent';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      // In Dev, provide real-structured data for Phase 2 testing
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
        }
      ];
      setLeads(mockData);
    } catch (err) {
      setError('Connection Error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return { leads, loading, error, refetch: fetchLeads };
}
