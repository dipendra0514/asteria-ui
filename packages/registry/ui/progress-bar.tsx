import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/cn";

const trackVariants = cva(
  "w-full overflow-hidden rounded-full bg-bg-tertiary",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export interface ProgressBarProps
  extends Omit<React.ComponentPropsWithRef<"div">, "role">,
    VariantProps<typeof trackVariants> {
  /** Current progress value, from 0 to `max`. */
  value: number;
  max?: number;
  /** Describes what is loading, e.g. "Uploading file" — required for a meaningful accessible name. */
  label: string;
}

/**
 * role=progressbar · aria-valuenow/min/max reflect the current value · aria-label
 * describes what is loading
 */
export function ProgressBar({
  ref,
  className,
  size,
  value,
  max = 100,
  label,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a determinate progress display is not an interactive control and correctly has no tabIndex per the ARIA spec
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn(trackVariants({ size }), className)}
      {...props}
    >
      <div
        className="h-full rounded-full bg-bg-brand-solid transition-[width]"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

ProgressBar.displayName = "ProgressBar";

export { trackVariants as progressBarVariants };
