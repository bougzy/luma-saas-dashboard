"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { customers as allCustomers } from "@/lib/mock-data";
import { cn, getRelativeTime } from "@/lib/utils";
import type { Customer, HealthStatus } from "@/types";

const healthConfig: Record<
  HealthStatus,
  { label: string; color: string; dot: string }
> = {
  healthy: {
    label: "Healthy",
    color: "text-emerald-400 bg-emerald-400/10",
    dot: "bg-emerald-400",
  },
  "at-risk": {
    label: "At Risk",
    color: "text-amber-400 bg-amber-400/10",
    dot: "bg-amber-400",
  },
  churning: {
    label: "Churning",
    color: "text-rose-400 bg-rose-400/10",
    dot: "bg-rose-400",
  },
};

const planBadge: Record<string, string> = {
  starter: "bg-slate-600/30 text-slate-300",
  pro: "bg-indigo-500/15 text-indigo-300",
  enterprise: "bg-purple-500/15 text-purple-300",
};

export function CustomerTable() {
  const [search, setSearch] = useState("");
  const [filterHealth, setFilterHealth] = useState<HealthStatus | "all">("all");

  const filtered = allCustomers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchHealth = filterHealth === "all" || c.health === filterHealth;
    return matchSearch && matchHealth;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden"
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 border-b border-white/5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/50 border border-white/5 w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "healthy", "at-risk", "churning"] as const).map((h) => (
            <button
              key={h}
              onClick={() => setFilterHealth(h)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                filterHealth === h
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              {h === "all" ? "All" : h === "at-risk" ? "At Risk" : h.charAt(0).toUpperCase() + h.slice(1)}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 ml-auto">
          {filtered.length} customer{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">
                Customer
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-3 hidden md:table-cell">
                Plan
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">
                MRR
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">
                Health
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-3 hidden lg:table-cell">
                Risk Score
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-3 hidden sm:table-cell">
                Last Active
              </th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer, i) => {
              const health = healthConfig[customer.health];
              return (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-indigo-300 text-xs font-bold shrink-0">
                        {customer.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {customer.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {customer.company}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 hidden md:table-cell">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-1 rounded-lg capitalize",
                        planBadge[customer.plan]
                      )}
                    >
                      {customer.plan}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-sm font-semibold text-white">
                      ${customer.mrr.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
                        health.color
                      )}
                    >
                      <span className={cn("w-1.5 h-1.5 rounded-full", health.dot)} />
                      {health.label}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            customer.riskScore >= 75
                              ? "bg-rose-500"
                              : customer.riskScore >= 50
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          )}
                          style={{ width: `${customer.riskScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 w-6">
                        {customer.riskScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 hidden sm:table-cell">
                    <span className="text-xs text-slate-400">
                      {getRelativeTime(customer.lastActive)}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
          <Search className="w-8 h-8 mb-3 opacity-50" />
          <p className="text-sm">No customers found</p>
        </div>
      )}
    </motion.div>
  );
}
