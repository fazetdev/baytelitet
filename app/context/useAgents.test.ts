import { describe, it, expect, beforeEach } from 'vitest';
import { useAgents } from './useAgents';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; }
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });
Object.defineProperty(global, 'window', { value: { localStorage: localStorageMock } });

describe('useAgents Store', () => {
  beforeEach(() => {
    localStorage.clear();
    useAgents.setState({ agents: [] });
  });

  it('should add an agent with pending status by default', () => {
    const newAgent = { 
      id: 'agent-1', 
      fullName: 'Test Agent', 
      status: 'pending' as const,
      reraNumber: '123',
      phone: '000',
      email: 'test@test.com'
    };
    useAgents.getState().addAgent(newAgent);
    
    const agent = useAgents.getState().agents[0];
    expect(agent.status).toBe('pending');
    expect(useAgents.getState().getVerifiedAgents().length).toBe(0);
  });

  it('should promote an agent to verified status', () => {
    const newAgent = { 
      id: 'agent-1', 
      fullName: 'Test Agent', 
      status: 'pending' as const,
      reraNumber: '123',
      phone: '000',
      email: 'test@test.com'
    };
    useAgents.getState().addAgent(newAgent);
    
    // Perform Verification
    useAgents.getState().verifyAgent('agent-1');
    
    const agent = useAgents.getState().agents[0];
    expect(agent.status).toBe('verified');
    expect(useAgents.getState().getVerifiedAgents().length).toBe(1);
  });
});
