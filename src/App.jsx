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
import { aiGuide } from "./content/ai-guide"
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
            constrained palette. The image treatment should feel intentional and atmospheric, not decorative. The live
            guide for this project is available at `https://design.accomplice.se/`.
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
          {aiGuide.intro} Use `{aiGuide.liveGuideUrl}` as the canonical live reference when checking visual output, and
          prefer `{aiGuide.machineReadableUrl}` for direct machine-readable access.
        </p>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">{aiGuide.themeSetup.title}</h2>
          <p className={supportingTextClass}>{aiGuide.themeSetup.description}</p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{aiGuide.themeSetup.cardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              {aiGuide.themeSetup.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="rounded-[10px] bg-card p-5">
          <pre className="whitespace-pre-wrap text-base leading-[1.5] text-foreground">{aiGuide.themeSetup.snippet}</pre>
        </div>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">{aiGuide.executionContract.title}</h2>
          <p className={supportingTextClass}>{aiGuide.executionContract.description}</p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{aiGuide.executionContract.cardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              {aiGuide.executionContract.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">{aiGuide.systemSpecification.title}</h2>
          <p className={supportingTextClass}>{aiGuide.systemSpecification.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {aiGuide.systemSpecification.groups.map((group) => (
            <Card key={group.title} className="bg-background">
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">{aiGuide.requiredComponentBehavior.title}</h2>
          <p className={supportingTextClass}>{aiGuide.requiredComponentBehavior.description}</p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{aiGuide.requiredComponentBehavior.cardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              {aiGuide.requiredComponentBehavior.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">{aiGuide.commands.title}</h2>
          <p className={supportingTextClass}>{aiGuide.commands.description}</p>
        </div>

        <div className="rounded-[10px] bg-card p-5">
          <pre className="whitespace-pre-wrap text-base leading-[1.5] text-foreground">{aiGuide.commands.snippet}</pre>
        </div>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">{aiGuide.optionalAgentSkills.title}</h2>
          <p className={supportingTextClass}>{aiGuide.optionalAgentSkills.description}</p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{aiGuide.optionalAgentSkills.cardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              {aiGuide.optionalAgentSkills.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="rounded-[10px] bg-card p-5">
          <pre className="whitespace-pre-wrap text-base leading-[1.5] text-foreground">{aiGuide.optionalAgentSkills.snippet}</pre>
        </div>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">{aiGuide.definitionOfDone.title}</h2>
          <p className={supportingTextClass}>{aiGuide.definitionOfDone.description}</p>
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>{aiGuide.definitionOfDone.cardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-base leading-[1.5] text-muted-foreground">
              {aiGuide.definitionOfDone.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-normal text-foreground">{aiGuide.copyableAgentBrief.title}</h2>
          <p className={supportingTextClass}>{aiGuide.copyableAgentBrief.description}</p>
        </div>

        <div className="rounded-[10px] bg-card p-5">
          <pre className="whitespace-pre-wrap text-base leading-[1.5] text-foreground">{aiGuide.copyableAgentBrief.snippet}</pre>
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
