"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type AuthPhase = "checking" | "unauthenticated" | "loading" | "authenticated";

interface AuthContextType {
  phase: AuthPhase;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  error: string | null;
}

const CREDENTIALS = { email: "admin@lumina.ai", password: "lumina2026" };
const STORAGE_KEY = "lumina_auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AuthPhase>("checking");
  const [error, setError] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setPhase("authenticated");
    } else {
      setPhase("unauthenticated");
    }
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    setError(null);

    if (
      email.toLowerCase() === CREDENTIALS.email &&
      password === CREDENTIALS.password
    ) {
      localStorage.setItem(STORAGE_KEY, "true");
      // Go to loading phase — the splash screen handles transitioning to authenticated
      setPhase("loading");
      return true;
    }

    setError("Invalid email or password. Please try again.");
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPhase("unauthenticated");
  }, []);

  const finishLoading = useCallback(() => {
    setPhase("authenticated");
  }, []);

  return (
    <AuthContext.Provider value={{ phase, login, logout, error }}>
      <FinishLoadingContext.Provider value={finishLoading}>
        {children}
      </FinishLoadingContext.Provider>
    </AuthContext.Provider>
  );
}

// Separate context so only the splash screen consumes it
const FinishLoadingContext = createContext<() => void>(() => {});

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useFinishLoading() {
  return useContext(FinishLoadingContext);
}
