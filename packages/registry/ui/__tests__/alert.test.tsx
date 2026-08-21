import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Alert } from "../alert";

describe("Alert", () => {
  it("renders title and description", () => {
    render(<Alert title="Heads up" description="Something happened." />);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("Something happened.")).toBeInTheDocument();
  });

  it("uses role=status for info and success (polite, non-interrupting)", () => {
    const { rerender } = render(<Alert variant="info" title="Info" />);
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(<Alert variant="success" title="Success" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses role=alert for warning and error (assertive, interrupting)", () => {
    const { rerender } = render(<Alert variant="warning" title="Warning" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(<Alert variant="error" title="Error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not render an action button by default", () => {
    render(<Alert title="Heads up" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders an action button and calls onAction when clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<Alert title="Heads up" actionLabel="Undo" onAction={onAction} />);
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders a dismiss button with aria-label Dismiss and calls onDismiss when clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert title="Heads up" dismissible onDismiss={onDismiss} />);
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("forwards a ref to the underlying div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref} title="Heads up" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations across all four variants, with action and dismiss", async () => {
    const { container, rerender } = render(
      <Alert
        variant="info"
        title="Heads up"
        description="Details."
        actionLabel="Undo"
        dismissible
      />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Alert
        variant="success"
        title="Heads up"
        description="Details."
        actionLabel="Undo"
        dismissible
      />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Alert
        variant="warning"
        title="Heads up"
        description="Details."
        actionLabel="Undo"
        dismissible
      />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Alert
        variant="error"
        title="Heads up"
        description="Details."
        actionLabel="Undo"
        dismissible
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
