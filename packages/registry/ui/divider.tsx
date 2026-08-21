import type * as React from "react";
import { cn } from "../lib/cn";

export interface DividerProps extends React.ComponentPropsWithRef<"div"> {
  orientation?: "horizontal" | "vertical";
  /** Optional label rendered between two line segments. */
  label?: React.ReactNode;
}

/**
 * role=separator · aria-orientation set for vertical dividers · decorative by default
 * (structural, non-interactive)
 */
export function Divider({
  ref,
  className,
  orientation = "horizontal",
  label,
  ...props
}: DividerProps) {
  const isVertical = orientation === "vertical";

  if (!label) {
    return (
      // biome-ignore lint/a11y/useSemanticElements: <hr> can't hold the label+line-segment children the other branch needs, so this can't unify with it
      // biome-ignore lint/a11y/useFocusableInteractive: a structural separator (not an interactive/resizable one) correctly has no tabIndex per the ARIA spec
      <div
        ref={ref}
        role="separator"
        aria-orientation={isVertical ? "vertical" : undefined}
        className={cn(
          isVertical ? "h-full w-px" : "h-px w-full",
          "shrink-0 bg-border-default",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a structural separator (not an interactive/resizable one) correctly has no tabIndex per the ARIA spec
    <div
      ref={ref}
      // biome-ignore lint/a11y/useSemanticElements: <hr> can't hold the label+line-segment children this branch needs
      role="separator"
      aria-orientation={isVertical ? "vertical" : undefined}
      className={cn(
        "flex items-center gap-3",
        isVertical ? "h-full flex-col" : "w-full",
        className,
      )}
      {...props}
    >
      <div
        className={cn("flex-1 bg-border-default", isVertical ? "w-px" : "h-px")}
      />
      <span className="shrink-0 text-ui-xs font-medium text-fg-tertiary">
        {label}
      </span>
      <div
        className={cn("flex-1 bg-border-default", isVertical ? "w-px" : "h-px")}
      />
    </div>
  );
}

Divider.displayName = "Divider";
