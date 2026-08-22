import { definePropDefs } from "@/lib/prop-defs";
import type { AlertProps } from "@asteria-ui/registry/ui/alert";
import { PropsTable } from "./props-table";

const alertProps = definePropDefs<AlertProps>()([
  {
    name: "variant",
    type: '"info" | "success" | "warning" | "error"',
    defaultValue: '"info"',
    description:
      "Color treatment and icon. Also determines the role: warning/error use role=alert, info/success use role=status.",
  },
  {
    name: "title",
    type: "ReactNode",
    description: "Bold heading line.",
  },
  {
    name: "description",
    type: "ReactNode",
    description: "Body text, always fg-secondary regardless of variant.",
  },
  {
    name: "actionLabel",
    type: "ReactNode",
    description: "Renders a text-style action button when present.",
  },
  {
    name: "onAction",
    type: "() => void",
    description: "Called when the action button is clicked.",
  },
  {
    name: "dismissible",
    type: "boolean",
    defaultValue: "false",
    description: 'Shows a dismiss button with aria-label="Dismiss".',
  },
  {
    name: "onDismiss",
    type: "() => void",
    description: "Called when the dismiss button is clicked.",
  },
]);

export function AlertPropsTable() {
  return <PropsTable rows={[...alertProps]} />;
}
