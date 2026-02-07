"use client";

import type { ReactNode } from "react";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { DashboardProvider } from "@/hooks/use-dashboard";
import { LoginScreen } from "@/components/auth/login-screen";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { AIChatPanel } from "@/components/ai/chat-panel";

function AuthGate({ children }: { children: ReactNode }) {
  const { phase } = useAuth();

  // Initial localStorage check — show nothing to avoid flash
  if (phase === "checking") {
    return <div className="fixed inset-0 bg-slate-950" />;
  }

  if (phase === "unauthenticated") {
    return <LoginScreen />;
  }

  if (phase === "loading") {
    return <LoadingScreen />;
  }

  // phase === "authenticated"
  return (
    <DashboardProvider>
      <div className="min-h-screen">
        <Sidebar />
        <div className="lg:pl-64">
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
        <AIChatPanel />
      </div>
    </DashboardProvider>
  );
}

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
}
