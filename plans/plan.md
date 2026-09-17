# Rabbit Hole — Project Plan

> **What this file is:** the single source of truth for what stage we're in, what's already decided, and what's still open. Read this before starting any session. Update the "Current Stage" marker and the decision log whenever something changes.
>
> **What this file is not:** a build log. Per-stage change history lives in `/logs/stage-N-*.md` — see "Documentation Protocol" at the bottom.

**Current Stage:** Phase 0 — Validation (not yet started)

---

## 1. The Thesis (don't lose this)

Dating apps monetize continued singlehood — the user's goal (find a partner, leave) is the company's worst outcome. Result: 78%+ burnout, 74% ghosted, first-ever industry revenue decline (2025). The one major app that's growing (Hinge) is the one that visibly optimizes for getting users offline.

**Rabbit Hole's bet:** build the app whose core currency is *verified real-world dates*, not swipes or in-app engagement, and whose feedback model trains on outcome data (did the date happen, did it lead to a second one) collected natively and continuously — not via a delayed survey like Hinge's "We Met."

This is the one sentence to protect from scope creep: **if a feature doesn't serve verified-offline-outcome or doesn't reduce ghosting/burnout, it's not in Phase 0–2.**

---

## 2. Decisions Locked In (post council review — do not relitigate these without a new reason)

These came out of two rounds of adversarial review (council notes preserved in `/logs/council-notes.md`, written once at project start). Treat them as constraints, not suggestions.

1. **No public/regional leaderboard at launch.** Ranking people against each other on romantic outcomes has documented failure precedent (Strava works because segments are hyper-local and winnable; a dating leaderboard has no equivalent winnable slice given the structural attractiveness-inequality problem). If any comparative ranking ships, it must be narrow, opt-in, and non-global (e.g. "your mutual-response rate vs. your own history," never vs. other users).
2. **No unmitigated streaks.** Any streak mechanic needs a freeze/pause and user-set cadence from day one (Duolingo model), not a bare "don't miss a day" counter. Streaks tied to *another person's* responsiveness (e.g. "conversation kept alive") are explicitly out — you can't control someone else's replies, and losing that streak compounds a rejection with a system-inflicted penalty.
3. **Cut concurrent gamification layers to two, max, at launch.** The S-curve research says feature-richness helps until an inflection point, then actively hurts. Candidates in priority order: (a) outcome-grounded score movement (competence signal — the actual differentiator), (b) a completion-drive ring/checklist ("logged a date this week," "kept a conversation past 3 exchanges") — self-referential, not comparative. Badges/tiers/seasons are deferred past Phase 2 pending real usage data.
4. **Face-embedding matching is deferred, not cut.** It stays mocked/stubbed through Phase 1 and most of Phase 2. Reasons: biometric data triggers DPDP/GDPR/BIPA-style compliance overhead a 3-person unfunded team can't absorb yet, and it was the exact feature that eroded trust for Iris Dating (the closest comparable). Ship personality + behavior + verified-date-outcome signals first; add faces only once there's real density to justify it.
5. **Ghosting penalties need a real design pass before code, not a placeholder.** Distinguishing "malicious ghost" from "safety-motivated silence" or "polite non-response" is unsolved in the source research and is load-bearing for the whole accountability pitch. This is a Phase 0 deliverable (user research question), not a Phase 1 engineering afterthought.
6. **Liquidity/density, not algorithm sophistication, is the actual existential risk.** Every phase gate below is written to protect against launching wide before one location has real density. A better score formula does not fix a thin feed.

---

## 3. Stage-by-Stage Roadmap

Each stage has: **Objective**, **Deliverables**, **Kill Criteria** (conditions under which we stop and redesign on paper instead of proceeding), and **Log file**.

### Phase 0 — Validation
**Objective:** Find out if the core assumptions survive contact with real people, before any product code exists.
**Deliverables:**
- Competitor teardown + feature matrix (mostly done — `parallel.md`)
- 30+ survey responses, 6+ interviews. Must explicitly test: reaction to a mocked "no public score, no leaderboard" screen vs. a leaderboard screen (watch reaction, don't just ask); willingness to tap-to-confirm a date happened; what "ghosting" means to them and whether they'd want a system to penalize it
- PRD: user flows, score rules (draft), penalty philosophy, monetization hypothesis
- Clickable wireframe/Figma prototype (no functioning score system — visual only)
**Kill Criteria:** If interviewees react negatively to *any* visible ranking/leaderboard concept even at the narrow/opt-in version — cut it entirely, don't just soften it. If nobody wants to tap-confirm a date (privacy/awkwardness concerns) — the anti-cheat/verification model needs a full rethink before Phase 1.
**Log file:** `/logs/stage-0-validation.md`

### Phase 1 — Prototype
**Objective:** A working core loop, single-city assumption baked in from the start, no real biometric or ML infrastructure yet.
**Deliverables:**
- Stack: Next.js + Tailwind + Firebase (Auth, Firestore, Hosting, Web Push) — free tier
- Core loop: onboarding → short personality quiz → mocked Fit Score (personality + profile-quality only, face input stubbed) → swipe/browse → chat → geolocation proximity → tap/QR double-confirm date log → score movement (private, not shown as rank) → ghost handling (per Phase 0 design, likely soft/private first, not punitive at launch)
- Completion-drive UI (weekly checklist/ring), not a leaderboard
- Demo mode with seeded profiles, 3–5 external beta testers
**Kill Criteria:** If the tap-to-log flow feels invasive or gets skipped by beta testers in practice (not just in interviews) — redesign verification before Phase 2, don't just add more anti-cheat.
**Log file:** `/logs/stage-1-prototype.md`

### Phase 2 — Closed Beta
**Objective:** Prove the loop works with real density in exactly one place.
**Deliverables:**
- Geo-fenced launch: one city or one campus, nowhere else. Liquidity in one place beats presence in ten.
- Real face-embedding pipeline only if Phase 1 signal justifies the compliance lift; explicit consent flow required before any biometric feature ships
- Trust & safety v1 (photo verification, report/block, moderation queue)
- Instrumentation: date-log completion rate, ghost rate (by your Phase 0 definition), D7/D30 retention, weekly re-engagement — these are the numbers that decide Phase 3, not vibes
- Anti-cheat v1 against the specific fake-date patterns identified in Phase 0/1 testing
**Kill Criteria:** If date-log completion rate is low or ghost rate doesn't visibly improve vs. incumbent apps in exit interviews, the core value prop isn't landing — go back to Phase 0 assumptions, don't scale a broken loop.
**Log file:** `/logs/stage-2-closed-beta.md`

### Phase 3 — Growth
**Objective:** Repeat the density playbook city by city; only now consider funded-startup-scale features.
**Deliverables:** Native apps, ethical monetization (event tickets, boosts — never pay-to-see-score), events operations, ML upgrade (behavioral embeddings, two-tower ranking, Gale-Shapley daily pick once there's enough data to justify it), city-by-city expansion.
**Kill Criteria:** If a new city launch can't hit the density threshold that worked in Phase 2 within a defined window, pause expansion — don't dilute the model across thin markets.
**Log file:** `/logs/stage-3-growth.md`

### Phase 4 — Scale
**Objective:** This is funded-startup territory (5–10 engineers, ~$500K+) — out of scope for current planning except as a horizon marker.
**Deliverables (reference only, revisit when Phase 3 numbers justify it):** microservices split, Kafka backbone, outcome-trained proprietary ranking model, internationalization, compliance audits, B2B2C options.
**Log file:** `/logs/stage-4-scale.md` (create when reached)

---

## 4. My Role Going Forward

When you bring a build prompt to a session:
1. I place it against the current stage's deliverables and kill criteria above — if it's scope creep for the current stage (e.g. asking for the leaderboard back, or real face embeddings in Phase 1), I'll flag that before proceeding, not silently build it.
2. I break the prompt into the actual steps/files it touches before writing code, so you can follow the reasoning, not just receive a diff.
3. After the work is done, I append an entry to that stage's log file (see below) — this happens automatically, you don't need to ask for it.

---

## 5. Documentation Protocol (for your own understanding, not for me)

**Why this exists:** you flagged that AI-assisted coding tends to produce working code without a real mental model of what was built or why. The stage logs are the fix — a plain-language record you can read back later to actually understand the system, independent of the code itself.

**One log file per stage**, at `/logs/stage-N-<name>.md`. Every time a build prompt results in a code change, an entry gets appended in this format:

```
## [date] — <short title of what was asked>

**Prompt (summarized):** what you asked for, in a sentence or two
**Files touched:** exact paths, new files marked (new)
**What changed:** plain-language description of the actual change — not a diff, an explanation
**Why:** the reasoning, especially if it maps to a decision in section 2 above
**Result:** what worked, what didn't, any error or open issue
**Open questions:** anything left unresolved that a future session needs to pick back up
```

Entries are append-only — never rewritten, so the log is a real history, not a polished summary. If a later change reverses an earlier one, the new entry says so explicitly rather than editing the old entry away.

A `/logs/council-notes.md` file holds the compressed reasoning from the two adversarial-review rounds that produced section 2, so the "why" behind those constraints doesn't get lost as sessions pass.
