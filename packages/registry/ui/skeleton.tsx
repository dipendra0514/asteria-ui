import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/cn";

const skeletonVariants = cva("animate-pulse bg-bg-tertiary", {
  variants: {
    variant: {
      text: "h-4 w-full rounded-xs",
      circle: "rounded-full",
      rect: "rounded-sm",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export type SkeletonVariant = NonNullable<
  VariantProps<typeof skeletonVariants>["variant"]
>;

export interface SkeletonProps extends React.ComponentPropsWithRef<"div"> {
  variant?: SkeletonVariant;
}

/**
 * aria-hidden=true (purely decorative) · wrap it in a container with aria-busy=true while
 * loading · announce the swap to real content once it's ready (e.g. via a live region)
 */
export function Skeleton({
  ref,
  className,
  variant = "text",
  ...props
}: SkeletonProps) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { skeletonVariants };
