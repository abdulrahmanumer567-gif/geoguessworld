import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, RefreshCw, Brain, Check, X, HelpCircle } from "lucide-react";
import { reverseTurn } from "@/lib/game.functions";

export const Route = createFileRoute("/reverse")({
  head: () => ({ meta: [{ title: "Reverse mode — Globe Guesser" }] }),
  component: Reverse,
});

type Answer = "yes" | "no" | "unsure";
type Turn =
  | { kind: "question"; text: string; answer?: Answer }
  | { kind: "guess"; country: string; correct?: boolean };

function Reverse() {
  const call = useServerFn(reverseTurn);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<"win" | "lose" | null>(null);
  const [guessCount, setGuessCount] = useState(0);

  async function ask(history: { question: string; answer: Answer }[], guesses: number) {
    setLoading(true);
    try {
      const res = await call({ data: { history, guessCount: guesses } });
      if (res.type === "question") {
        setTurns((t) => [...t, { kind: "question", text: res.text }]);
      } else {
        setTurns((t) => [...t, { kind: "guess", country: res.country }]);
      }
    } catch (e) {
      setTurns((t) => [
        ...t,
        { kind: "question", text: e instanceof Error ? e.message : "Hmm, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    ask([], 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function answerQuestion(a: Answer) {
    setTurns((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.kind === "question" && !last.answer) {
        next[next.length - 1] = { ...last, answer: a };
      }
      const history = next
        .filter((t): t is Extract<Turn, { kind: "question" }> => t.kind === "question" && !!t.answer)
        .map((t) => ({ question: t.text, answer: t.answer! }));
      // schedule next
      if (history.length >= 15) {
        setDone("lose");
      } else {
        setTimeout(() => ask(history, guessCount), 50);
      }
      return next;
    });
  }

  function respondToGuess(correct: boolean) {
    setTurns((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.kind === "guess") {
        next[next.length - 1] = { ...last, correct };
      }
      if (correct) {
        setDone("win");
      } else {
        const newCount = guessCount + 1;
        setGuessCount(newCount);
        const history = next
          .filter((t): t is Extract<Turn, { kind: "question" }> => t.kind === "question" && !!t.answer)
          .map((t) => ({ question: t.text, answer: t.answer! }));
        if (newCount >= 3 || history.length >= 15) {
          setDone("lose");
        } else {
          setTimeout(() => ask(history, newCount), 50);
        }
      }
      return next;
    });
  }

  function reset() {
    setTurns([]);
    setDone(null);
    setGuessCount(0);
    ask([], 0);
  }

  const last = turns[turns.length - 1];
  const awaitingAnswer = !done && !loading && last?.kind === "question" && !last.answer;
  const awaitingGuessReply = !done && !loading && last?.kind === "guess" && last.correct === undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
      <nav className="mb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground active:opacity-60">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
          <Brain className="h-3.5 w-3.5 text-accent" />
          Turn {turns.filter((t) => t.kind === "question").length}/15
        </div>
      </nav>

      <header className="mb-4">
        <h1 className="text-2xl font-bold">Think of a country</h1>
        <p className="text-sm text-muted-foreground">The AI will try to guess it by asking questions.</p>
      </header>

      <section className="mb-4 flex flex-1 flex-col gap-3 overflow-y-auto">
        {turns.map((t, i) => (
          <div key={i} className="animate-pop-in">
            {t.kind === "question" ? (
              <div className="glass-card p-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">AI asks</div>
                <div className="mt-1 text-[15px]">{t.text}</div>
                {t.answer && (
                  <div className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs">
                    You: {t.answer}
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-card border-accent/40 p-3"
                   style={{ borderColor: "color-mix(in oklab, var(--color-accent) 50%, var(--color-border))" }}>
                <div className="text-xs uppercase tracking-wide text-accent">AI guesses</div>
                <div className="mt-1 text-lg font-semibold">{t.country}?</div>
                {t.correct !== undefined && (
                  <div className="mt-1 text-sm">{t.correct ? "✅ Correct!" : "❌ Wrong"}</div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" /> Thinking…
          </div>
        )}
      </section>

      {awaitingAnswer && (
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => answerQuestion("yes")} className="btn-ghost flex items-center justify-center gap-1 active:opacity-70">
            <Check className="h-4 w-4 text-success" /> Yes
          </button>
          <button onClick={() => answerQuestion("no")} className="btn-ghost flex items-center justify-center gap-1 active:opacity-70">
            <X className="h-4 w-4 text-destructive" /> No
          </button>
          <button onClick={() => answerQuestion("unsure")} className="btn-ghost flex items-center justify-center gap-1 active:opacity-70">
            <HelpCircle className="h-4 w-4" /> Unsure
          </button>
        </div>
      )}

      {awaitingGuessReply && (
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => respondToGuess(true)} className="btn-primary active:opacity-90">
            Yes, you got it!
          </button>
          <button onClick={() => respondToGuess(false)} className="btn-ghost active:opacity-70">
            Nope
          </button>
        </div>
      )}

      {done && (
        <div className="animate-pop-in">
          <div className="glass-card mb-3 p-4 text-center">
            <div className="text-lg font-semibold">
              {done === "win" ? "🎉 The AI got it!" : "🏆 You stumped the AI!"}
            </div>
          </div>
          <button onClick={reset} className="btn-primary flex w-full items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4" /> Play again
          </button>
        </div>
      )}
    </main>
  );
}
