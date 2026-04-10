import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")
const args = new Set(process.argv.slice(2))
const checkOnly = args.has("--check")

const tokenPath = path.join(rootDir, "tokens", "accomplice-theme.json")
const cssPath = path.join(rootDir, "styles", "accomplice.css")
const registryItemPath = path.join(rootDir, "registry", "accomplice-theme.json")

const standardColorVars = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring"
]

const customColorVars = ["brand", "brand-strong", "surface", "surface-raised", "success", "warning", "info"]
const themeVars = ["radius", "font-accomplice-sans", "font-accomplice-display"]

const tokenFile = JSON.parse(await readFile(tokenPath, "utf8"))

const cssVarToThemeVar = (name) => `--color-${name}`
const cssDecl = (name, value) => `  --${name}: ${value};`

function buildCss() {
  const lightLines = themeVars.map((name) => cssDecl(name, tokenFile.theme[name])).concat(
    [...standardColorVars, ...customColorVars].map((name) => cssDecl(name, tokenFile.light[name]))
  )

  const darkLines = [...standardColorVars, ...customColorVars].map((name) => cssDecl(name, tokenFile.dark[name]))

  const themeInlineLines = [
    "  --font-sans: var(--font-accomplice-sans);",
    "  --font-serif: var(--font-accomplice-display);",
    "",
    "  --radius-sm: calc(var(--radius) - 4px);",
    "  --radius-md: calc(var(--radius) - 2px);",
    "  --radius-lg: var(--radius);",
    "  --radius-xl: calc(var(--radius) + 4px);",
    "",
    ...[...standardColorVars, ...customColorVars].map((name) => `  ${cssVarToThemeVar(name)}: var(--${name});`)
  ]

  return [
    "/* Generated from tokens/accomplice-theme.json by scripts/build-theme.mjs */",
    "@custom-variant dark (&:is(.dark *));",
    "",
    ":root {",
    ...lightLines,
    "}",
    "",
    ".dark {",
    ...darkLines,
    "}",
    "",
    "@theme inline {",
    ...themeInlineLines,
    "}",
    "",
    "@layer base {",
    "  * {",
    "    @apply border-border outline-ring/50;",
    "  }",
    "",
    "  body {",
    "    @apply bg-background text-foreground antialiased;",
    "  }",
    "}",
    "",
    ".theme-accomplice-shell {",
    "  background: var(--background);",
    "}",
    "",
    ".theme-accomplice-panel {",
    "  background: var(--surface);",
    "  box-shadow: none;",
    "}",
    "",
    ".dark .theme-accomplice-panel {",
    "  background: var(--surface);",
    "}",
    "",
    ".theme-accomplice-kicker {",
    "  @apply text-xs font-normal text-muted-foreground;",
    "}",
    "",
    ".theme-accomplice-display {",
    "  font-family: var(--font-accomplice-display);",
    "}",
    ""
  ].join("\n")
}

function buildRegistryItem() {
  const cssTheme = {
    "--font-sans": "var(--font-accomplice-sans)",
    "--font-serif": "var(--font-accomplice-display)",
    "--radius-sm": "calc(var(--radius) - 4px)",
    "--radius-md": "calc(var(--radius) - 2px)",
    "--radius-lg": "var(--radius)",
    "--radius-xl": "calc(var(--radius) + 4px)"
  }

  for (const name of [...standardColorVars, ...customColorVars]) {
    cssTheme[cssVarToThemeVar(name)] = `var(--${name})`
  }

  return JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: tokenFile.name,
      type: "registry:theme",
      title: "Accomplice Theme",
      description:
        "Accomplice company theme for shadcn with durable neutrals, mineral brand accents, and warm editorial surfaces.",
      cssVars: {
        theme: tokenFile.theme,
        light: tokenFile.light,
        dark: tokenFile.dark
      },
      css: {
        "@theme inline": cssTheme,
        "@layer base": {
          "*": {
            "@apply": "border-border outline-ring/50"
          },
          body: {
            "@apply": "bg-background text-foreground antialiased"
          }
        },
        ".theme-accomplice-shell": {
          background: "var(--background)"
        },
        ".theme-accomplice-panel": {
          background: "var(--surface)",
          "box-shadow": "none"
        },
        ".dark .theme-accomplice-panel": {
          background: "var(--surface)"
        },
        ".theme-accomplice-kicker": {
          "@apply": "text-xs font-normal text-muted-foreground"
        },
        ".theme-accomplice-display": {
          "font-family": "var(--font-accomplice-display)"
        }
      }
    },
    null,
    2
  )
}

async function syncFile(filePath, nextContent) {
  if (checkOnly) {
    const currentContent = await readFile(filePath, "utf8")
    if (currentContent !== nextContent) {
      throw new Error(`${path.relative(rootDir, filePath)} is out of date. Run npm run build.`)
    }
    return
  }

  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, nextContent)
}

await syncFile(cssPath, buildCss())
await syncFile(registryItemPath, `${buildRegistryItem()}\n`)

if (!checkOnly) {
  console.log("Updated generated theme files.")
}
