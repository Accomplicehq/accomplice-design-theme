import { spawn } from "node:child_process"
import { watch } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")
const nodeBin = process.execPath
const buildScript = path.join(rootDir, "scripts", "build-theme.mjs")
const viteScript = path.join(rootDir, "node_modules", "vite", "bin", "vite.js")
const tokenPath = path.join(rootDir, "tokens", "accomplice-theme.json")

let pendingBuild = null
let shuttingDown = false

function runBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn(nodeBin, [buildScript], {
      cwd: rootDir,
      stdio: "inherit"
    })

    child.on("exit", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Theme build failed with code ${code ?? "unknown"}.`))
    })
  })
}

function queueBuild(reason) {
  if (pendingBuild) {
    return
  }

  pendingBuild = setTimeout(async () => {
    pendingBuild = null

    try {
      console.log(`\n[theme] Rebuilding after ${reason}...`)
      await runBuild()
    } catch (error) {
      console.error(`[theme] ${error.message}`)
    }
  }, 120)
}

await runBuild()

const watcher = watch(tokenPath, () => queueBuild("token change"))

const vite = spawn(nodeBin, [viteScript], {
  cwd: rootDir,
  stdio: "inherit"
})

function shutdown(signal) {
  if (shuttingDown) {
    return
  }

  shuttingDown = true
  watcher.close()
  vite.kill(signal)
}

process.on("SIGINT", () => shutdown("SIGINT"))
process.on("SIGTERM", () => shutdown("SIGTERM"))

vite.on("exit", (code) => {
  watcher.close()
  process.exit(code ?? 0)
})
