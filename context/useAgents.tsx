'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Agent {
  id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  certified: boolean; // Making this mandatory to match your form
}

interface AgentContextType {
  agents: Agent[];
  addAgent: (agent: Agent) => void;
  deleteAgent: (id: number) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bayt_agents');
    if (saved) setAgents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('bayt_agents', JSON.stringify(agents));
  }, [agents]);

  const addAgent = (agent: Agent) => setAgents(prev => [agent, ...prev]);
  const deleteAgent = (id: number) => setAgents(prev => prev.filter(a => a.id !== id));

  return (
    <AgentContext.Provider value={{ agents, addAgent, deleteAgent }}>
      {children}
    </AgentContext.Provider>
  );
}

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) throw new Error('useAgents must be used within AgentProvider');
  return context;
};
