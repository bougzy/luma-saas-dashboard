# Lumina — AI-Powered SaaS Dashboard

An enterprise-grade SaaS dashboard built with Next.js App Router, featuring AI-driven business intelligence, real-time analytics, and a conversational AI assistant.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS (Dark mode, Glassmorphism)
- **Charts:** Recharts
- **Animations:** Framer Motion
- **UI Primitives:** Radix UI
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Features

### Dashboard
- MRR, Churn, ARPU, and NPS metric cards with sparkline history
- Revenue vs Churn area chart (12-month trend)
- AI-generated insight feed with confidence indicators

### Analytics
- Conversion funnel visualization (Visitor → Retained)
- Retention cohort heatmap table
- AI-powered strategic recommendations

### Customers
- Searchable customer table with health indicators
- Filter by health status (Healthy, At Risk, Churning)
- Risk score visualization per account

### Risk Center
- Security alerts with severity levels and resolution status
- Churn vulnerability tracker with predicted dates
- AI-detected anomalies with deviation metrics

### Lumina AI Assistant
- Sliding chat panel with streaming responses
- Suggested question chips
- Confidence indicators on all AI outputs
- Context-aware responses about business metrics

## AI Abstraction Strategy

The AI system uses a **simulator pattern** that can be swapped for a real LLM:

```
src/services/ai-simulator.ts   ← Current: heuristic-based responses
src/app/api/ai/                 ← API routes (insights, anomalies, recommendations, chat)
```

### How it works now (Simulator)

1. **Insight Generation** — Returns pre-analyzed business observations categorized as Risk, Performance, Recommendation, or Anomaly
2. **Anomaly Detection** — Compares expected vs actual values using mock thresholds
3. **Chat Streaming** — Pattern-matches user queries to knowledge base entries and streams word-by-word via SSE
4. **Confidence Scores** — Assigned per-query based on topic match quality

### Replacing with a real LLM (e.g., Gemini)

To integrate Google Gemini or another LLM:

1. Install the SDK: `npm install @google/genai`
2. Replace `ai-simulator.ts` with a new `ai-service.ts`:

```typescript
// src/services/ai-service.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateInsights(businessData: object) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash",
    contents: `Analyze this SaaS data and return insights as JSON:\n${JSON.stringify(businessData)}`,
  });
  return JSON.parse(response.text);
}
```

3. Update the API routes to call the new service
4. For streaming chat, use `ai.models.generateContentStream()` in the `/api/ai/chat` route

The API route signatures remain identical — the frontend requires no changes.

## API Routes

| Endpoint | Method | Description |
|---|---|---|
| `/api/ai/insights` | GET | Business performance insights |
| `/api/ai/anomalies` | GET | Detected metric anomalies |
| `/api/ai/recommendations` | GET | Strategic action recommendations |
| `/api/ai/chat` | POST | Streaming conversational AI (SSE) |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/ai/             # AI API routes
│   ├── analytics/          # Analytics view
│   ├── customers/          # Customer management
│   ├── risk/               # Risk center
│   ├── settings/           # Settings
│   └── help/               # Help center
├── components/
│   ├── layout/             # Sidebar, Header, ClientShell
│   ├── dashboard/          # Metric cards, charts, insight feed
│   ├── analytics/          # Funnel, retention, recommendations
│   ├── customers/          # Customer table
│   ├── risk/               # Security alerts, churn risks
│   ├── ai/                 # Chat panel
│   └── ui/                 # Shared UI (skeleton, confidence badge)
├── hooks/                  # React context (DashboardProvider)
├── services/               # AI simulator service
├── types/                  # TypeScript type definitions
└── lib/                    # Utilities and mock data
```

## Design System

- **Background:** Slate-950 (#020617)
- **Cards:** Glassmorphism with `backdrop-blur-xl` and `border-white/10`
- **Primary:** Indigo-600 (#4f46e5)
- **Growth:** Emerald-500 (#10b981)
- **Risk:** Rose-500 (#f43f5e)
- **Border Radius:** 1.5rem (24px) on all containers
- **AI Shimmer:** Animated gradient on AI-generated content
