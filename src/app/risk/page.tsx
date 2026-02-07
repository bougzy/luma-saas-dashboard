"use client";

import { SecurityAlerts } from "@/components/risk/security-alerts";
import { ChurnRisks } from "@/components/risk/churn-risks";

export default function RiskCenterPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Risk Center</h1>
        <p className="text-sm text-slate-400 mt-1">
          Security alerts, churn vulnerabilities, and AI-detected anomalies.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SecurityAlerts />
        <ChurnRisks />
      </div>
    </div>
  );
}
