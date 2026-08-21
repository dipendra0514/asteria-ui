import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type * as React from "react";
import { cn } from "../lib/cn";
import { withIconSize } from "../lib/with-icon-size";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content> {}

/**
 * role=menu · items role=menuitem · arrow keys navigate · Enter/Space selects · Esc
 * closes · focus is trapped within the open menu
 */
export function DropdownMenuContent({
  ref,
  className,
  sideOffset = 4,
  children,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex min-w-32 flex-col gap-1 rounded-md border border-border-default bg-bg-elevated p-1 shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps
  extends Omit<
    React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item>,
    "children"
  > {
  leadingIcon?: React.ReactNode;
  shortcut?: React.ReactNode;
  /** Styles the item as a destructive action (e.g. "Delete"). */
  destructive?: boolean;
  children?: React.ReactNode;
}

export function DropdownMenuItem({
  ref,
  className,
  leadingIcon,
  shortcut,
  destructive = false,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-xs px-2 py-1.5 text-ui-md text-fg-primary outline-none",
        "data-[highlighted]:bg-bg-secondary-hover",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        "data-[disabled]:pointer-events-none data-[disabled]:text-fg-disabled",
        destructive && "text-fg-error data-[highlighted]:bg-bg-error-subtle",
        className,
      )}
      {...props}
    >
      {leadingIcon ? withIconSize(leadingIcon, "size-4") : null}
      <span className="flex-1">{children}</span>
      {shortcut ? (
        <span className="shrink-0 text-ui-xs font-medium text-fg-tertiary">
          {shortcut}
        </span>
      ) : null}
    </DropdownMenuPrimitive.Item>
  );
}

DropdownMenuItem.displayName = "DropdownMenuItem";
