"use client";

import { motion } from "framer-motion";
import { Settings, Bell, Shield, Palette, Key, Globe } from "lucide-react";

const sections = [
  { icon: Settings, label: "General", desc: "Account preferences and display settings" },
  { icon: Bell, label: "Notifications", desc: "Alert preferences and email digests" },
  { icon: Shield, label: "Security", desc: "Two-factor auth, sessions, and API keys" },
  { icon: Palette, label: "Appearance", desc: "Theme, density, and layout options" },
  { icon: Key, label: "API Keys", desc: "Manage integration tokens and webhooks" },
  { icon: Globe, label: "Integrations", desc: "Connected services and data sources" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account and preferences.</p>
      </div>

      <div className="space-y-3">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card p-5 flex items-center gap-4 cursor-pointer hover:border-white/15 transition-all"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800">
                <Icon className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{section.label}</h3>
                <p className="text-xs text-slate-400">{section.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
