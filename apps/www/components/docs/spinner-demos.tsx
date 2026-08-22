"use client";

import { Spinner } from "@asteria-ui/registry/ui/spinner";
import { ComponentPlayground } from "./component-playground";

const sizes = ["sm", "md", "lg"] as const;

export function SpinnerHero() {
  return (
    <ComponentPlayground code={"<Spinner />"}>
      <Spinner />
    </ComponentPlayground>
  );
}

export function SpinnerSizes() {
  return (
    <ComponentPlayground
      code={sizes.map((s) => `<Spinner size="${s}" />`).join("\n")}
    >
      {sizes.map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </ComponentPlayground>
  );
}
