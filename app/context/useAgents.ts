'use client';

import { create } from 'zustand';

export type AgentStatus = 'pending' | 'verified' | 'rejected';

export interface Agent {
  id: string;
  fullName: string;
  reraNumber: string;
  phone: string;
  email: string;
  brokerageName?: string;
  photo?: string;
  status: AgentStatus;
}

interface AgentStore {
  agents: Agent[];
  loadAgents: () => void;
  addAgent: (agent: Agent) => void;
  verifyAgent: (id: string) => void;
  getVerifiedAgents: () => Agent[];
  getAgentById: (id: string) => Agent | undefined;
}

export const useAgents = create<AgentStore>((set, get) => ({
  agents: [],

  loadAgents: () => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('agents');
      const saved: Agent[] = savedData ? JSON.parse(savedData) : [];
      set({ agents: saved });
    }
  },

  addAgent: (agent: Agent) => {
    const updated: Agent[] = [...get().agents, agent];
    localStorage.setItem('agents', JSON.stringify(updated));
    set({ agents: updated });
  },

  verifyAgent: (id: string) => {
    const updated: Agent[] = get().agents.map(a =>
      a.id === id ? { ...a, status: 'verified' as AgentStatus } : a
    );
    localStorage.setItem('agents', JSON.stringify(updated));
    set({ agents: updated });
  },

  getVerifiedAgents: () =>
    get().agents.filter(a => a.status === 'verified'),

  getAgentById: (id: string) =>
    get().agents.find(a => a.id === id),
}));
