"use client";

import { Checkbox } from "@asteria-ui/registry/ui/checkbox";
import { ComponentPlayground } from "./component-playground";

export function CheckboxHero() {
  return (
    <ComponentPlayground code={`<Checkbox label="Accept terms and conditions" />`}>
      <Checkbox label="Accept terms and conditions" />
    </ComponentPlayground>
  );
}

export function CheckboxStates() {
  return (
    <ComponentPlayground
      code={`<Checkbox label="Unchecked" />
<Checkbox label="Checked" checked />
<Checkbox label="Indeterminate" checked="indeterminate" />
<Checkbox label="Disabled" disabled />`}
    >
      <div className="flex flex-col gap-3">
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" checked />
        <Checkbox label="Indeterminate" checked="indeterminate" />
        <Checkbox label="Disabled" disabled />
      </div>
    </ComponentPlayground>
  );
}
