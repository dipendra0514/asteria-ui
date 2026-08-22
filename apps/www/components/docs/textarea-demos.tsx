"use client";

import { Textarea } from "@asteria-ui/registry/ui/textarea";
import { ComponentPlayground } from "./component-playground";

export function TextareaHero() {
  return (
    <ComponentPlayground code={`<Textarea placeholder="Write a message..." />`}>
      <Textarea placeholder="Write a message..." className="max-w-xs" />
    </ComponentPlayground>
  );
}

export function TextareaStates() {
  return (
    <ComponentPlayground
      code={`<Textarea placeholder="Default" />
<Textarea placeholder="Disabled" disabled />
<Textarea placeholder="Invalid" error />`}
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Textarea placeholder="Default" />
        <Textarea placeholder="Disabled" disabled />
        <Textarea placeholder="Invalid" error />
      </div>
    </ComponentPlayground>
  );
}
