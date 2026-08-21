import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type * as React from "react";
import { cn } from "../lib/cn";

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;

export type ModalSize = "sm" | "md" | "lg";

const sizeClassName: Record<ModalSize, string> = {
  sm: "max-w-[400px]",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
};

export interface ModalContentProps
  extends React.ComponentPropsWithRef<typeof DialogPrimitive.Content> {
  size?: ModalSize;
}

/**
 * role=dialog · aria-modal=true · focus trapped while open · Esc closes · aria-labelledby
 * points at ModalTitle · aria-describedby points at ModalDescription
 */
export function ModalContent({
  ref,
  className,
  size = "md",
  children,
  ...props
}: ModalContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[var(--brand-900)]/60" />
      <DialogPrimitive.Content
        ref={ref}
        aria-modal="true"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-border-default bg-bg-elevated shadow-xl",
          sizeClassName[size],
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

ModalContent.displayName = "ModalContent";

export function ModalHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex items-center gap-4 px-6 py-4", className)}
      {...props}
    />
  );
}

export interface ModalTitleProps
  extends React.ComponentPropsWithRef<typeof DialogPrimitive.Title> {}

export function ModalTitle({ ref, className, ...props }: ModalTitleProps) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "flex-1 text-display-xs font-semibold text-fg-primary",
        className,
      )}
      {...props}
    />
  );
}

export interface ModalCloseProps
  extends React.ComponentPropsWithRef<typeof DialogPrimitive.Close> {}

export function ModalClose({ ref, className, ...props }: ModalCloseProps) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      aria-label="Close"
      className={cn(
        "shrink-0 rounded-xs text-fg-primary outline-none",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        className,
      )}
      {...props}
    >
      <X className="size-5" />
    </DialogPrimitive.Close>
  );
}

ModalClose.displayName = "ModalClose";

export function ModalBody({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("px-6 pt-1 pb-4", className)} {...props} />;
}

export interface ModalDescriptionProps
  extends React.ComponentPropsWithRef<typeof DialogPrimitive.Description> {}

export function ModalDescription({
  ref,
  className,
  ...props
}: ModalDescriptionProps) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-body-sm text-fg-secondary", className)}
      {...props}
    />
  );
}

export function ModalFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex items-center justify-end gap-3 px-6 py-4", className)}
      {...props}
    />
  );
}
