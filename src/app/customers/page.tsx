"use client";

import { CustomerTable } from "@/components/customers/customer-table";
import { customers } from "@/lib/mock-data";

export default function CustomersPage() {
  const healthyCt = customers.filter((c) => c.health === "healthy").length;
  const atRiskCt = customers.filter((c) => c.health === "at-risk").length;
  const churningCt = customers.filter((c) => c.health === "churning").length;
  const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Customers</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage accounts, monitor health, and identify growth opportunities.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-slate-400 mb-1">Total Customers</p>
          <p className="text-xl font-bold text-white">{customers.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-400 mb-1">Total MRR</p>
          <p className="text-xl font-bold text-white">
            ${totalMrr.toLocaleString()}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-emerald-400 mb-1">Healthy</p>
          <p className="text-xl font-bold text-white">{healthyCt}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-rose-400 mb-1">At Risk / Churning</p>
          <p className="text-xl font-bold text-white">{atRiskCt + churningCt}</p>
        </div>
      </div>

      <CustomerTable />
    </div>
  );
}
