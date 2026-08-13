# Agent instructions (Queue trial)

## Stack
- Next.js 15 App Router + React 19 + Tailwind v4
- Public Author29 **interactive trial** (not a client-branded case study)
- Hosting: Vercel project `author29-queue` at https://queue.author29.com (planned)
- Mock data in `lib/demo` (per-browser localStorage). No Neon / Clerk / Mailchimp.

## Positioning
- Product name: **Queue**. Sample studio: **Cedar & Field**. Operator: **Elena Voss**. Never “Abide”, never “Handoff”, never “Jordan Hale”, never Maya / Northshore.
- Queue is the ongoing outreach motion: who needs a touch today, relationship stages, draft outreach, human approve-before-send. The playable sample is kitchen + bath design; the pattern is universal (clinic check-ins, sales pipeline, advisor households, agency accounts).
- Homepage is a start screen → enter the trial. Not a proposal recap. Not an inherited-book onboarding tool (that is **First Book**).
- Sibling trials: **First Book** (inherited book) — https://firstbook.author29.com — and **Pilot** (workshop, not built yet). Separate palettes, same playable-trial pattern.
- Ever-present `Author29Bar` in the root layout → `NEXT_PUBLIC_AUTHOR29_URL` (default https://author29.com).
- **Host:** separate Vercel project on `queue.author29.com`. Do not use `try.author29.com` (reserved for Voice Studio). Do not iframe into author29.com — trials must not share that app’s runtime.
- Author29 homepage should **link out** (Work card). Add that card in the `author29` repo only after this trial is playable locally and the user asks (M2).

## Operating loop
See `docs/MILESTONES.md`. Default: feature branch → PR → Vercel preview → merge to `main` for production. Do not CLI-deploy to production unless asked.

## Bootstrap checklist
1. `npm install`
2. Copy `.env.example` → `.env.local`
3. `npm run dev` (port **3020**)
4. Verify: build + smoke + browse `/`, `/today`, `/stages`, `/review`

## Verification order
1. `npm run build`
2. `BASE_URL=http://localhost:3020 npm run smoke` (dev) or `npm run verify`
3. Browser: fail if Next error overlay is visible
4. Live paid APIs only with user approval (none wired)

## Cost safety
- Default `NEXT_PUBLIC_USE_MOCK_PROVIDERS=true`
- Send is simulated — no email/SMS
- Never claim HIPAA or a live CRM integration

## Runtime-error guardrails
- Turbopack for **dev** (`next dev --turbopack`); production build is plain `next build` (more reliable on Vercel Google Fonts fetch)
- After code changes: build + smoke before calling it done
- If 500s: delete `.next` and restart
- Smoke fails on HTTP 4xx/5xx and real overlay copy — not the string `SegmentViewNode` alone

## Git / GitHub
- Commit/push/PR when the user asks to ship or to open a PR
- Feature branches + PRs (`milestone/mN-short-slug`)
- Commit author: Jonathan Evans <jevans6911@utexas.edu>
- **Not this repo:** First Book (`FlamingoCalves/author29-first-book`), Author29 marketing, or `abide-pt-proposal`

## Deploy targets
- **Now:** local `http://localhost:3020`
- **Planned:** Vercel `author29-queue` at https://queue.author29.com; Author29.com Work card linking out
- **Not this repo:** https://author29.com (marketing), https://firstbook.author29.com (First Book), https://try.author29.com (Voice Studio)

## Product map
- `/` — start screen
- `/today` — admin home: stage counts, who needs a touch, drafts waiting, mocked Mailchimp
- `/stages` — living book by Mailchimp segment
- `/review` — particular draft, human review, simulated send

## Trial state
- Stored in `localStorage` key `a29-queue-v3` in **this browser only**
- Working the queue does not affect other visitors
- **Reset trial** clears this browser’s copy

## Palette
Warm rust / terracotta on cream-paper. Tokens in `app/globals.css` and `lib/demo/brand.ts`. Do not use First Book navy (`#2f4a6e`) or Author29 copper as the product UI (the top bar stays Author29 black).
