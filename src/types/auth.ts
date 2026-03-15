export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  city?: string;
  type?: string;
  image?: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginParams {
  email: string;
  password: string;
  fcm_token: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  city: string;
  type: string;
  image?: File | null;
}

export interface SocialLoginParams {
  email: string;
  name: string;
  google_id?: string;
  apple_id?: string;
  fcm_token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  logout: () => void;
}
