import { definePropDefs } from "@/lib/prop-defs";
import type { BreadcrumbItemProps } from "@asteria-ui/registry/ui/breadcrumbs";
import { PropsTable } from "./props-table";

const breadcrumbItemProps = definePropDefs<BreadcrumbItemProps>()([
  {
    name: "current",
    type: "boolean",
    defaultValue: "false",
    description:
      'Marks this as the current page — renders as non-interactive text with aria-current="page" instead of a link.',
  },
  {
    name: "href",
    type: "string",
    description: "Link target (native anchor prop). Ignored when current is set.",
  },
]);

export function BreadcrumbsPropsTable() {
  return (
    <>
      <p className="text-ui-sm text-fg-secondary">
        <code>Breadcrumbs</code> just forwards its native <code>nav</code> props —
        separators are inserted automatically between children, so there's nothing to
        configure there.
      </p>
      <h3 className="text-[1.25em] font-semibold">BreadcrumbItem</h3>
      <PropsTable rows={[...breadcrumbItemProps]} />
    </>
  );
}
