#!/usr/bin/env node
// Regenerates src/generated/templates.ts by embedding the current registry
// source files and token CSS as string constants, so the published CLI
// package needs no runtime dependency on the monorepo's other packages.
// Run automatically before every build (see package.json's "build" script).

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..");
const registryRoot = join(cliRoot, "..", "registry");
const stylesRoot = join(cliRoot, "..", "..", "apps", "www", "styles");

function readText(path) {
  return readFileSync(path, "utf8");
}

function collectComponentSources() {
  /** @type {Record<string, string>} */
  const sources = {};
  for (const sub of ["ui", "lib"]) {
    const dir = join(registryRoot, sub);
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      if (entry.name.startsWith(".")) continue;
      const relPath = `${sub}/${entry.name}`;
      sources[relPath] = readText(join(dir, entry.name));
    }
  }
  return sources;
}

const registryJson = JSON.parse(readText(join(registryRoot, "registry.json")));
const tokensCss = readText(join(stylesRoot, "tokens.css"));
const themeCss = readText(join(stylesRoot, "theme.css"));
const componentSources = collectComponentSources();

const outDir = join(cliRoot, "src", "generated");
mkdirSync(outDir, { recursive: true });

const banner = `// GENERATED FILE — do not edit directly.
// Regenerate with \`pnpm run sync\` (from packages/cli), which embeds the
// current packages/registry source and apps/www token CSS as string
// constants so the published CLI needs no monorepo dependency at runtime.
`;

const content = `${banner}
export const TOKENS_CSS = ${JSON.stringify(tokensCss)};

export const THEME_CSS = ${JSON.stringify(themeCss)};

export const REGISTRY = ${JSON.stringify(registryJson, null, 2)} as const;

export const COMPONENT_SOURCES: Record<string, string> = ${JSON.stringify(
  componentSources,
  null,
  2,
)};
`;

writeFileSync(join(outDir, "templates.ts"), content);
console.log(
  `Synced templates.ts: ${Object.keys(componentSources).length} component files, ${registryJson.items.length} registry items.`,
);
