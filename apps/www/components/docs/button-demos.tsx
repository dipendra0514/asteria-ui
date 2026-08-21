"use client";

import { Button } from "@asteria-ui/registry/ui/button";
import { ComponentPreview } from "./component-preview";

const variants = [
  "primary",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;

const sizes = ["sm", "md", "lg", "xl"] as const;

export function ButtonPreview() {
  return (
    <ComponentPreview title="Default">
      <Button>Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </ComponentPreview>
  );
}

export function ButtonVariants() {
  return (
    <ComponentPreview title="Variants">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </ComponentPreview>
  );
}

export function ButtonSizes() {
  return (
    <ComponentPreview title="Sizes">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </ComponentPreview>
  );
}

export function ButtonStates() {
  return (
    <ComponentPreview title="States">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button className="shadow-[var(--shadow-glow-focus)]">Focus glow</Button>
    </ComponentPreview>
  );
}
