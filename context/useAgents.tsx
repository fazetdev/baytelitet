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
  addAgent: (agent: Agent) => void;
  deleteAgent: (id: number) => void;
  getAgentById: (id: number) => Agent | undefined;
  loadAgents: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);

  const loadAgents = useCallback(() => {
    const saved = localStorage.getItem('bayt_agents');
    if (saved) {
      setAgents(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  useEffect(() => {
    localStorage.setItem('bayt_agents', JSON.stringify(agents));
  }, [agents]);

  const addAgent = (agent: Agent) => setAgents(prev => [agent, ...prev]);
  const deleteAgent = (id: number) => setAgents(prev => prev.filter(a => a.id !== id));
  
  const getAgentById = (id: number) => {
    return agents.find(agent => agent.id === id);
  };

  return (
    <AgentContext.Provider value={{ agents, addAgent, deleteAgent, getAgentById, loadAgents }}>
      {children}
    </AgentContext.Provider>
  );
}

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) throw new Error('useAgents must be used within AgentProvider');
  return context;
};
