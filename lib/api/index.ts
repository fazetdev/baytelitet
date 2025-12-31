import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Property, PropertyFilters } from '@/app/types/property';
import { 
  GulfRequestConfig, 
  GulfErrorResponse, 
  GulfApiOptions 
} from './types';
import { authInterceptor } from './interceptors/auth';
import { gulfHeadersInterceptor } from './interceptors/gulfHeaders';
import { retryInterceptor } from './interceptors/retry';
import { refreshTokenInterceptor } from './interceptors/refreshToken';
import { normalizeGulfError } from './interceptors/error';

// Ensure we're in browser environment before setting up interceptors
const isBrowser = typeof window !== 'undefined';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || (isBrowser ? '/api' : 'http://localhost:5000/api'),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Only setup interceptors that access storage in browser environment
if (isBrowser) {
  api.interceptors.request.use(authInterceptor);
  api.interceptors.request.use(gulfHeadersInterceptor);
}

// Response interceptor works in both environments
api.interceptors.response.use(
  (response) => {
    // Transform response to ensure consistent structure
    if (response.data && typeof response.data === 'object') {
      return {
        ...response,
        data: response.data.data || response.data,
      };
    }
    return response;
  },
  async (error: AxiosError<GulfErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & GulfRequestConfig;
    
    if (!originalRequest) {
      return Promise.reject(error);
    }
    
    // Only attempt token refresh in browser environment
    if (isBrowser) {
      const shouldRefresh = await refreshTokenInterceptor(error, originalRequest);
      if (shouldRefresh) {
        return api(originalRequest);
      }
    }
    
    // Try retry logic (works in both environments)
    const shouldRetryRequest = await retryInterceptor(error, originalRequest);
    if (shouldRetryRequest) {
      return api(originalRequest);
    }
    
    // Normalize error
    const normalizedError = normalizeGulfError(error, originalRequest);
    return Promise.reject(normalizedError);
  }
);

// Property API service with SSR awareness
export const propertyApi = {
  fetchProperties: async (filters?: PropertyFilters): Promise<Property[]> => {
    const { data } = await api.get<Property[]>('/properties', { 
      params: {
        ...filters,
        includeReraVerified: true,
        includeCompliance: true,
      }
    });
    return data;
  },
  
  fetchProperty: async (id: string): Promise<Property> => {
    const { data } = await api.get<Property>(`/properties/${id}`, {
      params: {
        includeAgent: true,
        includeCompliance: true,
        includeGallery: true,
      }
    });
    return data;
  },
  
  createProperty: async (
    property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>, 
    options?: GulfApiOptions
  ): Promise<Property> => {
    // Validate required Gulf fields if requested
    if (options?.requireRERA !== false) {
      const gulfRequiredFields = ['reraNumber', 'jurisdiction', 'country', 'currency'];
      const missingFields = gulfRequiredFields.filter(field => !property[field as keyof typeof property]);
      
      if (missingFields.length > 0) {
        throw {
          status: 400,
          message: `Missing required Gulf fields: ${missingFields.join(', ')}`,
          code: 'GULF_FIELDS_REQUIRED',
        };
      }
    }
    
    const { data } = await api.post<Property>('/properties', property);
    return data;
  },
  
  updateProperty: async (id: string, property: Partial<Property>): Promise<Property> => {
    const { data } = await api.put<Property>(`/properties/${id}`, property);
    return data;
  },
  
  deleteProperty: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },
};

// Export with SSR awareness
export const getApi = () => api;
export { api };

// For backward compatibility
export default api;
