// ============================================================
// Lumina AI Simulator — Heuristic-based AI abstraction layer
// Replace with real Gemini / LLM calls for production
// ============================================================

import {
  aiInsights,
  aiAnomalies,
  aiRecommendations,
  metrics,
  revenueChurnData,
  churnRisks,
} from "@/lib/mock-data";
import { sleep, generateId } from "@/lib/utils";
import type { AIInsight, AIAnomaly, AIRecommendation } from "@/types";

// ---- Insight Generation ----
export async function generateInsights(): Promise<AIInsight[]> {
  await sleep(800 + Math.random() * 600);
  return aiInsights;
}

// ---- Anomaly Detection ----
export async function detectAnomalies(): Promise<AIAnomaly[]> {
  await sleep(600 + Math.random() * 400);
  return aiAnomalies;
}

// ---- Recommendations ----
export async function getRecommendations(): Promise<AIRecommendation[]> {
  await sleep(700 + Math.random() * 500);
  return aiRecommendations;
}

// ---- Conversational AI (Streaming Simulator) ----
const knowledgeBase: Record<string, string> = {
  churn: `Based on my analysis, churn is concentrated in the Starter tier. Key factors:

**1. Engagement Drop-off:** 4 of 12 Starter customers show less than 2 logins/week, compared to the healthy benchmark of 5+.

**2. Support Friction:** These accounts filed 3x more support tickets than average, primarily about billing and onboarding.

**3. Missing Value Realization:** Starter accounts only adopt 2.1 features on average vs. 6.8 for Pro accounts. They may not be seeing enough value.

**Recommendation:** Implement a 14-day "activation sprint" with guided setup flows for new Starter accounts. Accounts that complete onboarding milestones have 40% lower churn historically.

*Confidence: 87%*`,

  mrr: `MRR growth is accelerating — here's the breakdown:

**Current MRR:** $284.5K (+12.5% MoM)

**Growth Drivers:**
- 🏢 Enterprise upgrades contributed 68% of new revenue ($14.2K)
- 💳 Pro tier expansion added $5.8K from seat-based growth
- 🆕 New customer acquisition contributed $3.5K

**Key Insight:** The Enterprise push is working. 3 accounts upgraded from Pro to Enterprise after the Q4 feature launch (advanced analytics + API access). This suggests the feature gap between tiers is well-calibrated.

**Trend Forecast:** At current trajectory, you'll hit $300K MRR by mid-March.

*Confidence: 94%*`,

  risk: `Here are the customers at highest risk right now:

| Customer | Risk Score | MRR at Risk | Top Factor |
|----------|-----------|-------------|------------|
| StartupXYZ | 92/100 | $49 | No login 23 days |
| DevHub | 88/100 | $99 | Payment failed 2x |
| Scalable | 74/100 | $800 | Usage down 60% |
| TechFlow | 68/100 | $1,200 | NPS declining |

**Total MRR at risk: $2,148/mo**

The most actionable save is **Scalable ($800 MRR)** — their key stakeholder left the company. A direct outreach to their new decision-maker could prevent churn. I recommend scheduling a QBR within the next 5 business days.

*Confidence: 91%*`,

  retention: `Retention analysis reveals several optimization opportunities:

**Current State:**
- 6-month retention: 65-67% across recent cohorts
- Strongest retention in Enterprise tier (82%)
- Weakest retention in Starter tier (41%)

**What Works:**
1. ✅ Dedicated onboarding → +23% retention lift
2. ✅ Feature adoption >5 features → 78% 6-month retention
3. ✅ Proactive support outreach → 3x save rate

**Recommendations (by impact):**
1. **Scale Enterprise onboarding to all tiers** — High effort, but 23% retention lift justifies it
2. **Automate at-risk triggers** — When engagement drops below threshold, trigger automated email + CSM alert
3. **Add in-app feature discovery** — Guided tours for underused features to drive adoption

*Confidence: 90%*`,

  anomalies: `Here's a summary of anomalies detected this week:

**🔴 Critical: TechFlow API Spike**
- API calls surged 340% above rolling average (61,600 vs expected 14,000)
- Coincides with rate-limit breach alert
- Status: Under investigation — possible integration loop or abuse

**🟡 High: Support Ticket Surge**
- Billing tickets up 185% after pricing page update
- Root cause: Confusing pricing display for annual vs monthly toggle
- Status: UX fix deployed, monitoring for decline

**🟠 Medium: Sign-up Dip**
- Daily sign-ups dropped 28% on Tuesday
- Correlated with Google Ads campaign pause (budget issue)
- Status: Campaign reactivated Wednesday, sign-ups recovering

No low-severity anomalies worth flagging this period.

*Confidence: 93%*`,

  priorities: `Based on current data, here's my recommended priority stack for next quarter:

**🥇 Priority 1: Reduce Starter Churn (Impact: High)**
- Implement activation sprint + automated onboarding
- Target: Reduce Starter churn from 9.2% to under 5%
- Expected MRR impact: Save ~$2K/mo in at-risk revenue

**🥈 Priority 2: Scale Enterprise Growth (Impact: High)**
- Enterprise accounts have highest LTV ($8.4K avg) and best retention
- Invest in Enterprise-specific features (SSO, audit logs, SLAs)
- Target: 5 new Enterprise accounts/month (currently 2)

**🥉 Priority 3: Usage-Based Pricing (Impact: Medium)**
- 35% of Pro users exceed plan limits — leaving revenue on the table
- A/B test usage tier to capture estimated $18K additional MRR
- Lower effort if launched as add-on rather than plan restructure

**Monitoring: API Stability**
- The TechFlow incident highlights need for better rate-limiting and abuse detection
- Recommend investing in API gateway improvements this quarter

*Confidence: 86%*`,
};

function findBestResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("churn") || q.includes("leaving") || q.includes("cancel"))
    return knowledgeBase.churn;
  if (q.includes("mrr") || q.includes("revenue") || q.includes("growth") || q.includes("money"))
    return knowledgeBase.mrr;
  if (q.includes("risk") || q.includes("danger") || q.includes("at risk") || q.includes("customer"))
    return knowledgeBase.risk;
  if (q.includes("retention") || q.includes("retain") || q.includes("keep"))
    return knowledgeBase.retention;
  if (q.includes("anomal") || q.includes("spike") || q.includes("unusual") || q.includes("week"))
    return knowledgeBase.anomalies;
  if (q.includes("priorit") || q.includes("next quarter") || q.includes("focus") || q.includes("should"))
    return knowledgeBase.priorities;

  return `Great question! Let me analyze your business data to provide an answer.

Based on the current metrics:
- **MRR:** $284.5K (+12.5% MoM) — strong upward trajectory
- **Churn:** 3.2% (-0.8pp) — improving but Starter tier needs attention
- **NPS:** 72 (+5) — highest in 12 months

The overall health of your SaaS business is **strong**, with Enterprise tier driving growth and customer satisfaction trending upward. The main area of concern is the Starter tier, where churn risk is concentrated.

Would you like me to drill deeper into any specific area? I can analyze churn patterns, revenue drivers, customer risk profiles, or provide strategic recommendations.

*Confidence: 82%*`;
}

export async function* streamChatResponse(
  query: string
): AsyncGenerator<string, void, unknown> {
  const response = findBestResponse(query);
  const words = response.split(" ");

  // Simulate initial "thinking" delay
  await sleep(400 + Math.random() * 300);

  // Stream words with variable speed
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    yield word + (i < words.length - 1 ? " " : "");
    // Variable delay: faster for common words, slower for markdown/numbers
    const delay = /[|*#\d]/.test(word) ? 30 + Math.random() * 30 : 15 + Math.random() * 25;
    await sleep(delay);
  }
}

export function getConfidenceForQuery(query: string): number {
  const q = query.toLowerCase();
  if (q.includes("churn")) return 87;
  if (q.includes("mrr") || q.includes("revenue")) return 94;
  if (q.includes("risk")) return 91;
  if (q.includes("retention")) return 90;
  if (q.includes("anomal")) return 93;
  if (q.includes("priorit")) return 86;
  return 82;
}
