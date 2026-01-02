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
  loading: boolean;
  error: string | null;
  loadAgents: () => Promise<void>;
  addAgent: (agent: Agent) => Promise<void>;
  verifyAgent: (id: string) => Promise<void>;
  getVerifiedAgents: () => Agent[];
  getAgentById: (id: string) => Agent | undefined;
}

export const useAgents = create<AgentStore>((set, get) => ({
  agents: [],
  loading: false,
  error: null,

  loadAgents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/v1/agents');
      if (!response.ok) {
        throw new Error(`Failed to fetch agents: ${response.status}`);
      }
      const data = await response.json();
      set({ agents: data });
    } catch (error) {
      console.error('Failed to load agents from API:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      set({ loading: false });
    }
  },

  addAgent: async (agent: Agent) => {
    set({ loading: true, error: null });
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
      set((state) => ({
        agents: [...state.agents, newAgent],
      }));
    } catch (error) {
      console.error('Failed to add agent:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  verifyAgent: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // Assuming there's an API endpoint to verify agents
      const response = await fetch(`/api/v1/agents/${id}/verify`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Failed to verify agent: ${response.status}`);
      }

      const updated: Agent[] = get().agents.map(a =>
        a.id === id ? { ...a, status: 'verified' as AgentStatus } : a
      );
      set({ agents: updated });
    } catch (error) {
      console.error('Failed to verify agent:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getVerifiedAgents: () =>
    get().agents.filter(a => a.status === 'verified'),

  getAgentById: (id: string) =>
    get().agents.find(a => a.id === id),
}));
