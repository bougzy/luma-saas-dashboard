"use client";

import { motion } from "framer-motion";
import { HelpCircle, Book, MessageCircle, Video, FileText } from "lucide-react";

const resources = [
  { icon: Book, label: "Documentation", desc: "Comprehensive guides and API reference" },
  { icon: Video, label: "Video Tutorials", desc: "Step-by-step walkthrough videos" },
  { icon: MessageCircle, label: "Community", desc: "Join the discussion with other users" },
  { icon: FileText, label: "Changelog", desc: "Latest updates and release notes" },
];

export default function HelpPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Help Center</h1>
        <p className="text-sm text-slate-400 mt-1">
          Resources, tutorials, and support options.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((res, i) => {
          const Icon = res.icon;
          return (
            <motion.div
              key={res.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="glass-card p-6 flex flex-col items-center text-center cursor-pointer hover:border-white/15 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 mb-3">
                <Icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{res.label}</h3>
              <p className="text-xs text-slate-400">{res.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
