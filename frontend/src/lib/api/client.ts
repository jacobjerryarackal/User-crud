import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiError } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://user-crud-backend-8ghm.onrender.com/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        // Handle API errors consistently
        if (error.response) {
          const apiError = error.response.data;
          return Promise.reject({
            message: apiError.error || 'An error occurred',
            details: apiError.details,
            status: error.response.status,
          });
        }
        return Promise.reject({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get(url);
    return response.data.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await this.client.put(url, data);
    return response.data.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url);
    return response.data;
  }
}

export const apiClient = new ApiClient();