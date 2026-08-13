# Deployment (Queue)

## Environments

| Env | URL | Notes |
|-----|-----|--------|
| Local | http://localhost:3020 | `npm run dev` (Turbopack). Mock providers on. |
| Preview | Vercel preview URL | Proves build + basic behavior. Same mock defaults unless Preview env is set otherwise. |
| Production | https://queue.author29.com | Planned. Separate Vercel project `author29-queue`. Not First Book. |

`try.author29.com` is reserved for Voice Studio. Do not iframe this trial into author29.com.

## Env vars

See `.env.example`. Names only — never commit values.

| Name | Local | Preview | Production |
|------|-------|---------|------------|
| `NEXT_PUBLIC_USE_MOCK_PROVIDERS` | `true` | `true` | `true` until a live send is explicitly approved |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3020` | preview URL | `https://queue.author29.com` |
| `NEXT_PUBLIC_AUTHOR29_URL` | `https://author29.com` | same | same |

No Neon, Clerk, Mailchimp, or paid send APIs in this trial.

## Build

Production `next build` is **plain** (no Turbopack). Turbopack is local `next dev` only — Google Fonts fetch is more reliable that way on Vercel.

## DNS

`queue.author29.com` is a subdomain of `author29.com`. Add the Vercel DNS record when the project exists. Do not CLI-deploy to production unless asked.
