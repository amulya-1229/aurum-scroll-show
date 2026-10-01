import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { menu } from "@/data/menu";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server";

const MODEL = "openai/gpt-6-astra";

function buildSystemPrompt() {
  const menuText = menu
    .map(
      (c) =>
        `## ${c.name}\n` +
        c.items
          .map((i) => `- ${i.name} — ₹${i.price} — ${i.vegetarian ? "Vegetarian" : "Non-vegetarian"} — Spice: ${i.spice}`)
          .join("\n"),
    )
    .join("\n\n");
  return `You are the friendly host of Aurum, a contemporary Indian restaurant in Central Bengaluru, Karnataka, India. Greet guests warmly and help them with anything about the restaurant and its dishes.

Restaurant facts:
- Name: Aurum — contemporary Indian dining with jewel-toned interiors and warm light.
- Location: Central Bengaluru, Karnataka, India.
- Hours: open daily, lunch 12:00–3:00 pm and dinner 7:00–11:00 pm.
- Phone: +91 80 0000 0000. Email: hello@aurum.example.
- Guests can browse the Menu page, order online on the Order page (₹40 delivery fee), book a table on the Reservations page, and send enquiries on the Contact page.

Full menu (prices in INR):
${menuText}

Guidelines:
- Only recommend dishes from this menu, with correct prices, diet and spice level. Describe dishes appetisingly using common knowledge of Indian cuisine (ingredients, cooking style, region).
- Help with vegetarian choices, spice preferences, pairings and budgets.
- For allergies, advise the guest to confirm with staff.
- If you don't know something (e.g. parking, offers), say so and suggest calling or emailing.
- Keep answers short, warm and well formatted with markdown.`;
}

export async function handleChat(request: Request) {
  let messages: UIMessage[];
  try {
    const body = (await request.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages)) throw new Error();
    messages = body.messages as UIMessage[];
  } catch {
    return new Response("Invalid request", { status: 400 });
  }
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) return new Response("Chat is not configured", { status: 500 });

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses(MODEL),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: false,
      onError: (e) => {
        const status = (e as { statusCode?: number })?.statusCode;
        if (status === 429) return "Our host is busy right now — please try again in a moment.";
        if (status === 402) return "The chat assistant is temporarily unavailable.";
        return "Sorry, something went wrong. Please try again.";
      },
    }),
    runIdFetch,
  );
}
