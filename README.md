# Accomplice shadcn Theme

Reusable Accomplice theme assets for shadcn-based apps.

This repo provides a shared Accomplice theme layer for shadcn-based applications, so multiple projects can use the same tokens, surfaces, typography, and component styling without duplicating theme setup by hand.

Live guide: https://design.accomplice.se/
Machine-readable AI guide: https://design.accomplice.se/ai.txt

## What is here

- `registry/accomplice-theme.json`: a `registry:theme` item for the shadcn CLI.
- `styles/accomplice.css`: a direct CSS import for projects that already have shadcn installed.
- `tokens/accomplice-theme.json`: the source-of-truth token file for design and future automation.
- `scripts/build-theme.mjs`: regenerates the CSS file and registry item from the token file.

## Brand direction

The theme is designed around a restrained, practical interface style:

- Inter for all typography
- white page backgrounds
- black primary text
- light grey surfaces for fields and quiet panels
- orange primary actions with a lighter orange hover state
- simple hierarchy, broad spacing, and minimal decorative treatment

The shared palette is intentionally constrained to:

- `#CD511B`
- `#E8792E`
- `#FFFFFF`
- `#000000`
- `#F5F5F5`
- `#FBFBFB`

If you want to adjust the theme, edit `tokens/accomplice-theme.json` and regenerate the outputs:

```bash
npm run build
```

## Use in a new shadcn app

1. Initialize shadcn in the app using the current CLI:

```bash
pnpm dlx shadcn@latest init
```

2. Add the theme from the public registry item:

```bash
pnpm dlx shadcn@latest add https://raw.githubusercontent.com/Accomplicehq/accomplice-design-theme/master/registry/accomplice-theme.json
```

3. If you want consistent typography, load the same font in the app:

```tsx
import { Inter } from "next/font/google"
```

Then bind those fonts to:

- `--font-accomplice-sans`
- `--font-accomplice-display`

If you are working on the same machine as this repo, you can also use the local fallback path:

```bash
pnpm dlx shadcn@latest add D:/dev/accomplice-design-theme/registry/accomplice-theme.json
```

## Preview locally

Run the local preview app from this repo:

```bash
npm install
npm run dev
```

That starts a Vite preview on a local port and watches `tokens/accomplice-theme.json`. When you change tokens, the generated theme CSS and registry item rebuild automatically while the preview is running.

The canonical hosted version of this guide is:

```text
https://design.accomplice.se/
```

The build also emits a static AI-readable guide at:

```text
https://design.accomplice.se/ai.txt
```

## Use in an existing shadcn app

If the app already depends on the published theme package, import the CSS file near the top of your main app stylesheet, before app-specific overrides:

```css
@import "@accomplice/shadcn-theme/styles/accomplice.css";
```

If the app already has its own shadcn variables in `globals.css`, remove the duplicate `:root` and `.dark` tokens or the later declaration will win.

## Optional utility classes

The theme includes a few opt-in helpers:

- `.theme-accomplice-shell`: page shell background hook
- `.theme-accomplice-panel`: simple panel surface hook
- `.theme-accomplice-kicker`: small muted meta label
- `.theme-accomplice-display`: alternate display font hook

These are optional. The main integration point is still the shadcn token layer.

## Recommended rollout

For consistency across projects:

1. Keep this repo as the source of truth.
2. Publish it to your npm scope or host the registry JSON behind a stable URL.
3. Make new apps install the theme before adding custom component overrides.
4. Only create per-project deviations as local overrides, not edits to the shared base.
