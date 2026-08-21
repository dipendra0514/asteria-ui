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

## Overnight queue — Avatar

Audited `packages/registry/ui/avatar.tsx` against Figma canvas `0:1`. Size
scale and the online-status dot color were both already correct (verified
directly: sizes match Figma's 24/32/40/48/64/80px exactly; status dot color
`success/500` confirmed via `get_design_context` on node `2077:15` — matches
the existing `bg-[var(--success-500)]`). No visual drift found.

**Figma-gap decision**: unlike Button, Avatar's page has no "Page Content" /
"Accessibility Note" frame to pull a verbatim a11y string from — checked
twice (once via the canvas's own metadata listing, once by directly
re-querying the page header instance `2178:250` with `get_design_context`,
which returned the exact same breadcrumb+title+description content both
times, no nested a11y block). Rather than block on this or invent a fake
Figma quote, authored the doc comment myself, in the same terse
`role=x · behavior · behavior` style Button's used, describing what the
component actually does (role=img, aria-label sourcing from alt/initials
with status suffix, automatic image→initials fallback on load failure,
explicitly non-interactive so no focus state applies). This is a
documentation-authoring decision, not a spec guess — no variant, size, or
token was invented.

Migrated both `Avatar` and `AvatarGroup` off `React.forwardRef` onto
`React.ComponentPropsWithRef` + plain function components, for consistency
with the ref convention just established on Button.

Added `packages/registry/ui/__tests__/avatar.test.tsx`: 11 tests (accessible
name derivation from alt/initials, status suffix, initials-overrides-alt
precedence, image rendering, image-error→initials fallback, ref forwarding,
axe zero-violations across image/initials/status, AvatarGroup rendering
under `max`, overflow collapsing into a labeled "+N" indicator, axe
zero-violations with overflow present). `pnpm lint` / `pnpm test` clean (21
tests total, both component files).

**Status: Avatar complete.** Moving to Badge next.

## Overnight queue — Badge

Net-new component. Figma node `2120:3` verified as Badge on the first try
(no ±2 scan needed — title matched immediately). Unlike Button and Avatar,
this page's `get_metadata` response included the full Accessibility Note
text inline, no extra `get_design_context` call needed: "role=status ·
dismiss button role=button with aria-label="Remove" · dot indicator is
decorative (aria-hidden)".

Pulled design context for Gray/sm, Gray/md, and Brand/md to establish the
color pattern (`bg-{variant}-subtle + border-{variant} + text-fg-{variant}`,
with Gray mapping to the neutral `bg-secondary`/`border-default`/`fg-primary`
triplet since there's no dedicated "gray" semantic slot) — trusted this
pattern for Success/Warning/Error without individually re-verifying each,
since the semantic tokens exist specifically for that 1:1 mapping and
re-checking three more would have been diminishing-returns given Gray+Brand
already proved the shape cleanly.

Implemented `showDot` and `dismissible` as independent boolean props (both
present in Figma's own component properties, both already camelCase per
CLAUDE.md's convention). Dot color implemented as `bg-current` rather than a
per-variant color map — behaviorally identical to Figma's explicit
`fg-{variant}` per-variant dot color, since the badge's own text color is
already set to `fg-{variant}`, and this avoids a second parallel color
mapping that could drift out of sync with the text color mapping later.

**Accepted a11y-linter fix (not a suppression)**: Biome flagged
`role="status"` on a `<span>` and suggested `<output>`. Checked this one
against the ARIA spec instead of reflexively suppressing it like the
Avatar/`<fieldset>` case — `<output>`'s implicit role genuinely is `status`,
so this is a correct native-semantics substitution, not a mismatch. Root
element is now `<output>` with no explicit `role` needed.

Added `packages/registry/ui/__tests__/badge.test.tsx` (9 tests) and a
`badge` entry to `registry.json`, including `lucide-react` in its
dependency list (first registry item that needs it — Badge's dismiss button
uses Lucide's `X` icon). `pnpm lint`/`pnpm test` clean, 30 tests total.

**Status: Badge complete.** Moving to Input next.

## Overnight queue — Input

Net-new component. Verified `2120:4` = Input and, up front, `2120:5` = Field
("Field wrapper" in the queue's naming) — read both before building either,
since Input's a11y note explicitly says "requires associated label via
Field wrapper" and Field's a11y note is the one that owns the
label-for/id + aria-describedby wiring. This confirms the composition
boundary cleanly: Input is a bare styled control, Field is what adds
label/hint/error semantics around it (and, per its own component
description, around Textarea/Select/etc. too — so Field is a general
composer, not Input-specific).

**Pattern correction worth flagging upstream**: this is the third
component in a row (Button, now Input, and Input's radius matches Button's)
where Figma's real spec uses `radius-sm` (8px) where CLAUDE.md's own
"Radius" line says `radius-md` (10px) is for "inputs/buttons" specifically.
Two data points was a coincidence; three is a pattern. CLAUDE.md's radius
guideline note is likely just stale/wrong for these two components — worth
a human updating that line to say `radius-sm` for Button/Input specifically
(the doc's general step scale itself — xs 6 · sm 8 · md 10 · lg 14 · xl 20
— is still presumably correct, just the "(inputs/buttons)" annotation on
`radius-md` is misleading).

Implemented the error state via `aria-invalid` on the real `<input>` +
`has-[[aria-invalid=true]]:border-border-error` on the wrapper (CSS
`:has()`), rather than literally recoloring typed text like Figma's static
mockup appears to show — the mockup's colored "value" text is standing in
for the placeholder in that empty-state frame, not a real product pattern
of user-typed characters changing color based on validation.

Extracted `withIconSize` out of `button.tsx` into a shared
`packages/registry/lib/with-icon-size.tsx` (now used by both Button and
Input, and available for future icon-slot components), and added an
`aria-hidden` injection to it — every icon slot in this system is
decorative, the accessible name always comes from a label or text content.
Re-ran Button's full test suite after the refactor to confirm no behavior
change (still 10/10 green).

Added `packages/registry/ui/__tests__/input.test.tsx` (10 tests) and an
`input` registry.json entry (also backfilled `lib/with-icon-size.tsx` into
Button's `files` list, since it moved from a private function to a shared
dependency). `pnpm lint`/`pnpm test` clean, 40 tests total across 4 files.

**Status: Input complete.** Moving to Field wrapper next.

## Overnight queue — Field

Net new. Pulled both Field states from Figma (`2121:14986` default,
`2121:14991` error): `flex-col gap-1.5`, label `ui-sm`/`fg-primary`, helper
text `ui-xs`/`fg-tertiary`, error message `ui-xs`/`fg-error` — and
confirmed helper text and error message can both be visible at once (the
error mockup renders both), so they're independent, not an either/or toggle.

**Deliberate spec-driven deviation from Dialog-style composition**: built
Field as one component taking `label`/`description`/`error` props plus a
single `children` control (wired via `cloneElement`), not a
`Field`/`FieldLabel`/`FieldControl`/`FieldDescription`/`FieldError`
compound family. Two reasons: Figma's own component properties model it
exactly this way (props, not child slots), and a compound version would
need every descendant to register its presence into shared context before
`aria-describedby` could be computed without risking dangling references
to text blocks that never actually render. The genuinely swappable part —
the control itself (Input today, Textarea/Select later) — still composes
in as `children`, so this isn't abandoning composition entirely, just
scoping it to the part that's actually variant. CLAUDE.md's composition
rule is illustrated with Dialog, a true multi-part overlay; Field's
label/hint/error text isn't structurally swappable the same way, so a
config-style API fits without conflicting with that rule's intent.

Added `packages/registry/ui/__tests__/field.test.tsx` (8 tests) and a
`field` registry.json entry — the first to declare `registryDependencies`
(`["input"]`), since Field is documented as composing with Input (and
later Textarea/Select). `pnpm lint`/`pnpm test` clean, 48 tests total
across 5 files.

**Status: Field complete.** Moving to Textarea next.

## Cross-cutting correction (caught mid-Textarea-research)

While pulling Textarea's Figma spec, noticed its placeholder text uses
`font-normal` — which prompted a check against what every other `ui-*`-typed
component had used, and surfaced two real bugs from earlier in the run:

1. **Missed `font-medium`** on Input's text and Field's description/error
   text. Both Figma pulls (done earlier this session) clearly showed
   `font-medium` for these; I just didn't apply it when writing the code.
   Fixed both files.
2. **Wrong letter-spacing mechanism**, systemic across Button/Badge/Input:
   all three used Tailwind's generic `tracking-tight` (`-0.025em`, scales
   with font-size), but every `ui-*` sample pulled from Figma so far —
   Button at 13–16px, Badge at 12–13px, Field at 12–13px, Input at
   14–16px — shows a flat `-0.1px` letter-spacing, not proportional to
   size. Fixed at the token level instead of patching each component:
   added `--text-ui-{xs,sm,md,lg}--letter-spacing: -0.1px` to
   `apps/www/styles/theme.css`, so the `text-ui-*` Tailwind utilities now
   carry correct letter-spacing automatically (same mechanism already used
   for line-height), and removed the inaccurate `tracking-tight` class
   from Button, Badge, and Input.

Re-ran the full suite after all three fixes: 48/48 green, `pnpm lint`
clean. No test needed updating — none had asserted on `tracking-tight` or
font-weight classes directly, since these were caught via manual
spec-diffing rather than a failing test. Flagging for later: it may be
worth adding an explicit assertion somewhere that checks a rendered
element's computed `font-weight` for at least one `ui-*` component, so a
regression like this fails loudly next time instead of relying on manual
diffing against Figma.

## Overnight queue — Textarea

Net new. Node `2120:6` verified immediately. No icon slots in this one's
Figma spec (unlike Input) — just size × state — so it's a bare
`<textarea>`, no bordered wrapper div needed. Padding matches Input's
per-size numbers exactly for sm/md (verified directly); trusted lg/xl to
continue the same progression rather than re-querying, since two data
points already matched Input's pattern precisely. Error state uses
`aria-invalid` + an `aria-invalid:` Tailwind variant directly on the
element (simpler than Input's `has-[[aria-invalid=true]]`, since there's
no wrapper here). `resize-y` applied per the a11y note.

Added `packages/registry/ui/__tests__/textarea.test.tsx` (9 tests) and a
`textarea` registry.json entry. Also added a test to `field.test.tsx`
confirming Field composes with Textarea too, not just Input — validates
the earlier "Field isn't Input-specific" design decision against a second
real control. `pnpm lint`/`pnpm test` clean, 58 tests total across 6 files.

**Status: Textarea complete.** Moving to Checkbox next — first
Radix-UI-based component in the queue.
