# Accomplice shadcn Theme

Reusable Accomplice theme assets for shadcn-based apps.

This repo is set up as a small theme package so you can use the same tokens across multiple projects instead of copying `globals.css` by hand.

## What is here

- `registry/accomplice-theme.json`: a `registry:theme` item for the shadcn CLI.
- `styles/accomplice.css`: a direct CSS import for projects that already have shadcn installed.
- `tokens/accomplice-theme.json`: the source-of-truth token file for design and future automation.
- `scripts/build-theme.mjs`: regenerates the CSS file and registry item from the token file.

## Brand direction

This first pass is intentionally grounded in Accomplice's public positioning: structure, clarity, longevity, and editorial restraint.

Because the public site content did not expose a formal brand system in accessible source content, the palette is an inference rather than a literal extraction from a private brand guide. The theme therefore uses:

- warm off-white and stone surfaces
- graphite foreground text
- mineral teal as the main brand action color
- muted copper as the accent tone

If you have an internal brand palette or typography spec, swap the token values in `tokens/accomplice-theme.json` first and regenerate from there.

```bash
npm run build
```

## Use in a new shadcn app

1. Initialize shadcn in the app using the current CLI:

```bash
pnpm dlx shadcn@latest init
```

2. Add the theme from a local path while this repo exists on disk:

```bash
pnpm dlx shadcn@latest add D:/dev/accomplice-design-theme/registry/accomplice-theme.json
```

3. If you want consistent typography, load the same font in the app:

```tsx
import { Inter } from "next/font/google"
```

Then bind those fonts to:

- `--font-accomplice-sans`
- `--font-accomplice-display`

## Preview locally

Run the local preview app from this repo:

```bash
npm install
npm run dev
```

That starts a Vite preview on a local port and watches `tokens/accomplice-theme.json`. When you change tokens, the generated theme CSS and registry item rebuild automatically while the preview is running.

## Use in an existing shadcn app

Import the CSS file near the top of your main app stylesheet, before app-specific overrides:

```css
@import "@accomplice/shadcn-theme/styles/accomplice.css";
```

If the app already has its own shadcn variables in `globals.css`, remove the duplicate `:root` and `.dark` tokens or the later declaration will win.

## Optional utility classes

The theme includes a few opt-in helpers:

- `.theme-accomplice-shell`: subtle radial brand wash for page backgrounds
- `.theme-accomplice-panel`: elevated panel treatment for cards and dashboards
- `.theme-accomplice-kicker`: small uppercase meta label
- `.theme-accomplice-display`: display serif hook for selected headings

These are optional. The main integration point is still the shadcn token layer.

## Recommended rollout

For consistency across projects:

1. Keep this repo as the source of truth.
2. Publish it to your npm scope or host the registry JSON behind a stable URL.
3. Make new apps install the theme before adding custom component overrides.
4. Only create per-project deviations as local overrides, not edits to the shared base.
