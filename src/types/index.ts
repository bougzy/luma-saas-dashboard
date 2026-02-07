// ============================================================
// Lumina SaaS Dashboard — Type Definitions
// ============================================================

// ---- Navigation ----
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

// ---- Metrics ----
export interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  sparkline: number[];
  prefix?: string;
  suffix?: string;
}

// ---- Charts ----
export interface RevenueChurnDataPoint {
  month: string;
  revenue: number;
  churn: number;
}

export interface FunnelStep {
  stage: string;
  value: number;
  rate: number;
}

export interface RetentionCohort {
  cohort: string;
  month0: number;
  month1: number;
  month2: number;
  month3: number;
  month4: number;
  month5: number;
}

// ---- AI Insights ----
export type InsightType = "risk" | "performance" | "recommendation" | "anomaly";

export interface AIInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  confidence: number;
  metric?: string;
  timestamp: string;
}

export interface AIAnomaly {
  id: string;
  metric: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  detectedAt: string;
  expectedValue: number;
  actualValue: number;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: "low" | "medium" | "high";
  effort: "low" | "medium" | "high";
  confidence: number;
  category: string;
}

// ---- Chat ----
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  confidence?: number;
}

// ---- Customers ----
export type HealthStatus = "healthy" | "at-risk" | "churning";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "starter" | "pro" | "enterprise";
  mrr: number;
  health: HealthStatus;
  lastActive: string;
  avatar: string;
  riskScore: number;
}

// ---- Risk ----
export interface SecurityAlert {
  id: string;
  type: "auth_failure" | "data_export" | "api_abuse" | "suspicious_login";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export interface ChurnRisk {
  customerId: string;
  customerName: string;
  riskScore: number;
  factors: string[];
  predictedChurnDate: string;
  mrr: number;
}

// ---- Dashboard State ----
export interface DashboardState {
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  activeView: string;
  isLoading: boolean;
}
