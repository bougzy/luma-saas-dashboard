"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { RevenueChurnChart } from "@/components/dashboard/revenue-chart";
import { AIInsightsFeed } from "@/components/dashboard/ai-insights-feed";
import { metrics } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">
          Welcome back, Alex. Here&apos;s your business overview.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <MetricCard key={metric.id} metric={metric} index={i} />
        ))}
      </div>

      {/* Charts + Insights Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChurnChart />
        </div>
        <div className="xl:col-span-1">
          <AIInsightsFeed />
        </div>
      </div>
    </div>
  );
}
