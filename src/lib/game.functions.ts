import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { COUNTRIES, pickRandomCountry, type Country } from "./countries";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

async function callAI(messages: Array<{ role: string; content: string }>, opts?: { json?: boolean }) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI gateway not configured");
  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      ...(opts?.json ? { response_format: { type: "json_object" } } : {}),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI error ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as { choices: Array<{ message: { content: string } }> };
  return data.choices[0]?.message?.content ?? "";
}

// === Forward mode: AI picks a country and gives clues ===

export const startRound = createServerFn({ method: "POST" })
  .inputValidator(z.object({ difficulty: z.enum(["easy", "medium", "hard"]) }))
  .handler(async ({ data }) => {
    const country = pickRandomCountry(data.difficulty);
    const prompt = `You are a country guessing game host. The secret country is "${country.name}" (capital: ${country.capital}, continent: ${country.continent}).
Give 5 progressively easier clues to help the player guess. Clue 1 is the most cryptic, clue 5 is the easiest (but NEVER name the country or capital directly).
Do not mention the country's name in any clue. Capital may be mentioned only in clue 5.
Return strict JSON: {"clues": ["clue1","clue2","clue3","clue4","clue5"]}`;
    const content = await callAI(
      [
        { role: "system", content: "You are a fun trivia host. Always respond with valid JSON." },
        { role: "user", content: prompt },
      ],
      { json: true },
    );
    let clues: string[] = [];
    try {
      const parsed = JSON.parse(content);
      clues = parsed.clues ?? [];
    } catch {
      clues = ["Hmm, the host is thinking… Try guessing!"];
    }
    return {
      country: { name: country.name, capital: country.capital, continent: country.continent, flag: country.flag },
      clues,
    };
  });

// === Reverse mode: player thinks of a country, AI asks yes/no questions ===

const reverseTurnSchema = z.object({
  history: z.array(
    z.object({
      question: z.string(),
      answer: z.enum(["yes", "no", "unsure"]),
    }),
  ),
  guessCount: z.number().int().min(0).max(20),
});

export const reverseTurn = createServerFn({ method: "POST" })
  .inputValidator(reverseTurnSchema)
  .handler(async ({ data }) => {
    const countryList = COUNTRIES.map((c) => c.name).join(", ");
    const hist = data.history
      .map((h, i) => `Q${i + 1}: ${h.question} -> ${h.answer.toUpperCase()}`)
      .join("\n");
    const turn = data.history.length + 1;
    const shouldGuess = turn >= 8 || data.guessCount > 0;
    const prompt = `You are playing "20 Questions" to guess a country the player is thinking of.
The country is one of: ${countryList}.

History so far:
${hist || "(none yet)"}

It's turn ${turn} of 15. ${shouldGuess ? "You may either ask a yes/no question OR make a final guess." : "Ask a smart yes/no question to narrow down possibilities."}

Respond with strict JSON:
- To ask: {"type": "question", "text": "Is it in Europe?"}
- To guess: {"type": "guess", "country": "France"}

Be strategic: use continent, region, language, climate, size, fame, etc. Never repeat past questions.`;
    const content = await callAI(
      [
        { role: "system", content: "You are a clever guesser. Always respond with valid JSON." },
        { role: "user", content: prompt },
      ],
      { json: true },
    );
    try {
      const parsed = JSON.parse(content);
      if (parsed.type === "question" && typeof parsed.text === "string") {
        return { type: "question" as const, text: parsed.text };
      }
      if (parsed.type === "guess" && typeof parsed.country === "string") {
        return { type: "guess" as const, country: parsed.country };
      }
    } catch {
      // fallthrough
    }
    return { type: "question" as const, text: "Is your country in Europe?" };
  });

export type RoundCountry = Pick<Country, "name" | "capital" | "continent" | "flag">;
