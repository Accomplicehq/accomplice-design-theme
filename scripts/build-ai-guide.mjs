import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { aiGuide } from "../src/content/ai-guide.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, "..", "dist")

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function renderList(items) {
  return items.map((item) => `- ${item}`).join("\n")
}

function buildTextGuide() {
  const sections = [
    [
      "Accomplice AI Guide",
      `${aiGuide.intro} Use ${aiGuide.liveGuideUrl} as the canonical live reference when checking visual output.`,
      `Machine-readable URL: ${aiGuide.machineReadableUrl}`
    ],
    [
      aiGuide.themeSetup.title,
      aiGuide.themeSetup.description,
      renderList(aiGuide.themeSetup.items),
      aiGuide.themeSetup.snippet
    ],
    [
      aiGuide.executionContract.title,
      aiGuide.executionContract.description,
      renderList(aiGuide.executionContract.items)
    ],
    [
      aiGuide.systemSpecification.title,
      aiGuide.systemSpecification.description,
      aiGuide.systemSpecification.groups
        .map((group) => `${group.title}\n${renderList(group.items)}`)
        .join("\n\n")
    ],
    [
      aiGuide.requiredComponentBehavior.title,
      aiGuide.requiredComponentBehavior.description,
      renderList(aiGuide.requiredComponentBehavior.items)
    ],
    [
      aiGuide.commands.title,
      aiGuide.commands.description,
      aiGuide.commands.snippet
    ],
    [
      aiGuide.optionalAgentSkills.title,
      aiGuide.optionalAgentSkills.description,
      renderList(aiGuide.optionalAgentSkills.items),
      aiGuide.optionalAgentSkills.snippet
    ],
    [
      aiGuide.definitionOfDone.title,
      aiGuide.definitionOfDone.description,
      renderList(aiGuide.definitionOfDone.items)
    ],
    [
      aiGuide.copyableAgentBrief.title,
      aiGuide.copyableAgentBrief.description,
      aiGuide.copyableAgentBrief.snippet
    ]
  ]

  return sections.map((parts) => parts.filter(Boolean).join("\n\n")).join("\n\n---\n\n") + "\n"
}

function buildHtmlGuide() {
  const listMarkup = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
  const cardMarkup = (title, items) => `
    <section class="card">
      <h2>${escapeHtml(title)}</h2>
      ${listMarkup(items)}
    </section>
  `

  const systemMarkup = aiGuide.systemSpecification.groups
    .map((group) => cardMarkup(group.title, group.items))
    .join("")

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accomplice AI Guide</title>
    <meta name="description" content="Static machine-readable Accomplice AI implementation guide." />
    <style>
      :root {
        color-scheme: light;
        --bg: #ffffff;
        --fg: #000000;
        --muted: #5c5c5c;
        --card: #f5f5f5;
        --accent: #cd511b;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, sans-serif;
        background: var(--bg);
        color: var(--fg);
        line-height: 1.5;
      }
      main {
        width: min(980px, calc(100vw - 3rem));
        margin: 0 auto;
        padding: 3rem 0 5rem;
      }
      h1, h2, h3 {
        font-weight: 400;
        line-height: 1.25;
        margin: 0 0 1rem;
      }
      h1 { font-size: 1.5rem; }
      h2 { font-size: 1.125rem; }
      p, li, pre { font-size: 1rem; }
      p { margin: 0; }
      section { margin-top: 3rem; }
      ul {
        margin: 0;
        padding-left: 1.25rem;
      }
      li + li { margin-top: 0.75rem; }
      .card {
        background: var(--card);
        border-radius: 10px;
        padding: 1.25rem;
      }
      .grid {
        display: grid;
        gap: 1rem;
      }
      @media (min-width: 760px) {
        .grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      pre {
        white-space: pre-wrap;
        margin: 0;
        background: var(--card);
        border-radius: 10px;
        padding: 1.25rem;
        overflow-x: auto;
      }
      a { color: var(--accent); }
      .eyebrow {
        color: var(--muted);
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">Machine-readable guide</p>
        <h1>Accomplice AI Guide</h1>
        <p>${escapeHtml(aiGuide.intro)} Use <a href="${escapeHtml(aiGuide.liveGuideUrl)}">${escapeHtml(aiGuide.liveGuideUrl)}</a> as the canonical live reference when checking visual output. Prefer <a href="${escapeHtml(aiGuide.machineReadableUrl)}">${escapeHtml(aiGuide.machineReadableUrl)}</a> for direct agent consumption.</p>
      </header>

      <section>
        <h2>${escapeHtml(aiGuide.themeSetup.title)}</h2>
        <p>${escapeHtml(aiGuide.themeSetup.description)}</p>
        <div class="card" style="margin-top: 1rem;">
          <h3>${escapeHtml(aiGuide.themeSetup.cardTitle)}</h3>
          ${listMarkup(aiGuide.themeSetup.items)}
        </div>
        <pre style="margin-top: 1rem;">${escapeHtml(aiGuide.themeSetup.snippet)}</pre>
      </section>

      <section>
        <h2>${escapeHtml(aiGuide.executionContract.title)}</h2>
        <p>${escapeHtml(aiGuide.executionContract.description)}</p>
        <div class="card" style="margin-top: 1rem;">
          <h3>${escapeHtml(aiGuide.executionContract.cardTitle)}</h3>
          ${listMarkup(aiGuide.executionContract.items)}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(aiGuide.systemSpecification.title)}</h2>
        <p>${escapeHtml(aiGuide.systemSpecification.description)}</p>
        <div class="grid two" style="margin-top: 1rem;">
          ${systemMarkup}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(aiGuide.requiredComponentBehavior.title)}</h2>
        <p>${escapeHtml(aiGuide.requiredComponentBehavior.description)}</p>
        <div class="card" style="margin-top: 1rem;">
          <h3>${escapeHtml(aiGuide.requiredComponentBehavior.cardTitle)}</h3>
          ${listMarkup(aiGuide.requiredComponentBehavior.items)}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(aiGuide.commands.title)}</h2>
        <p>${escapeHtml(aiGuide.commands.description)}</p>
        <pre style="margin-top: 1rem;">${escapeHtml(aiGuide.commands.snippet)}</pre>
      </section>

      <section>
        <h2>${escapeHtml(aiGuide.optionalAgentSkills.title)}</h2>
        <p>${escapeHtml(aiGuide.optionalAgentSkills.description)}</p>
        <div class="card" style="margin-top: 1rem;">
          <h3>${escapeHtml(aiGuide.optionalAgentSkills.cardTitle)}</h3>
          ${listMarkup(aiGuide.optionalAgentSkills.items)}
        </div>
        <pre style="margin-top: 1rem;">${escapeHtml(aiGuide.optionalAgentSkills.snippet)}</pre>
      </section>

      <section>
        <h2>${escapeHtml(aiGuide.definitionOfDone.title)}</h2>
        <p>${escapeHtml(aiGuide.definitionOfDone.description)}</p>
        <div class="card" style="margin-top: 1rem;">
          <h3>${escapeHtml(aiGuide.definitionOfDone.cardTitle)}</h3>
          ${listMarkup(aiGuide.definitionOfDone.items)}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(aiGuide.copyableAgentBrief.title)}</h2>
        <p>${escapeHtml(aiGuide.copyableAgentBrief.description)}</p>
        <pre style="margin-top: 1rem;">${escapeHtml(aiGuide.copyableAgentBrief.snippet)}</pre>
      </section>
    </main>
  </body>
</html>
`
}

await mkdir(join(distDir, "ai"), { recursive: true })
await writeFile(join(distDir, "ai.txt"), buildTextGuide(), "utf8")
await writeFile(join(distDir, "ai", "index.html"), buildHtmlGuide(), "utf8")

console.log("Built static AI guide outputs.")
