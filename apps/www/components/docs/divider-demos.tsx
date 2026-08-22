"use client";

import { Divider } from "@asteria-ui/registry/ui/divider";
import { ComponentPlayground } from "./component-playground";

export function DividerHero() {
  return (
    <ComponentPlayground code={"<Divider />"}>
      <div className="w-full max-w-sm">
        <Divider />
      </div>
    </ComponentPlayground>
  );
}

export function DividerWithLabel() {
  return (
    <ComponentPlayground code={`<Divider label="OR" />`}>
      <div className="w-full max-w-sm">
        <Divider label="OR" />
      </div>
    </ComponentPlayground>
  );
}

export function DividerVertical() {
  return (
    <ComponentPlayground code={`<Divider orientation="vertical" />`}>
      <div className="flex h-16 items-center gap-3">
        <span className="text-ui-sm text-fg-secondary">Left</span>
        <Divider orientation="vertical" />
        <span className="text-ui-sm text-fg-secondary">Right</span>
      </div>
    </ComponentPlayground>
  );
}
