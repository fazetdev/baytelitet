import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { GulfRequestConfig, GulfErrorResponse } from '../types';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';

export const refreshTokenInterceptor = async (
  error: AxiosError<GulfErrorResponse>,
  config: InternalAxiosRequestConfig & GulfRequestConfig
): Promise<boolean> => {
  // Handle token refresh for 401 errors
  if (error.response?.status === 401 && !config._retry) {
    config._retry = true;
    
    try {
      const refreshToken = getStorageItem('refresh_token');
      if (refreshToken) {
        const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );
        
        setStorageItem('auth_token', data.accessToken);
        setStorageItem('refresh_token', data.refreshToken);
        
        config.headers!.Authorization = `Bearer ${data.accessToken}`;
        return true;
      }
    } catch (refreshError) {
      // Clear auth and redirect (client-side only)
      removeStorageItem('auth_token');
      removeStorageItem('refresh_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }
  
  return false;
};
