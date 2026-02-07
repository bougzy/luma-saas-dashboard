"use client";

import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Lock,
  Database,
  Wifi,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { securityAlerts } from "@/lib/mock-data";
import { getRelativeTime, cn } from "@/lib/utils";
import type { SecurityAlert } from "@/types";

const severityConfig = {
  critical: { color: "text-rose-400 bg-rose-400/10 border-rose-400/20", label: "Critical" },
  high: { color: "text-amber-400 bg-amber-400/10 border-amber-400/20", label: "High" },
  medium: { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", label: "Medium" },
  low: { color: "text-slate-400 bg-slate-400/10 border-slate-400/20", label: "Low" },
};

const typeIcons = {
  auth_failure: Lock,
  data_export: Database,
  api_abuse: Wifi,
  suspicious_login: AlertTriangle,
};

export function SecurityAlerts() {
  const unresolvedCount = securityAlerts.filter((a) => !a.resolved).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10">
            <Shield className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Security Alerts</h3>
            <p className="text-xs text-slate-400">
              {unresolvedCount} unresolved alert{unresolvedCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {securityAlerts.map((alert, i) => {
          const severity = severityConfig[alert.severity];
          const Icon = typeIcons[alert.type];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={cn(
                "p-4 rounded-2xl border transition-all",
                alert.resolved
                  ? "bg-slate-900/30 border-white/5 opacity-60"
                  : "bg-slate-900/50 border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg shrink-0",
                  alert.resolved ? "bg-slate-700/30" : "bg-slate-800")}>
                  <Icon className={cn("w-4 h-4", alert.resolved ? "text-slate-500" : severity.color.split(" ")[0])} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", severity.color)}>
                      {severity.label}
                    </span>
                    {alert.resolved ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        Resolved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                        <Clock className="w-3 h-3" />
                        Active
                      </span>
                    )}
                    <span className="text-xs text-slate-500 ml-auto">
                      {getRelativeTime(alert.timestamp)}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {alert.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
