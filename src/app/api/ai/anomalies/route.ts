import { NextResponse } from "next/server";
import { detectAnomalies } from "@/services/ai-simulator";

export async function GET() {
  const anomalies = await detectAnomalies();
  return NextResponse.json(anomalies);
}
