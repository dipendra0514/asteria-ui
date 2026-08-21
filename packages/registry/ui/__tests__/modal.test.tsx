import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Button } from "../button";
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
} from "../modal";

function BasicModal(props: { onConfirm?: () => void }) {
  return (
    <Modal>
      <ModalTrigger>Delete item</ModalTrigger>
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
          <Button variant="destructive" onClick={props.onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

describe("Modal", () => {
  it("is closed until the trigger is activated", () => {
    render(<BasicModal />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click with role=dialog and aria-modal", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("links the title via aria-labelledby", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("dialog");
    const title = screen.getByText("Delete item?");
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
  });

  it("links the description via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("dialog");
    const description = screen.getByText("This action cannot be undone.");
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
  });

  it("renders a close button with an accessible name", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    expect(
      await screen.findByRole("button", { name: "Close" }),
    ).toBeInTheDocument();
  });

  it("closes when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("calls the confirm button's onClick from within the footer", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<BasicModal onConfirm={onConfirm} />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("forwards a ref to the content element", async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Modal open>
        <ModalContent ref={ref}>
          <ModalTitle>Delete item?</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    await waitFor(() => expect(ref.current).toBeInstanceOf(HTMLDivElement));
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("dialog");
    expect(await axe(container)).toHaveNoViolations();
  });
});
