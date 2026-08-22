"use client";

import { Badge } from "@asteria-ui/registry/ui/badge";
import { ComponentPlayground } from "./component-playground";

const variants = ["gray", "brand", "success", "warning", "error"] as const;

export function BadgeHero() {
  return (
    <ComponentPlayground
      code={`<Badge>Gray</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>`}
    >
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </ComponentPlayground>
  );
}

export function BadgeSizes() {
  return (
    <ComponentPlayground
      code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>`}
    >
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </ComponentPlayground>
  );
}

export function BadgeWithDot() {
  return (
    <ComponentPlayground code={`<Badge variant="success" showDot>Active</Badge>`}>
      <Badge variant="success" showDot>
        Active
      </Badge>
    </ComponentPlayground>
  );
}

export function BadgeDismissible() {
  return (
    <ComponentPlayground
      code={`<Badge dismissible onDismiss={() => alert("Removed")}>Removable</Badge>`}
    >
      <Badge dismissible onDismiss={() => alert("Removed")}>
        Removable
      </Badge>
    </ComponentPlayground>
  );
}
