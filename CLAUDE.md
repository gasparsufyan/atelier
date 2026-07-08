# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js version

This project uses **Next.js 16.2.10** with **React 19**, which have breaking changes from older versions. Do not rely on training-data conventions. Before writing Next.js code, read the relevant guide bundled at `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`) and heed any deprecation notices. This is also enforced via `AGENTS.md`, which `CLAUDE.md` imports.

## Commands

```bash
npm run dev     # start dev server at http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (flat config, eslint-config-next)
```

There is no test runner configured yet.

## Architecture

- **App Router** project (`app/` directory). `app/layout.tsx` is the root layout; `app/page.tsx` is the home route. Routing is file-based under `app/`.
- **Fonts** (`Geist`, `Geist_Mono`) are loaded via `next/font/google` in the root layout and exposed as the CSS variables `--font-geist-sans` / `--font-geist-mono`.
- **Styling is Tailwind CSS v4** — configured entirely in `app/globals.css` via `@import "tailwindcss"` and the `@theme inline { ... }` block. There is **no `tailwind.config.js`**; add theme tokens (colors, fonts) inside `globals.css`. Light/dark colors are driven by `prefers-color-scheme` CSS variables.
- **Path alias**: `@/*` maps to the repo root (e.g. `import x from "@/app/..."`). Configured in `tsconfig.json`.
- TypeScript is `strict`; `noEmit` (Next handles the build).
