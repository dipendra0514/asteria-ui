"use client";

import { Button } from "@asteria-ui/registry/ui/button";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@asteria-ui/registry/ui/modal";
import { ComponentPlayground } from "./component-playground";

export function ModalHero() {
  return (
    <ComponentPlayground
      code={`<Modal>
  <ModalTrigger asChild>
    <Button variant="destructive">Delete item</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Delete item?</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>
      <ModalDescription>This action cannot be undone.</ModalDescription>
    </ModalBody>
    <ModalFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>`}
    >
      <Modal>
        <ModalTrigger asChild>
          <Button variant="destructive">Delete item</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Delete item?</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalBody>
            <ModalDescription>This action cannot be undone.</ModalDescription>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary">Cancel</Button>
            <Button variant="destructive">Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ComponentPlayground>
  );
}
