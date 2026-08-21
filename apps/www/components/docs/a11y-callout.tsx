import type { ReactNode } from "react";

export function A11yCallout({
  title = "Accessibility",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-6 rounded-lg border border-border-brand bg-bg-brand-subtle p-4">
      <p className="mb-2 text-ui-sm font-semibold text-fg-brand">{title}</p>
      <div className="text-ui-sm text-fg-secondary [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_code]:font-mono [&_code]:text-fg-primary">
        {children}
      </div>
    </div>
  );
}
