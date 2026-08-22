import { definePropDefs } from "@/lib/prop-defs";
import type { SwitchProps } from "@asteria-ui/registry/ui/switch";
import { PropsTable } from "./props-table";

const switchProps = definePropDefs<SwitchProps>()([
  {
    name: "label",
    type: "ReactNode",
    description: "Clickable label, linked to the control via for/id.",
  },
  {
    name: "checked",
    type: "boolean",
    description: "Controlled checked state.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    description: "Uncontrolled initial checked state.",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Called when the switch is toggled.",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Prevents toggling.",
  },
]);

export function SwitchPropsTable() {
  return <PropsTable rows={[...switchProps]} />;
}
