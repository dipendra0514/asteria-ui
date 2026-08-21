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

**Resolved.** File key `CDgfoMkj7lP3pXWJ3aOgkH` confirmed and recorded in
CLAUDE.md's "Where specs come from" section. Note: the file's `get_metadata`
call with no `nodeId` only ever surfaces the "🖼️ Cover" page — the rest of the
document (Foundations, per-component canvases) only resolves via direct
node-id lookups. The working node-map for the base-components overview
canvas turned out to be a sequential range `2120:2`–`2120:19` (one per
component, in build order), separate from Avatar which lives at `0:1`. Both
verified live via `get_metadata`/`get_design_context` before use — never
built against an unverified id.

Audited `packages/registry/ui/button.tsx` against Figma node `2120:2` (canvas
"↳ Button", frame `2121:722`, full Primary/Secondary/Ghost/Destructive/Link ×
sm/md/lg/xl × default/hover/focus/active/disabled/loading matrix). Real drift
found and fixed:
- **Radius**: code used `radius-md` (10px, matching CLAUDE.md's generic
  "radius-md 10 (inputs/buttons)" guideline); Figma's actual spec is
  `radius-sm` (8px) across every size. Figma wins per CLAUDE.md's own
  "Figma is the single source of truth" rule — fixed to `rounded-sm`. This is
  worth flagging back upstream: CLAUDE.md's radius guideline line may need a
  correction for Button specifically, since the real spec disagrees with the
  doc's general note.
- **Font size**: `sm` used `ui-sm` (13px); Figma spec is `ui-md` (14px). `md`
  used `ui-md` (14px); Figma spec is `ui-lg` (16px). `lg`/`xl` were already
  correct at `ui-lg` (Figma has no `ui-xl` step, so `lg` and `xl` both cap at
  `ui-lg`).
- **Missing `leadingIcon` slot**: Figma's component properties include a
  `leadingIcon`/`showIcon` instance-swap slot (16px icon at sm/md, 20px at
  lg/xl) that the old code never exposed. Added as `leadingIcon?: ReactNode`,
  auto-sized via a `cloneElement`-based helper (mirrors the pattern already
  used in `AvatarGroup`) rather than adding a redundant `showIcon` boolean —
  the icon shows whenever `leadingIcon` is truthy, which is the more
  idiomatic React shape for the same visual result.
- **Gap**: was a flat `gap-2` (8px) regardless of size; Figma varies it per
  size (4/8/8/12px for sm/md/lg/xl) — made it a size-variant class.
- **Ref pattern**: migrated from `React.forwardRef` +
  `ButtonHTMLAttributes` to `React.ComponentPropsWithRef<"button">` on a
  plain function component, per CLAUDE.md's locked convention (React 19
  ref-as-prop, no `forwardRef` wrapper needed). This is the pattern every
  later component in the queue should follow.
- **Confirmed correct, no change**: all 5 variants' colors (verified Primary,
  Secondary, Ghost, Destructive, Link, and the Primary-disabled state
  directly against Figma — every one already used the right semantic
  token), the `shadow-glow-focus` value (Figma's `DROP_SHADOW #5C74EB3D`
  spread 4 = exactly `brand-500 @ 24%`, matching `tokens.css` byte-for-byte),
  and all four density heights (32/40/48/56, already correct).

Accessibility doc comment pulled verbatim from Figma's Accessibility Note
(node `2121:14691`): "role=button · Enter/Space activates · focus ring
visible on Tab · disabled prevents interaction · loading state announces via
aria-busy" (note: slightly different wording than the illustrative example
in CLAUDE.md itself — "loading state announces" vs "loading announces" — used
Figma's actual wording since Figma is the source of truth).

Added `packages/registry/ui/__tests__/button.test.tsx`: 10 tests covering
render, ref forwarding, className merge (tailwind-merge collision), click,
keyboard activation (Enter + Space), presence of the focus-glow class,
disabled blocking interaction, loading setting `aria-busy` and blocking
interaction, `leadingIcon` sizing, and a vitest-axe pass with zero violations
across default/disabled/loading. `pnpm lint` and `pnpm test` both clean.
Installed `lucide-react` in `packages/registry` (needed for upcoming
components; Button's own slot just accepts any `ReactNode` so it didn't need
a direct import itself).

**Status: Phase 1 (Button) complete.** Proceeding into the overnight queue
(Avatar → Badge → … → Tabs) per the autonomous build protocol recorded in
`STATUS.md` — see that file for live progress, since this log is updated
once per component rather than continuously.
