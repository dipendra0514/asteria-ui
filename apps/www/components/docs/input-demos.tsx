"use client";

import { Input } from "@asteria-ui/registry/ui/input";
import { Mail, Search } from "lucide-react";
import { ComponentPlayground } from "./component-playground";

const sizes = ["sm", "md", "lg", "xl"] as const;

export function InputHero() {
  return (
    <ComponentPlayground code={`<Input placeholder="you@example.com" />`}>
      <Input placeholder="you@example.com" className="max-w-xs" />
    </ComponentPlayground>
  );
}

export function InputSizes() {
  return (
    <ComponentPlayground
      code={sizes.map((s) => `<Input size="${s}" placeholder="Size ${s}" />`).join("\n")}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        {sizes.map((size) => (
          <Input key={size} size={size} placeholder={`Size ${size}`} />
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function InputWithIcons() {
  return (
    <ComponentPlayground
      code={`<Input leadingIcon={<Search />} placeholder="Search..." />
<Input trailingIcon={<Mail />} placeholder="you@example.com" />`}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Input leadingIcon={<Search />} placeholder="Search..." />
        <Input trailingIcon={<Mail />} placeholder="you@example.com" />
      </div>
    </ComponentPlayground>
  );
}

export function InputStates() {
  return (
    <ComponentPlayground
      code={`<Input placeholder="Default" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Invalid" error />`}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Input placeholder="Default" />
        <Input placeholder="Disabled" disabled />
        <Input placeholder="Invalid" error />
      </div>
    </ComponentPlayground>
  );
}
