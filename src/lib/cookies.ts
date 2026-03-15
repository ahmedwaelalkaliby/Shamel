import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const setAuthToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { 
    expires: 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const setStoredUser = (user: any) => {
  Cookies.set(USER_KEY, JSON.stringify(user), { 
    expires: 30,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const getStoredUser = () => {
  const user = Cookies.get(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeStoredUser = () => {
  Cookies.remove(USER_KEY);
};

export const clearAuthData = () => {
  removeAuthToken();
  removeStoredUser();
};
