import { definePropDefs } from "@/lib/prop-defs";
import type { SkeletonProps } from "@asteria-ui/registry/ui/skeleton";
import { PropsTable } from "./props-table";

const skeletonProps = definePropDefs<SkeletonProps>()([
  {
    name: "variant",
    type: '"text" | "circle" | "rect"',
    defaultValue: '"text"',
    description:
      "Text gets a real default size (h-4 w-full, one line of text); circle and rect have no default size — size them via className.",
  },
]);

export function SkeletonPropsTable() {
  return <PropsTable rows={[...skeletonProps]} />;
}
