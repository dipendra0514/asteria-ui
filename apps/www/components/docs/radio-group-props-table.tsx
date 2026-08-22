import { definePropDefs } from "@/lib/prop-defs";
import type {
  RadioGroupItemProps,
  RadioGroupProps,
} from "@asteria-ui/registry/ui/radio-group";
import { PropsTable } from "./props-table";

const radioGroupProps = definePropDefs<RadioGroupProps>()([
  {
    name: "value",
    type: "string",
    description: "Controlled selected value.",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "Uncontrolled initial selected value.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the selection changes.",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Disables every item in the group.",
  },
]);

const radioGroupItemProps = definePropDefs<RadioGroupItemProps>()([
  {
    name: "value",
    type: "string",
    description: "This item's value within the group.",
  },
  {
    name: "label",
    type: "ReactNode",
    description: "Clickable label, linked to the control via for/id.",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Disables this item only.",
  },
]);

export function RadioGroupPropsTable() {
  return (
    <>
      <h3 className="text-[1.25em] font-semibold">RadioGroup</h3>
      <PropsTable rows={[...radioGroupProps]} />
      <h3 className="text-[1.25em] font-semibold">RadioGroupItem</h3>
      <PropsTable rows={[...radioGroupItemProps]} />
    </>
  );
}
