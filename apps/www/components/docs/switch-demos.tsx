"use client";

import { Switch } from "@asteria-ui/registry/ui/switch";
import { ComponentPlayground } from "./component-playground";

export function SwitchHero() {
  return (
    <ComponentPlayground code={`<Switch label="Email notifications" />`}>
      <Switch label="Email notifications" />
    </ComponentPlayground>
  );
}

export function SwitchStates() {
  return (
    <ComponentPlayground
      code={`<Switch label="Off" />
<Switch label="On" checked />
<Switch label="Disabled" disabled />`}
    >
      <div className="flex flex-col gap-3">
        <Switch label="Off" />
        <Switch label="On" checked />
        <Switch label="Disabled" disabled />
      </div>
    </ComponentPlayground>
  );
}
