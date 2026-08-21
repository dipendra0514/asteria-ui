import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "../lib/cn";

export interface SwitchProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SwitchPrimitive.Root>,
    "children"
  > {
  label?: React.ReactNode;
}

/**
 * role=switch · aria-checked=true/false · Space toggles · focus ring visible on Tab ·
 * label clickable (linked via for/id)
 */
export function Switch({ ref, className, id, label, ...props }: SwitchProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;

  return (
    <div className="inline-flex items-center gap-3">
      <SwitchPrimitive.Root
        ref={ref}
        id={controlId}
        className={cn(
          "peer flex h-6 w-11 shrink-0 items-center rounded-full bg-bg-switch-off px-0.5",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
          "data-[state=checked]:justify-end data-[state=checked]:bg-bg-brand-solid",
          "disabled:cursor-not-allowed disabled:opacity-100 data-[state=unchecked]:disabled:bg-bg-switch-off data-[state=checked]:disabled:bg-bg-disabled",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb className="size-5 shrink-0 rounded-full bg-bg-primary shadow-sm" />
      </SwitchPrimitive.Root>
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

Switch.displayName = "Switch";
