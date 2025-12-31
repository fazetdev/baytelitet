import axios, { AxiosError, AxiosInstance } from 'axios';
import { Property, PropertyFilters } from '@/app/types/property';

// Transform backend response to match Property interface
const transformBackendProperty = (backendProp: any): Property => {
  // Parse location string (format: "City, State, Country" or just "City")
  const locationParts = backendProp.location?.split(', ') || ['Dubai', '', 'UAE'];
  
  return {
    id: backendProp.id?.toString(),
    title: backendProp.title,
    price: backendProp.price,
    currency: 'AED', // Default for Gulf
    type: backendProp.type,
    country: locationParts[2] || 'UAE',
    state: locationParts[1] || 'dubai',
    city: locationParts[0] || 'Dubai',
    address: backendProp.address || `${backendProp.title}, ${backendProp.location}`,
    bedrooms: backendProp.bedrooms || 0,
    bathrooms: backendProp.bathrooms || 0,
    area: backendProp.area || 0,
    areaUnit: 'sqft',
    propertyType: backendProp.type as any,
    agentName: backendProp.agentName || 'BaytElite Agent',
    agentLicense: backendProp.agentLicense || 'RERA-00000',
    description: backendProp.description || `Beautiful ${backendProp.type} in ${backendProp.location}`,
    reraNumber: backendProp.reraNumber || `RERA-${backendProp.id || '00000'}`,
    jurisdiction: 'AE-DU',
    commissionRate: 2.0,
    heroImage: backendProp.heroImage || `https://images.unsplash.com/photo-${backendProp.id}`,
    gallery: backendProp.gallery || [],
    complianceStatus: 'verified',
    isPublished: true,
  };
};

// Transform frontend property to backend format
const transformToBackend = (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): any => {
  return {
    title: property.title,
    price: property.price,
    location: `${property.city}, ${property.state}, ${property.country}`,
    type: property.type,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    // Include additional fields for future backend expansion
    area: property.area,
    description: property.description,
    reraNumber: property.reraNumber,
    currency: property.currency,
    agentName: property.agentName,
    agentLicense: property.agentLicense,
  };
};

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const normalizedError = {
      status: error.response?.status ?? 500,
      message: error.response?.data?.message || error.message || 'Unexpected API error',
      details: error.response?.data || null,
    };
    return Promise.reject(normalizedError);
  }
);

export const propertyApi = {
  fetchProperties: async (filters?: PropertyFilters): Promise<Property[]> => {
    const { data } = await api.get('/properties', { params: filters });
    // Transform each backend property to our frontend format
    return Array.isArray(data) ? data.map(transformBackendProperty) : [];
  },
  
  fetchProperty: async (id: string): Promise<Property> => {
    const { data } = await api.get(`/properties/${id}`);
    return transformBackendProperty(data);
  },
  
  createProperty: async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
    const backendData = transformToBackend(property);
    const { data } = await api.post('/properties', backendData);
    return transformBackendProperty(data);
  },
  
  updateProperty: async (id: string, property: Partial<Property>): Promise<Property> => {
    const backendData = transformToBackend(property as any);
    const { data } = await api.put(`/properties/${id}`, backendData);
    return transformBackendProperty(data);
  },
  
  deleteProperty: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },
};

export default api;
export { api };
