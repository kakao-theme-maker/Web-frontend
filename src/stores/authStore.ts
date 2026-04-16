import { create } from 'zustand';

export const USER_EMAIL_KEY = 'userEmail';

interface IAuthState {
  userEmail: string | null;
  isAuthenticated: boolean;
  setAuthenticated: (userEmail?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  userEmail: localStorage.getItem(USER_EMAIL_KEY),
  isAuthenticated: false,

  setAuthenticated: (userEmail) => {
    if (userEmail) localStorage.setItem(USER_EMAIL_KEY, userEmail);
    set({
      isAuthenticated: true,
      userEmail: userEmail ?? localStorage.getItem(USER_EMAIL_KEY),
    });
  },

  clearAuth: () => {
    localStorage.removeItem(USER_EMAIL_KEY);
    set({ isAuthenticated: false, userEmail: null });
  },
}));
