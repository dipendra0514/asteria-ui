import type { ReactNode } from "react";

type Swatch = { step: string; hex: string; token: string };

export function ColorScale({
  name,
  description,
  swatches,
}: {
  name: string;
  description?: string;
  swatches: Swatch[];
}) {
  return (
    <div className="not-prose my-8">
      <h3 className="mb-1 text-ui-lg font-semibold text-fg-primary">{name}</h3>
      {description ? (
        <p className="mb-4 text-ui-sm text-fg-secondary">{description}</p>
      ) : null}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-11">
        {swatches.map((s) => (
          <div key={s.token} className="min-w-0">
            <div
              className="mb-2 h-14 w-full rounded-md border border-border-default"
              style={{ backgroundColor: s.hex }}
              title={s.token}
            />
            <p className="truncate text-ui-xs font-medium text-fg-primary">
              {s.step}
            </p>
            <p className="truncate font-mono text-[10px] uppercase text-fg-tertiary">
              {s.hex}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorSwatch({
  token,
  hex,
  children,
}: {
  token: string;
  hex: string;
  children?: ReactNode;
}) {
  return (
    <div className="not-prose inline-flex items-center gap-3 rounded-md border border-border-default bg-bg-secondary p-3">
      <div
        className="size-10 shrink-0 rounded-md border border-border-default"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0">
        <p className="truncate text-ui-sm font-medium text-fg-primary">
          {token}
        </p>
        <p className="font-mono text-ui-xs uppercase text-fg-tertiary">{hex}</p>
        {children}
      </div>
    </div>
  );
}
