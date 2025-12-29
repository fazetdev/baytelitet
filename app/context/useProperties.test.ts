import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProperties } from './useProperties';

describe('useProperties store', () => {
  beforeEach(() => {
    useProperties.setState({
      properties: [],
      loading: false
    });

    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    });
  });

  it('starts with empty properties', () => {
    const state = useProperties.getState();
    expect(state.properties).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it('loads properties from localStorage', () => {
    const mockData = [
      {
        id: '1',
        title: 'Test Property',
        price: 100,
        location: 'Dubai',
        type: 'apartment',
        description: 'Nice',
        images: [],
        agentId: 'a1',
        status: 'available',
        features: []
      }
    ];

    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));

    useProperties.getState().loadProperties();

    const state = useProperties.getState();
    expect(state.properties.length).toBe(1);
    expect(state.properties[0].id).toBe('1');
  });

  it('getPropertyById returns correct property', () => {
    useProperties.setState({
      properties: [
        {
          id: 'x',
          title: 'Villa',
          price: 500,
          location: 'Abu Dhabi',
          type: 'villa',
          description: '',
          images: [],
          agentId: 'a2',
          status: 'available',
          features: []
        }
      ]
    });

    const result = useProperties.getState().getPropertyById('x');
    expect(result?.title).toBe('Villa');
  });

  it('getPropertyById returns undefined if not found', () => {
    const result = useProperties.getState().getPropertyById('missing');
    expect(result).toBeUndefined();
  });
});
