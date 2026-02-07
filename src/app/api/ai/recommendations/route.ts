import { NextResponse } from "next/server";
import { getRecommendations } from "@/services/ai-simulator";

export async function GET() {
  const recommendations = await getRecommendations();
  return NextResponse.json(recommendations);
}
