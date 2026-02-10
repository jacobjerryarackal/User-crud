import { useState, useCallback } from 'react';
import { usersApi } from '@/lib/api/users';
import { User, UserFormData } from '@/types';
import { message } from 'antd';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (userData: UserFormData) => {
    try {
      const newUser = await usersApi.create(userData);
      setUsers(prev => [...prev, newUser]);
      message.success('User created successfully');
      return { success: true, data: newUser };
    } catch (err: any) {
      message.error(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateUser = async (id: string, userData: Partial<UserFormData>) => {
    try {
      const updatedUser = await usersApi.update(id, userData);
      setUsers(prev => prev.map(user => 
        user.id === id ? updatedUser : user
      ));
      message.success('User updated successfully');
      return { success: true, data: updatedUser };
    } catch (err: any) {
      message.error(err.message);
      return { success: false, error: err.message };
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await usersApi.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      message.success('User deleted successfully');
      return { success: true };
    } catch (err: any) {
      message.error(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setUsers,
  };
};