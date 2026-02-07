"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Calendar, DollarSign, Sparkles } from "lucide-react";
import { churnRisks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { AIAnomaly } from "@/types";

export function ChurnRisks() {
  const [anomalies, setAnomalies] = useState<AIAnomaly[]>([]);

  useEffect(() => {
    async function fetchAnomalies() {
      try {
        const res = await fetch("/api/ai/anomalies");
        const data = await res.json();
        setAnomalies(data);
      } catch {
        setAnomalies([]);
      }
    }
    fetchAnomalies();
  }, []);

  const totalMrrAtRisk = churnRisks.reduce((sum, r) => sum + r.mrr, 0);

  return (
    <div className="space-y-6">
      {/* Churn Vulnerabilities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
              <TrendingDown className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Churn Vulnerabilities</h3>
              <p className="text-xs text-slate-400">
                ${totalMrrAtRisk.toLocaleString()}/mo at risk across {churnRisks.length} accounts
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {churnRisks.map((risk, i) => (
            <motion.div
              key={risk.customerId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={cn(
                "p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all",
                risk.riskScore >= 80 ? "ai-shimmer bg-rose-950/20" : "bg-slate-900/50"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">{risk.customerName}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <DollarSign className="w-3 h-3" />
                      ${risk.mrr}/mo
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      Predicted: {new Date(risk.predictedChurnDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                  risk.riskScore >= 80
                    ? "bg-rose-500/15 text-rose-400"
                    : risk.riskScore >= 60
                      ? "bg-amber-500/15 text-amber-400"
                      : "bg-yellow-500/15 text-yellow-400"
                )}>
                  <AlertTriangle className="w-3 h-3" />
                  {risk.riskScore}%
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {risk.factors.map((factor) => (
                  <span
                    key={factor}
                    className="text-xs px-2 py-1 rounded-lg bg-slate-800/50 text-slate-400 border border-white/5"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Anomalies */}
      {anomalies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI-Detected Anomalies</h3>
              <p className="text-xs text-slate-400">Unusual patterns flagged by Lumina AI</p>
            </div>
          </div>

          <div className="space-y-3">
            {anomalies.map((anomaly, i) => {
              const severityColor =
                anomaly.severity === "critical"
                  ? "text-rose-400 bg-rose-400/10"
                  : anomaly.severity === "high"
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-yellow-400 bg-yellow-400/10";
              const deviation =
                ((anomaly.actualValue - anomaly.expectedValue) / anomaly.expectedValue) * 100;

              return (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 ai-shimmer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-slate-300">{anomaly.metric}</span>
                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize", severityColor)}>
                          {anomaly.severity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{anomaly.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className={cn("text-sm font-bold", deviation > 0 ? "text-rose-400" : "text-emerald-400")}>
                        {deviation > 0 ? "+" : ""}{deviation.toFixed(0)}%
                      </p>
                      <p className="text-xs text-slate-500">deviation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                    <span>Expected: {anomaly.expectedValue.toLocaleString()}</span>
                    <span>Actual: {anomaly.actualValue.toLocaleString()}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
