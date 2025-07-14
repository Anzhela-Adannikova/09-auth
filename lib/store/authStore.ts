import { create } from "zustand";

type AuthUser = {
  username: string;
  email: string;
  avatar?: string;
};
export type AuthStoreType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearIsAuthenticated: () => void;
};

export const useAuth = create<AuthStoreType>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: AuthUser) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));
