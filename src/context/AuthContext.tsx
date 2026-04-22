"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiJson, type TokenBundle } from "@/lib/api";

const STORAGE_KEY = "blackout_wow_auth";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthContextValue = AuthState & {
  isAuthReady: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  getAccessToken: () => string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStored(): AuthState {
  if (typeof window === "undefined") return { accessToken: null, refreshToken: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { accessToken: null, refreshToken: null };
    const parsed = JSON.parse(raw) as AuthState;
    return {
      accessToken: parsed.accessToken ?? null,
      refreshToken: parsed.refreshToken ?? null,
    };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const s = loadStored();
    setAccessToken(s.accessToken);
    setRefreshToken(s.refreshToken);
    setIsAuthReady(true);
  }, []);

  const persist = useCallback((tokens: AuthState) => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      const data = await apiJson<TokenBundle>("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      persist({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    },
    [persist]
  );

  const register = useCallback(
    async (username: string, password: string, email: string) => {
      await apiJson<{ message: string }>("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
      });
    },
    []
  );

  const logout = useCallback(() => {
    persist({ accessToken: null, refreshToken: null });
  }, [persist]);

  const refreshSession = useCallback(async () => {
    const rt = refreshToken ?? loadStored().refreshToken;
    if (!rt) return;
    const data = await apiJson<TokenBundle>("/api/v1/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken: rt }),
    });
    persist({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  }, [persist, refreshToken]);

  const getAccessToken = useCallback(() => accessToken, [accessToken]);

  const value = useMemo(
    () =>
      ({
        accessToken,
        refreshToken,
        isAuthReady,
        login,
        register,
        logout,
        refreshSession,
        getAccessToken,
      }) satisfies AuthContextValue,
    [accessToken, refreshToken, isAuthReady, login, register, logout, refreshSession, getAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth dentro de AuthProvider");
  return ctx;
}
