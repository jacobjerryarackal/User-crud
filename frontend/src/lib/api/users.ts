import { apiClient } from './client';
import { User, UserFormData } from '@/types';

export const usersApi = {
  getAll: () => apiClient.get<User[]>('/users'),
  
  getById: (id: string) => apiClient.get<User>(`/users/${id}`),
  
  create: (data: UserFormData) => apiClient.post<User>('/users', data),
  
  update: (id: string, data: Partial<UserFormData>) => 
    apiClient.put<User>(`/users/${id}`, data),
  
  delete: (id: string) => apiClient.delete<void>(`/users/${id}`),
};