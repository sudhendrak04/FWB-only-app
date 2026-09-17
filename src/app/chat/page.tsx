"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ChatContent() {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("matchId");

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 sm:p-8 max-w-md mx-auto">
      <header className="pt-4 flex items-center justify-between text-xs text-foreground/50">
        <Link href="/feed" className="hover:text-foreground transition-colors font-medium">
          ← Back to Feed
        </Link>
        <span className="font-semibold tracking-wider uppercase">Rabbit Hole · Chat</span>
      </header>

      <section className="my-auto py-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-xl">
          💬
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Conversations
        </h1>
        {matchId ? (
          <div className="mt-3 p-3 rounded-xl bg-foreground/5 border border-foreground/10 text-xs text-foreground/80 max-w-xs mx-auto">
            Conversation opened for match: <span className="font-semibold">{matchId}</span>
          </div>
        ) : (
          <p className="mt-2 text-sm text-foreground/60 max-w-xs mx-auto">
            Direct messaging with verified mutual matches — coming in Phase 1.
          </p>
        )}
      </section>

      <footer className="pb-6">
        <Link
          href="/feed"
          className="block w-full text-center py-3.5 px-6 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Return to Feed
        </Link>
      </footer>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center p-6 text-xs text-foreground/50">
          Loading conversation...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
