"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Slide {
  badge: string;
  title: string;
  description: string;
  highlight: string;
}

const slides: Slide[] = [
  {
    badge: "01 / The Problem",
    title: "Dating apps monetize staying single.",
    description:
      "Traditional dating apps thrive when you stay lonely. Endless swiping, superficial matches, and zero accountability are deliberate features of a business model built to keep you scrolling.",
    highlight: "Swiping is engagement for them, not outcomes for you.",
  },
  {
    badge: "02 / The Shift",
    title: "We reward you for leaving the app.",
    description:
      "Rabbit Hole flips the incentive entirely. Our core currency is verified real-world dates, not swipe volume or screen time. When you actually meet up offline, your profile and compatibility level up.",
    highlight: "Success means getting off your phone and onto real dates.",
  },
  {
    badge: "03 / The Standard",
    title: "Zero ghosting. Mutual accountability.",
    description:
      "No public leaderboards, toxic rankings, or artificial streaks. Just genuine connection, double-confirmed meetups, and real consequences for ghosting. Built to get you into the real world.",
    highlight: "Dates double-confirmed by both people in real life.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const isLast = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.push("/quiz");
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 sm:p-8 max-w-md mx-auto">
      {/* Top Header & Progress */}
      <header className="flex items-center justify-between pt-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-foreground/50">
          Rabbit Hole
        </span>
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "w-8 bg-foreground"
                  : "w-2 bg-foreground/20"
              }`}
            />
          ))}
        </div>
        <Link
          href="/quiz"
          className="text-xs font-medium text-foreground/50 hover:text-foreground transition-colors"
        >
          Skip
        </Link>
      </header>

      {/* Main Slide Content */}
      <section className="my-auto py-8">
        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-foreground/5 text-foreground/70 mb-4 border border-foreground/10">
          {slide.badge}
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
          {slide.title}
        </h1>
        <p className="mt-4 text-base text-foreground/70 leading-relaxed">
          {slide.description}
        </p>
        <div className="mt-6 p-4 rounded-xl border border-foreground/10 bg-foreground/[0.02]">
          <p className="text-sm font-medium text-foreground/90 italic">
            &ldquo;{slide.highlight}&rdquo;
          </p>
        </div>
      </section>

      {/* Navigation Footer */}
      <footer className="flex flex-col gap-3 pb-6">
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-3 rounded-xl border border-foreground/20 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors"
            >
              Back
            </button>
          )}
          {isLast ? (
            <Link
              href="/quiz"
              className="flex-1 text-center py-3.5 px-6 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3.5 px-6 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Next
            </button>
          )}
        </div>
        <p className="text-center text-xs text-foreground/40">
          Step {currentSlide + 1} of {slides.length}
        </p>
      </footer>
    </main>
  );
}
