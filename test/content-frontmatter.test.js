import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(__dirname, "../src/content/docs");

function findMdxFiles(dir) {
  return readdirSync(dir, { recursive: true })
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => resolve(dir, entry));
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const lineMatch = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/);
    if (lineMatch) frontmatter[lineMatch[1]] = lineMatch[2].trim();
  }
  return frontmatter;
}

describe("docs content frontmatter", () => {
  const files = findMdxFiles(docsDir);

  it("finds content files to check", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s has a non-empty title", (file) => {
    const source = readFileSync(file, "utf-8");
    const frontmatter = parseFrontmatter(source);

    expect(
      frontmatter,
      `${relative(docsDir, file)} is missing frontmatter`,
    ).not.toBeNull();
    expect(
      frontmatter.title,
      `${relative(docsDir, file)} is missing a title`,
    ).toBeTruthy();
  });
});
