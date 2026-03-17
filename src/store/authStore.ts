import { create } from 'zustand';
import { AuthState, User } from '../types/auth';
import { clearAuthData } from '../lib/cookies';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user: User | null) =>
    set({ user, isAuthenticated: !!user }),

  setToken: (token: string | null) =>
    set({ token }),

  setAuthenticated: (status: boolean) =>
    set({ isAuthenticated: status }),

  setLoading: (status: boolean) =>
    set({ isLoading: status }),

  logout: () => {
    clearAuthData();
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },
}));
