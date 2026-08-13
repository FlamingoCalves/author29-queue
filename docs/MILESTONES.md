# Queue milestones

**Operating loop:** definition of done → branch + commit + push + open PR → Vercel preview → merge to `main` → production. Do not `vercel --prod` from a laptop unless the user explicitly asks.

**Always on:** `npm run build` after code changes; browser-check before calling a milestone done; no secrets in git; paid APIs only with explicit approval.

**Git:** Feature branch off `main`, author Jonathan Evans \<jevans6911@utexas.edu\>. Do not force-push `main`.

---

## Current

| Field | Value |
|-------|--------|
| **Active** | **M0 — three outreach surfaces** |
| **Next** | Host on Vercel (`queue.author29.com`), then Author29 Work card (M2) |

---

## Track

| # | Milestone | Done when |
|---|-----------|-----------|
| **M0** | Scaffold + loop | ✓ App, mock store, Author29 bar, start screen. Then three Admin Outreach surfaces: Today, Stages, Review (Mailchimp mocked, particular drafts, simulated send). Local port 3020. |
| **M1** | Host | New Vercel project `author29-queue` on `queue.author29.com`. Preview → merge to `main`. |
| **M2** | Author29 listing | Work card on author29.com linking out to this host (own graphic, not Labs, not iframe). |
| **M3** | Depth | Further motion (calendar, live Mailchimp) only if the three surfaces already feel true. |

Parked: live email/SMS, live Mailchimp API, Neon, Clerk, HIPAA claims, client names (Abide), mixing into the First Book repo. Mailchimp in the trial is mocked on purpose — Queue sits on the list you already have.

---

## Ship checklist (each milestone)

1. Branch: `milestone/mN-short-slug`
2. DoD met locally (`npm run build` + smoke + UI check)
3. Push + `gh pr create` (Summary + Test plan)
4. Preview URL → click through Test plan
5. Merge → confirm production (`queue.author29.com`)
6. Update this file: mark ✓ with PR link; set **Current** to the next row
