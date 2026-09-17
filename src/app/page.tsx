import Link from "next/link";

const routes = [
  { href: "/onboarding", label: "Onboarding" },
  { href: "/quiz", label: "Personality Quiz" },
  { href: "/feed", label: "Feed" },
  { href: "/chat", label: "Chat" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Rabbit Hole</h1>
        <p className="mt-3 max-w-md text-foreground/60">
          The dating app whose core currency is verified real-world dates, not
          swipes.
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-3">
        {routes.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-lg border border-foreground/10 px-4 py-2 text-sm transition-colors hover:bg-foreground/5"
          >
            {label}
          </Link>
        ))}
      </nav>

      <p className="text-xs text-foreground/40">
        Phase 1 — Prototype · Foundation scaffold
      </p>
    </main>
  );
}
