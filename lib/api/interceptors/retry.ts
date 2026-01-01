import { AxiosError } from 'axios';
import { GulfRequestConfig } from '../types';

export const retryInterceptor = async (
  error: AxiosError,
  config: GulfRequestConfig
): Promise<boolean> => {
  const { retries = 0, _retryCount = 0 } = config;

  // Only retry on network errors or 5xx server errors
  const shouldRetry = 
    !error.response || 
    (error.response.status >= 500 && error.response.status <= 599);

  if (shouldRetry && _retryCount < retries) {
    config._retryCount = _retryCount + 1;
    
    // Exponential backoff
    const delay = Math.pow(2, _retryCount) * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return true;
  }

  return false;
};
