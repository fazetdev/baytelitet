'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Agent {
  id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  certified?: boolean;
}

interface AgentContextType {
  agents: Agent[];
  addAgent: (agent: Agent) => Promise<void>;
  deleteAgent: (id: number) => Promise<void>;
  getAgentById: (id: number) => Agent | undefined;
  loading: boolean;
  error: string | null;
  loadAgents: () => Promise<void>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load agents from API
  const loadAgents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/agents');
      if (!response.ok) {
        throw new Error(`Failed to fetch agents: ${response.status}`);
      }
      const data = await response.json();
      setAgents(data);
    } catch (err) {
      console.error('Failed to load agents:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  // Add agent via API
  const addAgent = async (agent: Agent) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agent),
      });

      if (!response.ok) {
        throw new Error(`Failed to add agent: ${response.status}`);
      }

      const newAgent = await response.json();
      setAgents(prev => [newAgent, ...prev]);
    } catch (err) {
      console.error('Failed to add agent:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete agent via API
  const deleteAgent = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/agents/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete agent: ${response.status}`);
      }

      setAgents(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Failed to delete agent:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAgentById = (id: number) => {
    return agents.find(agent => agent.id === id);
  };

  return (
    <AgentContext.Provider value={{ 
      agents, 
      addAgent, 
      deleteAgent, 
      getAgentById,
      loading,
      error,
      loadAgents 
    }}>
      {children}
    </AgentContext.Provider>
  );
}

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) throw new Error('useAgents must be used within AgentProvider');
  return context;
};
