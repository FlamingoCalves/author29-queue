#!/usr/bin/env node
/**
 * Start Queue if needed, then run the shared portfolio-shots capture runner.
 *
 *   npm run build && npm run portfolio:capture
 *
 * Override the target with PORTFOLIO_BASE_URL (localhost or preview only).
 */

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(here, "..");
const shotsRoot = path.resolve(appRoot, "../portfolio-shots");
const runner = path.join(shotsRoot, "capture/runner.mjs");
const scenes = path.join(appRoot, "portfolio.scenes.json");
const outDir = path.join(shotsRoot, "author29-queue");
const port = Number(process.env.PORT ?? 3020);
const requestedBase = process.env.PORTFOLIO_BASE_URL;
const localBase = `http://127.0.0.1:${port}`;

async function isUp(url) {
  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/api/health`, {
      signal: AbortSignal.timeout(1500),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function startLocalServer() {
  const child = spawn("npx", ["next", "start", "-p", String(port)], {
    cwd: appRoot,
    stdio: "inherit",
    env: { ...process.env, PORT: String(port) },
  });
  return child;
}

function runRunner(baseUrl) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [runner, "--scenes", scenes, "--out", outDir, "--base-url", baseUrl],
      { cwd: shotsRoot, stdio: "inherit" },
    );
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Capture runner exited ${code}`));
    });
    child.on("error", reject);
  });
}

async function waitForServer(url, timeoutMs = 30_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await isUp(url)) return;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`Queue did not become ready at ${url}`);
}

async function main() {
  if (requestedBase) {
    if (!(await isUp(requestedBase))) {
      throw new Error(`PORTFOLIO_BASE_URL is not reachable: ${requestedBase}`);
    }
    await runRunner(requestedBase.replace(/\/$/, ""));
    return;
  }

  let child = null;
  if (!(await isUp(localBase))) {
    child = startLocalServer();
    await waitForServer(localBase);
  }

  try {
    await runRunner(localBase);
  } finally {
    if (child) {
      child.kill("SIGTERM");
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
