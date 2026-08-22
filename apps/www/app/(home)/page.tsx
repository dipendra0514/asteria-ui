import { Badge } from "@asteria-ui/registry/ui/badge";
import { buttonVariants } from "@asteria-ui/registry/ui/button";
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
      <Badge variant="gray" size="md" className="mb-6">
        Building in public — foundations complete, components in progress
      </Badge>

      <h1 className="max-w-3xl text-balance text-display-lg font-semibold tracking-tight text-fg-primary">
        Open-source components for React &amp; Tailwind
      </h1>

      <p className="mt-5 max-w-xl text-balance text-body-lg text-fg-secondary">
        Accessible, token-driven components you copy into your codebase and own
        — with a matching Figma design system built on the same variables.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {/* Button doesn't support asChild/polymorphic rendering yet (a real
            gap — CLAUDE.md names asChild as the established pattern for
            exactly this), so this reuses Button's own buttonVariants() CVA
            function directly on a real <Link>, rather than hand-rolled
            classes or a non-navigable <button>. See BUILD_LOG.md. */}
        <Link href="/docs" className={buttonVariants({ variant: "primary" })}>
          Read the docs
        </Link>
        {/* Command block — the glow-focus shadow doubles as the hero accent */}
        <code className="rounded-md border border-border-default bg-bg-secondary px-5 py-2.5 font-mono text-ui-sm text-fg-primary shadow-[var(--shadow-glow-focus)]">
          npx asteria-ui init
        </code>
      </div>

      <p className="mt-16 text-ui-xs text-fg-tertiary">
        Asteria UI — Open-source components for React &amp; Tailwind ·
        ©&nbsp;2026 Asteria UI
      </p>
    </main>
  );
}
