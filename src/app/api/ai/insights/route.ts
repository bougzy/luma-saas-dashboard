import { NextResponse } from "next/server";
import { generateInsights } from "@/services/ai-simulator";

export async function GET() {
  const insights = await generateInsights();
  return NextResponse.json(insights);
}
