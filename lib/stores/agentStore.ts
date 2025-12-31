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
  picture?: string; // Added to match backend model
}

interface AgentStore {
  agents: Agent[];
  isLoading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  addAgent: (agentData: Omit<Agent, 'id' | 'listingsCount' | 'status'> & { status?: Agent['status'] }) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  updateAgent: (id: string, updates: Partial<Agent>) => Promise<void>;
  clearError: () => void;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set, get) => ({
      agents: [],
      isLoading: false,
      error: null,

      fetchAgents: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/v1/agents');
          const data = await response.json();

          if (response.ok) {
            // Map backend data to frontend format
            const mappedAgents = data.data.map((agent: any) => ({
              id: agent._id || agent.id,
              name: agent.name,
              email: agent.email,
              phone: agent.phone,
              photo: agent.picture || '',
              agency: agent.agencyId || 'Independent',
              licenseNumber: agent.reraLicense,
              specialization: agent.specialization?.[0] || 'General',
              city: agent.city || 'Dubai',
              bio: agent.bio || '',
              experience: agent.experience || '',
              status: agent.status || 'active',
              listingsCount: 0, // TODO: Get from property count
              picture: agent.picture
            }));
            
            set({ agents: mappedAgents, isLoading: false });
          } else {
            set({ error: data.error || 'Failed to fetch agents', isLoading: false });
          }
        } catch (error) {
          console.error('Error fetching agents:', error);
          set({ error: 'Network error. Please try again.', isLoading: false });
        }
      },

      addAgent: async (agentData) => {
        set({ isLoading: true, error: null });
        try {
          // Send to backend API
          const response = await fetch('/api/v1/agents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: agentData.name,
              email: agentData.email,
              phone: agentData.phone,
              password: 'default123', // Default password, should be set by admin
              reraLicense: agentData.licenseNumber,
              specialization: [agentData.specialization],
              picture: agentData.photo,
              status: agentData.status || 'active'
            })
          });

          const data = await response.json();

          if (response.ok) {
            // Also add to local state for immediate UI update
            set((state) => ({
              agents: [
                ...state.agents,
                {
                  ...agentData,
                  id: data.data._id || Math.random().toString(36).substr(2, 9),
                  listingsCount: 0,
                  status: agentData.status || 'active'
                }
              ],
              isLoading: false
            }));
          } else {
            set({ error: data.error || 'Failed to add agent', isLoading: false });
          }
        } catch (error) {
          console.error('Error adding agent:', error);
          set({ error: 'Network error. Please try again.', isLoading: false });
        }
      },

      deleteAgent: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement delete API endpoint
          // For now, just update local state
          set((state) => ({
            agents: state.agents.filter(a => a.id !== id),
            isLoading: false
          }));
        } catch (error) {
          console.error('Error deleting agent:', error);
          set({ error: 'Failed to delete agent', isLoading: false });
        }
      },

      updateAgent: async (id: string, updates: Partial<Agent>) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement update API endpoint
          // For now, just update local state
          set((state) => ({
            agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a),
            isLoading: false
          }));
        } catch (error) {
          console.error('Error updating agent:', error);
          set({ error: 'Failed to update agent', isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    { 
      name: 'gulf-agent-storage',
      partialize: (state) => ({ agents: state.agents }) // Only persist agents
    }
  )
);
