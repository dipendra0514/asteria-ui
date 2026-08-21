import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import { cn } from "../lib/cn";

export interface RadioGroupProps
  extends React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> {}

/**
 * role=radiogroup · each item role=radio · arrow keys navigate · Space selects · one item
 * is always selected · label clickable (linked via for/id)
 */
export function RadioGroup({ ref, className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends Omit<
    React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>,
    "children"
  > {
  label?: React.ReactNode;
}

export function RadioGroupItem({
  ref,
  className,
  id,
  label,
  ...props
}: RadioGroupItemProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;

  return (
    <div className="inline-flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={controlId}
        className={cn(
          "peer flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-border-default bg-bg-primary",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
          "data-[state=checked]:border-border-brand data-[state=checked]:bg-bg-brand-solid",
          "disabled:cursor-not-allowed disabled:bg-bg-secondary data-[state=checked]:disabled:bg-bg-disabled",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-fg-on-brand" />
      </RadioGroupPrimitive.Item>
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

RadioGroupItem.displayName = "RadioGroupItem";
