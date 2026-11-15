import axios from 'axios';
import {mapApiError} from './apiError';

/** All storefront HTTP requests use this single configured instance. */
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://fakestoreapi.com',
  timeout: 12000,
  headers: {'Accept': 'application/json'}
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(mapApiError(error))
);
