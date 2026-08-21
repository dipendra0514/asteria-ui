import { cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/cn";
import { withIconSize } from "../lib/with-icon-size";

const inputWrapperVariants = cva(
  [
    "flex w-full items-center rounded-sm border border-border-default bg-bg-primary transition-colors",
    "focus-within:border-border-brand focus-within:shadow-[var(--shadow-glow-focus)]",
    "has-[:disabled]:bg-bg-secondary",
    "has-[[aria-invalid=true]]:border-border-error",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "gap-2 px-3 py-1.5",
        md: "gap-2 px-4 py-2",
        lg: "gap-2 px-5 py-3",
        xl: "gap-3 px-6 py-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputSize = "sm" | "md" | "lg" | "xl";

const textSizeClassName: Record<InputSize, string> = {
  sm: "text-ui-md",
  md: "text-ui-lg",
  lg: "text-ui-lg",
  xl: "text-ui-lg",
};

const iconSizeClassName: Record<InputSize, string> = {
  sm: "size-4",
  md: "size-4",
  lg: "size-5",
  xl: "size-5",
};

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<"input">, "size"> {
  size?: InputSize;
  /** Marks the input as invalid — sets aria-invalid and the error border color. */
  error?: boolean;
  /** Instance-swap icon slot rendered before the input text. */
  leadingIcon?: React.ReactNode;
  /** Instance-swap icon slot rendered after the input text. */
  trailingIcon?: React.ReactNode;
  /** className for the bordered wrapper; `className` targets the wrapper, matching every other component. */
  wrapperRef?: React.Ref<HTMLDivElement>;
}

/**
 * role=textbox · requires an associated label via Field · aria-invalid=true on error ·
 * aria-describedby links to the error/helper message (wired by Field)
 */
export function Input({
  ref,
  wrapperRef,
  className,
  size = "md",
  error,
  leadingIcon,
  trailingIcon,
  ...props
}: InputProps) {
  return (
    <div
      ref={wrapperRef}
      className={cn(inputWrapperVariants({ size }), className)}
    >
      {leadingIcon ? withIconSize(leadingIcon, iconSizeClassName[size]) : null}
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-fg-primary outline-none placeholder:text-fg-tertiary",
          "disabled:cursor-not-allowed disabled:text-fg-disabled",
          textSizeClassName[size],
        )}
        {...props}
      />
      {trailingIcon
        ? withIconSize(trailingIcon, iconSizeClassName[size])
        : null}
    </div>
  );
}

Input.displayName = "Input";

export { inputWrapperVariants };
