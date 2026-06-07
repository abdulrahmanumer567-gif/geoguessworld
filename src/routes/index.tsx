import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Sparkles, Brain } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Globe Guesser — AI Country Game" },
      { name: "description", content: "Guess countries from AI clues, or stump the AI in reverse mode." },
      { property: "og:title", content: "Globe Guesser — AI Country Game" },
      { property: "og:description", content: "A mobile-friendly AI country guessing game." },
    ],
  }),
  component: Home,
});

const modes = [
  { id: "easy", label: "Easy", desc: "Famous countries", color: "from-emerald-400 to-teal-500" },
  { id: "medium", label: "Medium", desc: "A solid challenge", color: "from-sky-400 to-indigo-500" },
  { id: "hard", label: "Hard", desc: "For globe experts", color: "from-fuchsia-500 to-rose-500" },
] as const;

function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10">
      <header className="mb-10 text-center animate-pop-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
             style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
          <Globe className="h-9 w-9 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Globe Guesser</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Guess countries from AI clues — or stump the AI yourself.
        </p>
      </header>

      <section className="animate-pop-in">
        <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          <Sparkles className="h-4 w-4" /> Play
        </h2>
        <div className="flex flex-col gap-3">
          {modes.map((m) => (
            <Link
              key={m.id}
              to="/play/$mode"
              params={{ mode: m.id }}
              className="glass-card group relative overflow-hidden p-5 transition active:scale-[0.98]"
            >
              <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${m.color} opacity-30 blur-2xl`} />
              <div className="relative">
                <div className="text-lg font-semibold">{m.label}</div>
                <div className="text-sm text-muted-foreground">{m.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 animate-pop-in">
        <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          <Brain className="h-4 w-4" /> Reverse mode
        </h2>
        <Link
          to="/reverse"
          className="glass-card group relative block overflow-hidden p-5 transition active:scale-[0.98]"
        >
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-accent to-primary opacity-30 blur-2xl" />
          <div className="relative">
            <div className="text-lg font-semibold">You think, AI guesses</div>
            <div className="text-sm text-muted-foreground">Pick a country in your head — the AI asks yes/no questions.</div>
          </div>
        </Link>
      </section>

      <footer className="mt-auto pt-10 text-center text-xs text-muted-foreground">
        Made with curiosity • 75+ countries
      </footer>
    </main>
  );
}
