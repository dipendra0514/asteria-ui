"use client";

import { Alert } from "@asteria-ui/registry/ui/alert";
import { ComponentPlayground } from "./component-playground";

const variants = ["info", "success", "warning", "error"] as const;

export function AlertHero() {
  return (
    <ComponentPlayground
      code={`<Alert title="Heads up" description="Something you should know." />`}
    >
      <div className="flex w-full max-w-md flex-col gap-3">
        <Alert title="Heads up" description="Something you should know." />
      </div>
    </ComponentPlayground>
  );
}

export function AlertVariants() {
  return (
    <ComponentPlayground
      code={variants
        .map((v) => `<Alert variant="${v}" title="${v}" description="..." />`)
        .join("\n")}
    >
      <div className="flex w-full max-w-md flex-col gap-3">
        {variants.map((variant) => (
          <Alert
            key={variant}
            variant={variant}
            title={variant.charAt(0).toUpperCase() + variant.slice(1)}
            description="A short description of what happened."
          />
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function AlertWithActionAndDismiss() {
  return (
    <ComponentPlayground
      code={`<Alert
  variant="error"
  title="Upload failed"
  description="The file exceeds the 10MB size limit."
  actionLabel="Retry"
  dismissible
/>`}
    >
      <div className="flex w-full max-w-md flex-col gap-3">
        <Alert
          variant="error"
          title="Upload failed"
          description="The file exceeds the 10MB size limit."
          actionLabel="Retry"
          dismissible
        />
      </div>
    </ComponentPlayground>
  );
}
