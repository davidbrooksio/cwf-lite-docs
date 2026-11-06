import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(__dirname, "../astro.config.mjs");
const docsDir = resolve(__dirname, "../src/content/docs");

// We deliberately don't `import()` astro.config.mjs: it pulls in the full
// Starlight/Astro integration pipeline, which isn't meant to run outside an
// Astro build. Treating the file as text and regex-extracting `link: "..."`
// values is enough to catch the actual regression we care about: a sidebar
// entry pointing at a content file that doesn't exist (e.g. after a rename).
function extractSidebarLinks() {
  const source = readFileSync(configPath, "utf-8");
  const matches = [...source.matchAll(/link:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

function linkToContentPath(link) {
  const trimmed = link.replace(/^\/|\/$/g, "");
  const relative = trimmed === "" ? "index" : trimmed;
  return resolve(docsDir, `${relative}.mdx`);
}

describe("sidebar navigation", () => {
  const links = extractSidebarLinks();

  it("finds sidebar links to check", () => {
    expect(links.length).toBeGreaterThan(0);
  });

  it.each(links)("link %s resolves to an existing content file", (link) => {
    const contentPath = linkToContentPath(link);
    expect(existsSync(contentPath)).toBe(true);
  });
});
