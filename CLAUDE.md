# Asteria UI — CLAUDE.md

This file is auto-loaded by Claude Code every session. Read it before doing any work in this repo.

## What this is

**Asteria UI** — an open-source React + Tailwind component library, shadcn-style copy-paste distribution (not an npm-imported package). Free tier first (~28 foundational components), paid tier later (complex patterns: data tables, date pickers, dashboards, marketing sections). Design system lives in Figma; this repo is the code + docs site.

## Brand identity — do not deviate without being told

- **Name:** Asteria UI · **Tagline:** "Open-source components for React & Tailwind"
- **Brand color:** indigo-leaning blue, `brand-600 = #4658DE`
- **Signature visual language** (what makes this NOT a generic Tailwind kit):
  1. **Brand-tinted shadows** — shadows use `brand-900` (`#2E377D`) instead of black, low opacity
  2. **`glow-focus`** — signature focus ring: 4px spread, `brand-500` @ 24%, zero blur/offset. Every interactive component's focus state uses this. Not a hard 2px outline. This is non-negotiable — it's the whole point of the brand.
  3. **Squircle-leaning radius** — softer/larger than typical: 6/8/10/14/20px steps
  4. Role-based type naming: `ui-*`, `body-*`, `display-*` (not generic sm/md/lg for type)
  5. `space-2xs` (2px) micro-spacing tier most systems skip

## Design tokens — confirmed real values, do not invent or approximate

```css
/* Brand */
--brand-50: #EFF3FE;  --brand-100: #E0E7FD; --brand-200: #C6D3FB;
--brand-300: #A3B6F8; --brand-400: #7D93F2; --brand-500: #5C74EB;
--brand-600: #4658DE; --brand-700: #3A46C4; --brand-800: #313B9E;
--brand-900: #2E377D; --brand-950: #1C2049;

/* Gray */
--gray-50: #F9FAFB;  --gray-100: #F2F4F7; --gray-200: #E4E7EC;
--gray-300: #D0D5DD; --gray-400: #98A2B3; --gray-500: #667085;
--gray-600: #475467; --gray-700: #344054; --gray-800: #1D2939;
--gray-900: #101828; --gray-950: #0C111D;

/* Error */
--error-50: #FEF3F2;  --error-600: #D92D20; --error-950: #55160C;
/* Warning */
--warning-50: #FFFAEB; --warning-600: #DC6803; --warning-950: #4E1D09;
/* Success */
--success-50: #ECFDF3; --success-600: #079455; --success-950: #053321;
```

Full 50–950 steps for error/warning/success exist in Figma "Foundations / Colors" — pull exact intermediate values from there via the Figma MCP connection before hardcoding a step not listed above. **Never approximate a hex value. If it's not confirmed, stop and ask rather than guessing.**

**Semantic tokens (components use ONLY these, never primitives directly):**
`bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-elevated`, `bg-brand-solid`, `bg-brand-solid-hover`, `bg-brand-solid-active`, `bg-brand-subtle`, `bg-disabled`, `bg-secondary-hover`, `bg-tertiary-hover`, `bg-switch-off`, `bg-error-solid`, `bg-error-solid-hover`, `bg-error-subtle`, `bg-warning-solid`, `bg-warning-subtle`, `bg-success-solid`, `bg-success-subtle`, `fg-primary`, `fg-secondary`, `fg-tertiary`, `fg-disabled`, `fg-on-brand`, `fg-on-error`, `fg-on-warning`, `fg-on-success`, `fg-brand`, `fg-error`, `fg-warning`, `fg-success`, `border-default`, `border-strong`, `border-brand`, `border-error`, `border-warning`, `border-success`, `focus-ring`.

Both Light and Dark mode mappings exist in `tokens.css` at repo root (or wherever it's scaffolded) — always bind to the semantic layer, never hardcode a primitive hex inside a component.

**Spacing:** 4px base scale, `space-0` through `space-10xl`, plus micro tier `space-px` (1px) and `space-2xs` (2px).
**Radius:** `radius-xs` 6 · `radius-sm` 8 · `radius-md` 10 (inputs/buttons) · `radius-lg` 14 (cards) · `radius-xl` 20 (modals) · `radius-full` 9999.
**Density (form-row components must align):** `sm` = 32px height · `md` = 40px · `lg` = 48px · `xl` = 56px. Button, Input, Textarea (min-height), Select all follow this exactly.

## Component API conventions — locked, follow exactly

- Extend native elements, forward refs: `React.ComponentPropsWithRef<"button">`
- Variants via **CVA** (`class-variance-authority`) + `cn()` helper (`clsx` + `tailwind-merge`)
- Component property naming: `Variant` (capitalized values: Primary/Secondary/etc.) · `Size` (lowercase: sm/md/lg/xl) · `State` (lowercase: default/hover/focus/active/disabled/loading) · booleans camelCase (`showIcon`, `dismissible`) · instance-swap slots camelCase (`leadingIcon`, `avatar`)
- **Every interactive component must have a `focus` state using `shadow-glow-focus`** — not a generic outline. If a component ships without this, it's incomplete.
- Composition over configuration for multi-part components (`<Dialog><DialogTrigger/><DialogContent/></Dialog>`, not a giant prop bag)
- Controlled + uncontrolled always both: `value`/`defaultValue`/`onValueChange` naming pattern
- `className` always wins (tailwind-merge handles collisions)
- `asChild` pattern for polymorphism (Radix/Base UI `Slot`), not an `as` prop
- Complex overlays (Dialog, Select, Dropdown, Tooltip, Popover, Accordion, Switch, Checkbox, Slider, Toast) build on **Base UI or Radix primitives** — don't reinvent focus trapping/positioning/typeahead from scratch
- Simple components (Button, Badge, Avatar, Alert, Card, Divider, Skeleton) built from scratch — no dependency needed

## Icons

**Lucide only** (`lucide-react`). Same set as the Figma file. Never mix in another icon library.

## Repo structure (pnpm + Turborepo monorepo)

```
asteria-ui/
├── apps/
│   └── www/                 # docs site — Next.js + Fumadocs + MDX
├── packages/
│   ├── cli/                 # npx asteria-ui (init, add)
│   └── registry/
│       ├── ui/               # component source of truth (button.tsx, etc.)
│       ├── lib/               # cn(), shared hooks
│       └── registry.json
├── package.json
├── turbo.json
└── CLAUDE.md                 # this file
```

## Tooling

- **Package manager:** pnpm (never npm/yarn in this repo)
- **Build:** Turborepo, tsup for the CLI
- **Lint/format:** Biome (not ESLint+Prettier — pick one, this is it)
- **Testing:** Vitest + Testing Library + vitest-axe (accessibility checks are mandatory per component, not optional)
- **TypeScript:** strict mode, always
- **Styling:** Tailwind v4, CSS-first `@theme` config — no `tailwind.config.js`

## Distribution model

shadcn-style copy-paste registry (`npx asteria-ui add button`), NOT an npm-imported package. Public MIT-licensed repo. Paid tier (later) = separate commercial-EULA registry of complex patterns, same CLI.

## Where specs come from

**Figma is the single source of truth for every component's variants/states/tokens.** Before building or modifying a component, pull its real spec via the Figma MCP connection (may be rate-limited — check before assuming a spec is complete). Never invent variants, sizes, or states that aren't confirmed in Figma. If Figma access is unavailable, stop and ask rather than guessing — flag exactly what's missing.

**File:** [Dipendra-Testing (Copy) (Copy)](https://www.figma.com/design/CDgfoMkj7lP3pXWJ3aOgkH/Dipendra-Testing--Copy---Copy-) · file key `CDgfoMkj7lP3pXWJ3aOgkH`

## Accessibility — non-negotiable per component

Every interactive component needs: correct ARIA role, documented keyboard behavior (follow WAI-ARIA APG patterns exactly), visible focus state (`shadow-glow-focus`), and a vitest-axe test with zero violations across states (open, error, disabled). Write the accessibility note as a short comment/doc block on every component, matching the style already established in Figma component pages (e.g. Button: "role=button · Enter/Space activates · focus ring visible on Tab · disabled prevents interaction · loading announces via aria-busy").

## Current status (update this section as work progresses)

- Figma foundations: done (Colors, Typography & Spacing, Depth & Shape, Icons, Grid Layouts)
- Figma base components built so far: Button, Badge, Input, Field wrapper, Textarea, Checkbox, Radio Group, Switch, Alert, Spinner, Divider, Skeleton, Progress Bar, Breadcrumbs, Tooltip, Dropdown Menu, Modal, Tabs, Avatar
- Code: just starting — monorepo scaffold in progress
- Docs site: Introduction/Installation/Theming/CLI pages exist; component-doc-page template proven on Avatar

## Working style

Direct and practical, build-as-we-go. Don't over-explain settled decisions above — they're settled. If something in this file conflicts with a new instruction, flag the conflict and ask rather than silently picking one.

