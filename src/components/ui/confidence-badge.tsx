"use client";

import { cn } from "@/lib/utils";

interface ConfidenceBadgeProps {
  value: number;
  className?: string;
}

export function ConfidenceBadge({ value, className }: ConfidenceBadgeProps) {
  const color =
    value >= 90
      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
      : value >= 75
        ? "text-indigo-400 bg-indigo-400/10 border-indigo-400/20"
        : value >= 60
          ? "text-amber-400 bg-amber-400/10 border-amber-400/20"
          : "text-slate-400 bg-slate-400/10 border-slate-400/20";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        color,
        className
      )}
      title={`AI Confidence: ${value}%`}
    >
      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.2"
        />
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${(value / 100) * 37.7} 37.7`}
          strokeLinecap="round"
          transform="rotate(-90 8 8)"
        />
      </svg>
      {value}%
    </span>
  );
}
