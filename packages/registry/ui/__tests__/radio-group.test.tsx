import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { RadioGroup, RadioGroupItem } from "../radio-group";

function BasicGroup(props: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup aria-label="Plan" {...props}>
      <RadioGroupItem value="free" label="Free" />
      <RadioGroupItem value="pro" label="Pro" />
      <RadioGroupItem value="enterprise" label="Enterprise" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("renders a radiogroup with three radio options", () => {
    render(<BasicGroup />);
    expect(
      screen.getByRole("radiogroup", { name: "Plan" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("selects an option when clicked", async () => {
    const user = userEvent.setup();
    render(<BasicGroup />);
    await user.click(screen.getByRole("radio", { name: "Pro" }));
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
  });

  it("selects an option when its label is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicGroup />);
    await user.click(screen.getByText("Enterprise"));
    expect(screen.getByRole("radio", { name: "Enterprise" })).toBeChecked();
  });

  it("moves roving focus between options with arrow keys, and Space selects the focused one", async () => {
    const user = userEvent.setup();
    render(<BasicGroup />);
    screen.getByRole("radio", { name: "Free" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveFocus();
    await user.keyboard("[Space]");
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("calls onValueChange when a new option is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicGroup onValueChange={onValueChange} />);
    await user.click(screen.getByRole("radio", { name: "Pro" }));
    expect(onValueChange).toHaveBeenCalledWith("pro");
  });

  it("respects a controlled value", () => {
    render(<BasicGroup value="pro" />);
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("prevents selection when the whole group is disabled", async () => {
    const user = userEvent.setup();
    render(<BasicGroup disabled />);
    const proRadio = screen.getByRole("radio", { name: "Pro" });
    expect(proRadio).toBeDisabled();
    await user.click(proRadio);
    expect(proRadio).not.toBeChecked();
  });

  it("shows the focus-visible glow-focus shadow class on each item", () => {
    render(<BasicGroup />);
    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toHaveClass(
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
      );
    }
  });

  it("forwards a ref to the underlying item control", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <RadioGroup aria-label="Plan">
        <RadioGroupItem ref={ref} value="free" label="Free" />
      </RadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has no axe violations unselected, selected, and disabled", async () => {
    const { container, rerender } = render(<BasicGroup value="" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<BasicGroup value="pro" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<BasicGroup value="pro" disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
