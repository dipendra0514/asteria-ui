import { definePropDefs } from "@/lib/prop-defs";
import type { SpinnerProps } from "@asteria-ui/registry/ui/spinner";
import { PropsTable } from "./props-table";

const spinnerProps = definePropDefs<SpinnerProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Diameter — 16 / 24 / 32px.",
  },
]);

export function SpinnerPropsTable() {
  return <PropsTable rows={[...spinnerProps]} />;
}
