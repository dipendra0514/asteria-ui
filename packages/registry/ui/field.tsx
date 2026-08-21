import * as React from "react";
import { cn } from "../lib/cn";

interface ControllableProps {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  error?: boolean;
}

export interface FieldProps
  extends Omit<React.ComponentPropsWithRef<"div">, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  /** The form control to wire up (Input, Textarea, Select, ...) — receives id, aria-describedby, aria-invalid, and error automatically. */
  children: React.ReactElement<ControllableProps>;
}

/**
 * Label linked to the control via for/id · helper text wired via aria-describedby ·
 * error message wired via aria-describedby + aria-invalid on the control
 */
export function Field({
  ref,
  className,
  label,
  description,
  error,
  children,
  ...props
}: FieldProps) {
  const controlId = React.useId();
  const descriptionId = `${controlId}-description`;
  const errorId = `${controlId}-error`;
  const invalid = Boolean(error);
  const describedBy = [
    description ? descriptionId : null,
    invalid ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ");

  const control = React.cloneElement(children, {
    id: controlId,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": invalid || undefined,
    error: invalid,
  });

  return (
    <div
      ref={ref}
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    >
      {label ? (
        <label
          htmlFor={controlId}
          className="text-ui-sm font-medium text-fg-primary"
        >
          {label}
        </label>
      ) : null}
      {control}
      {description ? (
        <p
          id={descriptionId}
          className="text-ui-xs font-medium text-fg-tertiary"
        >
          {description}
        </p>
      ) : null}
      {invalid ? (
        <p id={errorId} className="text-ui-xs font-medium text-fg-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

Field.displayName = "Field";
