import { definePropDefs } from "@/lib/prop-defs";
import type { TabsListProps } from "@asteria-ui/registry/ui/tabs";
import { PropsTable } from "./props-table";

const tabsListProps = definePropDefs<TabsListProps>()([
  {
    name: "variant",
    type: '"underline" | "pill"',
    defaultValue: '"underline"',
    description: "Shared with child TabsTrigger elements via context.",
  },
]);

export function TabsPropsTable() {
  return (
    <>
      <p className="text-ui-sm text-fg-secondary">
        <code>Tabs</code> and <code>TabsContent</code> are direct re-exports of Radix's{" "}
        <code>Root</code>/<code>Content</code>.
      </p>
      <h3 className="text-[1.25em] font-semibold">TabsList</h3>
      <PropsTable rows={[...tabsListProps]} />
    </>
  );
}
