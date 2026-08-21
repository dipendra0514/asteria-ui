import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

export const Tabs = TabsPrimitive.Root;
export const TabsContent = TabsPrimitive.Content;

export type TabsVariant = "underline" | "pill";

const TabsVariantContext = React.createContext<TabsVariant>("underline");

const listVariants = cva("flex items-center", {
  variants: {
    variant: {
      underline: "gap-4 border-b border-border-default",
      pill: "gap-1 rounded-full bg-bg-secondary p-0.5",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export interface TabsListProps
  extends React.ComponentPropsWithRef<typeof TabsPrimitive.List>,
    VariantProps<typeof listVariants> {}

/**
 * role=tablist · each tab role=tab · panels role=tabpanel · arrow keys navigate ·
 * aria-selected on the active tab · aria-controls links each tab to its panel
 */
export function TabsList({
  ref,
  className,
  variant = "underline",
  children,
  ...props
}: TabsListProps) {
  return (
    <TabsVariantContext.Provider value={variant ?? "underline"}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(listVariants({ variant }), className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsVariantContext.Provider>
  );
}

TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger> {}

export function TabsTrigger({ ref, className, ...props }: TabsTriggerProps) {
  const variant = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "text-ui-sm font-medium text-fg-secondary outline-none transition-colors",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        "disabled:pointer-events-none disabled:text-fg-disabled",
        variant === "underline"
          ? "border-b-2 border-transparent px-1 py-2 data-[state=active]:border-border-brand data-[state=active]:text-fg-brand"
          : "rounded-full px-3 py-1.5 data-[state=active]:bg-bg-brand-subtle data-[state=active]:text-fg-brand",
        className,
      )}
      {...props}
    />
  );
}

TabsTrigger.displayName = "TabsTrigger";
