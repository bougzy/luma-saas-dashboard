"use client";

import type { ReactNode } from "react";
import { DashboardProvider } from "@/hooks/use-dashboard";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { AIChatPanel } from "@/components/ai/chat-panel";

export function ClientShell({ children }: { children: ReactNode }) {
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
