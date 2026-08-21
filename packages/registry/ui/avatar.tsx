import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full bg-bg-brand-subtle font-medium text-fg-brand select-none",
  {
    variants: {
      size: {
        xs: "size-6 text-[10px] leading-none",
        sm: "size-8 text-ui-xs",
        md: "size-10 text-ui-sm",
        lg: "size-12 text-ui-md",
        xl: "size-16 text-ui-lg",
        "2xl": "size-20 text-body-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const statusVariants = cva(
  "absolute z-10 right-0 bottom-0 rounded-full ring-2 ring-bg-primary",
  {
    variants: {
      size: {
        xs: "size-1.5",
        sm: "size-2",
        md: "size-2.5",
        lg: "size-2.5",
        xl: "size-3",
        "2xl": "size-3.5",
      },
      status: {
        online: "bg-[var(--success-500)]",
        offline: "bg-[var(--gray-300)]",
      },
    },
  },
);

export type AvatarSize = NonNullable<
  VariantProps<typeof avatarVariants>["size"]
>;
export type AvatarStatus = "online" | "offline";

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
}

function initialsFrom(alt?: string, initials?: string) {
  if (initials?.trim()) return initials.trim().slice(0, 2).toUpperCase();
  if (!alt?.trim()) return "";
  const parts = alt.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, initials, size = "md", status, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false);
    // biome-ignore lint/correctness/useExhaustiveDependencies: reset the fallback whenever `src` changes to a new image
    React.useEffect(() => {
      setFailed(false);
    }, [src]);

    const label = alt ?? initials ?? "Avatar";
    const fallback = initialsFrom(alt, initials);
    const showImage = Boolean(src) && !failed;
    const accessibleName = status ? `${label}, ${status}` : label;

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        role="img"
        aria-label={accessibleName}
        {...props}
      >
        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt=""
              className="size-full object-cover"
              onError={() => setFailed(true)}
            />
          ) : (
            <span aria-hidden="true">{fallback || "?"}</span>
          )}
        </span>
        {status ? (
          <span
            className={statusVariants({ size, status })}
            aria-hidden="true"
          />
        ) : null}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
}

export function AvatarGroup({
  className,
  max = 4,
  size = "md",
  children,
  ...props
}: AvatarGroupProps) {
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<AvatarProps> =>
      React.isValidElement<AvatarProps>(child),
  );
  const visible = max > 0 ? items.slice(0, max) : items;
  const overflow = items.length - visible.length;

  return (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> is form semantics, not appropriate for a visual avatar stack
    <div role="group" className={cn("flex items-center", className)} {...props}>
      {visible.map((child, index) => (
        <span
          key={child.key ?? index}
          className={cn("relative", index > 0 && "-ml-2")}
          style={{ zIndex: visible.length - index }}
        >
          {React.cloneElement(child, {
            size,
            className: cn(
              "ring-2 ring-bg-primary border border-border-default",
              child.props.className,
            ),
          })}
        </span>
      ))}
      {overflow > 0 ? (
        <span
          className={cn(
            avatarVariants({ size }),
            "-ml-2 border border-border-default bg-bg-secondary font-medium text-fg-secondary ring-2 ring-bg-primary",
          )}
          style={{ zIndex: 0 }}
          role="img"
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

AvatarGroup.displayName = "AvatarGroup";

export { avatarVariants };
