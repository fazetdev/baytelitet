/**
 * SSR-safe storage abstraction
 * Prevents ReferenceError: localStorage is not defined during server-side rendering
 */

export const getStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Failed to get ${key} from localStorage:`, error);
    return null;
  }
};

export const setStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to set ${key} in localStorage:`, error);
  }
};

export const removeStorageItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove ${key} from localStorage:`, error);
  }
};

export const clearStorage = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.clear();
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
};

// Gulf-specific storage helpers
export const getGulfConfig = () => ({
  language: getStorageItem('language') || 'en',
  currency: getStorageItem('currency') || 'AED',
  jurisdiction: getStorageItem('jurisdiction') || 'AE-DU',
  reraId: getStorageItem('rera_id'),
  authToken: getStorageItem('auth_token'),
  refreshToken: getStorageItem('refresh_token'),
});
