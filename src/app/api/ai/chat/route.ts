import { NextRequest } from "next/server";
import { streamChatResponse, getConfidenceForQuery } from "@/services/ai-simulator";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const confidence = getConfidenceForQuery(message);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send confidence as first chunk
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "confidence", value: confidence })}\n\n`)
      );

      for await (const word of streamChatResponse(message)) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "token", value: word })}\n\n`)
        );
      }

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`)
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
