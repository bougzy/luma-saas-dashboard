"use client";

import { motion } from "framer-motion";
import { funnelData } from "@/lib/mock-data";
import { formatNumber, cn } from "@/lib/utils";

export function FunnelChart() {
  const maxValue = funnelData[0].value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-5 sm:p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-1">Conversion Funnel</h3>
      <p className="text-sm text-slate-400 mb-6">User journey from visitor to retained customer</p>

      <div className="space-y-3">
        {funnelData.map((step, i) => {
          const widthPercent = (step.value / maxValue) * 100;
          const isLast = i === funnelData.length - 1;
          return (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-300">{step.stage}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">
                    {formatNumber(step.value)}
                  </span>
                  {i > 0 && (
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        step.rate >= 65
                          ? "bg-emerald-500/10 text-emerald-400"
                          : step.rate >= 40
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-rose-500/10 text-rose-400"
                      )}
                    >
                      {step.rate}%
                    </span>
                  )}
                </div>
              </div>
              <div className="h-8 bg-slate-800/50 rounded-xl overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-xl",
                    isLast
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-500"
                      : "bg-gradient-to-r from-indigo-600 to-indigo-500"
                  )}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
