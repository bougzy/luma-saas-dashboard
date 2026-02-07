import type {
  MetricCard,
  RevenueChurnDataPoint,
  Customer,
  SecurityAlert,
  ChurnRisk,
  AIInsight,
  AIAnomaly,
  AIRecommendation,
  FunnelStep,
  RetentionCohort,
} from "@/types";

// ---- Metric Cards ----
export const metrics: MetricCard[] = [
  {
    id: "mrr",
    title: "Monthly Recurring Revenue",
    value: "$284.5K",
    change: 12.5,
    changeLabel: "vs last month",
    sparkline: [180, 195, 210, 220, 235, 248, 255, 262, 270, 278, 282, 284.5],
    prefix: "$",
  },
  {
    id: "churn",
    title: "Churn Rate",
    value: "3.2%",
    change: -0.8,
    changeLabel: "vs last month",
    sparkline: [5.1, 4.8, 4.5, 4.2, 4.0, 3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.2],
    suffix: "%",
  },
  {
    id: "arpu",
    title: "Avg Revenue Per User",
    value: "$142",
    change: 8.3,
    changeLabel: "vs last month",
    sparkline: [105, 108, 112, 118, 122, 125, 128, 132, 135, 138, 140, 142],
    prefix: "$",
  },
  {
    id: "nps",
    title: "Net Promoter Score",
    value: "72",
    change: 5.0,
    changeLabel: "vs last quarter",
    sparkline: [55, 58, 60, 62, 64, 65, 67, 68, 69, 70, 71, 72],
  },
];

// ---- Revenue vs Churn Chart ----
export const revenueChurnData: RevenueChurnDataPoint[] = [
  { month: "Jan", revenue: 180000, churn: 5100 },
  { month: "Feb", revenue: 195000, churn: 4800 },
  { month: "Mar", revenue: 210000, churn: 4500 },
  { month: "Apr", revenue: 220000, churn: 4200 },
  { month: "May", revenue: 235000, churn: 4000 },
  { month: "Jun", revenue: 248000, churn: 3800 },
  { month: "Jul", revenue: 255000, churn: 3600 },
  { month: "Aug", revenue: 262000, churn: 3500 },
  { month: "Sep", revenue: 270000, churn: 3400 },
  { month: "Oct", revenue: 278000, churn: 3300 },
  { month: "Nov", revenue: 282000, churn: 3200 },
  { month: "Dec", revenue: 284500, churn: 3200 },
];

// ---- Funnel Data ----
export const funnelData: FunnelStep[] = [
  { stage: "Visitors", value: 45200, rate: 100 },
  { stage: "Sign-ups", value: 12800, rate: 28.3 },
  { stage: "Activated", value: 8400, rate: 65.6 },
  { stage: "Paid Trial", value: 4200, rate: 50.0 },
  { stage: "Subscribed", value: 2800, rate: 66.7 },
  { stage: "Retained (6mo)", value: 2100, rate: 75.0 },
];

// ---- Retention Cohorts ----
export const retentionData: RetentionCohort[] = [
  { cohort: "Jul 2025", month0: 100, month1: 85, month2: 78, month3: 72, month4: 68, month5: 65 },
  { cohort: "Aug 2025", month0: 100, month1: 87, month2: 80, month3: 74, month4: 70, month5: 67 },
  { cohort: "Sep 2025", month0: 100, month1: 88, month2: 82, month3: 76, month4: 72, month5: 0 },
  { cohort: "Oct 2025", month0: 100, month1: 90, month2: 84, month3: 78, month4: 0, month5: 0 },
  { cohort: "Nov 2025", month0: 100, month1: 91, month2: 85, month3: 0, month4: 0, month5: 0 },
  { cohort: "Dec 2025", month0: 100, month1: 92, month2: 0, month3: 0, month4: 0, month5: 0 },
];

// ---- Customers ----
export const customers: Customer[] = [
  {
    id: "c1",
    name: "Sarah Chen",
    email: "sarah@acmecorp.com",
    company: "Acme Corp",
    plan: "enterprise",
    mrr: 4500,
    health: "healthy",
    lastActive: "2026-02-07T10:30:00Z",
    avatar: "SC",
    riskScore: 12,
  },
  {
    id: "c2",
    name: "Marcus Johnson",
    email: "marcus@techflow.io",
    company: "TechFlow",
    plan: "pro",
    mrr: 1200,
    health: "at-risk",
    lastActive: "2026-02-03T08:15:00Z",
    avatar: "MJ",
    riskScore: 68,
  },
  {
    id: "c3",
    name: "Elena Rodriguez",
    email: "elena@datawise.co",
    company: "DataWise",
    plan: "enterprise",
    mrr: 8200,
    health: "healthy",
    lastActive: "2026-02-07T09:45:00Z",
    avatar: "ER",
    riskScore: 8,
  },
  {
    id: "c4",
    name: "James Park",
    email: "james@startupxyz.com",
    company: "StartupXYZ",
    plan: "starter",
    mrr: 49,
    health: "churning",
    lastActive: "2026-01-15T14:20:00Z",
    avatar: "JP",
    riskScore: 92,
  },
  {
    id: "c5",
    name: "Amira Patel",
    email: "amira@cloudnine.dev",
    company: "CloudNine",
    plan: "pro",
    mrr: 2400,
    health: "healthy",
    lastActive: "2026-02-06T16:00:00Z",
    avatar: "AP",
    riskScore: 15,
  },
  {
    id: "c6",
    name: "David Kim",
    email: "david@nextera.ai",
    company: "NextEra AI",
    plan: "enterprise",
    mrr: 12000,
    health: "healthy",
    lastActive: "2026-02-07T11:00:00Z",
    avatar: "DK",
    riskScore: 5,
  },
  {
    id: "c7",
    name: "Lisa Wang",
    email: "lisa@scalable.io",
    company: "Scalable",
    plan: "pro",
    mrr: 800,
    health: "at-risk",
    lastActive: "2026-01-28T12:30:00Z",
    avatar: "LW",
    riskScore: 74,
  },
  {
    id: "c8",
    name: "Robert Torres",
    email: "robert@finova.com",
    company: "Finova",
    plan: "enterprise",
    mrr: 6800,
    health: "healthy",
    lastActive: "2026-02-06T15:45:00Z",
    avatar: "RT",
    riskScore: 18,
  },
  {
    id: "c9",
    name: "Nina Kowalski",
    email: "nina@devhub.co",
    company: "DevHub",
    plan: "starter",
    mrr: 99,
    health: "churning",
    lastActive: "2026-01-10T09:00:00Z",
    avatar: "NK",
    riskScore: 88,
  },
  {
    id: "c10",
    name: "Omar Hassan",
    email: "omar@byteshift.com",
    company: "ByteShift",
    plan: "pro",
    mrr: 1800,
    health: "at-risk",
    lastActive: "2026-02-01T13:20:00Z",
    avatar: "OH",
    riskScore: 55,
  },
];

// ---- Security Alerts ----
export const securityAlerts: SecurityAlert[] = [
  {
    id: "sa1",
    type: "suspicious_login",
    severity: "high",
    title: "Unusual login location detected",
    description: "Account admin@techflow.io logged in from unrecognized IP in Eastern Europe.",
    timestamp: "2026-02-07T08:30:00Z",
    resolved: false,
  },
  {
    id: "sa2",
    type: "api_abuse",
    severity: "critical",
    title: "API rate limit exceeded 10x",
    description: "API key ending in ...x4f2 made 50,000 requests in 5 minutes from StartupXYZ account.",
    timestamp: "2026-02-07T06:15:00Z",
    resolved: false,
  },
  {
    id: "sa3",
    type: "data_export",
    severity: "medium",
    title: "Large data export initiated",
    description: "User nina@devhub.co exported all customer records (12,400 rows) — flagged as unusual.",
    timestamp: "2026-02-06T22:00:00Z",
    resolved: true,
  },
  {
    id: "sa4",
    type: "auth_failure",
    severity: "low",
    title: "Multiple failed login attempts",
    description: "5 failed login attempts for admin@acmecorp.com in the last 10 minutes.",
    timestamp: "2026-02-06T18:45:00Z",
    resolved: true,
  },
  {
    id: "sa5",
    type: "suspicious_login",
    severity: "high",
    title: "Concurrent sessions from multiple countries",
    description: "Account marcus@techflow.io has active sessions in US, UK, and Singapore simultaneously.",
    timestamp: "2026-02-07T09:00:00Z",
    resolved: false,
  },
];

// ---- Churn Risks ----
export const churnRisks: ChurnRisk[] = [
  {
    customerId: "c4",
    customerName: "StartupXYZ",
    riskScore: 92,
    factors: ["No login in 23 days", "Support tickets up 300%", "Downgraded plan"],
    predictedChurnDate: "2026-02-28",
    mrr: 49,
  },
  {
    customerId: "c9",
    customerName: "DevHub",
    riskScore: 88,
    factors: ["No login in 28 days", "Card payment failed twice", "Zero feature adoption"],
    predictedChurnDate: "2026-02-20",
    mrr: 99,
  },
  {
    customerId: "c7",
    customerName: "Scalable",
    riskScore: 74,
    factors: ["Usage dropped 60%", "Key stakeholder left", "Competitor evaluation detected"],
    predictedChurnDate: "2026-03-15",
    mrr: 800,
  },
  {
    customerId: "c2",
    customerName: "TechFlow",
    riskScore: 68,
    factors: ["Support satisfaction below 3/5", "API usage declining", "No expansion in 6 months"],
    predictedChurnDate: "2026-04-01",
    mrr: 1200,
  },
  {
    customerId: "c10",
    customerName: "ByteShift",
    riskScore: 55,
    factors: ["Engagement score dropped 40%", "Only 1 active user (was 5)"],
    predictedChurnDate: "2026-04-15",
    mrr: 1800,
  },
];

// ---- AI Insights (simulated) ----
export const aiInsights: AIInsight[] = [
  {
    id: "i1",
    type: "performance",
    title: "Revenue Growth Accelerating",
    description:
      "MRR grew 12.5% this month, outpacing the 3-month average of 8.2%. Enterprise plan upgrades are the primary driver, contributing 68% of new revenue.",
    confidence: 94,
    metric: "MRR",
    timestamp: "2026-02-07T10:00:00Z",
  },
  {
    id: "i2",
    type: "risk",
    title: "Churn Cluster in Starter Tier",
    description:
      "4 of 12 Starter-tier customers show pre-churn behavior patterns (low engagement + support tickets). Estimated MRR at risk: $396/mo.",
    confidence: 87,
    metric: "Churn",
    timestamp: "2026-02-07T09:30:00Z",
  },
  {
    id: "i3",
    type: "recommendation",
    title: "Expand Enterprise Onboarding",
    description:
      "Enterprise accounts with dedicated onboarding show 23% higher retention at 6 months. Recommend scaling the program to all new Enterprise sign-ups.",
    confidence: 91,
    timestamp: "2026-02-07T09:00:00Z",
  },
  {
    id: "i4",
    type: "anomaly",
    title: "API Usage Spike from TechFlow",
    description:
      "TechFlow's API calls increased 340% in 48 hours. This coincides with a rate-limit breach alert. Investigate for potential abuse or integration issue.",
    confidence: 96,
    metric: "API",
    timestamp: "2026-02-07T08:45:00Z",
  },
  {
    id: "i5",
    type: "performance",
    title: "NPS Trending Upward",
    description:
      "NPS rose to 72, highest in 12 months. Correlates with the new in-app help center launch. Promoter share increased 8pp among Pro-tier users.",
    confidence: 89,
    metric: "NPS",
    timestamp: "2026-02-07T08:00:00Z",
  },
];

// ---- AI Anomalies ----
export const aiAnomalies: AIAnomaly[] = [
  {
    id: "a1",
    metric: "API Calls",
    severity: "critical",
    description: "TechFlow API usage spiked 340% above rolling average.",
    detectedAt: "2026-02-07T06:15:00Z",
    expectedValue: 14000,
    actualValue: 61600,
  },
  {
    id: "a2",
    metric: "Sign-up Rate",
    severity: "medium",
    description: "Daily sign-ups dropped 28% below projected trend on Tuesday.",
    detectedAt: "2026-02-05T00:00:00Z",
    expectedValue: 142,
    actualValue: 102,
  },
  {
    id: "a3",
    metric: "Support Tickets",
    severity: "high",
    description: "Billing-related tickets surged 185% after pricing page update.",
    detectedAt: "2026-02-06T12:00:00Z",
    expectedValue: 23,
    actualValue: 66,
  },
];

// ---- AI Recommendations ----
export const aiRecommendations: AIRecommendation[] = [
  {
    id: "r1",
    title: "Implement usage-based pricing tier",
    description:
      "Analysis shows 35% of Pro users consistently exceed their plan limits. A usage-based tier could capture $18K additional MRR.",
    impact: "high",
    effort: "high",
    confidence: 88,
    category: "Revenue",
  },
  {
    id: "r2",
    title: "Automate at-risk customer outreach",
    description:
      "Customers who receive proactive outreach within 48hrs of risk detection have 3x higher save rate. Automate via email triggers.",
    impact: "high",
    effort: "medium",
    confidence: 92,
    category: "Retention",
  },
  {
    id: "r3",
    title: "A/B test annual billing incentive",
    description:
      "Offering 20% discount on annual plans could improve cash flow by $45K/quarter based on current monthly-to-annual conversion patterns.",
    impact: "medium",
    effort: "low",
    confidence: 85,
    category: "Revenue",
  },
  {
    id: "r4",
    title: "Add SSO to Pro plan",
    description:
      "3 of 5 churned Enterprise evaluations cited lack of SSO on Pro as reason for not upgrading. Adding SSO could capture mid-market segment.",
    impact: "medium",
    effort: "high",
    confidence: 79,
    category: "Product",
  },
];

// ---- Suggested AI Questions ----
export const suggestedQuestions: string[] = [
  "Why is churn up in the Starter tier?",
  "What's driving MRR growth this month?",
  "Which customers are most at risk?",
  "How can we improve retention?",
  "Summarize this week's anomalies",
  "What should we prioritize next quarter?",
];
