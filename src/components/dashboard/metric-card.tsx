"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MetricCard as MetricCardType } from "@/types";

interface MetricCardProps {
  metric: MetricCardType;
  index: number;
}

export function MetricCard({ metric, index }: MetricCardProps) {
  const isPositive = metric.id === "churn" ? metric.change < 0 : metric.change > 0;
  const sparkData = metric.sparkline.map((val, i) => ({ value: val, index: i }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card p-5 sm:p-6 group hover:border-white/15 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-400 font-medium">{metric.title}</p>
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-rose-500/10 text-rose-400"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {Math.abs(metric.change)}%
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{metric.value}</p>
      <p className="text-xs text-slate-500 mb-4">{metric.changeLabel}</p>
      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData}>
            <defs>
              <linearGradient id={`spark-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isPositive ? "#10b981" : "#f43f5e"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? "#10b981" : "#f43f5e"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#10b981" : "#f43f5e"}
              strokeWidth={2}
              fill={`url(#spark-${metric.id})`}
              dot={false}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
