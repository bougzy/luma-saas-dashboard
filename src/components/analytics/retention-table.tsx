"use client";

import { motion } from "framer-motion";
import { retentionData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function getCellColor(value: number): string {
  if (value === 0) return "bg-transparent text-slate-600";
  if (value >= 90) return "bg-emerald-500/25 text-emerald-300";
  if (value >= 80) return "bg-emerald-500/15 text-emerald-400";
  if (value >= 70) return "bg-indigo-500/15 text-indigo-300";
  if (value >= 60) return "bg-amber-500/15 text-amber-300";
  return "bg-rose-500/15 text-rose-400";
}

export function RetentionTable() {
  const months = ["M0", "M1", "M2", "M3", "M4", "M5"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-5 sm:p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-1">Retention Cohorts</h3>
      <p className="text-sm text-slate-400 mb-6">
        Percentage of users retained by month after sign-up
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">
                Cohort
              </th>
              {months.map((m) => (
                <th
                  key={m}
                  className="text-center text-xs font-medium text-slate-500 pb-3 px-2"
                >
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {retentionData.map((cohort, rowIdx) => (
              <tr key={cohort.cohort}>
                <td className="text-slate-300 font-medium py-1.5 pr-4 whitespace-nowrap">
                  {cohort.cohort}
                </td>
                {[
                  cohort.month0,
                  cohort.month1,
                  cohort.month2,
                  cohort.month3,
                  cohort.month4,
                  cohort.month5,
                ].map((val, colIdx) => (
                  <td key={colIdx} className="px-1 py-1.5">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: rowIdx * 0.05 + colIdx * 0.03,
                      }}
                      className={cn(
                        "text-center text-xs font-semibold rounded-lg py-2 px-3 min-w-[48px]",
                        getCellColor(val)
                      )}
                    >
                      {val > 0 ? `${val}%` : "—"}
                    </motion.div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
