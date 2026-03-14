import { create } from 'zustand';

export const REFRESH_TOKEN_KEY = 'refreshToken';

interface IAuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,

  setAccessToken: (accessToken, refreshToken) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    set({ accessToken, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({ accessToken: null, isAuthenticated: false });
  },
}));
