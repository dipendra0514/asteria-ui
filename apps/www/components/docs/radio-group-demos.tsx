"use client";

import { RadioGroup, RadioGroupItem } from "@asteria-ui/registry/ui/radio-group";
import { ComponentPlayground } from "./component-playground";

export function RadioGroupHero() {
  return (
    <ComponentPlayground
      code={`<RadioGroup defaultValue="free" aria-label="Plan">
  <RadioGroupItem value="free" label="Free" />
  <RadioGroupItem value="pro" label="Pro" />
  <RadioGroupItem value="enterprise" label="Enterprise" />
</RadioGroup>`}
    >
      <RadioGroup defaultValue="free" aria-label="Plan">
        <RadioGroupItem value="free" label="Free" />
        <RadioGroupItem value="pro" label="Pro" />
        <RadioGroupItem value="enterprise" label="Enterprise" />
      </RadioGroup>
    </ComponentPlayground>
  );
}

export function RadioGroupDisabled() {
  return (
    <ComponentPlayground
      code={`<RadioGroup defaultValue="pro" disabled aria-label="Plan">
  <RadioGroupItem value="free" label="Free" />
  <RadioGroupItem value="pro" label="Pro" />
</RadioGroup>`}
    >
      <RadioGroup defaultValue="pro" disabled aria-label="Plan">
        <RadioGroupItem value="free" label="Free" />
        <RadioGroupItem value="pro" label="Pro" />
      </RadioGroup>
    </ComponentPlayground>
  );
}
