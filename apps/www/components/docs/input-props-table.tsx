import { definePropDefs } from "@/lib/prop-defs";
import type { InputProps } from "@asteria-ui/registry/ui/input";
import { PropsTable } from "./props-table";

const inputProps = definePropDefs<InputProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    defaultValue: '"md"',
    description: "Density — 32 / 40 / 48 / 56px wrapper height.",
  },
  {
    name: "error",
    type: "boolean",
    description:
      "Marks the input invalid — sets aria-invalid and the error border color.",
  },
  {
    name: "leadingIcon",
    type: "ReactNode",
    description: "Instance-swap icon slot before the text, auto-sized to match `size`.",
  },
  {
    name: "trailingIcon",
    type: "ReactNode",
    description: "Instance-swap icon slot after the text, auto-sized to match `size`.",
  },
  {
    name: "wrapperRef",
    type: "Ref<HTMLDivElement>",
    description: "Ref to the bordered wrapper, if you need it separately from the input itself.",
  },
]);

export function InputPropsTable() {
  return <PropsTable rows={[...inputProps]} />;
}
