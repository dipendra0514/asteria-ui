import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

function BasicMenu(props: {
  onSelectEdit?: () => void;
  onSelectDelete?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={props.onSelectEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
        <DropdownMenuItem destructive onSelect={props.onSelectDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("is closed until the trigger is activated", () => {
    render(<BasicMenu />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu with its items on trigger click", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "Delete" }),
    ).toBeInTheDocument();
  });

  it("selects an item via click and calls its onSelect handler", async () => {
    const user = userEvent.setup();
    const onSelectEdit = vi.fn();
    render(<BasicMenu onSelectEdit={onSelectEdit} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onSelectEdit).toHaveBeenCalledTimes(1);
  });

  it("marks an item disabled and skips it on selection", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const disabledItem = await screen.findByRole("menuitem", {
      name: "Duplicate",
    });
    expect(disabledItem).toHaveAttribute("data-disabled");
  });

  it("closes the menu on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("calls onSelect when a destructive item is chosen", async () => {
    const user = userEvent.setup();
    const onSelectDelete = vi.fn();
    render(<BasicMenu onSelectDelete={onSelectDelete} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onSelectDelete).toHaveBeenCalledTimes(1);
  });

  it("forwards a ref to the content element", async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent ref={ref}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await waitFor(() => expect(ref.current).toBeInstanceOf(HTMLDivElement));
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await screen.findByRole("menu");
    expect(await axe(container)).toHaveNoViolations();
  });
});
