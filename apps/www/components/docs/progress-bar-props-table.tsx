import { definePropDefs } from "@/lib/prop-defs";
import type { ProgressBarProps } from "@asteria-ui/registry/ui/progress-bar";
import { PropsTable } from "./props-table";

const progressBarProps = definePropDefs<ProgressBarProps>()([
  {
    name: "value",
    type: "number",
    description: "Current progress value, from 0 to max. Required.",
  },
  {
    name: "max",
    type: "number",
    defaultValue: "100",
    description: "The value that represents 100%.",
  },
  {
    name: "label",
    type: "string",
    description:
      "Describes what is loading (e.g. \"Uploading file\") — required, since a progress bar with no description of what's progressing is a real accessibility gap.",
  },
  {
    name: "size",
    type: '"sm" | "md"',
    defaultValue: '"sm"',
    description: "Track height — 4 / 8px.",
  },
]);

export function ProgressBarPropsTable() {
  return <PropsTable rows={[...progressBarProps]} />;
}
