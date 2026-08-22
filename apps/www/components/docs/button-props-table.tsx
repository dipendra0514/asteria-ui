import { definePropDefs } from "@/lib/prop-defs";
import type { ButtonProps } from "@asteria-ui/registry/ui/button";
import { PropsTable } from "./props-table";

const buttonProps = definePropDefs<ButtonProps>()([
  {
    name: "variant",
    type: '"primary" | "secondary" | "ghost" | "destructive" | "link"',
    defaultValue: '"primary"',
    description: "Visual style.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    defaultValue: '"md"',
    description: "Density — 32 / 40 / 48 / 56px height.",
  },
  {
    name: "leadingIcon",
    type: "ReactNode",
    description:
      "Instance-swap icon slot rendered before the label, auto-sized to match the button's size (16px sm/md, 20px lg/xl).",
  },
  {
    name: "loading",
    type: "boolean",
    defaultValue: "false",
    description: "Shows a spinner, sets aria-busy, and disables the button.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents interaction.",
  },
]);

export function ButtonPropsTable() {
  return <PropsTable rows={[...buttonProps]} />;
}
