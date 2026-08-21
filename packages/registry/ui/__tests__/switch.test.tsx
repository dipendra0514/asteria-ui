import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Switch } from "../switch";

describe("Switch", () => {
  it("renders off by default", () => {
    render(<Switch label="Notifications" />);
    expect(
      screen.getByRole("switch", { name: "Notifications" }),
    ).not.toBeChecked();
  });

  it("toggles when clicked", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);
    const switchEl = screen.getByRole("switch", { name: "Notifications" });
    await user.click(switchEl);
    expect(switchEl).toBeChecked();
    await user.click(switchEl);
    expect(switchEl).not.toBeChecked();
  });

  it("toggles when the label is clicked", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);
    await user.click(screen.getByText("Notifications"));
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("toggles via the keyboard (Space)", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);
    const switchEl = screen.getByRole("switch");
    switchEl.focus();
    await user.keyboard("[Space]");
    expect(switchEl).toBeChecked();
  });

  it("calls onCheckedChange when toggled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("respects a controlled checked value", () => {
    render(<Switch label="Notifications" checked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("prevents toggling when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch
        label="Notifications"
        disabled
        onCheckedChange={onCheckedChange}
      />,
    );
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeDisabled();
    await user.click(switchEl);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("forwards a ref to the underlying control", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch ref={ref} label="Notifications" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("shows the focus-visible glow-focus shadow class", () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByRole("switch")).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("has no axe violations off, on, and disabled", async () => {
    const { container, rerender } = render(
      <Switch label="Notifications" checked={false} />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Switch label="Notifications" checked />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Switch label="Notifications" checked={false} disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
