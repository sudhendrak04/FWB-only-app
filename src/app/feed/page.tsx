"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Prompt {
  question: string;
  answer: string;
}

interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  bio: string;
  avatarBg: string;
  initials: string;
  prompts: Prompt[];
  isMutual: boolean;
}

const SEED_PROFILES: Profile[] = [
  {
    id: "maya-1",
    name: "Maya Lin",
    age: 26,
    location: "Downtown",
    occupation: "UX Designer",
    bio: "Here to spend less time texting and more time checking out local speakeasies.",
    avatarBg: "from-amber-500/20 to-orange-500/20 text-orange-400",
    initials: "ML",
    prompts: [
      {
        question: "My simple pleasures",
        answer: "Espresso at 7 AM before anyone else wakes up, and finding old paperbacks in dusty thrift shops.",
      },
      {
        question: "Together, we could",
        answer: "Hit up hidden speakeasies with zero phone checking and deep conversation.",
      },
    ],
    isMutual: false,
  },
  {
    id: "marcus-2",
    name: "Marcus Chen",
    age: 28,
    location: "North Quarter",
    occupation: "Architectural Photographer",
    bio: "Looking for someone who actually shows up on time and appreciates good lighting.",
    avatarBg: "from-blue-500/20 to-cyan-500/20 text-cyan-400",
    initials: "MC",
    prompts: [
      {
        question: "The key to my heart is",
        answer: "Spontaneous street taco runs and clear, honest communication.",
      },
      {
        question: "A non-negotiable for me",
        answer: "Zero ghosting. If the spark isn't there, just say so with respect — no hard feelings ever.",
      },
      {
        question: "I'll know it's a great date if",
        answer: "We lose complete track of time and the restaurant starts quietly stacking chairs around us.",
      },
    ],
    isMutual: true, // Mutual Match 1
  },
  {
    id: "priya-3",
    name: "Priya Sharma",
    age: 25,
    location: "West End",
    occupation: "Biotech Researcher",
    bio: "Lab rat by day, culinary experimenter by night.",
    avatarBg: "from-purple-500/20 to-pink-500/20 text-pink-400",
    initials: "PS",
    prompts: [
      {
        question: "Dating me is like",
        answer: "Getting nerd-sniped by science podcasts, followed by late-night spicy noodle runs.",
      },
      {
        question: "Best real-world date idea",
        answer: "Thursday night museum walk followed by a rooftop debrief over ginger beer.",
      },
    ],
    isMutual: false,
  },
  {
    id: "alex-4",
    name: "Alex Rivera",
    age: 29,
    location: "Greenpoint",
    occupation: "Landscape Architect",
    bio: "Fixated on urban biodiversity and good coffee.",
    avatarBg: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
    initials: "AR",
    prompts: [
      {
        question: "I won't shut up about",
        answer: "Why cities need more pocket parks and native wildflowers instead of sterile lawns.",
      },
      {
        question: "Together, we could",
        answer: "Wake up early for the Saturday farmers market and bake sourdough from scratch.",
      },
    ],
    isMutual: false,
  },
  {
    id: "elena-5",
    name: "Elena Rostova",
    age: 27,
    location: "South Bank",
    occupation: "Product Strategist",
    bio: "Firm believer that 15 minutes of in-person conversation beats 3 weeks of messaging.",
    avatarBg: "from-rose-500/20 to-red-500/20 text-rose-400",
    initials: "ER",
    prompts: [
      {
        question: "My golden rule",
        answer: "Offline chemistry beats texting back and forth for weeks every single time.",
      },
      {
        question: "A shower thought I had recently",
        answer: "We spend so much effort optimizing our phone screens that we forget how to look someone in the eyes.",
      },
      {
        question: "Together, we could",
        answer: "Plan an impromptu weekend road trip without opening any review apps.",
      },
    ],
    isMutual: true, // Mutual Match 2
  },
  {
    id: "samir-6",
    name: "Samir Patel",
    age: 28,
    location: "Arts District",
    occupation: "Indie Game Developer",
    bio: "Building worlds with pixels, looking for someone real in the physical world.",
    avatarBg: "from-indigo-500/20 to-violet-500/20 text-indigo-400",
    initials: "SP",
    prompts: [
      {
        question: "Teach me something about",
        answer: "Whatever niche rabbit hole you obsessed over this past week.",
      },
      {
        question: "I'm convinced that",
        answer: "Board games reveal someone's true personality way faster than five polite dinners.",
      },
    ],
    isMutual: false,
  },
  {
    id: "chloe-7",
    name: "Chloe Dubois",
    age: 26,
    location: "Market Square",
    occupation: "Artisan Baker",
    bio: "Early riser. Flour on my apron, always hunting for vintage vinyl.",
    avatarBg: "from-yellow-500/20 to-amber-500/20 text-yellow-400",
    initials: "CD",
    prompts: [
      {
        question: "The quickest way to get me out of the house",
        answer: "A new small-batch pastry shop or free live jazz in the courtyard.",
      },
      {
        question: "A non-negotiable for me",
        answer: "Basic kindness to restaurant and retail staff. It tells you everything you need to know.",
      },
    ],
    isMutual: false,
  },
  {
    id: "david-8",
    name: "David Kim",
    age: 30,
    location: "Old Town",
    occupation: "Documentary Filmmaker",
    bio: "Telling stories about interesting humans. Looking for someone grounded and curious.",
    avatarBg: "from-sky-500/20 to-blue-500/20 text-sky-400",
    initials: "DK",
    prompts: [
      {
        question: "The best date I ever planned",
        answer: "Rented cruiser bikes at 5 AM, grabbed warm croissants, and watched the harbor sunrise.",
      },
      {
        question: "Why Rabbit Hole",
        answer: "Completely exhausted by endless digital pen pals who vanish the second you propose coffee.",
      },
      {
        question: "I'll know we click when",
        answer: "The conversation doesn't feel like a curated job interview.",
      },
    ],
    isMutual: true, // Mutual Match 3
  },
  {
    id: "zoe-9",
    name: "Zoe Vance",
    age: 24,
    location: "Mill District",
    occupation: "Ceramicist",
    bio: "Working with clay, messy hands, patient with things that take time to cure.",
    avatarBg: "from-stone-500/20 to-neutral-500/20 text-neutral-300",
    initials: "ZV",
    prompts: [
      {
        question: "My simple pleasures",
        answer: "Natural studio light, wheel throwing, and black pour-over coffee.",
      },
      {
        question: "Together, we could",
        answer: "Take a pottery throwing workshop and laugh at how lopsided our first attempts are.",
      },
    ],
    isMutual: false,
  },
];

const STORAGE_KEY = "rabbit_hole_feed_state_v1";

export default function FeedPage() {
  const router = useRouter();
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [passedIds, setPassedIds] = useState<string[]>([]);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setLikedIds(parsed.liked || []);
        setPassedIds(parsed.passed || []);
      }
    } catch {
      // Fallback silently if localStorage is restricted
    }
    setIsLoaded(true);
  }, []);

  const saveState = (newLiked: string[], newPassed: string[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ liked: newLiked, passed: newPassed })
      );
    } catch {
      // Ignore localStorage errors
    }
  };

  // Find the first profile that hasn't been liked or passed yet
  const activeProfiles = SEED_PROFILES.filter(
    (p) => !likedIds.includes(p.id) && !passedIds.includes(p.id)
  );

  const currentProfile = activeProfiles[0] || null;
  const totalReviewed = likedIds.length + passedIds.length;

  const handleLike = () => {
    if (!currentProfile) return;

    const nextLiked = [...likedIds, currentProfile.id];
    setLikedIds(nextLiked);
    saveState(nextLiked, passedIds);

    // If mutual match, trigger the match confirmation screen
    if (currentProfile.isMutual) {
      setMatchedProfile(currentProfile);
    }
  };

  const handlePass = () => {
    if (!currentProfile) return;

    const nextPassed = [...passedIds, currentProfile.id];
    setPassedIds(nextPassed);
    saveState(likedIds, nextPassed);
  };

  const handleResetQueue = () => {
    setLikedIds([]);
    setPassedIds([]);
    setMatchedProfile(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleDismissMatch = () => {
    setMatchedProfile(null);
  };

  const handleGoToChat = (profileId: string) => {
    setMatchedProfile(null);
    router.push(`/chat?matchId=${encodeURIComponent(profileId)}`);
  };

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6 max-w-md mx-auto">
        <div className="text-center text-foreground/50 text-sm">
          Loading curated profiles...
        </div>
      </main>
    );
  }

  // --- Match Confirmation Screen ---
  if (matchedProfile) {
    return (
      <main className="flex min-h-screen flex-col justify-between p-6 sm:p-8 max-w-md mx-auto">
        <header className="pt-4 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-foreground/5 text-foreground/60 border border-foreground/10">
            Mutual Interest
          </span>
        </header>

        <section className="my-auto py-6 text-center">
          {/* Avatar Graphic */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${matchedProfile.avatarBg} border border-foreground/10 flex items-center justify-center font-bold text-2xl shadow-sm`}
            >
              {matchedProfile.initials}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-foreground text-background w-8 h-8 rounded-full flex items-center justify-center text-sm shadow">
              ♥
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            It&rsquo;s a Match!
          </h1>
          <p className="mt-3 text-sm text-foreground/70 max-w-xs mx-auto leading-relaxed">
            You and <span className="font-semibold text-foreground">{matchedProfile.name}</span> both liked each other. The bridge to meeting offline is open.
          </p>

          <div className="mt-6 p-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] text-left">
            <p className="text-xs text-foreground/50 uppercase font-semibold tracking-wider mb-1">
              Mutual Standard Reminder
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              Rabbit Hole conversations are meant to lead to real dates. Keep it respectful, skip the endless small talk, and suggest an offline coffee when you feel a spark.
            </p>
          </div>
        </section>

        <footer className="flex flex-col gap-3 pb-6">
          <button
            type="button"
            onClick={() => handleGoToChat(matchedProfile.id)}
            className="w-full py-3.5 px-6 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Message {matchedProfile.name}
          </button>
          <button
            type="button"
            onClick={handleDismissMatch}
            className="w-full py-3 px-6 rounded-xl border border-foreground/20 text-foreground font-semibold text-xs hover:bg-foreground/5 transition-colors"
          >
            Keep Browsing
          </button>
        </footer>
      </main>
    );
  }

  // --- Empty Deck State ---
  if (!currentProfile) {
    const mutualMatchesCount = SEED_PROFILES.filter(
      (p) => likedIds.includes(p.id) && p.isMutual
    ).length;

    return (
      <main className="flex min-h-screen flex-col justify-between p-6 sm:p-8 max-w-md mx-auto">
        <header className="pt-4 flex items-center justify-between text-xs text-foreground/50">
          <span className="font-semibold tracking-wider uppercase">Rabbit Hole · Feed</span>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard →
          </Link>
        </header>

        <section className="my-auto py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-3xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-2xl">
            ✨
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            You&rsquo;re caught up for today
          </h1>
          <p className="mt-3 text-sm text-foreground/70 max-w-xs mx-auto leading-relaxed">
            You&rsquo;ve reviewed all {SEED_PROFILES.length} curated profiles in your local queue. No endless doom-swiping here.
          </p>

          {/* Activity summary */}
          <div className="mt-6 grid grid-cols-3 gap-2.5 p-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-foreground/10">
              <span className="block text-foreground/50 text-[10px]">Reviewed</span>
              <span className="font-semibold text-foreground text-base">
                {totalReviewed}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-foreground/10">
              <span className="block text-foreground/50 text-[10px]">Liked</span>
              <span className="font-semibold text-foreground text-base">
                {likedIds.length}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-foreground/10">
              <span className="block text-foreground/50 text-[10px]">Matches</span>
              <span className="font-semibold text-foreground text-base">
                {mutualMatchesCount}
              </span>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 pb-6">
          <Link
            href="/chat"
            className="w-full text-center py-3.5 px-6 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Go to Conversations ({mutualMatchesCount})
          </Link>
          <button
            type="button"
            onClick={handleResetQueue}
            className="w-full py-2.5 px-6 rounded-xl border border-foreground/20 text-foreground font-semibold text-xs hover:bg-foreground/5 transition-colors"
          >
            Reset Queue (Demo)
          </button>
        </footer>
      </main>
    );
  }

  // --- Active Profile Card View ---
  return (
    <main className="flex min-h-screen flex-col justify-between p-4 sm:p-6 max-w-md mx-auto">
      {/* Top Header */}
      <header className="pt-2 pb-3 flex items-center justify-between text-xs text-foreground/50">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider uppercase">Rabbit Hole</span>
          <span className="text-foreground/30">·</span>
          <span>
            {SEED_PROFILES.length - activeProfiles.length + 1} of {SEED_PROFILES.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/chat" className="hover:text-foreground transition-colors font-medium">
            Chat
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors font-medium">
            Dashboard
          </Link>
        </div>
      </header>

      {/* Profile Card Container (Scrollable or stacked cards) */}
      <section className="my-auto flex flex-col gap-4 py-2">
        {/* Hero Photo / Avatar Card */}
        <div className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden p-6">
          {/* Top meta badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-foreground/5 text-foreground/60 border border-foreground/10">
              {currentProfile.location}
            </span>
            <span className="text-[10px] text-foreground/40 font-medium">
              Verified Offline Dater
            </span>
          </div>

          {/* Large Stylized Avatar */}
          <div className="flex items-center justify-center my-4">
            <div
              className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${currentProfile.avatarBg} border border-foreground/10 flex items-center justify-center font-bold text-4xl shadow-inner`}
            >
              {currentProfile.initials}
            </div>
          </div>

          {/* Name & Occupation */}
          <div className="mt-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {currentProfile.name}, <span className="font-normal">{currentProfile.age}</span>
            </h1>
            <p className="text-xs font-medium text-foreground/60 mt-0.5">
              {currentProfile.occupation}
            </p>
            <p className="text-xs text-foreground/75 mt-3 max-w-xs mx-auto leading-relaxed italic">
              &ldquo;{currentProfile.bio}&rdquo;
            </p>
          </div>
        </div>

        {/* Hinge-style Prompt Cards */}
        <div className="flex flex-col gap-3">
          {currentProfile.prompts.map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-foreground/10 bg-background hover:border-foreground/20 transition-colors"
            >
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                {p.question}
              </h2>
              <p className="mt-2 text-sm text-foreground/90 leading-relaxed font-medium">
                {p.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Controls: Pass / Like */}
      <footer className="pt-4 pb-4 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={handlePass}
          aria-label="Pass on this profile"
          className="flex-1 max-w-[140px] py-3.5 px-4 rounded-2xl border border-foreground/20 bg-background text-foreground hover:bg-foreground/5 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span className="text-base text-foreground/50">✕</span>
          <span>Pass</span>
        </button>

        <button
          type="button"
          onClick={handleLike}
          aria-label="Like this profile"
          className="flex-1 max-w-[140px] py-3.5 px-4 rounded-2xl bg-foreground text-background hover:opacity-90 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span className="text-base text-rose-400">♥</span>
          <span>Like</span>
        </button>
      </footer>
    </main>
  );
}
