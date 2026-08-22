"use client";

import { Button } from "@asteria-ui/registry/ui/button";
import { Plus } from "lucide-react";
import { ComponentPlayground } from "./component-playground";

const variants = ["primary", "secondary", "ghost", "destructive", "link"] as const;
const sizes = ["sm", "md", "lg", "xl"] as const;

export function ButtonHero() {
  return (
    <ComponentPlayground
      code={`<Button>Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
    >
      <Button>Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </ComponentPlayground>
  );
}

export function ButtonVariants() {
  return (
    <ComponentPlayground
      code={variants.map((v) => `<Button variant="${v}">${v}</Button>`).join("\n")}
    >
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </ComponentPlayground>
  );
}

export function ButtonSizes() {
  return (
    <ComponentPlayground
      code={sizes.map((s) => `<Button size="${s}">Button</Button>`).join("\n")}
    >
      {sizes.map((size) => (
        <Button key={size} size={size}>
          Button
        </Button>
      ))}
    </ComponentPlayground>
  );
}

export function ButtonWithIcon() {
  return (
    <ComponentPlayground
      code={"<Button leadingIcon={<Plus />}>Add item</Button>"}
    >
      <Button leadingIcon={<Plus />}>Add item</Button>
    </ComponentPlayground>
  );
}

export function ButtonStates() {
  return (
    <ComponentPlayground
      code={`<Button>Default</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>`}
    >
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </ComponentPlayground>
  );
}
