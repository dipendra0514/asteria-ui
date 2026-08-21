import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders an unchecked checkbox by default", () => {
    render(<Checkbox label="Accept terms" />);
    expect(
      screen.getByRole("checkbox", { name: "Accept terms" }),
    ).not.toBeChecked();
  });

  it("toggles when clicked (uncontrolled)", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("toggles when the label is clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    await user.click(screen.getByText("Accept terms"));
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("toggles via the keyboard (Space)", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox");
    checkbox.focus();
    await user.keyboard("[Space]");
    expect(checkbox).toBeChecked();
  });

  it("calls onCheckedChange when toggled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept terms" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("renders aria-checked=mixed for the indeterminate state", () => {
    render(<Checkbox label="Select all" checked="indeterminate" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "mixed",
    );
  });

  it("prevents toggling when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox
        label="Accept terms"
        disabled
        onCheckedChange={onCheckedChange}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    await user.click(checkbox);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("forwards a ref to the underlying control", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} label="Accept terms" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("shows the focus-visible glow-focus shadow class", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole("checkbox")).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("has no axe violations across unchecked, checked, indeterminate, and disabled", async () => {
    const { container, rerender } = render(
      <Checkbox label="Accept terms" checked={false} />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Checkbox label="Accept terms" checked />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Checkbox label="Accept terms" checked="indeterminate" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Checkbox label="Accept terms" checked={false} disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
