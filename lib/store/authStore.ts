import { User } from "@/types/user";
import { create } from "zustand";

export type AuthStoreType = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuth = create<AuthStoreType>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));
