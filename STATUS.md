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

## Current

**Avatar** — about to start. Existing `packages/registry/ui/avatar.tsx` was
already confirmed against Figma node `0:1` earlier this session (Size
xs/sm/md/lg/xl/2xl, Status online/offline — matches exactly). This audit
still needs: pull the Accessibility Note text for Avatar's doc comment
(location TBD — need to search the `0:1` canvas's "Page Content" frame,
same pattern as Button's `2121:14691`), verify ref-forwarding pattern
matches the new `ComponentPropsWithRef` convention just established on
Button (Avatar currently still uses `React.forwardRef` — needs migrating
for consistency), and write `ui/__tests__/avatar.test.tsx` +
`avatar-group.test.tsx`-equivalent coverage (render, image-load-failure
fallback to initials, status indicator, AvatarGroup overflow count,
vitest-axe zero violations). No Figma color/size drift expected since it
was already verified once, but re-check the "Page Content" frame's
Accessibility Note as the one thing not yet pulled.

## Remaining

Badge, Input, Field wrapper, Textarea, Checkbox, Radio Group, Switch, Alert,
Spinner, Divider, Skeleton, Progress Bar, Breadcrumbs, Tooltip, Dropdown
Menu, Modal, Tabs

## Blocked

_(none yet)_

## Exact resume point

Button is fully done and about to be committed + pushed (commit message:
`fix(ui): align Button to Figma spec for audits`). Next action after that
commit/push completes: start the Avatar audit by using `get_metadata` on
canvas `0:1` to locate its "Page Content" > "Accessibility Note" frame
(same structure as Button's, just find the equivalent node ids under `0:1`),
pull that text, migrate `avatar.tsx` off `forwardRef`, write its test file,
lint/test/commit/push, then move to Badge.
