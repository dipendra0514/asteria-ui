import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/cn";

const spinnerVariants = cva(
  "relative inline-flex shrink-0 animate-spin items-center justify-center rounded-full border-solid border-border-default",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        md: "size-6 border-[3px]",
        lg: "size-8 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SpinnerSize = NonNullable<
  VariantProps<typeof spinnerVariants>["size"]
>;

const dotClassName: Record<SpinnerSize, string> = {
  sm: "-left-0.5 -top-0.5 size-1.5",
  md: "-left-[3px] -top-[3px] size-[9px]",
  lg: "-left-1 -top-1 size-3",
};

export interface SpinnerProps extends React.ComponentPropsWithRef<"output"> {
  size?: SpinnerSize;
}

/**
 * role=status · aria-label="Loading" · aria-busy=true on the container · unmount it (or
 * swap it out) once loading completes — it has no "done" state of its own
 */
export function Spinner({
  ref,
  className,
  size = "md",
  ...props
}: SpinnerProps) {
  return (
    <output
      ref={ref}
      aria-label="Loading"
      aria-busy="true"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <span
        className={cn("absolute rounded-full bg-fg-brand", dotClassName[size])}
      />
    </output>
  );
}

Spinner.displayName = "Spinner";

export { spinnerVariants };
