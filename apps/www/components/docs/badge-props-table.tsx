import { definePropDefs } from "@/lib/prop-defs";
import type { BadgeProps } from "@asteria-ui/registry/ui/badge";
import { PropsTable } from "./props-table";

const badgeProps = definePropDefs<BadgeProps>()([
  {
    name: "variant",
    type: '"gray" | "brand" | "success" | "warning" | "error"',
    defaultValue: '"gray"',
    description: "Color treatment.",
  },
  {
    name: "size",
    type: '"sm" | "md"',
    defaultValue: '"sm"',
    description: "Padding and font size.",
  },
  {
    name: "showDot",
    type: "boolean",
    defaultValue: "false",
    description: "Shows a small decorative status dot before the label.",
  },
  {
    name: "dismissible",
    type: "boolean",
    defaultValue: "false",
    description: 'Shows a dismiss button with aria-label="Remove" after the label.',
  },
  {
    name: "onDismiss",
    type: "() => void",
    description: "Called when the dismiss button is activated.",
  },
]);

export function BadgePropsTable() {
  return <PropsTable rows={[...badgeProps]} />;
}
