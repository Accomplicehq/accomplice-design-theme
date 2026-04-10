export const aiGuide = {
  liveGuideUrl: "https://design.accomplice.se/",
  machineReadableUrl: "https://design.accomplice.se/ai.txt",
  intro:
    "This page is written for an AI agent. Treat it as an implementation contract. The objective is to build Accomplice interfaces that use the same components, spacing, typography, and interaction rules as this guide, without drifting into generic shadcn output.",
  themeSetup: {
    title: "Start here: add the theme first",
    description:
      "Before building any UI, install or import the Accomplice theme. Do not start composing screens until the theme is active.",
    cardTitle: "Theme setup",
    items: [
      "For a new shadcn app, add the theme with `npx shadcn@latest add https://raw.githubusercontent.com/Accomplicehq/accomplice-design-theme/master/registry/accomplice-theme.json`.",
      "For an existing app that already depends on the theme package, import `@accomplice/shadcn-theme/styles/accomplice.css` in the main stylesheet.",
      "If this repo exists locally on the same machine, the local registry file may be used as a fallback.",
      "If the theme source is not available, stop and ask for the correct registry URL or package name instead of guessing."
    ],
    snippet: `# new shadcn app
npx shadcn@latest add https://raw.githubusercontent.com/Accomplicehq/accomplice-design-theme/master/registry/accomplice-theme.json

# existing app already using the theme package
@import "@accomplice/shadcn-theme/styles/accomplice.css";

# optional local fallback on the same machine
npx shadcn@latest add D:/dev/accomplice-design-theme/registry/accomplice-theme.json`
  },
  executionContract: {
    title: "Execution contract",
    description:
      "Build with actual shadcn components or existing source equivalents from this repo. Do not generate custom presentational HTML when a component should exist. Do not invent extra styling rules. Stay inside the Accomplice system.",
    cardTitle: "Non-negotiable rules",
    items: [
      "Use Inter for all text. Do not introduce another font family.",
      "Use semantic theme classes and tokens. Do not hardcode new colors.",
      "Use actual shadcn components first: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Tabs`, `Sheet`, `Dialog`, `Table`.",
      "Do not create decorative subheadings, eyebrow labels, all-caps pre-headings, or bold hero titles.",
      "Do not wrap every section in a card. Cards are for metrics, grouped summaries, and contained utilities.",
      "Desktop navigation is a fixed left sidebar. Mobile navigation is a sheet triggered by a hamburger.",
      "Sidebar hover and active state are text-color only. No filled active pills.",
      "Primary emphasis is orange. Surfaces stay white or grey."
    ]
  },
  systemSpecification: {
    title: "System specification",
    description: "These values and patterns should be treated as source-of-truth when building or editing Accomplice app screens.",
    groups: [
      {
        title: "Layout and spacing",
        items: [
          "Horizontal page spacing: `min(6.5rem, 8vw)`.",
          "General section spacing: `6rem`, then `7.4rem` from `600px` up.",
          "Desktop sidebar width should be content-driven with comfortable horizontal padding. Do not hard-code a single width as a system rule.",
          "Overview hero-to-intro spacing: `min(6.5rem, 8vw)`.",
          "Services-style intro row: heading column, paragraph column, `4rem` spacer column.",
          "Prefer single-column content flow unless there is a real product reason for multiple columns."
        ]
      },
      {
        title: "Typography and color",
        items: [
          "Root font sizing follows the live site clamps in `src/preview.css`.",
          "Paragraphs: `1rem` with `line-height: 1.5`.",
          "Page `h1`: same calm services-page scale, not oversized marketing display type.",
          "Heading weight: normal (`400`), not bold.",
          "Approved palette only: `#CD511B`, `#E8792E`, `#FFFFFF`, `#000000`, `#F5F5F5`, `#FBFBFB`.",
          "Primary buttons: orange with white text. Hover: `#E8792E`."
        ]
      }
    ]
  },
  requiredComponentBehavior: {
    title: "Required component behavior",
    description: "These rules should drive component choice and implementation details.",
    cardTitle: "Component rules",
    items: [
      "Inputs, textareas, selects, and datepicker triggers all use the same grey surface and no visible border.",
      "Datepicker trigger should look like a field, not like a decorative button.",
      "Use `Sheet` for mobile nav. Use `Tabs` for text-led section switching. Use `Select` for dropdown choice.",
      "Use `cn()` for conditional classes. Do not build long manual class string ternaries.",
      "Use semantic classes like `bg-input`, `bg-card`, `text-muted-foreground`, `bg-primary`.",
      "Do not introduce custom dark mode styles. This guide is light-first."
    ]
  },
  commands: {
    title: "Commands an AI should run",
    description: "Before finalizing any UI work in this repo, the agent should use these commands to verify the result.",
    snippet: `# install dependencies
npm install

# canonical hosted guide
# https://design.accomplice.se/

# machine-readable AI guide
# https://design.accomplice.se/ai.txt

# run the preview locally
npm run dev

# regenerate theme outputs
npm run build

# build the preview app for production
npm run build:preview

# if using shadcn CLI in a real app project
npx shadcn@latest add button input textarea select checkbox switch tabs sheet dialog table

# after changes to hosting preview
firebase deploy --only hosting`
  },
  optionalAgentSkills: {
    title: "Optional agent skills",
    description: "Agent skills are optional tooling helpers. They are not part of the app itself and should never be treated as a hard dependency for building the UI.",
    cardTitle: "Use if available, do not require",
    items: [
      "If the agent environment supports skills, using the `shadcn` skill is recommended.",
      "The skill helps with component selection, CLI usage, and shadcn conventions.",
      "Do not block implementation on skill availability. If no skill system exists, use the shadcn CLI directly.",
      "The real source of truth is still the Accomplice theme, component files, and project commands in this repo."
    ],
    snippet: `# optional, only if the agent environment supports Skills
npx skills add shadcn/ui -y

# still use project-level shadcn commands for actual UI work
npx shadcn@latest add button input textarea select checkbox switch tabs sheet dialog table`
  },
  definitionOfDone: {
    title: "Definition of done",
    description: "The AI should not consider the task complete until every item below is true.",
    cardTitle: "Completion checklist",
    items: [
      "The screen uses real components from the shared UI layer, not custom substitute markup.",
      "The page matches Accomplice spacing, typography, and color constraints.",
      "Desktop and mobile both work, with sidebar on desktop and sheet menu on mobile.",
      "Primary actions, hover states, and nav states match the guide.",
      "`npm run build:preview` passes before handoff.",
      "If deployed, the hosted page loads correctly and the route renders without broken assets."
    ]
  },
  copyableAgentBrief: {
    title: "Copyable agent brief",
    description: "Use this block directly when instructing another AI to build an Accomplice app page.",
    snippet: `Build this interface using the Accomplice design system and real shadcn components.

Use Inter for all text.
Use only the approved Accomplice palette:
- #CD511B
- #E8792E
- #FFFFFF
- #000000
- #F5F5F5
- #FBFBFB

Use white as the page background.
Use #F5F5F5 for fields and quiet surfaces.
Use orange only for primary emphasis.
Use text-color-only hover and active states in sidebar navigation.
Do not use decorative subheadings, all-caps labels, bold hero headings, glossy cards, heavy borders, or extra colors.
Do not wrap every section in a card.

Use these layout rules:
- page horizontal spacing: min(6.5rem, 8vw)
- section spacing: 6rem, then 7.4rem from 600px up
- desktop sidebar width should fit the navigation content with comfortable padding; do not assume one fixed width for every app
- sheet menu on mobile
- broad full-width layout, not a narrow centered wrapper

Use these typography rules:
- paragraphs: 1rem with line-height 1.5
- heading weight: 400
- keep hierarchy simple: heading plus paragraph

Use these component rules:
- use Button, Input, Textarea, Select, Checkbox, Switch, Tabs, Sheet, Dialog, Table where relevant
- datepicker trigger should visually match other fields
- use semantic theme classes, not new raw styling
- use cn() for conditional classes

Before building, install or import the Accomplice theme:
- if creating a new shadcn app: npx shadcn@latest add https://raw.githubusercontent.com/Accomplicehq/accomplice-design-theme/master/registry/accomplice-theme.json
- if the app already depends on the theme package: import @accomplice/shadcn-theme/styles/accomplice.css
- if this repo exists locally on the same machine, the local registry file may be used as a fallback
- if neither is available, ask for the correct package name or stable registry URL instead of guessing

Optional: if the agent environment supports Skills, install the shadcn skill with:
- npx skills add shadcn/ui -y
Do not block on this. If skills are unavailable, continue with the shadcn CLI directly.

Before finishing:
- run npm run build
- run npm run build:preview
- if deploying, run firebase deploy --only hosting

Do not finish until the UI matches the Accomplice design guide and the build passes.`
  }
}
