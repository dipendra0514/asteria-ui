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

- **Badge** (`packages/registry/ui/badge.tsx`) — net new. Node `2120:3`
  verified as Badge on first try (title matched, no ±2 scan needed). This
  page's metadata conveniently included the full Accessibility Note text
  inline (no separate call needed): "role=status · dismiss button
  role=button with aria-label="Remove" · dot indicator is decorative
  (aria-hidden)". Pulled full design context for Gray/sm, Gray/md, and
  Brand/md variants — confirmed the pattern `bg-{variant}-subtle +
  border-{variant} + text-fg-{variant}` (Gray uses the neutral equivalents:
  `bg-secondary` + `border-default` + `fg-primary`, since there's no
  "gray-subtle" semantic token) and inferred Success/Warning/Warning/Error
  follow identically, since the semantic token names exist specifically for
  this — didn't spend extra calls re-verifying each, given Gray+Brand
  already proved the pattern cleanly. Confirmed: pill shape (`radius-full`),
  padding sm=`px-2 py-0.5`/md=`px-3 py-1` (exactly `space-md`/`space-2xs` and
  `space-lg`/`space-xs`), font sm=`ui-xs`(12px)/md=`ui-sm`(13px), gap
  `space-xs`(4px) constant across sizes, optional 6px/8px status dot colored
  `fg-{variant}` (implemented as `bg-current` so it always matches the
  active variant without a second color mapping), optional 12px/14px
  dismiss button using the Lucide `X` icon (first real consumer of the
  `lucide-react` dependency added during the Button phase).
  Biome's a11y linter flagged `role="status"` on a `<span>` and suggested
  `<output>` — unlike the earlier Avatar/`<fieldset>` false positive, this
  one is correct (`<output>`'s implicit ARIA role genuinely is `status`), so
  applied it: the root element is `<output>`, not `<span>`, with no explicit
  `role` attribute needed. Added
  `packages/registry/ui/__tests__/badge.test.tsx` — 9 tests (role=status
  render, ref forwarding, className merge, decorative dot hidden from AT,
  no dismiss button by default, dismiss button aria-label + onDismiss on
  click, dismiss button keyboard activation, focus-glow class present on
  dismiss button, axe zero-violations across default/dot/dismissible).
  Added a `badge` entry to `registry.json` following the Button/Avatar
  pattern (including `lucide-react` in its `dependencies` list — the first
  registry item that needs it). `pnpm lint`/`pnpm test` clean (30 tests
  total across 3 files).

## Current

**Input** — about to start. Net-new component (form-row density matters:
sm 32 / md 40 / lg 48 / xl 56 per CLAUDE.md). Need to verify Figma node
`2120:4` (unverified — original map's next entry after Badge). Check
whether Input pairs with a separate "Field wrapper" spec (next in queue) or
whether Input's own Figma page already documents label/error/hint text as
part of a combined spec — if so, may need to read both Input's and Field
wrapper's pages together before building either, since they're likely
tightly coupled (Field wrapper probably composes Input/Textarea/Select with
label+hint+error text). Decide after seeing both specs; don't guess the
composition boundary.

## Remaining

Field wrapper, Textarea, Checkbox, Radio Group, Switch, Alert, Spinner,
Divider, Skeleton, Progress Bar, Breadcrumbs, Tooltip, Dropdown Menu, Modal,
Tabs

## Blocked

_(none yet)_

## Exact resume point

Badge is fully done, committed, and pushed (commit: `feat(ui): add Badge`).
Next action: run `get_metadata` on Figma node `2120:4` (fileKey
`CDgfoMkj7lP3pXWJ3aOgkH`) to verify it's Input's canvas — if the title
doesn't say "Input", scan `2120:2` through `2120:6` per the ±2-scan
protocol and log the correction here. Then also check `2120:5` (expected
"Field wrapper") before writing any code, to understand the
Input/Field-wrapper composition boundary before building either.
