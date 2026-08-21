import type { ReactNode } from "react";

export function ComponentPreview({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border-default bg-bg-primary">
      {title ? (
        <div className="border-b border-border-default px-4 py-2 text-ui-sm font-medium text-fg-secondary">
          {title}
        </div>
      ) : null}
      <div className="flex min-h-24 flex-wrap items-center gap-3 p-6">
        {children ?? (
          <p className="text-ui-sm text-fg-tertiary">
            Preview placeholder — pass children once the component ships.
          </p>
        )}
      </div>
    </div>
  );
}
