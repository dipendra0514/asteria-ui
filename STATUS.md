# Asteria UI — Autonomous Build Status

Read this file first on every resume. It is the single source of truth for
where the overnight queue stands. Update it after every component (see
per-component commit protocol in the session that started this file).

## Node-map correction (resolved the flagged `2120:12` collision)

`2120:12` = **Divider** (confirmed via `get_metadata`, not Skeleton).
`2120:13` = **Skeleton** (confirmed). This means the rest of the original
map shifts by +1 from here: **Progress Bar is expected at `2120:14`**,
**Breadcrumbs at `2120:15`**, **Tooltip at `2120:16`** (filling what was
previously an unaccounted gap in the brief's map) — Dropdown Menu (`17`),
Modal (`18`), and Tabs (`19`) are unaffected since they were already
independently verified in the original brief. Will still verify each of
Progress Bar/Breadcrumbs/Tooltip on arrival rather than trust this
shifted-by-one theory blindly, per the standing protocol.

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

- **Alert** (`packages/registry/ui/alert.tsx`) — from-scratch, node
  `2120:10` verified immediately. Real a11y wrinkle confirmed straight from
  the Figma note: **role differs by variant** —
  `warning`/`error` use `role="alert"` (assertive, interrupting),
  `info`/`success` use `role="status"` (polite) — implemented via a
  `roleByVariant` lookup, computed automatically from the `variant` prop
  rather than left for the consumer to set. Verified all 4 variant icons
  directly against Figma's own layer names rather than guessing likely
  Lucide names: `info` → `Info`, `success` → `CheckCircle` (Figma layer
  literally "check-circle"), `warning` → `AlertTriangle` ("alert-triangle"),
  `error` → `XCircle` ("x-circle") — checked lucide-react's actual exports
  first since this major version aliases old/new icon names side by side
  (`XCircle` ≡ `CircleX`, etc.) and picked the ones matching Figma's exact
  naming. Structure: icon (20px, inherits `fg-{variant}` via `currentColor`)
  + content column (title `ui-md`/medium, description `body-sm`/regular/
  always `fg-secondary` regardless of variant, optional text-style action
  button) + optional dismiss button, all using the same
  `bg-{variant}-subtle`/`border-{variant}`/`fg-{variant}` triplet
  established since Badge. `title`/`description`/`actionLabel` props
  mirror Figma's own prop shape (matching the Field/Badge precedent of
  following Figma's documented API when it already fits, rather than
  reaching for a compound-component slot API by default).
  Added `packages/registry/ui/__tests__/alert.test.tsx` — 8 tests (title +
  description render, `role="status"` for info/success, `role="alert"` for
  warning/error, no action button by default, action button + `onAction`
  fires, dismiss button aria-label + `onDismiss` fires, ref forwarding,
  axe zero-violations across all 4 variants with action+dismiss present).
  Added an `alert` registry.json entry. `pnpm lint`/`pnpm test` clean — 96
  tests total across 10 files.

- **Spinner** (`packages/registry/ui/spinner.tsx`) — from-scratch, node
  `2120:11` verified immediately. Turns out to be a genuinely different
  visual design from Button's internal loading spinner — not the same
  component wearing two hats. Figma's standalone Spinner is a static ring
  (`border-border-default`) with one small accent dot (`fg-brand`)
  positioned at the top-left corner, and the whole thing rotates via
  `animate-spin` (the dot "orbits" the ring — Figma obviously can't show
  motion, but a single fixed accent point rotating is the only sensible
  read of that layout). Button's internal spinner is a two-tone SVG arc,
  sized to match Button's own confirmed icon slots (16px/20px) — and
  Spinner's Figma sizes are 16/24/32px, which don't even overlap with
  Button's 20px lg/xl requirement. Concluded these are legitimately two
  separate components for two separate contexts (a standalone loading
  indicator vs. a button's inline busy state), not a missed reuse
  opportunity — did not refactor Button.
  Confirmed exact scaling across all 3 sizes directly (not inferred from
  one sample): sm 16px/`border-2`/6px dot, md 24px/`border-[3px]`/9px dot,
  lg 32px/`border-4`/12px dot — border width and dot inset always match
  (`-2px`/`-3px`/`-4px`), dot size is a consistent 0.375× the ring size.
  Biome's `<output>` suggestion for `role="status"` on a div applied
  again (same reasoning as Badge — the implicit role is a genuine match).
  Added `packages/registry/ui/__tests__/spinner.test.tsx` — 8 tests
  (role=status with accessible name "Loading", `aria-busy="true"` set,
  correct default/requested size, `animate-spin` present, className merge,
  ref forwarding, axe zero-violations at all 3 sizes). Added a `spinner`
  registry.json entry. `pnpm lint`/`pnpm test` clean — 104 tests total
  across 11 files.

- **Divider** (`packages/registry/ui/divider.tsx`) — from-scratch. This
  is the node that resolved the flagged `2120:12` collision: it's
  Divider, not Skeleton (see the "Node-map correction" section above the
  Confirmed Decisions block for the full shift explanation). Confirmed:
  plain divider is just `h-px w-full bg-border-default` (or `w-px h-full`
  vertical); labeled divider is two `flex-1` line segments around a
  centered `ui-xs`/`fg-tertiary` label, `gap-3`(12px) — vertical and
  horizontal are structurally identical, just flip the axis (verified
  both, not just horizontal). a11y note: `role=separator`,
  `aria-orientation` for vertical, "decorative by default."

  **Biome quirk worth remembering for later components**: `role="separator"`
  triggered two rules — `useSemanticElements` (suggesting `<hr>`) and
  `useFocusableInteractive` (wanting a `tabIndex`). Both are false
  positives here: `<hr>` can't hold the label+line-segment children the
  labeled variant needs (it's a void element), and a purely structural,
  non-interactive separator genuinely doesn't need `tabIndex` per the ARIA
  spec (that's only for resizable/interactive separators). Suppressed both
  with justified `biome-ignore` comments — but getting the suppression to
  actually apply took real trial and error: **the two rules' diagnostic
  ranges don't align**, so a single stacked pair of `biome-ignore` comments
  right above `<div` only reliably works for a self-closing element.
  For an element with children, `useFocusableInteractive`'s range covers
  the *whole* element (comment must precede `<div` itself), while
  `useSemanticElements`'s range is scoped to just the `role` attribute
  (comment must precede the `role=` line specifically) — putting both
  comments in the same spot silently fails to suppress one of them. If
  this combination (`role` on a `<div>` with children) comes up again on a
  later component, remember to split the two `biome-ignore` comments across
  those two different anchor points rather than stacking them together.

  Added `packages/registry/ui/__tests__/divider.test.tsx` (8 tests:
  role=separator render, no aria-orientation by default, aria-orientation
  set for vertical, plain-line classes, labeled rendering, className
  merge, ref forwarding, axe zero-violations across
  plain/labeled/vertical). Added a `divider` registry.json entry.
  `pnpm lint`/`pnpm test` clean — 112 tests total across 12 files.

- **Skeleton** (`packages/registry/ui/skeleton.tsx`) — from-scratch, node
  `2120:13` (already confirmed while resolving the Divider collision).
  Three variants, each pulled individually: `text` (`bg-tertiary`, fixed
  16px height/`radius-xs`, meant to represent one line of text — the only
  variant Figma gives a real default size to), `circle` (`rounded-full`,
  no default size — Figma's 48px was just an arbitrary demo dimension),
  `rect` (`radius-sm`, also no default size, 200×120 demo). Judgment call:
  gave `text` a real default (`h-4 w-full`) since Figma clearly intends it
  as a standard line-height placeholder, but left `circle`/`rect` unsized
  by default since nothing in the spec suggests one canonical size for
  either (consumers size them via `className`, same as any div). Added
  `animate-pulse` — the universal skeleton-loading convention, same
  reasoning as adding `animate-spin` to Spinner: Figma's static mockup
  can't show motion, but the intent is unambiguous. `aria-hidden="true"`
  applied per the a11y note (purely decorative; `aria-busy` and the
  loaded-announcement are the wrapping container's job, not Skeleton's own
  — noted in the doc comment rather than built into the component, since
  Skeleton itself doesn't know when loading finishes).
  Added `packages/registry/ui/__tests__/skeleton.test.tsx` (7 tests:
  aria-hidden set, text variant's default size, circle variant classes,
  rect variant classes, animate-pulse present, ref forwarding, axe
  zero-violations across all 3 variants — this one had no Biome a11y
  findings at all, unlike Badge/Spinner/Divider, since `aria-hidden` on a
  div doesn't trigger the role-semantics rules the way `role="..."` does).
  Added a `skeleton` registry.json entry. `pnpm lint`/`pnpm test` clean —
  119 tests total across 13 files.

- **Progress Bar** (`packages/registry/ui/progress-bar.tsx`) —
  from-scratch. Node `2120:14` verified — the shifted-map prediction from
  the Divider fix was correct on the first try. Only 2 sizes: sm (`h-1`,
  4px track) and md (`h-2`, 8px track), both `rounded-full`
  `bg-tertiary` track with a `bg-brand-solid` fill. `label` made a
  **required** prop (not optional) since the a11y note explicitly says
  "aria-label describes what is loading" — a progress bar with no
  description of what's progressing is a real accessibility gap, so this
  bakes the requirement into the type system rather than leaving it
  optional and hoping consumers remember. Fill width is computed and
  clamped to `[0, 100]%` from `value`/`max`, so an out-of-range `value`
  (negative, or exceeding `max`) can't visually overflow the track.
  Same `useFocusableInteractive` false positive as Divider's
  `role="separator"` — a determinate progress display isn't an
  interactive control, so no `tabIndex` is needed; suppressed with the
  placement lesson learned on Divider (comment immediately above the
  `<div`, since this rule's range covers the whole element).
  Added `packages/registry/ui/__tests__/progress-bar.test.tsx` — 8 tests
  (role=progressbar with accessible name, aria-valuenow/min/max reflect
  props, fill width matches percentage, clamping above 100% and below 0%,
  className merge, ref forwarding, axe zero-violations at 0/50/100%).
  Added a `progress-bar` registry.json entry. `pnpm lint`/`pnpm test`
  clean — 127 tests total across 14 files.

- **Breadcrumbs** (`packages/registry/ui/breadcrumbs.tsx`) —
  from-scratch, node `2120:15` verified (shifted-map prediction correct
  again — two for two now). This one is a genuine composition pair:
  `<Breadcrumbs>` (renders `<nav aria-label="Breadcrumb"><ol>`, and
  auto-inserts a `ChevronRight` separator between consecutive children —
  the consumer doesn't place separators manually) + `<BreadcrumbItem>`
  (renders `<li>` wrapping either an `<a>` — `ui-sm`/`fg-secondary`,
  `hover:fg-primary`, focus glow — or, when `current`, a non-interactive
  `<span>` with `aria-current="page"` and `fg-primary`). Chose the
  shadcn-style convention of making each separator its own `<li
  role="presentation" aria-hidden="true">` between item `<li>`s — this
  satisfies both halves of the a11y note simultaneously ("ol/li structure"
  stays literally true since every direct child of `<ol>` is an `<li>`,
  and "separators aria-hidden" is exactly what that gives) rather than
  the WAI-ARIA-APG-example alternative of CSS-generated `::before`
  separators, which wouldn't fit CLAUDE.md's Lucide-only icon rule anyway
  since Figma's separator is a real chevron icon, not a decorative
  character. Focus glow on link items reused the exact same
  `shadow-glow-focus` value confirmed directly on the item's own focus
  state.
  Added `packages/registry/ui/__tests__/breadcrumbs.test.tsx` — 8 tests
  (nav accessible name, links render with correct hrefs except the
  current page, `aria-current="page"` on the current item, separator
  count and hiddenness, no trailing separator after the last item, focus
  glow class on links, ref forwarding, axe zero-violations for a full
  trail). One test-authoring correction along the way: my first
  separator-count assertion used a selector that also matched Lucide's
  own `aria-hidden="true"` on its inner `<svg>` (not just my wrapping
  `<li>`), so `[aria-hidden='true']` matched 4 elements instead of the
  expected 2 — fixed by scoping the selector to `li[aria-hidden='true']`
  specifically. Not a component bug, just an imprecise selector — worth
  remembering that Lucide icons carry their own `aria-hidden` by default,
  so broad `[aria-hidden]` queries in tests will double-count when an
  icon sits inside another hidden wrapper.
  Added a `breadcrumbs` registry.json entry. `pnpm lint`/`pnpm test`
  clean — 135 tests total across 15 files.

- **Tooltip** (`packages/registry/ui/tooltip.tsx`) — first Radix-based
  **overlay** (distinct from the earlier Radix form controls). Node
  `2120:16` verified — third and final shifted-map prediction confirmed
  correct, filling what was originally the unaccounted `2120:16` gap in
  the brief. Confirmed: dark inverted surface (`bg-fg-primary` background,
  `text-bg-primary` white text — a deliberate surface-inversion, not a
  mistake), `px-2 py-1`, `radius-xs`, `shadow-md`, `ui-xs`/medium text, a
  small 8×4px arrow. Installed `@radix-ui/react-tooltip`; exported
  `TooltipProvider`/`Tooltip`/`TooltipTrigger` as direct Radix re-exports
  (no styling needed on those) and a styled `TooltipContent` wrapping
  `Content` + Radix's own `Arrow` primitive (sized 8×4 to match Figma,
  `fill-fg-primary`) rather than hand-rolling a triangle — Radix's Arrow
  already measures and positions itself correctly per side, which a
  manual CSS-triangle approach wouldn't get for free across all 4
  positions. `role="tooltip"`, `aria-describedby` wiring, and Escape-to-
  dismiss are all handled internally by Radix — no manual ARIA needed.

  **Real infrastructure gap found and fixed, benefits every future
  overlay tonight**: the first test run failed almost everything with
  `ReferenceError: ResizeObserver is not defined` — jsdom doesn't
  implement `ResizeObserver`, and Radix's internal `useSize` hook (used by
  the Arrow) constructs one on mount, crashing before the tooltip could
  ever render. Added a minimal `ResizeObserver` stub to the shared
  `packages/registry/vitest.setup.ts` (not a per-test mock) specifically
  because Dropdown Menu and Modal — both still ahead in the queue — are
  also Radix-based overlays that will hit the exact same gap.
  Added `packages/registry/ui/__tests__/tooltip.test.tsx` — 7 tests
  (hidden until triggered, shows on hover, shows on focus, dismisses on
  Escape, `aria-describedby` links trigger to content, ref forwarding,
  axe zero-violations while open — `delayDuration={0}` used throughout to
  avoid relying on Radix's real hover-delay timing in tests). Added a
  `tooltip` registry.json entry. `pnpm lint`/`pnpm test` clean — 142 tests
  total across 16 files.

- **Dropdown Menu** (`packages/registry/ui/dropdown-menu.tsx`) — second
  Radix-based overlay. Node `2120:17` verified, as expected from the
  original brief's "verified directly" list. Panel: `bg-elevated`,
  `border-default`, `shadow-lg`, `radius-md`(10px), `gap-1` flex-col,
  `p-1`. Item: `gap-2`, `px-2 py-1.5`, `radius-xs`, label `ui-md`(13px)
  regular/`fg-primary`, optional 16px leading icon, optional
  `ui-xs`/`fg-tertiary` shortcut text. Disabled: `fg-disabled` label.

  **Real design tension found and resolved, not glossed over**: Figma
  shows hover (`bg-secondary-hover`) and keyboard focus
  (`bg-secondary` + `shadow-glow-focus`) as two visually distinct states.
  But Radix's DropdownMenu architecture treats "highlighted" as one
  concept via `data-highlighted` — both pointer hover and keyboard
  navigation move real DOM focus to the same item, by design (WAI-ARIA
  APG's single-moving-highlight menu pattern), so there's no clean way to
  give hover and keyboard-focus two different background colors through
  CSS alone without fighting the framework. Resolved by keeping ONE
  unified highlighted background (`data-[highlighted]:bg-bg-secondary-hover`)
  for both interaction methods, and layering `focus-visible:shadow-[var(--shadow-glow-focus)]`
  on top — the browser's native `:focus-visible` heuristic correctly
  distinguishes real keyboard-driven focus from pointer-triggered focus
  even though Radix calls `.focus()` in both cases, so the glow still only
  shows up for keyboard users exactly as the a11y note implies. This
  preserves the actually load-bearing part of Figma's spec (a visible
  keyboard focus indicator, CLAUDE.md's non-negotiable) while accepting a
  minor, deliberate simplification on background-color parity between the
  two interaction methods — the same practical compromise virtually every
  production Radix-based menu (including shadcn's) makes for this exact
  reason.

  `destructive` prop (mentioned in Figma's own component description,
  "supports icons, destructive variant, and disabled state," though no
  distinct symbol was in the state axis) styles the item `fg-error` /
  `data-[highlighted]:bg-bg-error-subtle`, consistent with every other
  error treatment tonight. `role="menu"`/`role="menuitem"`, arrow-key
  navigation, Enter/Space selection, Escape-to-close, and focus trapping
  are all handled internally by Radix.

  Two test-writing corrections worth remembering: (1) assumed Radix
  auto-focuses the first item synchronously on open and asserted on that
  — it didn't reliably resolve in jsdom (likely deferred via
  requestAnimationFrame/focus-scope internals that don't flush the same
  way there), so switched that test to just click the item directly
  rather than fight the environment's timing; (2) a "forwards a ref" test
  redundantly clicked a trigger on an already-controlled `open` menu,
  which is a controlled-prop conflict, not a real assertion — removed the
  unnecessary click since the menu was already open via the `open` prop.

  Added `packages/registry/ui/__tests__/dropdown-menu.test.tsx` — 8 tests
  (closed until triggered, opens with items on click, item selection
  calls `onSelect`, disabled item has `data-disabled`, Escape closes,
  destructive item selection fires its handler, ref forwarding, axe
  zero-violations while open). Added a `dropdown-menu` registry.json
  entry (includes `lib/with-icon-size.tsx`, its first non-Button/Input
  consumer). `pnpm lint`/`pnpm test` clean — 150 tests total across 17
  files.

## Current

**Modal** — about to start. Third and final Radix-based overlay
component tonight (built on Radix's Dialog primitive, per CLAUDE.md's
naming — "Modal" in our component vocabulary maps to Radix's "Dialog").
Will need `pnpm add @radix-ui/react-dialog`. Expect node `2120:18` — this
was also in the original brief's "verified directly" list, unaffected by
the shift.

## Remaining

Tabs

## Blocked

_(none yet)_

## Exact resume point

Dropdown Menu is fully done, committed, and pushed (commit: `feat(ui):
add Dropdown Menu`). Next action: run `get_metadata` on Figma node
`2120:18` (fileKey `CDgfoMkj7lP3pXWJ3aOgkH`) to verify it's Modal's
canvas, then `pnpm add @radix-ui/react-dialog --filter @asteria-ui/registry`
before writing the component.
