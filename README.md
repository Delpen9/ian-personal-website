# Sintra

Cinematic hover-reveal landing page. Black on load; the right 2/3 is a video stage
that boomerang-loops on hover while a content panel slides in from the right.
Below the hero, `<ScrollScene>` blocks play as they enter the viewport.

React 18 · Vite · TypeScript · Framer Motion · Fontsource (Zilla Slab).

## Prereqs

- Node 20+
- `ffmpeg` (one-time, for boomerang generation only)

## Setup

```bash
npm install
npm run prep:video   # one-time: builds public/video/{sintra-boomerang.mp4,sintra-poster.webp}
npm run dev          # http://localhost:5173
```

`npm run prep:video` reads the source clip already committed under `assets/` and
emits **only** the web artifacts into `public/video/`. Re-run it if you swap the source.

## Build & verify locally

```bash
npm run build        # tsc typecheck + vite build → dist/
npm run preview      # serve the production bundle
npm test             # hero state-machine self-check (node --test, no framework)
```

## Deploy (Netlify)

`netlify.toml` is set: `command = "npm run build"`, `publish = "dist"`.

- **`public/video/sintra-boomerang.mp4` is committed** — Netlify serves it as-is.
  (Netlify's build image has no `ffmpeg`, so the artifact must be in git, not generated in CI.)
- Current boomerang is ~2.7 MB — well inside Netlify's limits. If you add many heavy
  scenes and approach bandwidth caps, host the clips on a CDN and pass the URL to
  `<ScrollScene video=... />` instead of bundling.

## Extending

Add a scene by duplicating the `<ScrollScene>` in [`src/App.tsx`](src/App.tsx) with a new
`video`/`title`/`body`. Each scene lazy-loads its own clip and only plays while on screen.

## Deliberate scope calls (ponytail)

- **No GSAP/ScrollTrigger/Lenis.** Play/pause-on-scroll is `IntersectionObserver`
  (`src/hooks/useInViewport.ts`). Add GSAP only when a scene needs pin/parallax.
- **No WebM/VP9 fallback.** The H.264 MP4 plays on every current target browser.
  Add a `<source>` WebM in `Hero.tsx`/`ScrollScene.tsx` if analytics ever show a gap.
- **Source video not duplicated.** It stays committed at `assets/…`; the prep script
  reads it in place and commits only the derived boomerang + poster.
- **Boomerang seam:** `scripts/prep-video.sh` follows the plain fwd+reverse concat.
  There's a ~1-frame (42 ms) repeat at the midpoint; the script comments the one-line
  `trim` fix if it's ever visible.
