"use client";

import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Sparkles,
  Bell,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function Header() {
  const { toggleSidebar, toggleAiPanel } = useDashboard();
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left: Mobile menu + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-white/5 w-72">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-500 outline-none"
            />
            <kbd className="hidden md:inline text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* AI Button */}
          <button
            onClick={toggleAiPanel}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300 hover:from-indigo-600/30 hover:to-purple-600/30 transition-all text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold">
                A
              </div>
              <span className="hidden md:inline text-sm text-slate-300 font-medium">
                Alex
              </span>
              <ChevronDown className={cn(
                "hidden md:inline w-4 h-4 text-slate-500 transition-transform duration-200",
                profileOpen && "rotate-180"
              )} />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/40 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-medium text-white">Alex Morgan</p>
                  <p className="text-xs text-slate-400">alex@lumina.ai</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition-colors">
                    <User className="w-4 h-4 text-slate-500" />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition-colors">
                    <Settings className="w-4 h-4 text-slate-500" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-white/5 py-1">
                  <button
                    onClick={() => { setProfileOpen(false); logout(); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-rose-400 hover:bg-white/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
