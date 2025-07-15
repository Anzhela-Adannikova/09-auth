"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuth((state) => state.setUser);
  const clearAuth = useAuth((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const isValid = await checkSession();

        if (isValid) {
          const user = await getMe();
          setUser(user);
        }
      } catch {
        clearAuth();
      }
    };

    fetchSession();
  }, [setUser, clearAuth]);

  return children;
};

export default AuthProvider;
