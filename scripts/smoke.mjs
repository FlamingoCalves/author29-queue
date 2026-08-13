#!/usr/bin/env node
/**
 * Fetch key routes and fail if Next returned an RSC/runtime crash overlay.
 * Usage: BASE_URL=http://localhost:3020 node scripts/smoke.mjs
 */

const BASE = (process.env.BASE_URL ?? "http://localhost:3020").replace(/\/$/, "");

const ROUTES = ["/", "/today", "/stages", "/review", "/api/health"];

const CRASH_SIGNATURES = [
  "Application error: a server-side exception",
  "A client-side exception has occurred",
  "Unhandled Runtime Error",
  "This is probably a bug in the React Server Components bundler",
  "__webpack_modules__[moduleId] is not a function",
  "Could not find the module",
];

async function check(path) {
  const url = `${BASE}${path}`;
  const response = await fetch(url, { redirect: "manual" });
  const text = await response.text();
  const problems = [];

  if (response.status >= 400) {
    problems.push(`HTTP ${response.status}`);
  }

  for (const signature of CRASH_SIGNATURES) {
    if (text.includes(signature)) {
      problems.push(`crash signature: ${signature}`);
    }
  }

  return { url, status: response.status, problems };
}

const results = [];
for (const path of ROUTES) {
  try {
    results.push(await check(path));
  } catch (error) {
    results.push({
      url: `${BASE}${path}`,
      status: 0,
      problems: [error instanceof Error ? error.message : String(error)],
    });
  }
}

const failed = results.filter((result) => result.problems.length > 0);

for (const result of results) {
  const mark = result.problems.length ? "FAIL" : "ok  ";
  console.log(`${mark}  ${result.status || "—"}  ${result.url}`);
  for (const problem of result.problems) {
    console.log(`      ${problem}`);
  }
}

if (failed.length) {
  console.error(`\nSmoke failed: ${failed.length}/${results.length} routes.`);
  process.exit(1);
}

console.log(`\nSmoke passed: ${results.length} routes at ${BASE}`);
