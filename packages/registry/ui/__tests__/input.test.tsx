import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Input } from "../input";

describe("Input", () => {
  it("renders a textbox and accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Email" placeholder="you@example.com" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("forwards a ref to the underlying <input>", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Email" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("forwards a wrapperRef to the bordered wrapper", () => {
    const wrapperRef = React.createRef<HTMLDivElement>();
    render(<Input wrapperRef={wrapperRef} aria-label="Email" />);
    expect(wrapperRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges a custom className onto the wrapper without dropping variant classes", () => {
    render(<Input className="mt-4" aria-label="Email" />);
    const wrapper = screen.getByRole("textbox").parentElement;
    expect(wrapper).toHaveClass("mt-4");
    expect(wrapper).toHaveClass("border-border-default");
  });

  it("sets aria-invalid when error is true", () => {
    render(<Input error aria-label="Email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid by default", () => {
    render(<Input aria-label="Email" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("disables the input and blocks typing when disabled", async () => {
    const user = userEvent.setup();
    render(<Input disabled aria-label="Email" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toBeDisabled();
    await user.type(input, "hello");
    expect(input).toHaveValue("");
  });

  it("renders leadingIcon and trailingIcon slots, sized to the input's size and hidden from AT", () => {
    render(
      <Input
        size="lg"
        leadingIcon={<svg data-testid="leading" />}
        trailingIcon={<svg data-testid="trailing" />}
        aria-label="Search"
      />,
    );
    expect(screen.getByTestId("leading")).toHaveClass("size-5");
    expect(screen.getByTestId("leading")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByTestId("trailing")).toHaveClass("size-5");
    expect(screen.getByTestId("trailing")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("shows the focus-within glow-focus shadow class on the wrapper", () => {
    render(<Input aria-label="Email" />);
    const wrapper = screen.getByRole("textbox").parentElement;
    expect(wrapper).toHaveClass(
      "focus-within:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("has no axe violations across default, error, and disabled states", async () => {
    const { container, rerender } = render(<Input aria-label="Email" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Input error aria-label="Email" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Input disabled aria-label="Email" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
