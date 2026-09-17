"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: number;
  trait: string;
  statement: string;
}

const questions: Question[] = [
  {
    id: 1,
    trait: "Extraversion",
    statement: "I am usually the life of the party and energized by crowds.",
  },
  {
    id: 2,
    trait: "Agreeableness",
    statement: "I deeply sympathize with other people's feelings and perspectives.",
  },
  {
    id: 3,
    trait: "Conscientiousness",
    statement: "I keep my commitments and get tasks done without procrastinating.",
  },
  {
    id: 4,
    trait: "Emotional Stability",
    statement: "I easily get stressed, anxious, or overwhelmed under pressure.",
  },
  {
    id: 5,
    trait: "Openness",
    statement: "I have a vivid imagination and enjoy exploring unconventional ideas.",
  },
  {
    id: 6,
    trait: "Extraversion",
    statement: "I tend to stay in the background in social gatherings.",
  },
  {
    id: 7,
    trait: "Emotional Stability",
    statement: "I remain calm and level-headed even when things go wrong.",
  },
  {
    id: 8,
    trait: "Openness",
    statement: "I am eager to try new experiences, cuisines, and spontaneous activities.",
  },
];

const options = [
  { label: "Disagree strongly", value: 1 },
  { label: "Disagree a little", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree a little", value: 4 },
  { label: "Agree strongly", value: 5 },
];

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (value: number) => {
    const updated = {
      ...answers,
      [currentQ.id]: value,
    };
    setAnswers(updated);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Quiz completed — log answers to console per Phase 1 instructions
      console.log("Quiz completed. Captured answers:", updated);
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isCompleted) {
    return (
      <main className="flex min-h-screen flex-col justify-between p-6 sm:p-8 max-w-md mx-auto">
        <header className="pt-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-foreground/50">
            Rabbit Hole · Assessment Complete
          </span>
        </header>

        <section className="my-auto py-8 text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Personality Baseline Captured
          </h1>
          <p className="mt-3 text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto">
            All 8 questions answered. Your responses are stored in component
            state and logged to the console for calibration.
          </p>

          <div className="mt-6 p-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] text-left">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-2">
              Captured Responses:
            </h2>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-2 rounded-lg border border-foreground/10 bg-background"
                >
                  <span className="block text-foreground/50 text-[10px]">Q{q.id}</span>
                  <span className="font-semibold text-foreground">
                    {answers[q.id] ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 pb-6">
          <Link
            href="/feed"
            className="w-full text-center py-3.5 px-6 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Continue to Feed
          </Link>
          <Link
            href="/"
            className="w-full text-center py-2.5 px-6 rounded-xl border border-foreground/20 text-foreground font-semibold text-xs hover:bg-foreground/5 transition-colors"
          >
            Back to Home
          </Link>
        </footer>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 sm:p-8 max-w-md mx-auto">
      {/* Top Header & Progress */}
      <header className="pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-foreground/50">
          <span className="font-semibold tracking-wider uppercase">
            Personality Quiz
          </span>
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Question Content */}
      <section className="my-auto py-8">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/5 text-foreground/60 mb-4 border border-foreground/10">
          {currentQ.trait}
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground leading-snug">
          &ldquo;{currentQ.statement}&rdquo;
        </h1>

        {/* Options */}
        <div className="mt-8 flex flex-col gap-2.5">
          {options.map((opt) => {
            const isSelected = answers[currentQ.id] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelectOption(opt.value)}
                className={`w-full text-left py-3.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  isSelected
                    ? "border-foreground bg-foreground text-background shadow-sm"
                    : "border-foreground/15 bg-background text-foreground hover:border-foreground/40 hover:bg-foreground/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.label}</span>
                  <span
                    className={`text-xs ${
                      isSelected ? "text-background/70" : "text-foreground/40"
                    }`}
                  >
                    {opt.value}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Navigation Footer */}
      <footer className="flex items-center justify-between pt-4 pb-6">
        {currentIndex > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground border border-foreground/15 hover:bg-foreground/5 transition-colors"
          >
            ← Previous
          </button>
        ) : (
          <Link
            href="/onboarding"
            className="text-xs font-medium text-foreground/50 hover:text-foreground transition-colors"
          >
            ← Back to Onboarding
          </Link>
        )}
        <span className="text-xs text-foreground/40">
          Tap an option to proceed
        </span>
      </footer>
    </main>
  );
}
