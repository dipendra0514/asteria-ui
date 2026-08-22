"use client";

import { Skeleton } from "@asteria-ui/registry/ui/skeleton";
import { ComponentPlayground } from "./component-playground";

export function SkeletonHero() {
  return (
    <ComponentPlayground code={`<Skeleton className="w-48" />`}>
      <Skeleton className="w-48" />
    </ComponentPlayground>
  );
}

export function SkeletonVariants() {
  return (
    <ComponentPlayground
      code={`<Skeleton className="w-48" />
<Skeleton variant="circle" className="size-12" />
<Skeleton variant="rect" className="h-24 w-48" />`}
    >
      <div className="flex flex-col items-start gap-4">
        <Skeleton className="w-48" />
        <Skeleton variant="circle" className="size-12" />
        <Skeleton variant="rect" className="h-24 w-48" />
      </div>
    </ComponentPlayground>
  );
}

export function SkeletonCard() {
  return (
    <ComponentPlayground
      code={`<div className="flex items-center gap-3">
  <Skeleton variant="circle" className="size-10" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`}
    >
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="size-10" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </ComponentPlayground>
  );
}
