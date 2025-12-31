// Use relative paths for API calls
export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    // Always use relative path - will use same domain as frontend
    const url = endpoint;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  },
};

// Property API
export const propertyApi = {
  fetchProperties: () => api.request('/api/properties'),
  createProperty: (data: any) => 
    api.request('/api/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deleteProperty: (id: string) =>
    api.request(`/api/properties/${id}`, {
      method: 'DELETE',
    }),
};

export default api;
