import { AxiosError } from 'axios';
import { GulfRequestConfig, GulfErrorResponse } from '../types';

export const normalizeGulfError = (error: AxiosError<GulfErrorResponse>, config?: GulfRequestConfig) => {
  const status = error.response?.status || 500;
  const message = error.response?.data?.error || error.response?.data?.message || error.message || 'An unexpected error occurred';
  
  return {
    ...error,
    status,
    message,
    success: false
  };
};
