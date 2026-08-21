# Asteria UI

Open-source components for React & Tailwind.

## Structure

- `apps/www` — docs site + landing (Next.js + Fumadocs). Also hosts the component registry JSON.
- `packages/registry` — component source of truth (`ui/`), shared lib (`cn()`), `registry.json`.
- `packages/cli` — (later) `npx asteria-ui init|add`.

## Getting started

```bash
pnpm install
pnpm dev
```

Docs at http://localhost:3000/docs

## Notes

- Design tokens in `apps/www/styles/tokens.css` mirror the Figma variable system 1:1
  (primitives -> semantic, light + dark). Hex values marked `TODO(figma)` are derived
  approximations — replace with exact values from the Figma primitives collection.
- Fumadocs iterates quickly. If an API here has drifted, cross-check against
  https://fumadocs.dev — the structure (source.config.ts, lib/source.ts, DocsLayout)
  stays the same.
