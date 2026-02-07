"use client";

import { FunnelChart } from "@/components/analytics/funnel-chart";
import { RetentionTable } from "@/components/analytics/retention-table";
import { RecommendationsPanel } from "@/components/analytics/recommendations-panel";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">
          Deep dive into conversion, retention, and AI-driven recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FunnelChart />
        <RetentionTable />
      </div>

      <RecommendationsPanel />
    </div>
  );
}
