# UnValor°

Single-page marketing site for UnValor°, a digital product studio.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, statically prerendered) + React 19
- TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/postcss` — design tokens live in `src/app/globals.css` (`@theme`)
- Fonts: Space Grotesk and Syne via `next/font/google`
- Deployed on [Vercel](https://vercel.com) (Next.js is auto-detected; no `vercel.json` needed)

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
content.md            All site copy, in page order (source of truth for wording)
src/
  app/
    layout.tsx        <html>, fonts, metadata, pre-paint intro gate
    page.tsx          Page composition
    globals.css       Tailwind import, design tokens, base styles
  components/         One file per section (+ scoped CSS for BrandIntro, Navbar, Services)
  content/            Typed copy modules — mirror content.md exactly
  lib/                Small client helpers (intro gate, hydration hook)
public/favicon.svg
```

## Editing copy

Change the wording in `content.md` **and** the matching module in `src/content/` — the two must stay identical.
Studio contact settings (email, `isVerified`) are in `src/content/contact.ts`.

## Deploy

Push to the connected Git repository; Vercel builds with `next build` automatically.
To deploy manually: `npx vercel` (preview) or `npx vercel --prod`.
