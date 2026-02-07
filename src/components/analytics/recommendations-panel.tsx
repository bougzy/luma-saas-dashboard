"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, ArrowUpRight, Sparkles } from "lucide-react";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { SkeletonInsight } from "@/components/ui/skeleton-loader";
import { cn } from "@/lib/utils";
import type { AIRecommendation } from "@/types";

const impactColors = {
  high: "text-emerald-400 bg-emerald-400/10",
  medium: "text-amber-400 bg-amber-400/10",
  low: "text-slate-400 bg-slate-400/10",
};

const effortColors = {
  high: "text-rose-400 bg-rose-400/10",
  medium: "text-amber-400 bg-amber-400/10",
  low: "text-emerald-400 bg-emerald-400/10",
};

export function RecommendationsPanel() {
  const [recs, setRecs] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecs() {
      try {
        const res = await fetch("/api/ai/recommendations");
        const data = await res.json();
        setRecs(data);
      } catch {
        setRecs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRecs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
          <Lightbulb className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
          <p className="text-xs text-slate-400">Strategic actions ranked by impact</p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-xs text-indigo-400">
          <Sparkles className="w-3 h-3" />
          <span>AI-Generated</span>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonInsight key={i} />)
        ) : (
          recs.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {rec.title}
                </h4>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {rec.description}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", impactColors[rec.impact])}>
                  Impact: {rec.impact}
                </span>
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", effortColors[rec.effort])}>
                  Effort: {rec.effort}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300">
                  {rec.category}
                </span>
                <ConfidenceBadge value={rec.confidence} className="ml-auto" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
