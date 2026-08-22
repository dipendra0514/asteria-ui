import { definePropDefs } from "@/lib/prop-defs";
import type { DropdownMenuItemProps } from "@asteria-ui/registry/ui/dropdown-menu";
import { PropsTable } from "./props-table";

const dropdownMenuItemProps = definePropDefs<DropdownMenuItemProps>()([
  {
    name: "leadingIcon",
    type: "ReactNode",
    description: "Instance-swap icon slot before the label, 16px.",
  },
  {
    name: "shortcut",
    type: "ReactNode",
    description: "Keyboard shortcut text shown at the end of the row.",
  },
  {
    name: "destructive",
    type: "boolean",
    defaultValue: "false",
    description: 'Styles the item as a destructive action (e.g. "Delete").',
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Prevents selecting this item.",
  },
  {
    name: "onSelect",
    type: "(event: Event) => void",
    description: "Called when the item is selected.",
  },
]);

export function DropdownMenuPropsTable() {
  return (
    <>
      <p className="text-ui-sm text-fg-secondary">
        <code>DropdownMenu</code> and <code>DropdownMenuTrigger</code> are direct
        re-exports of Radix's <code>Root</code>/<code>Trigger</code>.
      </p>
      <h3 className="text-[1.25em] font-semibold">DropdownMenuItem</h3>
      <PropsTable rows={[...dropdownMenuItemProps]} />
    </>
  );
}
