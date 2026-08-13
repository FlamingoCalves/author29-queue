# Queue

Author29 interactive trial: who needs a touch today — stages, a draft, human review before anything goes out.

The playable sample is **Cedar & Field** (fictional kitchen + bath studio). The same motion fits a clinic check-in list, a sales pipeline, an advisor’s households, or an agency book. Nothing sends. Not a live CRM.

Public host (planned): [queue.author29.com](https://queue.author29.com) — own Vercel project, not embedded in author29.com. `try.author29.com` stays free for Voice Studio. The top bar always returns to [Author29](https://author29.com).

Sibling: **First Book** (inherited book) at [firstbook.author29.com](https://firstbook.author29.com).

Milestones and the PR loop: [docs/MILESTONES.md](docs/MILESTONES.md).

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3020
```

## Verify

```bash
npm run build
BASE_URL=http://localhost:3020 npm run smoke
npm run verify
```

## Play

1. Start → `/`
2. Today → `/today`
3. Stages → `/stages`
4. Review before send → `/review`

Trial state lives in **your browser only** (`localStorage`, `a29-queue-v3`). Reset trial to start over.
