import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import type * as React from "react";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full border font-medium tracking-tight",
  {
    variants: {
      variant: {
        gray: "border-border-default bg-bg-secondary text-fg-primary",
        brand: "border-border-brand bg-bg-brand-subtle text-fg-brand",
        success: "border-border-success bg-bg-success-subtle text-fg-success",
        warning: "border-border-warning bg-bg-warning-subtle text-fg-warning",
        error: "border-border-error bg-bg-error-subtle text-fg-error",
      },
      size: {
        sm: "px-2 py-0.5 text-ui-xs",
        md: "px-3 py-1 text-ui-sm",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends React.ComponentPropsWithRef<"output">,
    VariantProps<typeof badgeVariants> {
  /** Shows a small decorative status dot before the label. */
  showDot?: boolean;
  /** Shows a dismiss button after the label. */
  dismissible?: boolean;
  /** Called when the dismiss button is activated. */
  onDismiss?: () => void;
}

/**
 * role=status · dismiss button role=button with aria-label="Remove" · dot indicator is
 * decorative (aria-hidden)
 */
export function Badge({
  ref,
  className,
  variant,
  size = "sm",
  showDot = false,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: BadgeProps) {
  const dotSizeClassName = size === "md" ? "size-2" : "size-1.5";
  const dismissSizeClassName = size === "md" ? "size-3.5" : "size-3";

  return (
    <output
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {showDot ? (
        <span
          aria-hidden="true"
          className={cn(dotSizeClassName, "shrink-0 rounded-full bg-current")}
        />
      ) : null}
      {children}
      {dismissible ? (
        <button
          type="button"
          aria-label="Remove"
          onClick={onDismiss}
          className={cn(
            dismissSizeClassName,
            "shrink-0 rounded-full text-current outline-none",
            "focus-visible:shadow-[var(--shadow-glow-focus)]",
          )}
        >
          <X className="size-full" />
        </button>
      ) : null}
    </output>
  );
}

Badge.displayName = "Badge";

export { badgeVariants };
