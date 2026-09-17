# Rabbit Hole

> **Thesis:** Build the dating app whose core currency is *verified real-world dates*, not swipes or in-app engagement, and whose feedback model trains on outcome data collected natively and continuously — not via a delayed survey.

**Current Stage:** Phase 1 — Prototype (foundation scaffold)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Backend:** Firebase (Auth, Firestore, Hosting) — client SDK connected, no auth UI yet
- **Package manager:** npm

## Project Structure

```
rabbit-hole/
├── plans/              # Project plan, council notes, research docs
├── stage-files/        # Per-stage change logs (plan.md §5 format)
├── docs/               # Research summary (original README moved here)
├── src/
│   ├── app/            # Next.js App Router routes
│   │   ├── onboarding/ # Profile setup flow (stub)
│   │   ├── quiz/       # Personality questionnaire (stub)
│   │   ├── feed/       # Browse / swipe interface (stub)
│   │   ├── chat/       # Messaging (stub)
│   │   └── dashboard/  # Score & progress (stub)
│   ├── components/     # Shared UI components (empty, ready for Phase 1)
│   └── lib/
│       └── firebase.ts # Firebase client SDK initialization
├── .env.local          # Firebase config (gitignored — fill before running)
└── package.json
```

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Set up Firebase config
#    Copy .env.local.example or fill the placeholder values in .env.local
#    with your Firebase project credentials

# 3. Start dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Documentation

- [Project plan & roadmap](plans/plan.md)
- [Council review notes](plans/council-notes.md)
- [Research summary](docs/research-summary.md)
- Stage logs are in `stage-files/`
