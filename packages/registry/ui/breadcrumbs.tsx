import { ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/cn";

export interface BreadcrumbsProps extends React.ComponentPropsWithRef<"nav"> {}

/**
 * nav with aria-label="Breadcrumb" · ol/li structure · current page has aria-current="page"
 * · chevron separators are aria-hidden
 */
export function Breadcrumbs({
  ref,
  className,
  children,
  ...props
}: BreadcrumbsProps) {
  const items = React.Children.toArray(children);

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex items-center gap-1">
        {items.map((item, index) => (
          <React.Fragment key={React.isValidElement(item) ? item.key : index}>
            {item}
            {index < items.length - 1 ? (
              <li
                role="presentation"
                aria-hidden="true"
                className="flex shrink-0 items-center text-fg-tertiary"
              >
                <ChevronRight className="size-4" />
              </li>
            ) : null}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

Breadcrumbs.displayName = "Breadcrumbs";

export interface BreadcrumbItemProps extends React.ComponentPropsWithRef<"a"> {
  /** Marks this as the current page — renders as non-interactive text with aria-current="page". */
  current?: boolean;
}

export function BreadcrumbItem({
  ref,
  className,
  current = false,
  children,
  ...props
}: BreadcrumbItemProps) {
  if (current) {
    return (
      <li aria-current="page">
        <span
          className={cn("text-ui-sm font-medium text-fg-primary", className)}
        >
          {children}
        </span>
      </li>
    );
  }

  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "rounded-xs text-ui-sm font-medium text-fg-secondary transition-colors",
          "hover:text-fg-primary",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";
