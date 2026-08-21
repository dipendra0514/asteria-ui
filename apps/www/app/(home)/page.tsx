import Link from "next/link";

/**
 * Landing page — v0 placeholder.
 * Deliberately minimal: a hero that dogfoods the token system (semantic colors,
 * brand-tinted shadows, glow-focus, squircle radii). The full landing —
 * live component wall, signature-feature sections, Figma kit merch —
 * comes once Button + a few P0 components exist to show off.
 */
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-bg-primary px-6 py-24 text-center">
      <p className="mb-6 rounded-full border border-border-default bg-bg-secondary px-4 py-1.5 text-ui-xs font-medium text-fg-secondary">
        Building in public — foundations complete, components in progress
      </p>

      <h1 className="max-w-3xl text-balance text-display-lg font-semibold tracking-tight text-fg-primary">
        Open-source components for React &amp; Tailwind
      </h1>

      <p className="mt-5 max-w-xl text-balance text-body-lg text-fg-secondary">
        Accessible, token-driven components you copy into your codebase and own
        — with a matching Figma design system built on the same variables.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/docs"
          className="focus-glow rounded-md bg-brand px-5 py-2.5 text-ui-sm font-semibold text-fg-on-brand shadow-sm transition-colors hover:bg-brand-hover"
        >
          Read the docs
        </Link>
        {/* Command block — the glow-focus shadow doubles as the hero accent */}
        <code className="rounded-md border border-border-default bg-bg-secondary px-5 py-2.5 font-mono text-ui-sm text-fg-primary shadow-[var(--shadow-glow-focus)]">
          npx asteria-ui init
        </code>
      </div>

      <p className="mt-16 text-ui-xs text-fg-tertiary">
        Asteria UI — Open-source components for React &amp; Tailwind · ©&nbsp;2026
        Asteria UI
      </p>
    </main>
  );
}
