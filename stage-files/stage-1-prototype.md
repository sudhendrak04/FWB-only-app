# Stage 1 — Prototype Log

## 2026-09-18 — Project Foundation Setup (Next.js, Tailwind v4, Firebase scaffold, Stub Routes)

**Prompt (summarized):** Set up the real project foundation inside `rabbit-hole/`: normalize folder names (`Plans` → `plans`, `stage files` → `stage-files`), move existing research README to `docs/research-summary.md`, initialize Next.js (App Router, TypeScript, Tailwind v4) in `src/`, scaffold Firebase client config with placeholder env vars in `.env.local` (gitignored), create stub placeholder pages for `/onboarding`, `/quiz`, `/feed`, `/chat`, and `/dashboard`, write a new root `README.md` pulling the one-sentence thesis from `plan.md`, verify local dev server, and commit.

**Files touched:**
- `Plans/` → `plans/` (renamed directory)
- `stage files/` → `stage-files/` (renamed directory)
- `README.md` → `docs/research-summary.md` (moved original research summary)
- `README.md` (new, project root README with thesis, stack overview, and local run guide)
- `.env.local` (new, placeholder Firebase environment variables, gitignored)
- `.gitignore` (new, Next.js default rules ignoring `.env*`, `node_modules`, `.next`, etc.)
- `package.json` (new, initialized Next.js 16, React 19, Tailwind v4, and Firebase SDK; renamed project to `rabbit-hole`)
- `package-lock.json` (new, npm lockfile)
- `tsconfig.json` (new, TypeScript configuration with `@/*` path alias)
- `next.config.ts` (new, Next.js configuration)
- `postcss.config.mjs` (new, PostCSS config for Tailwind v4 `@tailwindcss/postcss`)
- `eslint.config.mjs` (new, ESLint flat config with Next.js core web vitals and TypeScript rules)
- `AGENTS.md` (new, generated Next.js conventions and rules)
- `CLAUDE.md` (new, pointer to AGENTS.md)
- `public/file.svg` (new, default static asset)
- `public/globe.svg` (new, default static asset)
- `public/next.svg` (new, default static asset)
- `public/vercel.svg` (new, default static asset)
- `public/window.svg` (new, default static asset)
- `src/app/favicon.ico` (new, favicon asset)
- `src/app/globals.css` (new, Tailwind CSS v4 setup using `@import "tailwindcss";` and `@theme inline`)
- `src/app/layout.tsx` (new, root layout with Geist Sans & Geist Mono fonts and Rabbit Hole metadata)
- `src/app/page.tsx` (new, home page providing navigation links to all five route stubs)
- `src/app/onboarding/page.tsx` (new, placeholder page for profile setup)
- `src/app/quiz/page.tsx` (new, placeholder page for personality questionnaire)
- `src/app/feed/page.tsx` (new, placeholder page for browse/swipe interface)
- `src/app/chat/page.tsx` (new, placeholder page for messaging)
- `src/app/dashboard/page.tsx` (new, placeholder page for score movement and weekly progress)
- `src/components/.gitkeep` (new, git placeholder ensuring `src/components/` directory is tracked)
- `src/lib/firebase.ts` (new, Firebase client SDK initialization for Auth and Firestore)
- `stage-files/stage-1-prototype.md` (new, Phase 1 stage log)

**What changed:**
- Initialized a Next.js 16 application configured with App Router, TypeScript, and Tailwind CSS v4 inside the `src/` directory layout. In Tailwind CSS v4, styling configuration lives directly in CSS (`src/app/globals.css` via `@import "tailwindcss";` and `@theme inline`) rather than a standalone `tailwind.config.js`.
- Created `src/lib/firebase.ts` which initializes the Firebase App SDK via environment variables from `.env.local` and exports `auth` (`getAuth`) and `db` (`getFirestore`). It guards against duplicate app initialization during development hot-module replacement (HMR). At this stage, it does not wire any authentication flows, database reads/writes, or UI handlers to any screen.
- Created five stub routes under `src/app/`: `/onboarding`, `/quiz`, `/feed`, `/chat`, and `/dashboard`. Each route exports a minimalist placeholder page verifying that routing and Tailwind CSS classes compile and render. The root `src/app/page.tsx` renders a navigation index to all five routes.
- Normalized project directories: renamed `Plans` to `plans` and `stage files` to `stage-files` to ensure consistent lowercase-kebab conventions across environments.
- Relocated the pre-existing 139-line research notes from `README.md` to `docs/research-summary.md` and added a clean root `README.md` featuring the core project thesis from `plan.md` §1, the architectural structure, and local startup commands.

**Why:**
- Aligns directly with `plan.md` section 3 Phase 1 Deliverables: establishing the Next.js + Tailwind + Firebase base stack before building domain features.
- Adheres to `plan.md` section 2 Decision 4 (deferring ML/biometrics and complex backend machinery) and the anti-scope-creep constraint: setting up structural foundations only, intentionally avoiding premature feature UI, mock scoring algorithms, or live authentication logic.

**Result:**
- `npm run dev` started cleanly with Turbopack in ~1.2s.
- HTTP requests to `/`, `/onboarding`, `/quiz`, `/feed`, `/chat`, and `/dashboard` all returned HTTP 200 with complete rendered HTML.
- Confirmed that `.env.local` is strictly ignored by git via `.gitignore` (`.gitignore:34:.env*`).
- Note on bootstrapping: because the repository root directory name contains a space (`d:\rabbit hole`), `create-next-app` required scaffolding into a temporary directory `nextapp-temp` before copying into the project root and configuring `package.json` name to `"rabbit-hole"`.

**Open questions:**
- A real Firebase project has not been created in the Firebase console yet. Real Auth and Firestore operations remain blocked until project credentials are generated and populated into `.env.local`.
