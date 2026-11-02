# Sulaxshajini Kumarakulasingam — Portfolio

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion · GSAP · Lenis · three.js / React Three Fiber.

```bash
npm install --legacy-peer-deps   # optional flag; no peer conflicts remain
npm run dev                      # development
npm run build && npm start       # production
```

## What's inside
| Area | Where |
|---|---|
| Cinematic intro (Phase 19) — plays on **every** full page load, no storage | `src/components/intro/`, `src/components/providers/AppShell.tsx` |
| Home sections | `src/components/sections/` |
| Case-study pages (Phase 20) — one dynamic template | `src/app/projects/[slug]/page.tsx`, `src/components/project/` |
| All content | `src/data/` (`profile.ts`, `projects.ts`, `skills.ts`, `education.ts`, `types.ts`) |
| DING MOTOBOT (Phase 22) | `src/components/motobot/`, `src/lib/knowledge.ts`, `src/app/api/chat/route.ts` |

## Intro behaviour (Phase 19)
The percentage eases toward `min(real readiness, presentation curve)`. Real readiness = hydration + fonts ready + window load + first paint. A 7 s timeout forces 100 %, a **Skip intro** button is always available, `Enter`/`Space` activates the button once ready, and `prefers-reduced-motion` removes the motion. Stages shown during loading are presentation milestones, and the on-screen footnote says so.

## Adding screenshots (Phase 20.5)
The repository contains no project screenshots, so cases currently use generated cover art. To add real ones:
1. Put images in `public/projects/<slug>/`.
2. In `src/data/projects.ts` fill that project's `screenshots` array: `{ src, alt, caption?, width, height }`.

The *Visual Showcase* section, parallax/tilt gallery and full-screen viewer (arrows, swipe, zoom, Esc) appear automatically. Likewise fill `links`, `objective`, `outcome`, `year`, `designProcess` or `developmentProcess` to reveal those sections — empty ones stay hidden rather than invented.

## DING MOTOBOT
* Without a key it runs in a clearly labelled **Offline guide** mode (deterministic answers from the portfolio data).
* For live AI set **one** server-side variable (see `.env.example`): `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`. Keys never reach the browser.
* The route validates input (≤ 12 messages, ≤ 500 chars each), rate-limits per IP (15 / min, in-memory per server instance — use an external store such as Redis/Upstash if you scale to many instances), times out after 25 s and falls back gracefully on provider errors.
* The assistant only knows what is in `src/data/`. Work experience, awards and certifications are not documented there, so it says so instead of inventing them.
* 3D robot on capable desktops (WebGL, ≥ 900 px, not reduced-motion); animated SVG robot everywhere else.

## Contact form
No mail backend is configured, so the form composes a pre-filled email in the visitor's mail app (`mailto:`). Swap in a form service or an API route if you want server-side delivery.
