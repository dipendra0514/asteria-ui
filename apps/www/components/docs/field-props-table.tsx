import { definePropDefs } from "@/lib/prop-defs";
import type { FieldProps } from "@asteria-ui/registry/ui/field";
import { PropsTable } from "./props-table";

const fieldProps = definePropDefs<FieldProps>()([
  {
    name: "label",
    type: "ReactNode",
    description: "Linked to the control via for/id.",
  },
  {
    name: "description",
    type: "ReactNode",
    description: "Helper text, wired into the control's aria-describedby.",
  },
  {
    name: "error",
    type: "ReactNode",
    description:
      "Error message. When present, sets aria-invalid on the control and adds its id to aria-describedby alongside the description.",
  },
  {
    name: "children",
    type: "ReactElement",
    description:
      "A single form control (Input, Textarea, ...) — receives id, aria-describedby, aria-invalid, and error automatically via cloneElement.",
  },
]);

export function FieldPropsTable() {
  return <PropsTable rows={[...fieldProps]} />;
}
