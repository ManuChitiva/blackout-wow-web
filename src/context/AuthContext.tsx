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
  portalRole: string | null;
};

type AuthContextValue = AuthState & {
  isAuthReady: boolean;
  canManageDashboard: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string, recaptchaToken?: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  getAccessToken: () => string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStored(): AuthState {
  if (typeof window === "undefined") return { accessToken: null, refreshToken: null, portalRole: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { accessToken: null, refreshToken: null, portalRole: null };
    const parsed = JSON.parse(raw) as AuthState;
    return {
      accessToken: parsed.accessToken ?? null,
      refreshToken: parsed.refreshToken ?? null,
      portalRole: parsed.portalRole ?? inferRoleFromToken(parsed.accessToken ?? null),
    };
  } catch {
    return { accessToken: null, refreshToken: null, portalRole: null };
  }
}

function inferRoleFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decoded = atob(padded);
    const payload = JSON.parse(decoded) as { role?: string };
    if (!payload.role || typeof payload.role !== "string") return null;
    return payload.role.toUpperCase();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [portalRole, setPortalRole] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const s = loadStored();
    setAccessToken(s.accessToken);
    setRefreshToken(s.refreshToken);
    setPortalRole(s.portalRole);
    setIsAuthReady(true);
  }, []);

  const persist = useCallback((tokens: AuthState) => {
    const resolvedRole = tokens.portalRole ?? inferRoleFromToken(tokens.accessToken);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setPortalRole(resolvedRole);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          portalRole: resolvedRole,
        } satisfies AuthState)
      );
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
        portalRole: inferRoleFromToken(data.accessToken),
      });
    },
    [persist]
  );

  const register = useCallback(
    async (username: string, password: string, email: string, recaptchaToken?: string) => {
      await apiJson<{ message: string }>("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          email,
          recaptchaToken,
          recaptcha: recaptchaToken,
          "g-recaptcha-response": recaptchaToken,
        }),
      });
    },
    []
  );

  const logout = useCallback(() => {
    persist({ accessToken: null, refreshToken: null, portalRole: null });
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
      portalRole: inferRoleFromToken(data.accessToken),
    });
  }, [persist, refreshToken]);

  const getAccessToken = useCallback(() => accessToken, [accessToken]);
  const canManageDashboard = portalRole === "ADMIN" || portalRole === "MANAGER";

  const value = useMemo(
    () =>
      ({
        accessToken,
        refreshToken,
        portalRole,
        isAuthReady,
        canManageDashboard,
        login,
        register,
        logout,
        refreshSession,
        getAccessToken,
      }) satisfies AuthContextValue,
    [
      accessToken,
      refreshToken,
      portalRole,
      isAuthReady,
      canManageDashboard,
      login,
      register,
      logout,
      refreshSession,
      getAccessToken,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth dentro de AuthProvider");
  return ctx;
}
