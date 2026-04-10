import { useEffect, useMemo, useState } from "react"
import previewImage from "../assets/image.png"
import {
  Blocks,
  Calendar,
  ChevronDown,
  FileText,
  House,
  LayoutPanelTop,
  Menu,
  Palette,
  Search,
  Type
} from "lucide-react"

import { cn } from "./lib/utils"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Checkbox } from "./components/ui/checkbox"
import { Input } from "./components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet"
import { Switch } from "./components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Textarea } from "./components/ui/textarea"

const pages = [
  { id: "overview", label: "Overview", icon: House },
  { id: "typography", label: "Typography", icon: Type },
  { id: "colors", label: "Colors", icon: Palette },
  { id: "components", label: "Components", icon: Blocks },
  { id: "layout", label: "Layout", icon: LayoutPanelTop },
  { id: "ai", label: "AI", icon: FileText }
]

const pageStackClass = "space-y-[6rem] min-[600px]:space-y-[7.4rem]"
const pageIntroClass = "max-w-3xl space-y-4"
const pageTitleClass =
  "text-[clamp(1.29rem,1.29rem+((1vw-0.2rem)*0.075),1.35rem)] leading-[1.25] font-normal text-foreground"
const pageIntroTextClass = "text-base leading-[1.5] text-foreground"
const supportingTextClass = "text-base leading-[1.5] text-muted-foreground"

const palette = [
  { name: "Primary", hex: "#CD511B", sampleClass: "bg-primary text-primary-foreground", note: "Main actions and emphasis." },
  { name: "Primary lighter", hex: "#E8792E", sampleClass: "bg-[var(--brand-strong)] text-white", note: "Hover states and softer emphasis." },
  { name: "White", hex: "#FFFFFF", sampleClass: "bg-background text-foreground", note: "Main page background and clean surfaces." },
  { name: "Black", hex: "#000000", sampleClass: "bg-foreground text-background", note: "Primary text and highest contrast moments." },
  { name: "Light grey", hex: "#F5F5F5", sampleClass: "bg-card text-foreground", note: "Cards, inputs, and quiet surfaces." },
  { name: "Lighter grey", hex: "#FBFBFB", sampleClass: "bg-accent text-foreground", note: "Soft contrast blocks and alternate fills." }
]

const tokenGroups = [
  {
    title: "Core tokens",
    items: [
      ["background", "#FFFFFF"],
      ["foreground", "#000000"],
      ["primary", "#CD511B"],
      ["primary-foreground", "#FFFFFF"],
      ["accent", "#FBFBFB"],
      ["card", "#F5F5F5"]
    ]
  },
  {
    title: "Shadcn mappings",
    items: [
      ["secondary", "#F5F5F5"],
      ["muted", "#F5F5F5"],
      ["input", "#F5F5F5"],
      ["ring", "#CD511B"],
      ["brand-strong", "#E8792E"],
      ["chart-2", "#E8792E"]
    ]
  }
]

function currentHashPage() {
  const pageId = window.location.hash.replace("#", "")
  return pages.some((page) => page.id === pageId) ? pageId : "overview"
}

function SidebarNav({ activePageId, onNavigate }) {
  return (
    <nav className="grid gap-2.5">
      {pages.map((page) => {
        const Icon = page.icon
        const isActive = page.id === activePageId

        return (
          <Button
            key={page.id}
            asChild
            variant="nav"
            size="nav"
            className={cn(isActive ? "text-primary" : "text-foreground")}
          >
            <a href={`#${page.id}`} onClick={onNavigate}>
              <Icon className="size-4" />
              {page.label}
            </a>
          </Button>
        )
      })}
    </nav>
  )
}

function NavExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" />
      <TabsContent value="activity" />
      <TabsContent value="timeline" />
      <TabsContent value="files" />
    </Tabs>
  )
}

function OverviewPage() {
  return (
    <div className={pageStackClass}>
      <section className="space-y-[min(6.5rem,8vw)]">
        <div className="-mx-[min(6.5rem,8vw)]">
          <img
            src={previewImage}
            alt="Nighttime office building with moody lighting and strong architectural framing"
            className="h-[50vh] min-h-[280px] w-full object-cover sm:min-h-[340px]"
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_4rem] lg:gap-[3.5rem]">
          <h1 className={pageTitleClass}>Accomplice Design Guide</h1>
          <p className={pageIntroTextClass}>
            Accomplice apps usually use the full browser width, a simple type hierarchy, restrained radii, and a
            constrained palette. The image treatment should feel intentional and atmospheric, not decorative.
          </p>
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-3">
        {[
          [
            "Full width by default",
            "Most application shells should use the full window width. Large imagery and navigation should sit flush to the edges instead of being boxed into a narrow marketing-style container."
          ],
          [
            "Simple text hierarchy",
            "Keep it to a clear heading and one supporting text style. Avoid decorative kickers, all-caps pre-headings, and heavy headline weights."
          ],
          [
            "Images with mood",
            "Use images with structure, atmosphere, and credible environments. Architectural framing and moody light fit better than generic lifestyle imagery."
          ]
        ].map(([title, body]) => (
          <article key={title} className="space-y-3">
            <h2 className="text-lg font-normal text-foreground">{title}</h2>
            <p className={supportingTextClass}>{body}</p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-xl font-normal text-foreground">Application shell</h2>
          <p className={supportingTextClass}>
            A typical Accomplice app view: title, supporting text, clear actions, and flat surfaces for content-heavy
            workflows.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-normal text-foreground">Client operations</h3>
              <p className={supportingTextClass}>Workflow status, approvals, and settings in a single shared environment.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">Secondary</Button>
              <Button>Save changes</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline health</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-normal text-foreground">84%</p>
                <CardDescription>Clear metrics on quiet surfaces, with orange reserved for emphasis.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Review queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-[10px] bg-background px-4 py-3">
                  <span className="text-base font-normal text-foreground">Content approval</span>
                  <span className="text-base text-muted-foreground">12 items</span>
                </div>
                <div className="flex items-center justify-between rounded-[10px] bg-accent px-4 py-3">
                  <span className="text-base font-normal text-foreground">Design QA</span>
                  <span className="text-base text-muted-foreground">4 blockers</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="max-w-3xl space-y-4">
        <h2 className="text-xl font-normal text-foreground">Sidebar navigation</h2>
        <p className={supportingTextClass}>
          Sidebar navigation is a core pattern. It should be clear, calm, and structurally strong without becoming a
          visual event.
        </p>
        <NavExample />
      </section>
    </div>
  )
}

function TypographyPage() {
  return (
    <div className={pageStackClass}>
      <section className={pageIntroClass}>
        <h1 className={pageTitleClass}>Typography</h1>
        <p className={pageIntroTextClass}>
          Typography should stay direct and controlled. Inter is used across the system, titles are normal rather than
          bold, and the hierarchy stays intentionally simple.
        </p>
      </section>

      <section className="space-y-8">
        <article className="space-y-3">
          <h2 className="text-[clamp(1.29rem,1.29rem+((1vw-0.2rem)*0.075),1.35rem)] font-normal text-foreground">
            Page title
          </h2>
          <p className={supportingTextClass}>Use for top-level pages and major view transitions. Keep it clear and measured.</p>
        </article>
        <article className="space-y-3">
          <h2 className="text-[2.15rem] font-normal text-foreground">Section title</h2>
          <p className={supportingTextClass}>Use for major content blocks inside a page. No kicker required ahead of it.</p>
        </article>
        <article className="space-y-3">
          <p className={pageIntroTextClass}>
            Body text should stay readable, calm, and slightly editorial without becoming marketing copy.
          </p>
          <p className={supportingTextClass}>Supporting text handles the explanatory layer.</p>
        </article>
      </section>
    </div>
  )
}

function ColorsPage() {
  return (
    <div className={pageStackClass}>
      <section className={pageIntroClass}>
        <h1 className={pageTitleClass}>Colors</h1>
        <p className={pageIntroTextClass}>
          The system is intentionally constrained. The base theme should not introduce extra semantic colors or side
          palettes. Everything resolves to the six approved values.
        </p>
      </section>

      <section className="space-y-6">
        {palette.map((item) => (
          <article key={item.name} className="flex items-start gap-4">
            <div className={cn("h-16 w-16 shrink-0 rounded-[10px]", item.sampleClass)} />
            <div className="space-y-1">
              <h2 className="text-lg font-normal text-foreground">{item.name}</h2>
              <p className="text-base text-muted-foreground">{item.hex}</p>
              <p className={supportingTextClass}>{item.note}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-10">
        {tokenGroups.map((group) => (
          <article key={group.title} className="space-y-4">
            <h2 className="text-xl font-normal text-foreground">{group.title}</h2>
            <div className="space-y-3">
              {group.items.map(([token, hex]) => (
                <div key={token} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-base font-normal text-foreground">{token}</span>
                  <span className="text-base text-muted-foreground">{hex}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function ComponentsPage() {
  return (
    <div className={pageStackClass}>
      <section className={pageIntroClass}>
        <h1 className={pageTitleClass}>Components</h1>
        <p className={pageIntroTextClass}>
          Components should feel quiet and useful. The preview below now uses actual shadcn-style React components
          instead of static HTML approximations.
        </p>
      </section>

      <section className="space-y-12">
        <article className="space-y-5">
          <h2 className="text-xl font-normal text-foreground">Buttons</h2>
          <p className={supportingTextClass}>
            Primary buttons use orange with white text. Secondary buttons sit on light grey with black text.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button>Save changes</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </article>

        <article className="space-y-5">
          <h2 className="text-xl font-normal text-foreground">Fields and pickers</h2>
          <p className={supportingTextClass}>
            Form controls stay flat and quiet. Date triggers, selects, searches, inputs, and textareas all use the same
            light grey surface without borders.
          </p>
          <div className="grid max-w-3xl gap-4">
            <div className="space-y-2">
              <p className="text-base text-muted-foreground">Date picker trigger</p>
              <Button variant="field" size="field">
                <span className="flex items-center gap-3">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>12 April 2026</span>
                </span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-base text-muted-foreground">Select</p>
              <Select defaultValue="stockholm">
                <SelectTrigger>
                  <SelectValue placeholder="Choose office" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stockholm">Stockholm office</SelectItem>
                  <SelectItem value="gothenburg">Gothenburg office</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-base text-muted-foreground">Search</p>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-10" placeholder="Search clients" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-base text-muted-foreground">Input</p>
              <Input defaultValue="Accomplice client operations" />
            </div>

            <div className="space-y-2">
              <p className="text-base text-muted-foreground">Textarea</p>
              <Textarea defaultValue="The interface should feel practical, calm, and structurally sound." />
            </div>
          </div>
        </article>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-xl font-normal text-foreground">Toggles and choices</h2>
          <p className={supportingTextClass}>
            Controls should be clear and restrained. Use the orange sparingly for active states, not as decoration.
          </p>
        </div>
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-[10px] bg-input px-4 py-3">
            <div className="space-y-1">
              <p className="text-base font-normal text-foreground">Email updates</p>
              <p className={supportingTextClass}>Notify the team when approval status changes.</p>
            </div>
            <Switch checked />
          </div>
          <div className="flex items-center gap-3 rounded-[10px] bg-input px-4 py-3">
            <Checkbox defaultChecked />
            <span className="text-base font-normal text-foreground">Only show urgent approvals</span>
          </div>
          <div className="pt-2">
            <p className={supportingTextClass}>Tabs and view toggles should usually stay text-led before stronger surfaces.</p>
            <NavExample />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">Cards and metrics</h2>
          <p className={supportingTextClass}>Boxes can have a slight radius, but they should not feel soft or glossy.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Open approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-normal text-foreground">12</p>
              <CardDescription>Current items waiting for internal review.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Project status</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Delivery is on track with one design review planned for Friday.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

function LayoutPage() {
  return (
    <div className={pageStackClass}>
      <section className={pageIntroClass}>
        <h1 className={pageTitleClass}>Layout</h1>
        <p className={pageIntroTextClass}>
          Layout should feel broad, ordered, and practical. Large imagery should go flush with the edges. Sidebars and
          content shells should feel like part of the product, not a presentation deck.
        </p>
      </section>

      <section className="space-y-5">
        <div className="-mx-[min(6.5rem,8vw)]">
          <img
            src={previewImage}
            alt="Nighttime office building with moody lighting and strong architectural framing"
            className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
          />
        </div>
        <div className="max-w-3xl">
          <p className={pageIntroTextClass}>
            Use imagery as a structural part of the page. Let large images breathe edge-to-edge rather than boxing them
            into a small card with decorative framing.
          </p>
        </div>
      </section>
    </div>
  )
}

function AIPage() {
  return (
    <div className={pageStackClass}>
      <section className={pageIntroClass}>
        <h1 className={pageTitleClass}>AI</h1>
        <p className={pageIntroTextClass}>
          This page is written for an AI agent. Treat it as an implementation contract. The objective is to build
          Accomplice interfaces that use the same components, spacing, typography, and interaction rules as this guide,
          without drifting into generic shadcn output.
        </p>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">Execution contract</h2>
          <p className={supportingTextClass}>
            Build with actual shadcn components or existing source equivalents from this repo. Do not generate custom
            presentational HTML when a component should exist. Do not invent extra styling rules. Stay inside the
            Accomplice system.
          </p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Non-negotiable rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              <li>Use Inter for all text. Do not introduce another font family.</li>
              <li>Use semantic theme classes and tokens. Do not hardcode new colors.</li>
              <li>Use actual shadcn components first: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Tabs`, `Sheet`, `Dialog`, `Table`.</li>
              <li>Do not create decorative subheadings, eyebrow labels, all-caps pre-headings, or bold hero titles.</li>
              <li>Do not wrap every section in a card. Cards are for metrics, grouped summaries, and contained utilities.</li>
              <li>Desktop navigation is a fixed left sidebar. Mobile navigation is a sheet triggered by a hamburger.</li>
              <li>Sidebar hover and active state are text-color only. No filled active pills.</li>
              <li>Primary emphasis is orange. Surfaces stay white or grey.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">System specification</h2>
          <p className={supportingTextClass}>
            These values and patterns should be treated as source-of-truth when building or editing Accomplice app
            screens.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Layout and spacing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
                <li>Horizontal page spacing: `min(6.5rem, 8vw)`.</li>
                <li>General section spacing: `6rem`, then `7.4rem` from `600px` up.</li>
                <li>Desktop sidebar width should be content-driven with comfortable horizontal padding. Do not hard-code a single width as a system rule.</li>
                <li>Overview hero-to-intro spacing: `min(6.5rem, 8vw)`.</li>
                <li>Services-style intro row: heading column, paragraph column, `4rem` spacer column.</li>
                <li>Prefer single-column content flow unless there is a real product reason for multiple columns.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Typography and color</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
                <li>Root font sizing follows the live site clamps in `src/preview.css`.</li>
                <li>Paragraphs: `1rem` with `line-height: 1.5`.</li>
                <li>Page `h1`: same calm services-page scale, not oversized marketing display type.</li>
                <li>Heading weight: normal (`400`), not bold.</li>
                <li>Approved palette only: `#CD511B`, `#E8792E`, `#FFFFFF`, `#000000`, `#F5F5F5`, `#FBFBFB`.</li>
                <li>Primary buttons: orange with white text. Hover: `#E8792E`.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">Required component behavior</h2>
          <p className={supportingTextClass}>
            These rules should drive component choice and implementation details.
          </p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Component rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              <li>Inputs, textareas, selects, and datepicker triggers all use the same grey surface and no visible border.</li>
              <li>Datepicker trigger should look like a field, not like a decorative button.</li>
              <li>Use `Sheet` for mobile nav. Use `Tabs` for text-led section switching. Use `Select` for dropdown choice.</li>
              <li>Use `cn()` for conditional classes. Do not build long manual class string ternaries.</li>
              <li>Use semantic classes like `bg-input`, `bg-card`, `text-muted-foreground`, `bg-primary`.</li>
              <li>Do not introduce custom dark mode styles. This guide is light-first.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">Commands an AI should run</h2>
          <p className={supportingTextClass}>
            Before finalizing any UI work in this repo, the agent should use these commands to verify the result.
          </p>
        </div>

        <div className="rounded-[10px] bg-card p-5">
          <pre className="whitespace-pre-wrap text-base leading-[1.5] text-foreground">
{`# install dependencies
npm install

# run the preview locally
npm run dev

# regenerate theme outputs
npm run build

# build the preview app for production
npm run build:preview

# if using shadcn CLI in a real app project
npx shadcn@latest add button input textarea select checkbox switch tabs sheet dialog table

# after changes to hosting preview
firebase deploy --only hosting`}
          </pre>
        </div>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">How to get the Accomplice theme</h2>
          <p className={supportingTextClass}>
            An AI should not assume the theme is already present in another app. It should install or import the theme
            explicitly before building UI.
          </p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Theme acquisition rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              <li>If the target app is a new shadcn app, add the theme from `https://raw.githubusercontent.com/Accomplicehq/accomplice-design-theme/master/registry/accomplice-theme.json` using the shadcn CLI.</li>
              <li>If the target app already uses this package, import `@accomplice/shadcn-theme/styles/accomplice.css` in the main app stylesheet.</li>
              <li>If this repo also exists locally on the same machine, the AI may use the local registry file as a fallback, but public instructions should prefer the public registry URL.</li>
              <li>If neither the public registry item nor the package is available, the AI should stop assuming and ask for the correct package name or stable registry URL.</li>
              <li>The AI should verify the theme is active before building screens by checking that semantic tokens resolve to Accomplice colors.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="rounded-[10px] bg-card p-5">
          <pre className="whitespace-pre-wrap text-base leading-[1.5] text-foreground">
{`# in a new shadcn app
npx shadcn@latest add https://raw.githubusercontent.com/Accomplicehq/accomplice-design-theme/master/registry/accomplice-theme.json

# in an existing app that already depends on this package
@import "@accomplice/shadcn-theme/styles/accomplice.css";

# optional local fallback if this repo exists on the same machine
npx shadcn@latest add D:/dev/accomplice-design-theme/registry/accomplice-theme.json

# if the theme source is not available
# ask for either:
# - the published npm package name/version
# - or a stable shadcn registry URL`}
          </pre>
        </div>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">Optional agent skills</h2>
          <p className={supportingTextClass}>
            Agent skills are optional tooling helpers. They are not part of the app itself and should never be treated
            as a hard dependency for building the UI.
          </p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Use if available, do not require</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              <li>If the agent environment supports skills, using the `shadcn` skill is recommended.</li>
              <li>The skill helps with component selection, CLI usage, and shadcn conventions.</li>
              <li>Do not block implementation on skill availability. If no skill system exists, use the shadcn CLI directly.</li>
              <li>The real source of truth is still the Accomplice theme, component files, and project commands in this repo.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="rounded-[10px] bg-card p-5">
          <pre className="whitespace-pre-wrap text-base leading-[1.5] text-foreground">
{`# optional, only if the agent environment supports Skills
npx skills add shadcn/ui -y

# still use project-level shadcn commands for actual UI work
npx shadcn@latest add button input textarea select checkbox switch tabs sheet dialog table`}
          </pre>
        </div>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">Definition of done</h2>
          <p className={supportingTextClass}>
            The AI should not consider the task complete until every item below is true.
          </p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Completion checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              <li>The screen uses real components from the shared UI layer, not custom substitute markup.</li>
              <li>The page matches Accomplice spacing, typography, and color constraints.</li>
              <li>Desktop and mobile both work, with sidebar on desktop and sheet menu on mobile.</li>
              <li>Primary actions, hover states, and nav states match the guide.</li>
              <li>`npm run build:preview` passes before handoff.</li>
              <li>If deployed, the hosted page loads correctly and the route renders without broken assets.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">Copyable agent brief</h2>
          <p className={supportingTextClass}>
            Use this block directly when instructing another AI to build an Accomplice app page.
          </p>
        </div>

        <div className="rounded-[10px] bg-card p-5">
          <pre className="whitespace-pre-wrap text-base leading-[1.5] text-foreground">
{`Build this interface using the Accomplice design system and real shadcn components.

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

Do not finish until the UI matches the Accomplice design guide and the build passes.`}
          </pre>
        </div>
      </section>
    </div>
  )
}

function App() {
  const [pageId, setPageId] = useState(() => (typeof window === "undefined" ? "overview" : currentHashPage()))
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.remove("dark")

    if (!window.location.hash) {
      window.location.hash = "#overview"
    }

    const onHashChange = () => {
      setPageId(currentHashPage())
      setMobileNavOpen(false)
    }

    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const currentPage = useMemo(() => pages.find((page) => page.id === pageId) ?? pages[0], [pageId])
  const isOverviewPage = pageId === "overview"

  return (
    <div className="theme-accomplice-shell min-h-screen bg-background">
      <header
        className={cn(
          "z-20 flex items-center justify-between px-4 py-4 lg:hidden",
          isOverviewPage ? "fixed inset-x-0 top-0" : "sticky top-0 bg-background"
        )}
      >
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className={cn(isOverviewPage && "bg-background/90")}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <p className="text-base font-normal text-foreground">Menu</p>
            <SidebarNav activePageId={pageId} onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>
        <p className={cn("text-base font-normal", isOverviewPage ? "text-background" : "text-foreground")}>
          {currentPage.label}
        </p>
      </header>

      <div className="flex min-h-screen w-full flex-col">
        <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:w-[220px] lg:overflow-y-auto lg:bg-secondary lg:px-5 lg:py-8">
          <SidebarNav activePageId={pageId} />
        </aside>

        <main
          className={cn(
            "min-w-0 flex-1 px-[min(6.5rem,8vw)] lg:ml-[220px]",
            isOverviewPage ? "pb-10 pt-0 lg:pb-12" : "py-10 lg:py-12"
          )}
        >
          {pageId === "typography" && <TypographyPage />}
          {pageId === "colors" && <ColorsPage />}
          {pageId === "components" && <ComponentsPage />}
          {pageId === "layout" && <LayoutPage />}
          {pageId === "ai" && <AIPage />}
          {pageId === "overview" && <OverviewPage />}
        </main>
      </div>
    </div>
  )
}

export default App
