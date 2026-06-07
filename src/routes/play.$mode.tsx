import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Lightbulb, Send, Trophy, RefreshCw, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { askQuestion, startRound } from "@/lib/game.functions";
import { matchesCountry, type Country } from "@/lib/countries";

export const Route = createFileRoute("/play/$mode")({
  head: ({ params }) => ({
    meta: [{ title: `${params.mode[0].toUpperCase() + params.mode.slice(1)} mode — Globe Guesser` }],
  }),
  component: Play,
});

type Secret = { name: string; capital: string; continent: string; flag: string };

const POINTS = { easy: 50, medium: 80, hard: 120 } as const;

function Play() {
  const { mode } = Route.useParams();
  const difficulty = (mode === "easy" || mode === "medium" || mode === "hard" ? mode : "easy") as
    | "easy" | "medium" | "hard";
  const callStart = useServerFn(startRound);
  const callAsk = useServerFn(askQuestion);

  const [tab, setTab] = useState<"guess" | "ask">("guess");
  const [question, setQuestion] = useState("");
  const [qaLog, setQaLog] = useState<Array<{ q: string; a: string }>>([]);
  const [asking, setAsking] = useState(false);

  const [secret, setSecret] = useState<Secret | null>(null);
  const [clues, setClues] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(1);
  const [guess, setGuess] = useState("");
  const [tries, setTries] = useState(0);
  const [feedback, setFeedback] = useState<{ kind: "wrong" | "right" | "give-up"; msg: string } | null>(null);
  const [score, setScore] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem(`gg_score_${difficulty}`) ?? 0);
  });
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  async function newRound() {
    setLoading(true);
    setFeedback(null);
    setGuess("");
    setRevealed(1);
    setTries(0);
    try {
      const data = await callStart({ data: { difficulty } });
      setSecret(data.country);
      setClues(data.clues);
    } catch (e) {
      setFeedback({ kind: "wrong", msg: e instanceof Error ? e.message : "Failed to start" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    newRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  function persistScore(newScore: number) {
    setScore(newScore);
    if (typeof window !== "undefined") {
      localStorage.setItem(`gg_score_${difficulty}`, String(newScore));
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!secret || !guess.trim() || feedback?.kind === "right") return;
    const fakeCountry = { ...secret, difficulty } as Country;
    if (matchesCountry(guess, fakeCountry)) {
      const earned = Math.max(10, POINTS[difficulty] - (revealed - 1) * 15 - tries * 5);
      persistScore(score + earned);
      setFeedback({ kind: "right", msg: `Correct! +${earned} points` });
    } else {
      const newTries = tries + 1;
      setTries(newTries);
      setGuess("");
      if (revealed < clues.length) setRevealed(revealed + 1);
      setFeedback({
        kind: "wrong",
        msg: revealed < clues.length ? "Not quite — here's another clue." : "Not quite!",
      });
      inputRef.current?.focus();
    }
  }

  function giveUp() {
    if (!secret) return;
    setFeedback({ kind: "give-up", msg: `It was ${secret.flag} ${secret.name}` });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
      <nav className="mb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground active:opacity-60">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium">
          <Trophy className="h-4 w-4 text-accent" />
          <span>{score}</span>
        </div>
      </nav>

      <header className="mb-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{difficulty} mode</div>
        <h1 className="text-2xl font-bold">Guess the country</h1>
      </header>

      <section className="glass-card mb-4 p-4">
        {loading ? (
          <div className="flex items-center gap-3 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" /> The host is thinking…
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {clues.slice(0, revealed).map((c, i) => (
              <li key={i} className="animate-pop-in flex gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {i + 1}
                </div>
                <p className="text-[15px] leading-snug">{c}</p>
              </li>
            ))}
            {revealed < clues.length && feedback?.kind !== "right" && (
              <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5" />
                {clues.length - revealed} more clue{clues.length - revealed === 1 ? "" : "s"} available — guess to unlock
              </li>
            )}
          </ul>
        )}
      </section>

      {feedback && (
        <div
          className={`glass-card mb-4 animate-pop-in p-4 text-sm ${
            feedback.kind === "right"
              ? "border-success/40 text-success"
              : feedback.kind === "give-up"
                ? "text-accent"
                : "text-destructive"
          }`}
        >
          {feedback.msg}
        </div>
      )}

      {feedback?.kind === "right" || feedback?.kind === "give-up" ? (
        <button onClick={newRound} className="btn-primary mt-auto flex items-center justify-center gap-2 active:opacity-90">
          <RefreshCw className="h-4 w-4" /> Next country
        </button>
      ) : (
        <div className="mt-auto">
          <div className="mb-3 grid grid-cols-2 gap-2 rounded-xl bg-secondary p-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setTab("guess")}
              className={`rounded-lg py-2 transition ${tab === "guess" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >
              Guess
            </button>
            <button
              type="button"
              onClick={() => setTab("ask")}
              className={`flex items-center justify-center gap-1 rounded-lg py-2 transition ${tab === "ask" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >
              <HelpCircle className="h-4 w-4" /> Ask
            </button>
          </div>

          {tab === "guess" ? (
            <>
              <form onSubmit={submit} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Type a country…"
                  autoComplete="off"
                  className="flex-1 rounded-xl border border-border bg-input px-4 py-3 text-[16px] outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="btn-primary flex h-12 w-12 items-center justify-center px-0"
                  aria-label="Submit guess"
                  disabled={loading || !guess.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              <button onClick={giveUp} className="mt-2 text-xs text-muted-foreground active:opacity-60">
                Give up
              </button>
            </>
          ) : (
            <>
              {qaLog.length > 0 && (
                <ul className="mb-3 flex max-h-56 flex-col gap-2 overflow-y-auto">
                  {qaLog.map((item, i) => (
                    <li key={i} className="animate-pop-in">
                      <div className="text-xs text-muted-foreground">You: {item.q}</div>
                      <div className="rounded-xl bg-secondary px-3 py-2 text-sm">{item.a}</div>
                    </li>
                  ))}
                </ul>
              )}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!secret || !question.trim() || asking) return;
                  const q = question.trim();
                  setAsking(true);
                  setQuestion("");
                  try {
                    const res = await callAsk({ data: { question: q, country: secret } });
                    setQaLog((prev) => [...prev, { q, a: res.answer }]);
                  } catch (err) {
                    setQaLog((prev) => [
                      ...prev,
                      { q, a: err instanceof Error ? err.message : "Couldn't answer." },
                    ]);
                  } finally {
                    setAsking(false);
                  }
                }}
                className="flex gap-2"
              >
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Which continent? What colors?"
                  autoComplete="off"
                  disabled={asking || loading}
                  className="flex-1 rounded-xl border border-border bg-input px-4 py-3 text-[16px] outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="btn-primary flex h-12 w-12 items-center justify-center px-0"
                  aria-label="Ask question"
                  disabled={asking || loading || !question.trim()}
                >
                  {asking ? <RefreshCw className="h-5 w-5 animate-spin" /> : <MessageCircleQuestion className="h-5 w-5" />}
                </button>
              </form>
              <p className="mt-2 text-xs text-muted-foreground">
                Ask about the continent, colors, animals, food — but not the name!
              </p>
            </>
          )}
        </div>
      )}
    </main>
  );
}
