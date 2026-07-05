# mohamadbachir.com rebuild: value-first, unique by behavior

Locked 2026-07-05 after concept rounds. Replaces the committed-but-rejected "architect's drawing" design (e32c127) and all dark/3D hero concepts. Concepts remain in `concepts/` for reference.

## The thesis

The site must deliver value per second to three audiences in this order: HR screener (30 to 60 seconds, no tech knowledge), hiring manager (2 to 5 minutes, judges principal-level substance), peers/public (craft). Uniqueness comes from what the site DOES, not imagery that needs decoding:

1. The CV is interrogable: hero-level ask bar plus paste-a-JD fit brief with receipts.
2. Developer Mode: a toggle that transforms the site from human story to engineering depth.
3. Craft-grade motion in a light, welcoming, red-accent world (his ala.menu taste). No jargon above the fold. Face large and in color.

## Decisions already made (do not relitigate)

- Headline (LOCKED by owner 2026-07-05): "60,000 people start their workday on systems I architected."
- Support line: "300+ banks depend on them. Ten years at Murex, the software behind the world's top banks. Shipped its first production AI. Founder of ala.menu."
- Primary CTA: Download CV. Secondary: email. LinkedIn present.
- Founder story: strong act 2, not co-headline.
- Leadership: supporting signal, not headline (principal IC lane first, per job-search/tracker.md).
- Photo: hero, large, color, warm (cafe portrait; master crop exists at 1880px).
- Banned: pills, status dots, eyebrow-dot patterns, beige/cream/serif editorial, dark noir, city metaphors, lit-window textures, em dashes in copy.
- Estate architecture: NOT in the default view. It is the centerpiece of Developer Mode.
- All facts must match `src/data/map.ts` case studies and the CV PDF. No invented claims.

## Site structure (5 sections)

### 1. Hero: the person and the value
Desktop: left column: eyebrow "PRINCIPAL ENGINEER · SYSTEMS ARCHITECT", name with red period, positioning line, support sentence, CTAs (Download CV solid red, Email ghost, LinkedIn text link). Right: portrait, large, color, subtle parallax tilt.
Under the value block: the Ask bar (see feature A).
Bottom proof band: red rule draws in, then 4 counters roll once: 10 years at Murex, 300+ client banks, 60K+ daily users, 1st production AI at Murex. Availability line: "OPEN TO PRINCIPAL · STAFF · LEADERSHIP / REMOTE FROM BEIRUT / CSSA · LSA IN PROGRESS".
Entrance: 2-second choreography (staggered rise, 0.7s cubic-bezier(0.22,1,0.36,1)); nothing loops except one tasteful micro-behavior on the red period.

### 2. What banks run on (Murex decade, outcomes first)
Outcome-headline cards in plain English, tech as footnote lines, sourced from `src/data/map.ts`:
- "The platform 300+ banks file their support cases through" (CS CRM, built from scratch, live since 2018)
- "The sales platform I took over after an acquisition and extended" (Sales CRM)
- "The AI bridge that lets agents act on live client data" (MCP server, first production AI at Murex)
- "Releases went from 3 hours to 15 minutes" (CI/CD transformation)
- "The team grew 8 to 25 while I became Scrum Master" (leadership signal)
Each card has a quiet "view the engineering" affordance that opens its depth panel (same content Developer Mode exposes).

### 3. Then I built my own (founder act)
ala.menu: live-product framing with real screenshot asset, "restaurants run their menus and ordering on it today", visit link, facts: 0% commission ordering, AI translation 20+ languages.
iOS shelf: 10+ shipped apps since 2015, Qibla Pro 4.8 stars with 5,000+ reviews, App Store links.

### 4. The person behind it
Leadership and judgment in human terms: Scrum Master of a 5-engineer team, mentoring, delivery discipline. Languages (Arabic and English, both native, per src/data/profile.ts; no French claim), Beirut, remote across timezones. CSSA certified, LSA in progress. Short; no second photo needed if hero photo is strong.

### 5. Let's talk
Big finale: Download CV, email (mailto with subject), LinkedIn. Availability restated. Footer minimal.

## Feature A: the interrogable CV

- Hero Ask bar: input with cycling placeholder prompts ("What did he actually build at Murex?", "Why is he principal level?", "What has he shipped outside work?"). Submit opens the chat panel (evolved AskDock) with streamed answer.
- Paste-a-JD fit brief: mode switch inside the panel ("Paste a job description"). Client caps input length; server gets a fit-brief prompt branch producing: fit summary, mapped strengths with receipts, honest gaps, 3 suggested interview questions.
- Receipts: keep the `[refs: id]` citation contract from functions/src; chips scroll to and flash the cited section (mechanic already built in the drawing rebuild; adapt selectors).
- Backend: `functions/src/askCv.ts` already has streaming, origin allowlist, rate limits, budget, guardrails, minInstances 1, citations (committed, undeployed). Add the fit-brief branch and JD length cap. Prompt-injection posture unchanged: no tools, no URLs fetched, JD treated as untrusted text.

## Feature B: Developer Mode

- Toggle top-right, mono label "DEV MODE", plus keyboard shortcut "D". Persists in localStorage, shareable via `?dev=1`.
- ON state, v1 scope:
  - Interactive estate map panel unlocks (2D SVG, studio-light styling, correct hierarchy: two big Pega CRM platforms central, gateway and services supporting, MCP bridging into Sales CRM; node click opens case study; reuse `src/data/map.ts` and the focus/flash mechanic).
  - Proof cards flip to engineering voice: stack lines (Pega, Spring Cloud Gateway, FastAPI, Celery, RabbitMQ, MCP), architecture notes, decision rationale.
  - Subtle global shift: visible grid hairlines, mono accents, terminal-flavored detail strips.
- Out of scope v1 (fast-follow): the 3D studio maquette scene inside Dev Mode.

## Design language

- Light and welcoming: background near-white cool (#f7f7f9 family, never beige), ink text (#121418), one red accent #e5484d, hairlines at ink 10%.
- Type: Space Grotesk (display) + Geist (body) + Geist Mono (labels) via fontsource. No serif anywhere.
- Radius 2px max. No pills, no dots.
- Motion: entrance choreography per section (once, IntersectionObserver), magnetic CTAs, precise hovers, counters ease-out 1.4s. No scroll-jacking. prefers-reduced-motion forces final states (regression from old site must not return).
- Mobile: single column: eyebrow, name, photo, value, CTAs, ask bar, counters 2x2, sections stack; estate map becomes the existing accordion rail pattern; Dev Mode still available.

## Meta, SEO, assets

- Title/description/JSON-LD updated to the positioning line.
- New OG image in the light identity (rewrite scripts/og-image.mjs; color portrait, red accent).
- Portrait re-export at 1200px from the 1880 master for hero; keep 800px as fallback/srcset.
- Prerender (scripts/prerender.mjs) must render the value view (Dev Mode off) with final-state content.

## Build order

1. Tokens, shell, hero (layout, photo, copy, counters, choreography).
2. Sections 2 to 5 with verified copy from map.ts.
3. Ask bar + panel + receipts wiring; functions fit-brief branch.
4. Developer Mode toggle + estate map panel + card depth flips.
5. Polish pass: motion, mobile, reduced-motion, perf (photo preload, font swap), OG/meta, prerender, Playwright walkthrough desktop+mobile, live chat latency test.

Verification before asking to deploy: `npm run build` green, vite preview walkthrough, chat answers with receipts locally against deployed function or emulator, Lighthouse sanity. Deploys (hosting AND functions) happen only after explicit owner approval, per standing rule.

## Open items riding along

- LinkedIn headline alignment with "Principal Engineer" story (owner to confirm).
- Official Pega logo asset if desired inside Dev Mode (wordmark drawn in Pega blue otherwise).
- Voice few-shot samples for the chat (fast-follow).
