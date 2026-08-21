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

- **Input** (`packages/registry/ui/input.tsx`) — net new. Node `2120:4`
  verified as Input (title matched immediately). Also checked `2120:5`
  ("↳ Field" in Figma — the queue's "Field wrapper") up front to understand
  the composition boundary before building either: Input's own a11y note
  says "requires associated label via Field wrapper", and Field's a11y note
  confirms it's the one that owns label-for/id linkage + aria-describedby
  wiring. So Input itself stays a bare styled control (no label/hint/error
  text of its own) — that composition lands in the next component. Pulled
  design context for md/default, md/focus, md/error, md/disabled, plus
  sm/lg/xl/default to get per-size padding/gap/font: sm=`px-3 py-1.5
  gap-2 text-ui-md`, md=`px-4 py-2 gap-2 text-ui-lg`, lg=`px-5 py-3 gap-2
  text-ui-lg`, xl=`px-6 py-4 gap-3 text-ui-lg` (icon sizes 16px sm/md, 20px
  lg/xl — same pattern as Button). Radius is `radius-sm` again, not
  `radius-md` — third component in a row where Figma disagrees with
  CLAUDE.md's generic "radius-md 10 (inputs/buttons)" note; this is now a
  clear enough pattern to flag as a correction rather than a one-off (see
  BUILD_LOG). Focus state reuses the exact same `shadow-glow-focus` value
  confirmed on Button, applied via `focus-within` on the wrapper. Error
  state: Figma's mockup showed the demo text itself turning `fg-error`, but
  that's because the mockup's "value" is standing in for placeholder text —
  implemented as `aria-invalid` on the real `<input>` driving
  `has-[[aria-invalid=true]]:border-border-error` on the wrapper via CSS
  `:has()`, which is the semantically correct implementation matching the
  a11y note ("aria-invalid=true on error") without making real typed user
  text change color (which no real product actually does).
  Extracted `withIconSize` (previously private to `button.tsx`) into a
  shared `packages/registry/lib/with-icon-size.tsx`, now used by both
  Button and Input — also added an `aria-hidden` injection to the shared
  helper (decorative icons should never announce, and neither Button nor
  Input relies on its icon for its accessible name). Updated `button.tsx`
  to import the shared helper instead of a local copy — no behavior change,
  confirmed by rerunning its existing test suite (still 10/10 green).
  Added `packages/registry/ui/__tests__/input.test.tsx` — 10 tests (typing,
  ref-to-`<input>` forwarding, `wrapperRef`-to-wrapper forwarding, className
  merge on wrapper, `aria-invalid` set only when `error`, disabled blocks
  typing, icon slots sized + aria-hidden, focus-within glow class present,
  axe zero-violations across default/error/disabled). Added an `input`
  registry.json entry, and added `lib/with-icon-size.tsx` to both Button's
  and Input's `files` lists (it wasn't in Button's before since it used to
  be a private local function). `pnpm lint`/`pnpm test` clean — 40 tests
  total across 4 files.

- **Field** (`packages/registry/ui/field.tsx`) — net new. Pulled design
  context for both states (`2121:14986` default, `2121:14991` error):
  `flex-col gap-1.5`, label `ui-sm`(13px, medium, `fg-primary`), helper text
  `ui-xs`(12px, medium, `fg-tertiary`), error message also `ui-xs` but
  `fg-error`. Error-state mockup shows helper text AND error message both
  visible simultaneously — implemented accordingly (they're independent,
  not mutually exclusive).

  **Deliberate deviation from Dialog-style composition**: built this as a
  single component with `label`/`description`/`error` props plus a single
  `children` control (cloned via `React.cloneElement` to inject `id`,
  `aria-describedby`, `aria-invalid`, `error`), rather than a
  `Field`/`FieldLabel`/`FieldControl`/`FieldDescription`/`FieldError`
  multi-part compound component. Reasoning: (1) Figma's own component
  properties model Field exactly this way — `label`, `helperText`,
  `errorMessage`, `showHelper` as props, not child slots — so this is
  matching the actual spec, not a shortcut; (2) a compound-component
  version would need each descendant (Label/Description/Error) to
  register its presence into shared context before `aria-describedby` can
  be computed correctly, which either adds real complexity (a
  register-on-mount effect) or risks dangling `aria-describedby`
  references to elements that never actually render — the props-based
  version sidesteps this entirely since Field itself decides what to
  render and always knows what exists. CLAUDE.md's composition-over-
  configuration example is Dialog (a true multi-part overlay); Field's
  label/hint/error text isn't structurally swappable the way Dialog's
  trigger/content/etc. are, so the configuration-style API fits better
  here. The one thing that IS genuinely swappable — the control itself
  (Input vs. Textarea vs. Select) — stays as `children`, composed in.
  Logged here rather than silently deviating from the CLAUDE.md pattern.

  Added `packages/registry/ui/__tests__/field.test.tsx` — 8 tests (label
  linked via for/id through `getByLabelText`, description wired into
  `aria-describedby`, no `aria-describedby` when neither description nor
  error given, error sets `aria-invalid` + wires into `aria-describedby`,
  both description+error ids present together, no error message rendered
  when no error given, ref forwarding, axe zero-violations across
  default/description/error using a real `Input` as the composed child).
  Added a `field` registry.json entry with `registryDependencies: ["input"]`
  (first registry item to declare a registry dependency — Field is
  documented as composing with Input/Textarea/Select, so this is honest
  about the coupling). `pnpm lint`/`pnpm test` clean — 48 tests total
  across 5 files.

- **Cross-cutting fix, caught while researching Textarea**: while pulling
  Textarea's spec I noticed it uses `font-normal` (regular weight) where
  every other `ui-*`-typed component I'd checked used medium — which made
  me go back and actually verify, and I'd missed applying `font-medium` to
  **Input**'s text and **Field**'s description/error text, even though the
  original Figma pulls for both clearly showed `font-medium`. Fixed both.
  Also discovered a second, more systemic issue while looking at this:
  Button/Badge/Input all had a generic `tracking-tight` utility class
  (Tailwind's default, `-0.025em`, so it scales with font-size), but every
  Figma `ui-*` sample I've pulled so far (Button 13–16px, Badge 12–13px,
  Field 12–13px, Input 14–16px) shows a **fixed** `-0.1px` letter-spacing
  regardless of size — not proportional. Fixed properly at the token level:
  added `--text-ui-*--letter-spacing: -0.1px` companions to all four `ui-*`
  steps in `apps/www/styles/theme.css`, and removed the now-redundant (and
  slightly wrong) `tracking-tight` class from Button, Badge, and Input —
  the `text-ui-*` utility itself now carries the correct letter-spacing
  automatically, the same way `--text-ui-*--line-height` already did.
  Re-ran the full test suite after all three fixes: still 48/48 green,
  `pnpm lint` clean.

- **Textarea** (`packages/registry/ui/textarea.tsx`) — net new. Node
  `2120:6` verified immediately (title matched). Unlike Input, Textarea has
  no icon slots in its Figma spec — just size/state, no leading/trailing
  icon properties — so it's a single unwrapped `<textarea>` (no bordered
  wrapper div needed, simpler than Input). Confirmed padding matches
  Input's per-size pattern exactly (sm `px-3 py-1.5`, and md/error checked
  directly — `px-4 py-2` for md, border-error on error); trusted lg/xl to
  follow the same `px-5 py-3`/`px-6 py-4` progression without re-querying,
  since sm+md both matched Input's numbers exactly. Min-heights confirmed
  from metadata: sm 80px, md 96px, lg 112px, xl 128px (`min-h-20/24/28/32`).
  Text is `font-normal` (regular weight) here, not `font-medium` like every
  other `ui-*` component so far — this is the discrepancy that led to
  catching the Input/Field font-weight bugs (see the cross-cutting fix
  entry above). Error state implemented the same way as Input: `aria-invalid`
  driving an `aria-invalid:border-border-error` variant — simpler here
  since there's no wrapper, so the variant applies directly to the
  `<textarea>` instead of needing `has-[[aria-invalid=true]]`. Native
  `resize-y` applied per the a11y note's "resizable via drag handle".
  Added `packages/registry/ui/__tests__/textarea.test.tsx` (9 tests:
  typing, ref forwarding, className merge, `resize-y` present, aria-invalid
  on error, disabled blocks typing, focus glow class, axe zero-violations
  across default/error/disabled) and one more test in `field.test.tsx`
  confirming `Field` composes with `Textarea` just as well as `Input`
  (proving the Field API genuinely isn't Input-specific, per its own
  documented "compose with Input, Textarea, Select" description). Added a
  `textarea` registry.json entry. `pnpm lint`/`pnpm test` clean — 58 tests
  total across 6 files.

- **Checkbox** (`packages/registry/ui/checkbox.tsx`) — first Radix-UI-based
  component tonight. Node `2120:7` verified immediately. Only one size (no
  density variants) — Variant (Unchecked/Checked/Indeterminate) × State
  (default/hover/focus/active/disabled). Confirmed: 20px box, `radius-xs`
  (6px, NOT radius-sm this time — first component where CLAUDE.md's
  "radius-xs 6" note and Figma actually agree), border `1.5px`
  `border-default`, checked/indeterminate both use `bg-brand-solid` +
  `border-brand` with a 14px icon (Lucide `Check` for checked, `Minus` for
  indeterminate — confirmed via Figma's own layer names, which literally
  say "check" and "minus"). Focus glow applies directly to the 20px box
  (not a wrapper), same exact `shadow-glow-focus` value as everywhere else.
  Label text is `font-normal` (regular), `ui-md`(14px), `fg-primary` (this
  is the second `font-normal` sighting after Textarea, both are "reading"
  text rather than a UI chrome label like Button/Badge/Field's label —
  worth remembering as a possible pattern: `ui-*` control chrome ≈ medium,
  `ui-*` reading/body-adjacent text ≈ normal, but not verifying that
  theory further tonight, just noting it).
  `pnpm add @radix-ui/react-checkbox` installed. Implementation wraps
  Radix's `Checkbox.Root`/`Checkbox.Indicator`, generates an id via
  `React.useId()` when none is given, and renders a native `<label
  htmlFor>` sibling using the `peer`/`peer-disabled:` Tailwind pattern for
  the disabled-label-dimming behavior — Radix already handles
  role/aria-checked/keyboard natively, so no manual ARIA wiring needed
  there. Added `packages/registry/ui/__tests__/checkbox.test.tsx` — 10
  tests (unchecked by default, click toggles, label-click toggles, Space
  key toggles, `onCheckedChange` fires, indeterminate renders
  `aria-checked="mixed"`, disabled blocks toggling, ref forwarding, focus
  glow class present, axe zero-violations across
  unchecked/checked/indeterminate/disabled). One test-only gotcha: the
  first axe-violations draft triggered a React "changing from uncontrolled
  to controlled" console warning because the `rerender()` sequence mixed
  `checked={undefined}` and `checked={...}` renders — fixed by keeping the
  component controlled (`checked={false}` instead of omitting it)
  throughout that one test's rerender chain; not a real component bug,
  purely a test-authoring artifact. Added a `checkbox` registry.json entry
  (dependencies include `@radix-ui/react-checkbox` and `lucide-react`).
  `pnpm lint`/`pnpm test` clean — 68 tests total across 7 files.

- **Radio Group** (`packages/registry/ui/radio-group.tsx`) — second
  Radix-based component. Node `2120:8` verified immediately, as expected
  (this one was in the brief's "verified directly" list). Visually nearly
  identical to Checkbox: 20px control, `1.5px` `border-default`, but
  `rounded-full` instead of `rounded-xs`; selected state is `bg-brand-solid`
  + `border-brand` with an 8px solid dot (`fg-on-brand`) instead of an
  icon. Installed `@radix-ui/react-radio-group`; built two exports —
  `RadioGroup` (thin wrapper around `RadioGroupPrimitive.Root`) and
  `RadioGroupItem` (wraps `Item`/`Indicator` + an auto-id'd sibling
  `<label>`, same pattern as Checkbox).

  **Real behavior discovery via a failing test, not assumption**: wrote a
  test assuming Radix's radio group auto-selects the newly-focused item on
  arrow-key navigation (matching native `<input type=radio>` behavior per
  the WAI-ARIA APG pattern). It failed — this Radix version's roving-focus
  behavior moves focus on arrow keys but does NOT auto-select; selection
  needs an explicit Space or click on the now-focused item. Rather than
  force the test to match my assumption, corrected the test to describe
  the real, verified behavior instead. This is exactly the kind of thing
  that would have been wrong if I'd written the test from memory of "how
  radio groups usually work" without actually running it — the a11y note
  ("arrow keys navigate · Space selects") turns out to describe two
  separate actions, not one combined gesture, which the test now makes
  explicit. There's a benign, well-known Radix-internal `act()` console
  warning on this one test (from `RovingFocusGroupImpl`'s own state
  update, not our code) — left as-is, doesn't fail anything.

  Added `packages/registry/ui/__tests__/radio-group.test.tsx` (10 tests:
  renders 3 radio options in a named group, click selects, label-click
  selects, arrow-key roving focus + explicit Space selects, `onValueChange`
  fires, controlled `value` respected, group-level `disabled` blocks
  selection, focus glow class on every item, ref forwarding, axe
  zero-violations across unselected/selected/disabled). Added a
  `radio-group` registry.json entry. `pnpm lint`/`pnpm test` clean — 78
  tests total across 8 files.

- **Switch** (`packages/registry/ui/switch.tsx`) — third and final
  Radix-based simple-control component. Node `2120:9` verified
  immediately. Track: 44×24px, `rounded-full`, `bg-switch-off` (this
  semantic token existed in `tokens.css` already but had never been used
  by any component until now) / `bg-brand-solid` when on, `px-0.5` (2px)
  inner padding. Thumb: 20px circle, `bg-primary`, `shadow-sm`. On-state
  positioning implemented as `data-[state=checked]:justify-end` on the
  Root (matches Figma's own modeling exactly — its Off/On mockups differ
  only by a `justify-end` class, not a `translate-x`, so this isn't a
  simplification, it's literally what the spec shows) rather than the more
  common `translate-x` thumb approach seen in some other Radix-based
  systems. Focus glow confirmed on the track itself, exact same value
  again. Installed `@radix-ui/react-switch`; same
  `Root`/`Thumb`+auto-id'd-`label` shape as Checkbox and Radio Group.
  Added `packages/registry/ui/__tests__/switch.test.tsx` — 10 tests
  (off by default, click toggles both directions, label-click toggles,
  Space toggles, `onCheckedChange` fires, controlled `checked` respected,
  disabled blocks toggling, ref forwarding, focus glow class, axe
  zero-violations off/on/disabled — this time written against verified
  Radix behavior from the start, no false assumptions this round). Added a
  `switch` registry.json entry. `pnpm lint`/`pnpm test` clean — 88 tests
  total across 9 files.

## Current

**Alert** — about to start. Back to a from-scratch simple component (not
Radix-based) — CLAUDE.md explicitly lists Alert among the components
built without a primitive dependency. This closes out the three
Radix-based form controls tonight (Checkbox, Radio Group, Switch all
done); the rest of the queue splits between more from-scratch components
(Alert, Spinner, Divider, Skeleton, Progress Bar, Breadcrumbs) and
Radix-based overlays (Tooltip, Dropdown Menu, Modal) plus Tabs (not
explicitly in CLAUDE.md's Radix list but reasoned earlier — see the Button
BUILD_LOG entry — that it needs the same treatment as the "build on
Radix/Base UI" components given its APG keyboard-pattern complexity; will
still verify this reasoning against Figma's actual a11y note when reached).
Need to verify Figma node `2120:10` before building.

## Remaining

Spinner, Divider, Skeleton, Progress Bar, Breadcrumbs, Tooltip, Dropdown
Menu, Modal, Tabs

## Blocked

_(none yet)_

## Exact resume point

Switch is fully done, committed, and pushed (commit:
`feat(ui): add Switch`). Next action: run `get_metadata` on Figma node
`2120:10` (fileKey `CDgfoMkj7lP3pXWJ3aOgkH`) to verify it's Alert's canvas
— if the title doesn't match, scan `2120:8` through `2120:12` per the
±2-scan protocol (remember: `2120:12` is the known Divider/Skeleton
collision point, so this scan range will need care) and log the
correction here before writing any code.
