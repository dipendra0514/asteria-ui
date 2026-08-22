import { definePropDefs } from "@/lib/prop-defs";
import type { DividerProps } from "@asteria-ui/registry/ui/divider";
import { PropsTable } from "./props-table";

const dividerProps = definePropDefs<DividerProps>()([
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    defaultValue: '"horizontal"',
    description: "Line direction.",
  },
  {
    name: "label",
    type: "ReactNode",
    description: "Optional label rendered between two line segments.",
  },
]);

export function DividerPropsTable() {
  return <PropsTable rows={[...dividerProps]} />;
}
