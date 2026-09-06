import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { searchKnowledge } from "@/lib/ai/search";

export const runtime = "nodejs";

const openrouter = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL!,
});

export async function POST(req: Request) {
  try {
    const { messages } =
      await req.json();

    const latestMessage =
      messages.at(-1)?.content ?? "";

    const knowledge =
      await searchKnowledge(
        latestMessage
      );

    const { text } =
      await generateText({
    model: openrouter(
  "google/gemma-4-26b-a4b-it:free"
),
        system: `
${SYSTEM_PROMPT}

${knowledge.context}
`,

        messages,

        temperature: 0.3,

        maxOutputTokens: 800,
      });

    return Response.json({
      success: true,

      reply: text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,

        reply:
          "Sorry, I couldn't generate a response right now.",

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}