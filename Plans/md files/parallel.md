# Parallel Research — Global Dating App Industry Deep Dive

> **Project:** Rabbit Hole
> **Purpose:** Everything we know about how global dating companies work — their algorithms, tech stacks, business models, user complaints, and the gaps in the market — plus the steps to build a full-fledged dating app and the synthesis of our own Fit Score algorithm.
> **Last updated:** September 2026
> **Owners:** A (market/user research), S (product teardowns), V (technical/algorithm research)

---

## Table of Contents

1. [Current Situation: The Industry in 2025–2026](#1-current-situation)
2. [Company Deep Dives](#2-company-deep-dives)
   - Tinder · Bumble · Hinge · OkCupid · Iris Dating · Volar · Others (Thursday, Happn, Feeld, Raya)
3. [What Users Actually Say (Review Mining)](#3-what-users-actually-say)
4. [What Every App Is Missing (Gap Analysis)](#4-gap-analysis)
5. [Technology Stack Anatomy of a Full-Fledged Dating App](#5-technology-stack-anatomy)
6. [Step-by-Step: Building a Full-Fledged Dating App](#6-steps-to-build)
7. [Personal Algorithm Synthesis — The Rabbit Hole Fit Score](#7-fit-score-synthesis)
8. [What We Need to Change (Our Thesis)](#8-what-we-need-to-change)
9. [Sources](#9-sources)

---

## 1. Current Situation

**The industry is at an inflection point: peak usage, declining revenue, record burnout.**

### Market numbers (2025–2026)

| Metric | Value | Source |
|---|---|---|
| Global market revenue (2025) | ~$6B (narrow def.) / ~$12B (broad def.) | Business of Apps / WhichDating |
| **First-ever annual revenue decline** | 2025 | Business of Apps |
| Global users | 350–400 million | Business of Apps, WhichDating |
| Users paying for premium | ~23 million (~6.5% conversion) | Business of Apps |
| Match Group revenue (2025) | ~$3.3B (45% of Western market) | Business of Apps |
| Tinder | ~75–90M MAU, 8.8–9.8M payers (declining 8% YoY) | Match Group earnings |
| Bumble | $782M revenue 2025, **down 9.6% YoY**, payers down 16% | Bumble earnings |
| Hinge | Revenue **up ~25–38%** — the only major grower | Match Group earnings |
| North America revenue share | 50%+ | Business of Apps |
| Avg time on dating apps | ~51 min/day (310 hrs/year ≈ 13 full days) | Forbes Health 2024/2025 |
| Session length trend | Declining: 13.2 min (2024) → 11.5 min (2025) | Business of Apps |

### The burnout crisis (this is our opening)

- **78–79% of users report dating app burnout** (Forbes Health 2024/2025); >50% of Gen Z feel burned out "often or always" — highest of any age group
- Top burnout causes: (1) inability to find a good connection — 40%, (2) getting rejected — 27%, (3) repetitive conversations — 24%
- **74% of daters have been ghosted at least once**; 84% of Gen Z/Millennials; two-thirds admit to ghosting someone themselves (BankMyCell)
- 41% of users report experiencing ghosting (Forbes 2025)
- **Uninstall rates: 57.8% (organic) to 62.4% (non-organic)** — among the highest of any app category (AppsFlyer 2025)
- 25% of matches never receive a response; 33% of Tinder matches die after a single message (SwipeStats)

### The funnel math (brutal asymmetry)

| Stage | Women | Men |
|---|---|---|
| Swipe right rate | 8–14% | ~46% |
| Match rate per right-swipe | ~10% | ~0.6% |
| Match → first date (Hinge) | ~14% | ~14% |
| Match → long-term relationship | ~12% of all users report finding one | — |

Attention concentrates on a small % of top profiles (the "attractiveness inequality" problem) — everyone else feels invisible. This is the single biggest driver of churn for average users.

### Other macro forces (2026)

- **Trust crisis:** romance scam losses >$1.16B in the first 9 months of 2025 (FTC, up 22% YoY); 1 in 7 US adults lost money to dating scams (McAfee 2026); 35% of users encountered fake profiles; 64% distrust AI-generated profile photos
- **AI both ways:** platforms use AI for matching/moderation; scammers use AI for deepfake photos, bots (users report 60+ AI bot messages in 12 hours)
- **Verification-first platforms rising:** Smooch (compulsory Yoti ID), optional photo verification on Tinder/Bumble/Hinge — expected to become standard in 3–5 years
- **Anti-fatigue design trend:** Thursday (one-day-per-week app), Hinge daily like limits, offline dating events (Offline Club) — the industry is pivoting away from infinite swipe toward intentionality
- **Subscription fatigue:** users resist paying; apps respond by extracting more revenue per payer (Tinder RPP +5% YoY to $17.63 while payers −8%) — a maturing/declining market pattern
- **Consolidation:** Match Group + Bumble Inc. control ~60% of the Western market

### The strategic contradiction at the heart of the industry

> Dating apps monetize *continued singlehood*. The user's goal (find a partner, leave the app) is the company's worst outcome. Success = churn. This is why engagement is optimized for swiping, not for dates or relationships. **An app that visibly optimizes for getting users OFF the app (onto real dates) is both an ethical and a marketing differentiator** — Hinge proved this works ("designed to be deleted", highest relationship formation rate, only major app growing revenue).

---

## 2. Company Deep Dives

### 2.1 Tinder (Match Group) — the volume king

**How it works**
- Double-opt-in swipe card stack (invented the paradigm in 2012). Free core; monetizes via tiers (Plus/Gold/Platinum) + à la carte (Boosts, Super Likes, Passport).
- Tinder revenue ≈ $1.96B (2024) — nearly 2x its closest competitor.

**Algorithm (what's confirmed)**
- **Elo score: DEAD.** Retired publicly March 2019 ("Powering Tinder" post): "Elo is old news... an outdated measure." The old system (confirmed by co-founder Sean Rad in 2016 Fast Company piece) was chess-style: being liked by highly-liked people moved your score more. A reporter was shown his internal score in 2016 — it existed, then was killed after backlash.
- **Current system = learned ranking recommender** (Spotify/Netflix-style collaborative filtering). Confirmed signals, roughly in order of importance:
  1. **Activity/recency** — "the most important factor is... using the app." Active users are shown to other active users, prioritizing people online *at the same time*. (Reddit experiments 2026: swiping at peak hours surfaces users active within the last 60 min. Sunday 9pm = busiest window.)
  2. **Like/Nope patterns** — every swipe on you and by you updates the internal picture. Mass right-swiping → sorted into a "less selective" bucket → worse matches. (No official "penalty" confirmed, but signal dilution produces the same effect.)
  3. **Photo similarity** — anonymized visual embeddings: shows you profiles with photos similar to ones you've liked, and shows your profile to people who liked similar-looking profiles. This is effectively a *taste embedding* system.
  4. **Profile content** — interests, lifestyle tags, bio completeness (empty bios hurt).
  5. **Hard filters** — location/proximity, age range, gender preference.
- Explicitly NOT used (per Tinder): social status, religion, ethnicity.
- **Match Group Patent US 11,720,613 B2 (2023):** matchmaking "based on attractiveness and compatibility scores" — weighted composite of age range, distance, mutual interests, shared connections, photo features. Confirms a **hidden composite score exists** even post-Elo; weights undisclosed.
- "Newbie boost" (first-week flood of matches): unconfirmed as designed feature; likely cold-start exploration + max recency score.

**Tech (inferred from patents, engineering talks, system-design analyses)**
- Two-sided recommendation engine: **candidate generation (two-tower model, ANN index, top ~500 in <10ms) → cross-encoder re-ranking (top ~100) → mutual-attraction re-weight** (`score × P(they like you back)`).
- Swipe/match path: Redis hash keyed by normalized pair ID `min(A,B):max(A,B)` + Lua script for atomic reciprocal-swipe detection; Kafka events; Cassandra for durable swipe history; PostGIS for geo queries; Elasticsearch for profile search; precomputed feed slices cached in Redis (~30 min TTL).
- Photos drive ~90% of swipe decisions (Photofeeler analysis).

**What's missing / user complaints**
- Optimized for engagement, not outcomes — endless recycled queues
- Attractiveness inequality: average male users swipe hundreds of times for one match (0.6% match rate)
- Pay-to-win perception: Platinum Likes jump the queue, free users feel shadowbanned
- Ghosting is rampant and consequence-free
- No verification of real dates happening — zero offline signal
- Bot/scam profile complaints despite moderation

---

### 2.2 Bumble — the safety-first #2

**How it works**
- Women message first (24-hour window or match expires). Expanding into BFF (friends) and Bizz (networking). Revenue $782M (2025), **down 9.6%**; payers down 16% — in decline.

**Algorithm (less documented; from patents/statements/behavior analysis)**
- Desirability-style ranking persists. Known factors: swipe-right rate received, selectivity (indiscriminate swiping penalized), message/response rates, profile completeness + verification, recency of activity.
- The 24-hour expiry mechanic creates urgency (good for engagement metrics, and it *reduces stale matches* — a genuine anti-ghosting design at the match stage, though not at the conversation stage).
- Paid visibility modifiers: Spotlight (30-min top-of-stack), SuperSwipe, Premium (see who liked you).
- **Private Detector:** on-device ML blurs likely-explicit images in chat before the recipient views — notable safety tech.

**What's missing / user complaints**
- "Opening Moves" patch needed because women-message-first led to stalled conversations (many matches expire unopened)
- Same attractiveness-concentration dynamics as Tinder
- Aggressive upsell prompts; paywall creep
- Declining cultural relevance with Gen Z (revenue drop reflects it)

---

### 2.3 Hinge — the one that's growing (our closest philosophical cousin)

**How it works**
- "Designed to be deleted." Like/comment on specific profile elements (photos, prompts) instead of blind swiping. Daily like limits (scarcity → intentionality). Revenue up ~25–38% while Tinder/Bumble decline. Highest relationship-formation rate among major apps.

**Algorithm (best-documented of any app)**
- **Most Compatible: Nobel-prize-winning Gale-Shapley stable matching** + ML. Runs as a **daily batch job** (not online query) — trades freshness for global optimality. Pairs users who are mutually high-ranked → produces globally "stable" matchings (no two people would rather be with each other than their assigned partner).
  - Result: users are **8x more likely to go on a date** with Most Compatible matches (TechCrunch/Hinge, 2018).
  - Practical implementation: can't run G-S over 20M users — ML first builds preference lists over a filtered subset (dealbreakers as hard cuts, preferences as soft signals), G-S runs on the subset, ML updates preference lists from behavior, re-run.
- Ranking signals: demonstrated preferences (who you like — age/education/height/distance/interests patterns), reciprocal-type likelihood (are you *their* type?), profile quality (photos, prompts, verification), activity/responsiveness, mutual connections boost.
- Likes-with-comments weighted higher than bare likes; commenters get better recommendations over time.
- **"We Met" feedback loop:** asks users privately whether a match led to a real date and whether they'd see them again → ground-truth labels training the model on **offline outcomes, not in-app engagement**. This is the single most important ML design decision in the industry.

**What's missing / user complaints**
- Still only ~14% of matches convert to first dates
- One Most Compatible pick/day frustrates users in small cities
- Ghosting still happens post-match (feedback loop measures dates, not relationship quality or ghosting)
- Premium paywall on "Standout" feed (deliberately lower-quality, high-desirability profiles — widely criticized as dark-pattern-ish)

---

### 2.4 OkCupid (Match Group) — the questionnaire dinosaur

**How it works**
- Long-form compatibility questions (thousands available) → match % based on answer overlap. Pioneered "we compute compatibility from stated values."
- **Why it faded:** stated-preference questionnaires are a weak predictor vs revealed preference (behavior). Users lie/misjudge themselves; question fatigue; Match Group deprioritized it in favor of Tinder/Hinge.
- **Lesson for us:** personality questionnaires alone are not enough — they must be *combined with behavioral signals* and periodically re-validated. (Directly relevant to our Fit Score design.)

---

### 2.5 Iris Dating — the face-based AI pioneer (cautionary tale)

**How it works**
- "Attraction DNA": users rate a training set of stock face photos → model learns your facial-type preference → recommends real users whose faces match your model, **only when attraction is predicted to be MUTUAL**.
- **Faces-only matching:** bios, prompts, messages, dwell time explicitly NOT used for matching. Selfie verification for trust (separate from matching).
- **Algorithm detail (from their public docs — rare transparency):**
  - Faces → **embeddings** (compact numeric summaries)
  - Two scores per pair: *personal fit* (your model scores their face) and *reciprocal fit* (their model scores your face)
  - Both must clear calibrated "likely-yes" confidence thresholds → intro offered
  - **Stability checks:** prefer faces rated consistently over one-off spikes
  - Continuous learning: every like/pass updates immediately; **soft decay** on old signals (taste drift); extra learning weight at decision boundaries (predicted-pass-but-liked cases)
  - **One-sided interest is never exposed** — no "half-matches"; models update quietly
  - Shortlists, not feeds (attention protection)
- Claimed results: like-rate goes from 5% (random photos, women) → ~50–55% (trained recommendations); men 15% → 65–85%. Claims "13x higher chance" of meeting someone.

**What went wrong (why they never broke out)**
- **Cold-start + density problem:** face-based matching needs a large local user pool; small cities delivered thin shortlists (top review complaint: "not enough nearby people")
- **Paywall resentment:** Platinum ~$12/mo but pushed as 6-month commitment, no free trial
- **Trust erosion:** recent Play Store reviews accuse it of "AI slop" profiles, AI support, and the model ignoring explicit "not interested" tags (suspected cause: it weights *who liked you* over *your stated disinterest* — a growth-vs-user-respect tradeoff that backfired)
- **Ethics:** rating humans' faces invites "attractiveness ranking" backlash; their mitigation was keeping scores private per-pair (never a global leaderboard of faces) — **note this: even the face-score pioneer refused to make scores publicly comparable. Our public leaderboard must be handled extremely carefully.**
- Founder framing was smart (Pandora-for-faces), execution died on liquidity + monetization.

**Direct takeaways for Rabbit Hole**
- Mutual-prediction (two-sided scoring) is the right architecture — never show one-sided interest
- Soft decay of old signals is essential (people's tastes and situations change)
- Face embeddings can be ONE input, never the whole model, and never publicly ranked
- The density problem kills every clever algorithm — geo-scoped launch strategy matters more than model sophistication

---

### 2.6 Volar — AI-twin virtual dating

**How it works**
- Builds an **AI clone of each user** from profile + communication style (how you text, seriousness, abbreviations, emoji use). Your clone goes on **virtual dates with other users' clones** (LLM-simulated conversations) → compatibility predicted from simulated interaction → humans introduced only if the clones "hit it off."
- Goal: "cut out the awkward getting-to-know-you phase."

**Status:** tiny (~2,000 active users at last report). Novel, but: simulation fidelity is unproven (LLM clones ≠ real chemistry), and it adds a step before human contact rather than accelerating real meetings.

**Takeaway for us:** communication-style analysis as a *score input* is validated as a concept; full AI-simulated dating is a gimmick at current tech/trust levels. Our chat-signal scoring (response time, message length ratio, conversation reciprocity) is the grounded version of Volar's idea.

---

### 2.7 Notable others (quick hits)

| App | Mechanic | Lesson |
|---|---|---|
| **Thursday** | App only works one day/week (Thursdays); IRL events | Scarcity kills fatigue; events drive real meetings — **validates our party/events layer** |
| **Happn** | Shows people you physically crossed paths with (location timeline) | Proximity-as-fate framing works emotionally; heavy location privacy burden — **validates our proximity notification, warns on privacy** |
| **Feeld** | Kink/poly-positive, couples, radical transparency | Niche + honest positioning = fierce loyalty. Community > algorithm |
| **Raya** | Invitation-only, committee-reviewed | Artificial scarcity + exclusivity as the product; high perceived quality |
| **Smooch** | Compulsory Yoti ID verification | Verification-first is a rising positioning axis |
| **Offline Club / Thursday events** | Paid IRL singles events, no app feed | The offline-events market is growing *because* apps burn people out — our events feature rides this wave |
| **Teaser AI** | AI converses with your match first, summarizes vibe | AI as icebreaker-filter; mixed reception |

---

## 3. What Users Actually Say

**Review/Reddit mining (r/Tinder, r/OnlineDating, r/dating, app stores) — recurring themes:**

### Men
- "Sent dozens of messages for a single reply; weeks without a match" — the 0.6% match-rate lived experience
- Perception the app is "rigged" / shadowbanning them (usually just paywall visibility + inactivity)
- Frustration that free tier is now nearly unusable → but won't pay ("why pay for an app that shows me nobody?")
- Ghosting without closure; matches that never message back

### Women
- "A flood of low-effort messages and the work of filtering them" — inbox overload is unpaid labor
- Unsolicited explicit content (38% report it; Pew: 48% of all online daters experienced unwanted behavior; women under 50 hit hardest)
- Safety fear around meeting IRL — location-sharing with friends is standard practice
- Harassment after rejection

### Both
- Ghosting and mixed signals are the #1 emotional complaint (74% ghosted; 2/3 admit ghosting — no consequences exist)
- "Endless swiping" / recycled queues / the app feels like a slot machine
- Attention pools around a few profiles; everyone else feels invisible
- Delete-reinstall cycle ("quitting for mental break, back in 3 weeks")
- Growing interest in quitting apps entirely → offline events, matchmaking, run clubs
- Scam fatigue: 52% encountered a suspected scammer; distrust of AI photos (64%)
- Subscription resentment: multiple $15–40/mo tiers, feature paywall creep

### The unmet emotional need (our north star)
> Users don't want more matches. They want **evidence of progress** — a reason to believe the next swipe isn't pointless, feedback that they're getting better at this, consequences for bad behavior, and a bridge to actually meeting in person. **No mainstream app provides any of these four things.** That is exactly Rabbit Hole's four-part thesis (Fit Score feedback loop, ghosting penalties, date logging, gamified progression).

---

## 4. Gap Analysis

| # | Gap | Who's tried | Why it's still open | Rabbit Hole answer |
|---|---|---|---|---|
| 1 | **No offline ground truth** — apps optimize in-app engagement; only Hinge's "We Met" asks about dates, and it's self-reported days later | Hinge (partial) | Verifying a real date happened is hard without friction | **Proximity-triggered date logging + two-party confirmation** — verified offline signal at the moment of the date |
| 2 | **Ghosting is consequence-free** — Bumble's 24h expiry punishes the wrong side (the person who didn't message), not the ghoster | Bumble (match expiry), Hinge (report flows) | Apps fear punishing users → engagement metrics win | **Explicit ghost penalties on the Fit Score**; score drops for unexplained disappearance after match/date |
| 3 | **No progression feedback** — users can't tell if they're improving; the "slot machine" feeling drives burnout | Nobody (scores are deliberately hidden and static-ish) | Apps fear the Elo PR disaster (rightly) | **Hidden score, but visible *movement***: weekly rank, streaks, date-log confirmations — gamified feedback without exposing raw numbers (must be communicated carefully — see ethics below) |
| 4 | **Weekly-refresh retention loop** — apps rely on notifications and variable-reward swiping; nothing resets weekly like a game season | Nobody | Engagement teams optimize session length, not seasonal return | **Weekly score + leaderboard reset = "season" mechanic** borrowed from battle-royale games; gives a recurring reason to come back and re-engage |
| 5 | **Regional community layer** — apps are 1:1 match factories; no group/social context | Thursday (events), Feeld (community) | Events are operationally heavy | **In-app dating/house parties + regional leaderboards** — converts lonely 1:1 grinding into a social game |
| 6 | **Face + personality + behavior fusion** — Iris = faces only; OkCupid = stated personality only; Tinder = behavior/photos only | Each partially | Each bet the company on one signal type | **Fit Score fuses all three, weighted, behavior-dominant** (see §7) |
| 7 | **Verification of real humans at date time** | Smooch, photo verification | ID checks are friction + cost | Date logging inherently verifies the person physically showed up (weak but free signal) |

### The crowded/defended ground we must NOT fight on
- Swipe UI polish (Tinder owns the habit)
- Prompt-based profiles (Hinge owns it)
- Women-first safety framing (Bumble owns it)
- Pure facial-attraction AI (Iris owns the positioning — and it didn't work)
- Our wedge is **verified real-world dating behavior as the core currency**. Nobody's engine runs on that.

---

## 5. Technology Stack Anatomy

**What a full-fledged (production-scale) dating app is made of — for the roadmap after our prototype:**

### 5.1 Client layer
- **Mobile:** React Native / Flutter (cross-platform) or native Swift/Kotlin. PWA acceptable for prototype/beta.
- Must-haves: gesture-based card stack (60fps), image pipeline (compress/upload/cache), geolocation (foreground), push (FCM/APNs), WebRTC or SDK (Agora/Twilio) if video dates.

### 5.2 Backend services (microservices, event-driven)
| Service | Responsibility | Typical tech |
|---|---|---|
| Auth/Identity | signup, OAuth, phone verify, ID/photo verification | Firebase Auth / Cognito / custom + Yoti |
| Profile Service | bio, photos, prompts, preferences, dealbreakers | Postgres + S3/CDN for media |
| Feed Builder | filtered+ranked stack of unseen profiles | Redis (precomputed feeds, ~30min TTL) + Elasticsearch fallback |
| Swipe & Match | record swipes, atomic reciprocal detection, create matches | Redis hash + Lua script keyed `min(A,B):max(A,B)`; Kafka `MatchCreated` events; Cassandra for durable swipe history |
| Messaging | realtime chat, media, read receipts | WebSocket (sticky sessions) + pub/sub; Stream/SendBird SDK at small scale |
| Geo/Proximity | radius queries, geofence triggers | PostGIS + GIST index; geohash sharding |
| ML/Personalization | embeddings, ranking, preference learning | Two-tower candidate gen + ANN index (FAISS/pgvector) → cross-encoder re-rank → mutual-attraction re-weight; batch jobs for Gale-Shapley-style stable matching |
| Score Engine (ours) | Fit Score event ingestion, decay, weekly reset | Event stream (Kafka) → scoring worker; Redis for live values; scheduled functions for reset |
| Notifications | push, email, in-app | FCM/APNs + notification preference center |
| Trust & Safety | moderation (text+image ML), reports, bans, scam detection | Perspective API / AWS Rekognition / in-house classifiers; human review queue |
| Payments | subs, one-off boosts, event tickets | RevenueCat / Stripe / Play+App Store billing |
| Analytics | funnels, retention, experiment platform | Amplitude/Mixpanel + A/B framework |

### 5.3 Data architecture
- **Postgres (+PostGIS)** — users, profiles, matches, payments (relational truth)
- **Cassandra/DynamoDB** — swipes, messages (high-throughput append)
- **Redis** — feeds, like quotas, swipe-pair hashes, rate limits, live scores
- **Vector store (FAISS/pgvector/Milvus)** — face + behavioral embeddings, ANN search
- **Kafka** — event backbone (swipe, match, message, date-logged, score-changed)
- **Data warehouse (BigQuery/Snowflake)** — ML training data from "date outcome" ground truth
- Latency targets from published system designs: swipe path <100ms, feed gen <50ms (cached), message delivery <200ms, sub-second event-stream lag

### 5.4 ML pipeline components relevant to us
1. **Face embeddings:** FaceNet/ArcFace-style models (or MediaPipe on-device for privacy) — *input to attraction prediction, never a public rank*
2. **Personality:** IPIP-NEO-120 / short IPIP-10 Big Five questionnaires → OCEAN vector; complement-similarity research (some traits pair better as opposites: openness-openness similarity helps; dominance-dominance hurts)
3. **Behavioral embeddings:** swipe/message/response-time vectors clustered into "personas"; bidirectional attraction probability models (P(A likes B) AND P(B likes A))
4. **Two-tower + cross-encoder ranking:** standard for scale
5. **Stable matching (Gale-Shapley):** daily batch for "best mutual pick" — proven 8x date lift at Hinge
6. **Outcome-labeled learning:** the crown jewel — train on *did they meet, did they meet again* (our date-logging gives this natively and continuously, vs Hinge's delayed self-report survey)

### 5.5 Compliance stack
- DPDP Act 2023 (India), GDPR (EU), state biometric laws (BIPA-style) → explicit consent for face data, right to erasure, data minimization
- Age verification (18+), app store policies on dating category
- Location data: foreground-only for prototype; background proximity needs heavy justification + opt-in

---

## 6. Steps to Build

**The full path from zero to full-fledged dating app (our prototype plan is Phase 0–1):**

### Phase 0 — Validation (our Week 1)
1. Competitor teardowns + feature matrix
2. 30+ survey responses, 6+ interviews (focus: hidden-score acceptance, tap-to-log willingness, leaderboard motivation, pay intent)
3. PRD: user flows, score rules, penalties, monetization hypothesis
4. Wireframes → clickable Figma prototype
5. **Kill-criteria honesty:** if users reject the hidden-score or leaderboard concept, redesign on paper before writing code

### Phase 1 — Prototype (our Weeks 2–3)
6. Next.js + Tailwind + Firebase (Auth, Firestore, Hosting, Web Push) — free tier
7. Core loop: onboarding → IPIP-10 quiz → hidden Fit Score (weighted formula, mocked face input) → score-band matching → swipe → chat → geolocation proximity (Haversine, 200m) → QR/double-confirm date log → score boost → ghost penalty
8. Gamification: regional leaderboard (rank + first name + city only), weekly reset (scheduled function), events screen with RSVP
9. Demo Mode (mock coordinates), 20 seeded profiles, demo video, pitch deck
10. 3–5 external beta testers; feedback triage

### Phase 2 — Closed Beta (months 2–4)
11. **Geo-fenced launch: ONE city/college community** (the density lesson from Iris — a brilliant algorithm with 50 users in 10 cities is worse than a simple one with 5,000 in one)
12. Real face-embedding pipeline (MediaPipe/ArcFace) with explicit biometric consent flow
13. Trust & safety v1: photo verification, report/block, moderation queue
14. Instrument everything: date-log completion rate, ghost rate, D7/D30 retention, weekly-reset re-engagement
15. Iterate the score formula against **first ground truth**: do logged dates lead to second dates? (This is the "We Met" loop, but real-time and verified)
16. Anti-cheat v1: date-log anomaly detection (same pair logging daily, instant logs, location spoof checks)

### Phase 3 — Growth (months 4–9)
17. Native apps (React Native) — background-location-free proximity via scheduled check-ins
18. Payments: subscriptions mapped to *ethical* value (event tickets, fit hints, profile boosts — never "see your score")
19. Events operations: partner venues, first ticketed Rabbit Hole parties
20. ML upgrade path: behavioral embeddings → two-tower ranking → Gale-Shapley daily "best mutual match" pick
21. Expand city-by-city (each launch = concentrated density push, campus/community ambassadors)

### Phase 4 — Scale (month 9+)
22. Microservices split, Kafka backbone, Cassandra for swipes/messages, Redis feed caching
23. Outcome-trained ranking model (date logs + second-date labels = proprietary dataset nobody else has at this granularity)
24. Internationalization, compliance audits (GDPR/DPDP), security pentests
25. Consider B2B2C: white-label events/community for colleges or corporations

**Team reality check:** Phases 0–1 = 3 people × 3 weeks (us). Phase 2 = 3 people × 3 months + seed funding or revenue. Phase 3+ = funded startup territory (5–10 engineers, ~$500K+). This doc's purpose: we know the full mountain; we're climbing base camp deliberately.

---

## 7. Fit Score Synthesis

**Our personal algorithm — the core IP. Design synthesis from everything above.**

### 7.1 Design principles (lessons learned, encoded)

1. **Behavior over stated preference** (OkCupid's failure, Tinder/Hinge's success): what users *do* outweighs what they *say* — but personality quiz still seeds the cold-start model
2. **Two-sided mutuality** (Iris, Hinge G-S): every match-quality signal considers both directions; one-sided interest is never exposed
3. **Outcome-grounded** (Hinge "We Met" — but better): date logs are real-time, verified, continuous ground truth. This is our moat: **nobody else trains on verified offline dating outcomes at log-time**
4. **Hidden score, visible movement** (Tinder Elo backlash lesson): raw number stays internal (avoids "am I a 3?" dehumanization); users see ranks, streaks, and level-ups — feedback without the number
5. **Soft decay + weekly season** (Iris decay + gaming seasons): old signals fade; weekly reset prevents permanent underclass (fixes attractiveness-inequality doom — a bad week doesn't follow you forever)
6. **Ethical guardrails:** never rank faces publicly, never sell score boosts that change match quality (only visibility), region-level leaderboard granularity only (no exact locations), score inputs disclosed at category level (transparency report)

### 7.2 Score architecture

```
FIT_SCORE = f( BASE, BEHAVIOR, ACTIVITY, PENALTIES ) × DECAY(t)

BASE (cold start, from onboarding — weight shrinks over time):
  0.40 × Personality vector compatibility  (IPIP-10 Big Five → OCEAN;
         similarity on openness/agreeableness, complementarity tests on dominance)
  0.30 × Facial-structure embedding affinity (ArcFace/MediaPipe embeddings;
         personal-type model per Iris — "does your face match THEIR learned type",
         always two-sided: personal_fit × reciprocal_fit)
  0.30 × Profile quality (photo count/quality, bio completeness, verification)

BEHAVIOR (accumulates, becomes dominant as history grows):
  + date logs confirmed (LARGEST single signal — verified offline meeting)
  + date duration & venue tier (time spent, location type)
  + communication quality (response time, message-length reciprocity,
    conversation symmetry — both sides scored, grounded version of Volar)
  + swipe selectivity (deliberate swiping > mass swiping; selectivity ratio)
  + match → conversation conversion rate

ACTIVITY:
  + recency & consistency (short daily sessions > weekly binges — Tinder's #1 confirmed signal)
  + event attendance (RSVP + check-in at Rabbit Hole parties)

PENALTIES:
  − ghosting (no response N days after match/date, unreported) — scaled by stage
    (ghosting after a logged date ≫ ghosting an unopened match)
  − no-show on confirmed date plan
  − harassment reports (upheld)
  − fake-date anomalies (flagged by anti-cheat)

DECAY(t):
  exponential soft-decay on all behavioral signals (half-life ~2–4 weeks);
  WEEKLY season reset: rank/leaderboard fully reset, base + decayed behavior carried
  (reset is of the GAME, not of the learned model — the model keeps learning you)
```

### 7.3 Matching function (per pair A,B)

```
pair_score(A,B) = w1·personality_compat(A,B)
                + w2·mutual_face_affinity(A→B) × mutual_face_affinity(B→A)   [Iris-style mutuality]
                + w3·behavioral_embedding_similarity(A,B)
                + w4·P(B responds to A-type) × P(A responds to B-type)        [two-sided like Tinder patent]
                − w5·ghost_risk(A) − w5·ghost_risk(B)                          [novel: penalize pairing
                                                                                with high-ghost-risk users]
                × proximity_gate(distance)                                     [hard filter]
                × activity_gate(both active within 7 days)                     [hard filter]

Delivery: candidates in similar FIT_SCORE band ±δ (band-matching prevents
attractiveness-inequality doom) → ranked by pair_score → top-N daily feed.
Optional Phase 3: daily Gale-Shapley batch for "Best Mutual Today" pick (Hinge-proven 8x date lift).
```

### 7.4 Anti-cheat (date-log integrity — our ground truth must stay clean)
- Two-party confirmation required (QR/double-tap) — both present by definition
- Velocity check: same pair can't log dates >2×/week; total logs/day capped
- Geo-consistency: log location must match both users' recent location history; venue-type sanity (a "date" logged at 3am in a parking lot flags differently than a café — venue tier affects score delta)
- Duration signal: instant confirm-and-split logs score less than sustained co-location
- Anomaly rings (groups farming scores) → graph analysis on confirmation pairs

### 7.5 What the user SEES (psychology layer)
- Never the number. They see: weekly regional rank, current streak (dates logged, conversations kept alive), level/tier badges, "your fit is rising" nudges, season countdown
- Post-date: both parties get a score-up animation (positive reinforcement loop for real-world meeting — the app *rewards leaving the app*)
- Ghost penalty: transparent notification ("your score was adjusted — here's the policy link") — penalties must feel procedural, not mysterious, to avoid the shadowban-paranoia that haunts Tinder

### 7.6 Open research questions for us (V owns)
1. Optimal band width δ for score-band matching (too tight = empty feeds in small cities; too loose = inequality returns)
2. Does weekly full-reset or carry-over-with-decay retain better? (A/B in Phase 2)
3. Personality weight: research says Big Five similarity predicts relationship satisfaction modestly (r≈0.2–0.4) — validate our 0.40 cold-start weight, shrink as behavior accumulates
4. Face-affinity ethics review before any public mention — legal + PR framing ("type-matching", never "attractiveness ranking")
5. Ghost-penalty thresholds: what N-days counts as ghosting per stage? (user research question — A owns)

---

## 8. What We Need to Change

**Current situation (one paragraph):** The industry optimizes in-app engagement because success = losing the user. The result: record burnout (78%), record ghosting (74% ghosted), first-ever revenue decline (2025), and users drifting to offline events and quitting entirely. The apps that grow (Hinge) are the ones that visibly chase offline outcomes. Nobody has solved verified offline-outcome tracking, ghosting accountability, or seasonal progression mechanics — the three things burned-out users say they want.

**Our change thesis:**

1. **Flip the incentive:** make the app's core currency *verified real-world dates*, not swipes. Every feature (score, leaderboard, notifications) rewards meeting offline. Marketing line: "the only app that pays you for leaving it."
2. **Close the ghosting loop:** first mainstream app where disappearing without reason measurably costs you. Behavioral accountability as a feature — women especially (highest harassment/ghosting burden, 48% unwanted-behavior rate) should be our early adopters and evangelists.
3. **Replace slot-machine with season:** weekly reset + regional leaderboard + parties = a game you replay, not a feed you doomscroll. Burnout comes from infinite-meaningless; games retain via finite-meaningful cycles.
4. **Kill the inequality doom:** score-band matching + weekly reset means nobody is permanently bottom-tier (the 0.6%-match-rate male majority is an underserved, churning, resentful market — win them with visible progress).
5. **Build the dataset moat:** continuous, verified, real-time offline-outcome labels (date happened, duration, venue, second-date-or-not). Hinge gets this via delayed surveys; we get it natively. In 2 years this is the best training data in the industry for "what predicts a successful date" — the model moat compounds.
6. **Walk the ethics line deliberately:** hidden score (no dehumanizing numbers), category-level transparency (published "what affects your fit" report), region-only leaderboards (no stalking), face embeddings as one private input (never a public beauty rank). The Elo backlash killed trust in opaque scores — our transparency report is the antidote, and it's also marketing.

**Risks we accept and monitor:** leaderboard toxicity (mitigate: anonymous ranks option, opt-out), fake-date farming (anti-cheat §7.4), density cold-start (single-city launch), "ranking humans" PR narrative (transparency + never expose raw scores + ethics review before launch), iOS web-NFC limits (QR fallback), biometric law compliance (consent-first design, DPDP/GDPR review before Phase 2 face features).

---

## 9. Sources

- Tinder official: "Powering Tinder — The Method Behind Our Matching" (help.tinder.com, updated 2026) — Elo retired 2019; activity/photo-similarity/like-pattern signals
- Match Group US Patent 11,720,613 B2 (2023) — composite attractiveness/compatibility score system
- Fast Company (2016) — Sean Rad on original Elo; Austin Carr shown his internal score
- HLD Handbook: "Design a Dating App" system-design case study (2026) — two-tower + cross-encoder + mutual-attraction re-weight; Redis/Lua pair-matching; Gale-Shapley batch (8x date lift, TechCrunch 2018)
- Cornell CS blog + Chris Su (CMU) — Hinge Gale-Shapley implementation analyses
- HBS AI Institute — Hinge ML case study ("We Met" outcome-labeled learning)
- Iris Dating public docs (eq.irisdating.com, 2026) — faces-only embeddings, dual fit scores, calibrated thresholds, soft decay, stability checks; Google Play reviews (density/paywall/AI-slop complaints); founder letter (Attraction DNA, Pandora framing, 5%→50% like-rate claim)
- Toolify AI Dating Apps report — Volar AI-clone virtual dates (~2,000 users)
- Business of Apps — Dating App Report 2026 (market size $6B+, first revenue decline 2025, 360M users, retention/ARPU benchmarks)
- marriagescience.com Dating App Statistics 2026 — Gen Z burnout 79%, Tinder/Bumble payer declines, Hinge +25%, Reddit sentiment mining
- GetStream Dating App Statistics 2026 — 51 min/day usage, 62.4% uninstall rate, ghosting rates, romance scam losses ($672M FBI 2024)
- connectedcouples.app Statistics 2026 — swipe/match funnel asymmetry (0.6% vs 10%), 74% ghosted (BankMyCell), burnout causes breakdown, Tinder RPP vs payer trends
- WhichDating State of Online Dating 2026 — consolidation (60% Western market), AI fraud trends, verification-first platforms, Thursday/anti-fatigue design trend
- Pew Research — 30% US adults used dating apps; 48% unwanted behavior
- Photofeeler — photos drive ~90% of swipe decisions
- Forbes Health 2024/2025 — burnout survey (78%), time-on-app by generation
- FTC/McAfee/Norton 2024–2026 — romance fraud scale, AI-profile distrust (64%), fake-profile encounter rate (35%)

---

*This document is a living research artifact. Update it as interviews, beta data, and new teardowns come in. Decisions derived from it should be logged in decisions.md with a link back to the section.*
