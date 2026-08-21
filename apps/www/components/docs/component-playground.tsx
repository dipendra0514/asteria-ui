"use client";

import * as React from "react";
import { cn } from "@asteria-ui/registry/lib/cn";

export function ComponentPlayground({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [previewTheme, setPreviewTheme] = React.useState<"dark" | "light">(
    "dark",
  );

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border-default bg-bg-secondary">
      <div className="flex items-center justify-between gap-3 border-b border-border-default px-3 py-2">
        <div className="flex items-center gap-1">
          <TabButton active={tab === "preview"} onClick={() => setTab("preview")}>
            Preview
          </TabButton>
          <TabButton active={tab === "code"} onClick={() => setTab("code")}>
            Code
          </TabButton>
        </div>
        {tab === "preview" ? (
          <div className="flex items-center rounded-md border border-border-default p-0.5">
            <ThemeButton
              label="Light preview"
              active={previewTheme === "light"}
              onClick={() => setPreviewTheme("light")}
            >
              <SunIcon />
            </ThemeButton>
            <ThemeButton
              label="Dark preview"
              active={previewTheme === "dark"}
              onClick={() => setPreviewTheme("dark")}
            >
              <MoonIcon />
            </ThemeButton>
          </div>
        ) : null}
      </div>
      {tab === "preview" ? (
        <div
          data-preview-theme={previewTheme}
          style={{ colorScheme: previewTheme }}
          className="flex min-h-40 flex-wrap items-center justify-center gap-3 bg-bg-primary p-8"
        >
          {children}
        </div>
      ) : (
        <pre className="overflow-x-auto bg-bg-primary p-4 font-mono text-ui-sm text-fg-primary">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1 text-ui-sm font-medium transition-colors",
        active
          ? "bg-bg-tertiary text-fg-primary"
          : "text-fg-secondary hover:text-fg-primary",
      )}
    >
      {children}
    </button>
  );
}

function ThemeButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-sm text-fg-secondary transition-colors",
        active && "bg-bg-tertiary text-fg-primary",
      )}
    >
      {children}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
