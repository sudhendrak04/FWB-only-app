# Rabbit Hole

> **Project:** Rabbit Hole — A dating app that flips the industry's incentive: it rewards you for leaving the app.

**Purpose:** Everything we know about how global dating companies work — their algorithms, tech stacks, business models, user complaints, and the gaps in the market — plus the steps to build a full-fledged dating app and the synthesis of our own Fit Score algorithm.
**Last updated:** September 2026
**Owners:** A (market/user research), S (product teardowns), V (technical/algorithm research)

---

## Table of Contents

1. [Current Situation: The Industry in 2025–2026](#1-current-situation)
2. [Company Deep Dives](#2-company-deep-dives)
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

- Global market revenue (2025): ~$6B (narrow def.) / ~$12B (broad def.), with the **first-ever annual revenue decline** in 2025
- Tinder: ~75–90M MAU, payers declining 8% YoY; Bumble down 9.6% YoY; **Hinge the only major grower** (+25–38%)
- **78–79% of users report dating app burnout**; uninstall rates as high as ~60%
- **74% of daters have been ghosted at least once**; no consequences for ghosting exist
- Match Group + Bumble control ~60% of the Western market

### The strategic contradiction

> Dating apps monetize *continued singlehood*. The user's goal (find a partner, leave the app) is the company's worst outcome. Success = churn. An app that visibly optimizes for getting users OFF the app is both an ethical and a marketing differentiator — Hinge proved this works.

---

## 2. Company Deep Dives

| App | Model | Key insight |
|---|---|---|
| **Tinder** | Elo is dead; now a learned-ranking recommender (activity, like-patterns, photo-similarity) | Optimized for engagement, not outcomes; attractiveness inequality |
| **Bumble** | Women message first, 24h expiry | Safety-first positioning; revenue in decline |
| **Hinge** | Gale-Shapley stable matching + "We Met" outcome feedback | Only major grower — closest to our philosophy |
| **OkCupid** | Long-form questionnaires → match % | Stated preference is a weak predictor vs behavior |
| **Iris Dating** | Faces-only mutual attraction AI | Brilliant model, killed by density + monetization |
| **Volar** | AI-twin virtual dating | Communication-style analysis validated as a concept |
| **Thursday / Happn / Feeld / Raya / Smooch** | Scarcity, proximity, niche, exclusivity, verification | Anti-fatigue & verification-first trends validate our features |

---

## 3. What Users Actually Say

- **Fortune:** 0.6% match rate for average men; inbox overload and harassment for women
- Ghosting and mixed signals are the #1 emotional complaint
- Scam fatigue: >$1.16B lost to romance scams (first 9 months of 2025); distrust of AI photos (64%)
- Growing interest in quitting apps → offline events, matchmaking, run clubs

### The unmet emotional need (our north star)

> Users don't want more matches. They want **evidence of progress** — a reason to believe the next swipe isn't pointless, feedback that they're getting better at this, consequences for bad behavior, and a bridge to actually meeting in person. No mainstream app provides any of these.

---

## 4. Gap Analysis

| # | Gap | Rabbit Hole answer |
|---|---|---|
| 1 | No offline ground truth | Proximity-triggered date logging + two-party confirmation |
| 2 | Ghosting is consequence-free | Explicit ghost penalties on the Fit Score |
| 3 | No progression feedback | Hidden score, but visible *movement* (rank, streaks, level-ups) |
| 4 | No seasonal retention loop | Weekly score + leaderboard reset ("season" mechanic) |
| 5 | No regional community layer | In-app dating/house parties + regional leaderboards |
| 6 | Single-signal matching | Fit Score fuses face + personality + behavior |
| 7 | No human verification at date time | Date logging inherently verifies the person showed up |

**Our wedge:** verified real-world dating behavior as the core currency. Nobody's engine runs on that.

---

## 5. Technology Stack Anatomy

- **Client:** React Native / Flutter, gesture-based card stack, push, geolocation
- **Backend:** microservices — Auth, Profile, Feed Builder (Redis + Elasticsearch), Swipe & Match (Redis hash + Lua script, Kafka, Cassandra), Messaging, Geo (PostGIS), ML/Personalization (two-tower + ANN + cross-encoder), Score Engine (ours), Notifications, Trust & Safety, Payments, Analytics
- **Data:** Postgres(+PostGIS), Cassandra/DynamoDB, Redis, vector store (FAISS/pgvector), Kafka, data warehouse
- **ML pipeline:** face embeddings (input only, never public rank), Big Five personality questionnaire, behavioral embeddings, stable matching (Gale-Shapley), outcome-labeled learning from date logs
- **Compliance:** DPDP Act 2023 (India), GDPR, biometric laws — consent-first design

---

## 6. Steps to Build

- **Phase 0 — Validation (Week 1):** competitor teardowns, surveys/interviews, PRD, wireframes, Figma prototype
- **Phase 1 — Prototype (Weeks 2–3):** Next.js + Tailwind + Firebase; Fit Score loop, swipe/chat, proximity + QR/double-confirm date log, ghost penalty, leaderboard + weekly reset, Demo Mode
- **Phase 2 — Closed Beta (months 2–4):** single geo-fenced city launch, real face embeddings, trust & safety v1, iterate score against first ground truth
- **Phase 3 — Growth (months 4–9):** native apps, ethical payments, events, two-tower ranking → Gale-Shapley
- **Phase 4 — Scale (month 9+):** microservices, outcome-trained ranking model, internationalization, compliance audits

---

## 7. Fit Score Synthesis

```
FIT_SCORE = f( BASE, BEHAVIOR, ACTIVITY, PENALTIES ) × DECAY(t)
```

- **BASE:** personality compatibility (0.40) + face affinity (0.30, always two-sided) + profile quality (0.30)
- **BEHAVIOR:** verified date logs (largest signal), communication quality, swipe selectivity
- **ACTIVITY:** recency/consistency, event attendance
- **PENALTIES:** ghosting (scaled by stage), no-show, harassment reports, fake-date anomalies
- **DECAY:** exponential soft-decay (half-life ~2–4 weeks); weekly season reset of the *game*, not the learned model

**Matching:** candidates in similar Fit Score band → ranked by mutual pair score → top-N daily feed; optional Gale-Shapley "Best Mutual Today" (Hinge-proven 8x date lift).

**What the user SEES:** never the number — weekly regional rank, streaks, level badges, season countdown, score-up animation after dates, transparent penalty notifications.

---

## 8. What We Need to Change

1. **Flip the incentive:** core currency = verified real-world dates, not swipes. "The only app that pays you for leaving it."
2. **Close the ghosting loop:** disappearing without reason measurably costs you.
3. **Replace slot-machine with season:** weekly reset + regional leaderboard + parties.
4. **Kill the inequality doom:** score-band matching + weekly reset means nobody is permanently bottom-tier.
5. **Build the dataset moat:** continuous, verified offline-outcome labels — the best "what predicts a successful date" training data in the industry.
6. **Walk the ethics line:** hidden score, category-level transparency, region-only leaderboards, face embeddings as a private input.

---

## 9. Sources

Full source list in [`Plans/md files/parallel.md`](Plans/md%20files/parallel.md) — including Tinder's "Powering Tinder", Match Group Patent US 11,720,613 B2, Hinge/HBS ML case study, Iris public docs, Business of Apps, Pew Research, FTC/McAfee/Norton, and more.

---

*This README is a condensed public-facing summary of [`parallel.md`](Plans/md%20files/parallel.md), the living research artifact. Update it as interviews, beta data, and new teardowns come in.*