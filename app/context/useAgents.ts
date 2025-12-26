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
  photo?: string; // base64 or object URL
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
    const saved = JSON.parse(localStorage.getItem('agents') || '[]');
    set({ agents: saved });
  },

  addAgent: (agent) => {
    const updated = [...get().agents, agent];
    localStorage.setItem('agents', JSON.stringify(updated));
    set({ agents: updated });
  },

  verifyAgent: (id) => {
    const updated = get().agents.map(a =>
      a.id === id ? { ...a, status: 'verified' } : a
    );
    localStorage.setItem('agents', JSON.stringify(updated));
    set({ agents: updated });
  },

  getVerifiedAgents: () =>
    get().agents.filter(a => a.status === 'verified'),

  getAgentById: (id) =>
    get().agents.find(a => a.id === id),
}));
