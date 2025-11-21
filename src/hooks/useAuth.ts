import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { RegisterRequest, LoginRequest, UserProfile } from '../types';
import { storage, StorageKeys } from '../utils/storage';

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await storage.getItem(StorageKeys.ACCESS_TOKEN);
      const userData = await storage.getItem(StorageKeys.USER_DATA);
      
      if (token && userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Check auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      const response = await authAPI.register(data);
      // Fetch user profile after registration
      const profile = await authAPI.getProfile();
      setUser(profile);
      setIsAuthenticated(true);
      return { success: true, message: response.msg };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      setLoading(true);
      const response = await authAPI.login(data);
      // Fetch user profile after login
      const profile = await authAPI.getProfile();
      setUser(profile);
      setIsAuthenticated(true);
      return { success: true, message: response.msg };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await authAPI.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Refresh profile error:', error);
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    refreshProfile,
  };
};
