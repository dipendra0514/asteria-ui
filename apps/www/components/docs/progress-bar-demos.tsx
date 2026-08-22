"use client";

import { ProgressBar } from "@asteria-ui/registry/ui/progress-bar";
import { ComponentPlayground } from "./component-playground";

export function ProgressBarHero() {
  return (
    <ComponentPlayground code={`<ProgressBar value={60} label="Uploading file" />`}>
      <div className="w-full max-w-xs">
        <ProgressBar value={60} label="Uploading file" />
      </div>
    </ComponentPlayground>
  );
}

export function ProgressBarSizes() {
  return (
    <ComponentPlayground
      code={`<ProgressBar size="sm" value={40} label="Uploading file" />
<ProgressBar size="md" value={70} label="Uploading file" />`}
    >
      <div className="flex w-full max-w-xs flex-col gap-4">
        <ProgressBar size="sm" value={40} label="Uploading file" />
        <ProgressBar size="md" value={70} label="Uploading file" />
      </div>
    </ComponentPlayground>
  );
}
