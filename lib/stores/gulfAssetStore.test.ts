import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGulfAssetStore } from './gulfAssetStore';

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

describe('GulfAssetStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useGulfAssetStore.setState({ properties: [] });
  });

  it('should add a property successfully', () => {
    const newProperty = { title: 'Test Villa', price: 500000 };
    useGulfAssetStore.getState().addProperty(newProperty as any);
    expect(useGulfAssetStore.getState().properties.length).toBe(1);
  });

  it('should delete a property successfully', () => {
    const store = useGulfAssetStore.getState();
    store.addProperty({ title: 'Delete Me', price: 100 } as any);
    const propertyId = useGulfAssetStore.getState().properties[0].id;
    useGulfAssetStore.getState().deleteProperty(propertyId!);
    expect(useGulfAssetStore.getState().properties.length).toBe(0);
  });

  it('should load existing properties from localStorage', () => {
    // 1. Pre-fill localStorage with "existing" data
    const existingData = [{ id: '123', title: 'Old Property', price: 1000 }];
    localStorage.setItem('gulf_properties', JSON.stringify(existingData));

    // 2. Tell the store to load
    useGulfAssetStore.getState().loadProperties();

    // 3. Check if the store now has that data
    const properties = useGulfAssetStore.getState().properties;
    expect(properties.length).toBe(1);
    expect(properties[0].title).toBe('Old Property');
  });
});
