import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  agency: string;
  licenseNumber: string;
  specialization: string;
  city: string;
  bio: string;
  experience: string;
  status: 'active' | 'pending' | 'suspended';
  listingsCount: number;
}

interface AgentStore {
  agents: Agent[];
  addAgent: (agentData: Omit<Agent, 'id' | 'listingsCount' | 'status'> & { status?: Agent['status'] }) => void;
  deleteAgent: (id: string) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      agents: [],
      addAgent: (agentData) => set((state) => ({
        agents: [
          ...state.agents,
          {
            ...agentData,
            id: Math.random().toString(36).substr(2, 9),
            listingsCount: 0,
            status: agentData.status || 'active'
          }
        ]
      })),
      deleteAgent: (id) => set((state) => ({
        agents: state.agents.filter(a => a.id !== id)
      })),
      updateAgent: (id, updates) => set((state) => ({
        agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
      })),
    }),
    { name: 'gulf-agent-storage' }
  )
);
