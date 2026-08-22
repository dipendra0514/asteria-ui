"use client";

import { Button } from "@asteria-ui/registry/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@asteria-ui/registry/ui/tooltip";
import { ComponentPlayground } from "./component-playground";

export function TooltipHero() {
  return (
    <ComponentPlayground
      code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>Helpful info</TooltipContent>
</Tooltip>`}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful info</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ComponentPlayground>
  );
}

const sides = ["top", "right", "bottom", "left"] as const;

export function TooltipSides() {
  return (
    <ComponentPlayground
      code={sides
        .map(
          (side) =>
            `<Tooltip><TooltipTrigger asChild><Button variant="secondary">${side}</Button></TooltipTrigger><TooltipContent side="${side}">On ${side}</TooltipContent></Tooltip>`,
        )
        .join("\n")}
    >
      <TooltipProvider>
        {sides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="secondary">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>On {side}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </ComponentPlayground>
  );
}
