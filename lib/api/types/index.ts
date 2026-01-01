import { InternalAxiosRequestConfig } from 'axios';

export interface GulfRequestConfig extends InternalAxiosRequestConfig {
  retries?: number;
  _retry?: boolean;
  _retryCount?: number;
  skipAuth?: boolean;
}

export interface GulfErrorResponse {
  success: false;
  error: string;
  message?: string;
  code?: string | number;
}

export interface GulfApiOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  requireRERA?: boolean;
}
