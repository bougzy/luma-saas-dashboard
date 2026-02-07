"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function LoginScreen() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shaking, setShaking] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-4 overflow-hidden z-50">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[160px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative w-full max-w-md",
          shaking && "animate-shake"
        )}
      >
        {/* Card glow ring */}
        <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

        <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-white/[0.06] rounded-[1.75rem] shadow-2xl shadow-black/40">
          {/* Header */}
          <div className="px-8 pt-10 pb-2 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-xl shadow-indigo-500/25 mb-5"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white tracking-tight"
            >
              Welcome to Lumina
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-slate-400 mt-2"
            >
              Sign in to access your AI-powered dashboard
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            onSubmit={handleSubmit}
            className="px-8 pt-6 pb-8 space-y-5"
          >
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lumina.ai"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-white/[0.06] text-white text-sm placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="lumina2026"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-800/60 border border-white/[0.06] text-white text-sm placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-sm text-rose-300">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              className="group relative w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.98]"
            >
              Sign in
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.form>

          {/* Credentials hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-8 pb-8"
          >
            <div className="px-4 py-3 rounded-xl bg-slate-800/40 border border-white/[0.04]">
              <p className="text-xs text-slate-500 text-center mb-2">Demo Credentials</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Email</span>
                <code className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">
                  admin@lumina.ai
                </code>
              </div>
              <div className="flex items-center justify-between text-xs mt-1.5">
                <span className="text-slate-400">Password</span>
                <code className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">
                  lumina2026
                </code>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
