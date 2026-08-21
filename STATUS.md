# Asteria UI — Autonomous Build Status

Read this file first on every resume. It is the single source of truth for
where the overnight queue stands. Update it after every component (see
per-component commit protocol in the session that started this file).

## Confirmed decisions (this run)

- Figma file key: `CDgfoMkj7lP3pXWJ3aOgkH` — node-map is a working hypothesis,
  verified per-component against the real screenshot/metadata before building.
- Primitive library for complex components: **Radix UI** (not Base UI).
- Icons: **lucide-react** only.
- Git: commit AND push to `origin main` after every component (not just
  commit — this run pushes on every green component).
- `2120:12` is ambiguous between Divider and Skeleton, and `2120:16` is
  unaccounted for in the original map — resolve via ±2 scan when reached,
  log the correction here when it happens.

## Queue

Order: Button → Avatar → Badge → Input → Field wrapper → Textarea → Checkbox
→ Radio Group → Switch → Alert → Spinner → Divider → Skeleton → Progress Bar
→ Breadcrumbs → Tooltip → Dropdown Menu → Modal → Tabs

## Completed

- **Button** (`packages/registry/ui/button.tsx`) — audited against Figma node
  `2120:2` (canvas "↳ Button", node `2121:722`). Fixed real drift: radius was
  `radius-md` (10px), Figma spec is `radius-sm` (8px) for all sizes; font size
  was off by one tier (`sm` used `ui-sm`/13px, should be `ui-md`/14px; `md`
  used `ui-md`/14px, should be `ui-lg`/16px — `lg`/`xl` were already correct
  at `ui-lg`). Added the `leadingIcon` slot (confirmed present in Figma's
  component properties, absent from old code) with per-size icon sizing
  (16px sm/md, 20px lg/xl) via a `withIconSize` clone helper. Added per-size
  gap (4/8/8/12px, previously a flat 8px). Migrated to
  `React.ComponentPropsWithRef<"button">` + plain function component (no
  `forwardRef`) per CLAUDE.md's locked ref convention. Verified colors for
  all 5 variants × disabled state directly against Figma — all matched
  existing semantic-token usage exactly (only radius/font-size/icon-slot/gap
  needed fixing). Confirmed `shadow-glow-focus` is pixel-exact: Figma's
  `DROP_SHADOW #5C74EB3D, spread 4, blur/offset 0` = `brand-500 @ 24%`,
  matching `tokens.css` exactly — no changes needed there.
  A11y doc comment pulled verbatim from Figma's Accessibility Note
  (node `2121:14691`): "role=button · Enter/Space activates · focus ring
  visible on Tab · disabled prevents interaction · loading state announces
  via aria-busy". Added `ui/__tests__/button.test.tsx` — 10 tests (render,
  ref forwarding, className merge, click, Enter/Space keyboard activation,
  focus-glow class present, disabled blocks click, loading sets aria-busy
  and blocks click, leadingIcon sizing, vitest-axe zero violations across
  default/disabled/loading). `pnpm lint` and `pnpm test` both clean.
  Installed `lucide-react` in `packages/registry` (needed going forward per
  CLAUDE.md — Button itself doesn't render one directly, the slot just
  accepts any icon element).

- **Avatar** (`packages/registry/ui/avatar.tsx`) — audited against Figma
  canvas `0:1`. Confirmed: Avatar's page has NO separate "Page Content" /
  "Accessibility Note" frame like Button's does (checked twice, including
  re-pulling `get_design_context` directly on the header instance
  `2178:250` — it's identical to Button's page header, just
  breadcrumb+title+description, no a11y block nested in it). This appears
  to be a real gap in this specific Figma page, not a tool error — logged
  as a Figma-gap decision in BUILD_LOG.md rather than guessed at. Authored
  the a11y doc comment myself, in the same terse `·`-separated style as
  Button's, grounded in the component's actual implemented behavior (role,
  aria-label sourcing, image-fallback behavior, non-interactive/no-focus).
  Verified size scale (xs 24 / sm 32 / md 40 / lg 48 / xl 64 / 2xl 80) and
  the online-status dot color (`success/500` exactly, confirmed via
  `get_design_context` on node `2077:15`) — both already correct in the
  existing code, no drift. Migrated `Avatar` and `AvatarGroup` off
  `React.forwardRef` onto `React.ComponentPropsWithRef` + plain function
  components, matching the convention established on Button. Added
  `ui/__tests__/avatar.test.tsx` — 11 tests (accessible name from
  alt/initials, status suffix, initials derivation, initials override,
  image render, image-error fallback to initials, ref forwarding, axe
  zero-violations across image/initials/status states, AvatarGroup
  rendering under max, overflow collapsing with labeled "+N" indicator, axe
  zero-violations with overflow present). `pnpm lint` and `pnpm test` both
  clean (21 tests total across both component test files).

## Current

**Badge** — about to start. Need to locate Badge's node in the base-components
overview canvas — expected around `2120:3` per the original map (unverified
until checked). No existing `badge.tsx` yet in `packages/registry/ui/` —
this is a net-new component, not an audit. Docs content already exists at
`apps/www/content/docs/components/badge.mdx` (pre-written ahead of
implementation, per a prior session) but touching docs content is out of
scope for tonight's queue (that's Phase 4) — build the component + tests
only.

## Remaining

Input, Field wrapper, Textarea, Checkbox, Radio Group, Switch, Alert,
Spinner, Divider, Skeleton, Progress Bar, Breadcrumbs, Tooltip, Dropdown
Menu, Modal, Tabs

## Blocked

_(none yet)_

## Exact resume point

Avatar is fully done, committed, and pushed (commit:
`fix(ui): align Avatar to Figma spec for audits`). Next action: run
`get_metadata` on Figma node `2120:3` (fileKey `CDgfoMkj7lP3pXWJ3aOgkH`) to
verify it's Badge's canvas before building anything — if the title doesn't
say "Badge", scan `2120:1` through `2120:5` to find it, per the ±2-scan
protocol, and log the correction here before proceeding.
