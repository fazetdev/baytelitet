'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Agent {
  id: number;
  name: string;
  role: string;
  image: string;
  phone: string;
  propertiesCount: number;
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

  const addAgent = (agent: Agent) => setAgents([...agents, agent]);
  const deleteAgent = (id: number) => setAgents(agents.filter(a => a.id !== id));

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
