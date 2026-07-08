# Atelier

A design-discovery tool for client-facing engagements. When a client isn't yet
sure what they want, Atelier lets them explore curated design directions on a
live sample page and hand a concrete choice back to the studio.

The client controls three axes and sees them applied instantly to one cohesive
mock page:

- **Theme**: light / dark
- **Aesthetic**: one of six curated design identities
- **Typeface**: one of six popular design fonts

When they land on a combination they like, they hand it back to the studio
either by **copying a shareable link** (which reopens the exact combination) or
by **exporting a "spec card"** (a `.txt` summary of the aesthetic, theme,
palette and typeface).

## Aesthetics

| Aesthetic | Character |
| --- | --- |
| Swiss | Grid-driven, restrained, precise |
| Editorial | Serif-led, magazine hierarchy |
| Brutalist | Raw, high-contrast, hard edges |
| Soft Depth | Glassy layers, gentle shadow |
| Warm Organic | Earthy, tactile, humanist |
| Bold Expressive | Vivid, dramatic, maximal |

Each aesthetic carries its own default typeface, but any of the six fonts can be
paired with any aesthetic.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## How it works

- **Token-driven restyling.** Each aesthetic × theme is a set of design tokens
  (colour, radius, border weight, shadow, type spacing) defined in
  [`lib/aesthetics.ts`](lib/aesthetics.ts). The sample page is styled entirely
  from `--pv-*` CSS variables, so changing a selection is an instant CSS swap
  with no re-render.
- **App chrome vs. preview.** The surrounding UI (glassy controls, layered
  depth) keeps its own fixed premium identity; only the mock page inside the
  window frame restyles.
- **Persistence & sharing.** The current selection is stored in `localStorage`,
  so a client's last direction is restored on return. It also encodes into a
  shareable URL (`?theme=…&aesthetic=…&font=…`); opening such a link adopts that
  selection (query params take precedence over storage, then the URL is
  cleaned). The `Studio` is rendered client-only, which avoids a flash of the
  default theme and lets it read the URL without a Suspense boundary.
- **Spec-card export.** [`lib/exportSpecCard.ts`](lib/exportSpecCard.ts) builds
  a formatted plain-text summary of the selection and downloads it as a `.txt`
  file.

## Project structure

```
app/
  layout.tsx              # loads fonts, global metadata
  page.tsx                # renders the client Studio
  icon.svg                # geometric favicon
  globals.css             # app chrome + token-driven preview styles
  components/
    ClientStudio.tsx      # client-only dynamic wrapper (ssr: false)
    Studio.tsx            # state, persistence, responsive layout, export
    Controls.tsx          # theme / aesthetic / typeface pickers
    PreviewPage.tsx       # the token-driven sample page
    Logo.tsx              # geometric brand mark
lib/
  aesthetics.ts           # aesthetic + font catalogue and design tokens
  fonts.ts                # next/font setup + resolved font-family map
  exportSpecCard.ts       # PNG spec-card generation
```

## Tech

Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

> Note: this project targets **Next.js 16**, which differs from earlier
> versions. See `CLAUDE.md` / `AGENTS.md` and the bundled docs under
> `node_modules/next/dist/docs/` before making framework changes.
