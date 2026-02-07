"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Zap,
  Sparkles,
} from "lucide-react";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { SkeletonInsight } from "@/components/ui/skeleton-loader";
import { getRelativeTime, cn } from "@/lib/utils";
import type { AIInsight, InsightType } from "@/types";

const typeConfig: Record<
  InsightType,
  { icon: typeof TrendingUp; color: string; bg: string; label: string }
> = {
  performance: {
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    label: "Performance",
  },
  risk: {
    icon: AlertTriangle,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    label: "Risk",
  },
  recommendation: {
    icon: Lightbulb,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    label: "Recommendation",
  },
  anomaly: {
    icon: Zap,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    label: "Anomaly",
  },
};

export function AIInsightsFeed() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await fetch("/api/ai/insights");
        const data = await res.json();
        setInsights(data);
      } catch {
        setInsights([]);
      } finally {
        setLoading(false);
      }
    }
    fetchInsights();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10">
          <Sparkles className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">AI Insights</h3>
          <p className="text-xs text-slate-400">Auto-generated business intelligence</p>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonInsight key={i} />)
        ) : (
          insights.map((insight, i) => {
            const config = typeConfig[insight.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={cn(
                  "p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-200",
                  "bg-slate-900/50",
                  insight.type === "risk" || insight.type === "anomaly"
                    ? "ai-shimmer"
                    : ""
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mt-0.5",
                      config.bg
                    )}
                  >
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          config.bg,
                          config.color
                        )}
                      >
                        {config.label}
                      </span>
                      <ConfidenceBadge value={insight.confidence} />
                      <span className="text-xs text-slate-500 ml-auto shrink-0">
                        {getRelativeTime(insight.timestamp)}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
