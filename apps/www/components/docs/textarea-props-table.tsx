import { definePropDefs } from "@/lib/prop-defs";
import type { TextareaProps } from "@asteria-ui/registry/ui/textarea";
import { PropsTable } from "./props-table";

const textareaProps = definePropDefs<TextareaProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    defaultValue: '"md"',
    description: "Minimum height — 80 / 96 / 112 / 128px. Resizable beyond that.",
  },
  {
    name: "error",
    type: "boolean",
    description: "Marks the textarea invalid — sets aria-invalid and the error border color.",
  },
]);

export function TextareaPropsTable() {
  return <PropsTable rows={[...textareaProps]} />;
}
