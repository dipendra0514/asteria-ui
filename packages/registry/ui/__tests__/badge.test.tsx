import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders its label with role=status", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByRole("status")).toHaveTextContent("New");
  });

  it("forwards a ref to the underlying element", () => {
    const ref = React.createRef<HTMLOutputElement>();
    render(<Badge ref={ref}>New</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLOutputElement);
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<Badge className="mt-4">New</Badge>);
    const badge = screen.getByRole("status");
    expect(badge).toHaveClass("mt-4");
    expect(badge).toHaveClass("bg-bg-secondary");
  });

  it("renders a decorative status dot that is hidden from screen readers", () => {
    render(<Badge showDot>Active</Badge>);
    const dot = screen
      .getByRole("status")
      .querySelector("[aria-hidden='true']");
    expect(dot).toBeInTheDocument();
  });

  it("does not render a dismiss button by default", () => {
    render(<Badge>Static</Badge>);
    expect(
      screen.queryByRole("button", { name: "Remove" }),
    ).not.toBeInTheDocument();
  });

  it("renders a dismiss button with aria-label Remove and calls onDismiss when activated", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge dismissible onDismiss={onDismiss}>
        Removable
      </Badge>,
    );
    const dismiss = screen.getByRole("button", { name: "Remove" });
    await user.click(dismiss);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("activates the dismiss button via keyboard", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge dismissible onDismiss={onDismiss}>
        Removable
      </Badge>,
    );
    screen.getByRole("button", { name: "Remove" }).focus();
    await user.keyboard("{Enter}");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("shows the focus-visible glow-focus shadow class on the dismiss button", () => {
    render(<Badge dismissible>Removable</Badge>);
    expect(screen.getByRole("button", { name: "Remove" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("has no axe violations across default, dot, and dismissible states", async () => {
    const { container, rerender } = render(<Badge>Default</Badge>);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Badge showDot>With dot</Badge>);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Badge dismissible>Dismissible</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
