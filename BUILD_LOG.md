# Asteria UI — Build Log

## Phase 0 — Monorepo scaffold

Most of Phase 0 was already done in a prior session (pnpm + Turborepo structure,
`tokens.css` fully populated and matching CLAUDE.md's confirmed values exactly,
`theme.css` Tailwind v4 `@theme inline` mapping, `cn()` helper, Button and Avatar
already coded, docs-site MDX content pre-written for ~18 components ahead of their
implementations). This pass audited that state and filled the remaining gaps:

- **Cleanup**: removed two empty junk directories (`apps/www/{app`,
  `packages/registry/{ui,lib}`) left over from a shell brace-expansion mistake in an
  earlier session — never tracked in git, purely stray empty dirs.
- **Biome**: added `biome.json` at root (recommended + a11y rules, double quotes,
  trailing commas, 2-space indent — matches the existing code style). Wired
  `lint`/`format`/`check` scripts at root. Fixed 20 files' formatting/import-sort
  drift via `biome check --write`. Two real lint findings in `avatar.tsx` were
  suppressed with justified `biome-ignore` comments rather than "fixed" into wrong
  semantics: (1) `role="group"` on the avatar-stack `<div>` — Biome suggested
  `<fieldset>`, which is form semantics and wrong for a visual avatar stack; (2)
  `useExhaustiveDependencies` on the `src`-keyed reset effect in `Avatar` — the
  effect intentionally re-keys on `src` alone to clear the broken-image fallback.
- **Vitest**: added `vitest.config.ts` + `vitest.setup.ts` to
  `packages/registry` (jsdom env, `@testing-library/jest-dom`, `vitest-axe`
  matchers). Added `packages/registry/lib/test-axe.ts` exporting a
  pre-configured `axe` with the `color-contrast` rule disabled — jsdom has no
  real paint engine, so that check is pure noise there (confirmed via a
  throwaway smoke test, then removed once verified). All future component a11y
  tests should import `axe` from `../lib/test-axe`, not raw `vitest-axe`.
- **CLI package**: scaffolded `packages/cli` (tsup build config, strict
  tsconfig, placeholder `src/index.ts`). Full `init`/`add` command logic is
  Phase 3 — this pass only wires the build tooling per Phase 0's scope.
- **Verified**: `pnpm install` resolves clean across all 4 workspace projects
  (root, `www`, `@asteria-ui/registry`, `asteria-ui` CLI). `biome check .` passes
  with zero errors. `turbo test` runs registry's Vitest correctly (currently
  exits 1 with "no test files found" — expected, since it fails until Phase 1
  adds real Button tests).

**Status: Phase 0 complete.**

## Phase 1 — Button (reference component)

**Blocked before starting.** CLAUDE.md requires pulling Button's real spec from
Figma MCP before building, and explicitly says: "If Figma access is unavailable,
stop and ask rather than guessing — flag exactly what's missing." Figma MCP is
authenticated (confirmed via `whoami`), but every Figma tool (`get_design_context`,
`get_libraries`, `search_design_system`) requires a `fileKey`/URL as input, and
none of those are on record anywhere in this repo or conversation. There's no
list-files tool to discover the file on our own. Asked the user for the Figma file
URL rather than guessing at variants/states/tokens not yet confirmed.
