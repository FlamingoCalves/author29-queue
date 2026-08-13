#!/usr/bin/env node
/**
 * Production-server smoke: `next start` then hit routes.
 * Run after `npm run build`.
 */

import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const PORT = process.env.PORT ?? "3020";
const BASE_URL = `http://localhost:${PORT}`;

const server = spawn("npx", ["next", "start", "-p", PORT], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, PORT },
});

let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  output += chunk.toString();
});

function shutdown(code) {
  server.kill("SIGTERM");
  process.exit(code);
}

process.on("exit", () => {
  if (!server.killed) server.kill("SIGTERM");
});

let ready = false;
for (let i = 0; i < 40; i += 1) {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (res.ok) {
      ready = true;
      break;
    }
  } catch {
    // still booting
  }
  await delay(250);
}

if (!ready) {
  console.error("Server did not become ready.\n", output);
  shutdown(1);
}

const smoke = spawn(process.execPath, ["scripts/smoke.mjs"], {
  stdio: "inherit",
  env: { ...process.env, BASE_URL },
});

smoke.on("exit", (code) => shutdown(code ?? 1));
