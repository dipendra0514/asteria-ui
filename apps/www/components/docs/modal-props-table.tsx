import { definePropDefs } from "@/lib/prop-defs";
import type { ModalContentProps } from "@asteria-ui/registry/ui/modal";
import { PropsTable } from "./props-table";

const modalContentProps = definePropDefs<ModalContentProps>()([
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Max width — 400 / 560 / 720px.",
  },
]);

export function ModalPropsTable() {
  return (
    <>
      <p className="text-ui-sm text-fg-secondary">
        <code>Modal</code> and <code>ModalTrigger</code> are direct re-exports of
        Radix Dialog's <code>Root</code>/<code>Trigger</code>. Compose{" "}
        <code>ModalHeader</code>, <code>ModalTitle</code>, <code>ModalClose</code>,{" "}
        <code>ModalBody</code>, <code>ModalDescription</code>, and{" "}
        <code>ModalFooter</code> inside <code>ModalContent</code> — Cancel/Confirm
        buttons are real <code>&lt;Button&gt;</code> instances you compose in, not
        baked into Modal itself.
      </p>
      <h3 className="text-[1.25em] font-semibold">ModalContent</h3>
      <PropsTable rows={[...modalContentProps]} />
    </>
  );
}
