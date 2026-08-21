import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>,
    "children"
  > {
  label?: React.ReactNode;
}

/**
 * role=checkbox · aria-checked=true/false/mixed · Space toggles · focus ring visible on
 * Tab · label is clickable (linked via for/id)
 */
export function Checkbox({
  ref,
  className,
  id,
  label,
  checked,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;

  return (
    <div className="inline-flex items-center gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        id={controlId}
        checked={checked}
        className={cn(
          "peer flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-xs border-[1.5px] border-border-default bg-bg-primary",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
          "data-[state=checked]:border-border-brand data-[state=checked]:bg-bg-brand-solid",
          "data-[state=indeterminate]:border-border-brand data-[state=indeterminate]:bg-bg-brand-solid",
          "disabled:cursor-not-allowed disabled:bg-bg-secondary data-[state=checked]:disabled:bg-bg-disabled data-[state=indeterminate]:disabled:bg-bg-disabled",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="text-fg-on-brand">
          {checked === "indeterminate" ? (
            <Minus className="size-3.5" />
          ) : (
            <Check className="size-3.5" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label ? (
        <label
          htmlFor={controlId}
          className={cn(
            "select-none text-ui-md font-normal text-fg-primary",
            "peer-disabled:cursor-not-allowed peer-disabled:text-fg-disabled",
          )}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}

Checkbox.displayName = "Checkbox";
