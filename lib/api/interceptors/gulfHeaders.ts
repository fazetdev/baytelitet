import { InternalAxiosRequestConfig } from 'axios';
import { GulfRequestConfig } from '../types';
import { getGulfConfig } from '../utils/storage';

export const gulfHeadersInterceptor = (config: InternalAxiosRequestConfig & GulfRequestConfig) => {
  const { language, currency, jurisdiction, reraId } = getGulfConfig();
  
  config.headers = config.headers || {};
  config.headers['Accept-Language'] = language;
  config.headers['X-Currency'] = currency;
  config.headers['X-Region'] = 'gulf';
  config.headers['X-Jurisdiction'] = jurisdiction;
  
  if (reraId) {
    config.headers['X-RERA-ID'] = reraId;
  }
  
  config._retryCount = config._retryCount || 0;
  return config;
};
