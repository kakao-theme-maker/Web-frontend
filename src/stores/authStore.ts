import { create } from 'zustand';

export const REFRESH_TOKEN_KEY = 'refreshToken';
export const USER_EMAIL_KEY = 'userEmail';

interface IAuthState {
  accessToken: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  setAccessToken: (accessToken: string, refreshToken: string, userEmail?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  accessToken: null,
  userEmail: localStorage.getItem(USER_EMAIL_KEY),
  isAuthenticated: false,

  setAccessToken: (accessToken, refreshToken, userEmail) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    if (userEmail) localStorage.setItem(USER_EMAIL_KEY, userEmail);
    set({
      accessToken,
      isAuthenticated: true,
      userEmail: userEmail ?? localStorage.getItem(USER_EMAIL_KEY),
    });
  },

  clearAuth: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    set({ accessToken: null, isAuthenticated: false, userEmail: null });
  },
}));
