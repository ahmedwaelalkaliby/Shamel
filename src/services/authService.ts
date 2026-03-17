import axiosInstance from '../lib/axios';
import {
  AuthResponse,
  LoginParams,
  RegisterParams,
  SocialLoginParams,
  User
} from '../types/auth';

export const authService = {
  login: async (params: LoginParams): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', params);
    return response.data;
  },

  register: async (params: RegisterParams | FormData): Promise<AuthResponse> => {
    let body: any = params;
    
    if (!(params instanceof FormData)) {
      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        const value = (params as any)[key];
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      body = formData;
    }

    const response = await axiosInstance.post('/auth/register', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getCurrentUser: async (): Promise<{ status: boolean; data: User }> => {
    const response = await axiosInstance.get('/user');
    return response.data;
  },

  loginWithGoogle: async (params: SocialLoginParams): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login-with-google', params);
    return response.data;
  },

  loginWithApple: async (params: SocialLoginParams): Promise<AuthResponse> => {
    // Assuming endpoint is similar to google
    const response = await axiosInstance.post('/auth/login-with-apple', params);
    return response.data;
  },

  logout: async (): Promise<{ status: boolean; message: string }> => {
    const response = await axiosInstance.post('/user/logout');
    return response.data;
  },
};
