import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";
import { cn } from "../lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends React.ComponentPropsWithRef<typeof TooltipPrimitive.Content> {}

/**
 * role=tooltip (set by Radix) · shows on hover/focus · Esc dismisses · linked to its
 * trigger via aria-describedby · not interactive/not focusable
 */
export function TooltipContent({
  ref,
  className,
  sideOffset = 6,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-xs bg-fg-primary px-2 py-1 text-ui-xs font-medium text-bg-primary shadow-md",
        className,
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow
        width={8}
        height={4}
        className="fill-fg-primary"
      />
    </TooltipPrimitive.Content>
  );
}

TooltipContent.displayName = "TooltipContent";
