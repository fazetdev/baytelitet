import { InternalAxiosRequestConfig } from 'axios';
import { GulfRequestConfig } from '../types';
import { getStorageItem } from '../utils/storage';

export const authInterceptor = (config: InternalAxiosRequestConfig & GulfRequestConfig) => {
  const token = getStorageItem('auth_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
