'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import {
  setAuthToken as saveToken,
  setStoredUser,
  clearAuthData,
  getAuthToken
} from '../lib/cookies';
import { LoginParams, RegisterParams, SocialLoginParams, User } from '../types/auth';
import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';


export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    user,
    setUser,
    setToken,
    isAuthenticated,
    isLoading: storeLoading,
    setLoading,
    logout: clearStore
  } = useAuthStore();

  // Initialize auth from token in cookies
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setToken(token);
    } else {
      setLoading(false);
    }
  }, [setToken, setLoading]);

  // Fetch current user if token exists
  const { data: userData, isLoading: queryLoading, refetch, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    enabled: !!getAuthToken() && !user,
  });

  // Handle user data update when query succeeds
  useEffect(() => {
    if (userData) {
      if (userData.status && userData.data) {
        setUser(userData.data);
        setStoredUser(userData.data);
        setLoading(false);
      } else {
        // Status is false or data missing despite successful query
        setLoading(false);
      }
    } else if (isError) {
      handleLogout();
    } else if (!getAuthToken()) {
      setLoading(false);
    }
  }, [userData, isError, setUser, setLoading]);


  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
      clearAuthData();
      clearStore();
      queryClient.clear();
      router.push('/');
    }
  };

  const handleAuthSuccess = (data: any) => {
    if (data.status) {
      const payload = data.data || data;
      const { user, token } = payload;

      if (!user || !token) {
        console.error('Auth response missing user or token', data);
        return;
      }

      saveToken(token);
      setToken(token);
      setUser(user);
      setStoredUser(user);
      queryClient.setQueryData(['currentUser'], { status: true, data: user });
      router.push('/');

    }
  };

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: handleAuthSuccess,
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: handleAuthSuccess,
  });

  const googleLoginMutation = useMutation({
    mutationFn: authService.loginWithGoogle,
    onSuccess: handleAuthSuccess,
  });

  const appleLoginMutation = useMutation({
    mutationFn: authService.loginWithApple,
    onSuccess: handleAuthSuccess,
  });


  return {
    user,
    isAuthenticated,
    loading: storeLoading || queryLoading || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: handleLogout,
    loginWithGoogle: googleLoginMutation.mutateAsync,
    loginWithApple: appleLoginMutation.mutateAsync,
    refreshUser: refetch,
    error: loginMutation.error || registerMutation.error || googleLoginMutation.error || appleLoginMutation.error,
  };
};
