import { PropsTable } from "./props-table";

export function ButtonPropsTable() {
  return (
    <PropsTable
      rows={[
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
      ]}
    />
  );
}
