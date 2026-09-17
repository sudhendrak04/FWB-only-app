# Council Review Notes

Compressed record of the adversarial review that shaped `plan.md` section 2. Kept separate from the plan so the reasoning survives even as the plan itself gets edited over time.

---

## Round 1 — Reviewing the original research doc (`parallel.md`)

**Question posed:** is the Rabbit Hole concept, as documented, genuinely a good idea to move forward on?

**Where the council agreed:**
- Phase 0 validation-first approach is correct and well-designed
- The competitive research/analysis is unusually rigorous for a pre-code stage
- Cold-start/density is the real existential risk, not algorithm sophistication — the doc's own Iris Dating case study proves this

**The one real disagreement:** whether the leaderboard/gamification mechanic is a differentiator worth refining (some members: "tune the ethics, keep the mechanic") or a premise flaw (other members: "publicly ranking dating success while curing burnout is contradictory"). Resolved toward the premise-flaw side — the downside is asymmetric: if wrong, the core retention hook actively drives away the burned-out users being targeted.

**Ranking:** Red-teamer > First-principles > Pragmatist > Domain rigorist > Generalist

**Result:** recommended gating Phase 1 on testing leaderboard perception directly in interviews before building it, and stripping face-embeddings out of the cold-start scoring formula.

---

## Round 2 — Reviewing gamification research against the design (transcript-sourced)

**New evidence introduced:** a breakdown of seven research-backed gamification patterns (PBL fallacy, S-curve overload, streak trap, variable-reward vs. loss-aversion, completion drive / Apple Watch rings, competence vs. badge theater), each backed by named cases (LinkedIn badge retirement, Foursquare mayorship removal, Strava's hyper-local segments, the Habitica overload study, the Snapchat streak litigation and EU Digital Fairness Act, Peloton's competence-feedback retention).

**What this changed:** Round 1 treated the leaderboard risk as *needs testing*. This evidence upgraded it to *needs redesign before testing* — because Strava, Habitica, and Snapchat aren't hypothetical failure modes, they're documented outcomes for structurally similar mechanics already in the wild. Testing a mechanic that already has this failure pattern elsewhere mostly confirms what the research already says.

**Findings mapped onto the design:**
- **PBL fallacy + non-winnable leaderboard:** Strava's leaderboards only work because they're hyper-local and winnable (you can be #1 on one hill). A regional dating leaderboard has no equivalent winnable slice — the doc's own attractiveness-inequality problem (0.6% male match rate) makes this structural, not fixable by band-matching alone.
- **Streak trap, unmitigated:** "conversation kept alive" and "dates logged" streaks match the exact mechanic flagged in the Belgian adolescent study and the Snapchat litigation — motivational until obligational. Worse than Duolingo's version because the streak depends on another person's responses, not just your own actions.
- **S-curve overload:** the original design stacked five-plus concurrent mechanics (hidden score, visible rank, streak, tier badges, season reset, event RSVP). The Habitica study found 100% of participants hit counterproductive effects past a much lower feature count, in a lower-stakes domain than dating.
- **What's aligned and worth keeping:** the competence-over-recognition pattern (Peloton, Chess.com) maps directly onto the outcome-grounded design (score moves because of verified date logs and second-date conversion, not app-opens) — this is the one mechanic that matches what the research says actually works, and it doubles as the core differentiator from Hinge's delayed self-report survey.
- **Unexploited opportunity:** completion drive (Apple Watch activity rings, closure principle) fits the "reward leaving the app" thesis better than competitive ranking — self-referential, avoids the winnability problem entirely, and matches the stated goal of visible movement without exposing a raw score or rank.

**Ranking:** Red-teamer > Domain rigorist > First-principles > Pragmatist > Generalist

**Result:** the four gamification-related items in `plan.md` section 2 (no public leaderboard, no unmitigated streaks, max two concurrent mechanics at launch, competence-signal as the primary UI with a completion-drive ring as the secondary one) come directly from this round.

---

## How to use this file

If a future session proposes reintroducing something this file argued against (a public leaderboard, an unrestricted streak, more than two concurrent gamification mechanics at launch), that's not automatically wrong — but it should come with a stated reason the original finding no longer applies (new user research, a materially different mechanic design, etc.), not a silent reversal.
