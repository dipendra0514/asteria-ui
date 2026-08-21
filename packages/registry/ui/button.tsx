import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md font-medium tracking-tight transition-colors",
    "disabled:pointer-events-none disabled:opacity-100",
    "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-bg-brand-solid text-fg-on-brand shadow-sm",
          "hover:bg-bg-brand-solid-hover",
          "active:bg-bg-brand-solid-active",
          "disabled:bg-bg-disabled disabled:text-fg-disabled",
        ].join(" "),
        secondary: [
          "border border-border-default bg-bg-primary text-fg-primary shadow-xs",
          "hover:bg-bg-secondary-hover",
          "active:bg-bg-tertiary",
          "disabled:bg-bg-primary disabled:text-fg-disabled disabled:border-border-default",
        ].join(" "),
        ghost: [
          "bg-transparent text-fg-primary",
          "hover:bg-bg-secondary-hover",
          "active:bg-bg-tertiary",
          "disabled:text-fg-disabled",
        ].join(" "),
        destructive: [
          "bg-bg-error-solid text-fg-on-error shadow-sm",
          "hover:bg-bg-error-solid-hover",
          "active:bg-[var(--error-800)]",
          "disabled:bg-bg-disabled disabled:text-fg-disabled",
        ].join(" "),
        link: [
          "bg-transparent text-fg-brand underline-offset-4",
          "hover:text-fg-brand hover:underline",
          "active:text-[var(--brand-800)]",
          "disabled:text-fg-disabled disabled:no-underline",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-3 text-ui-sm",
        md: "h-10 px-4 text-ui-md",
        lg: "h-12 px-5 text-ui-lg",
        xl: "h-14 px-6 text-ui-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 animate-spin", className)}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {children}
        {loading ? <Spinner /> : null}
      </button>
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
