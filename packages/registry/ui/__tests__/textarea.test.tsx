import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Textarea } from "../textarea";

describe("Textarea", () => {
  it("renders a multiline textbox and accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Bio" />);
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    await user.type(textarea, "Hello there");
    expect(textarea).toHaveValue("Hello there");
  });

  it("forwards a ref to the underlying <textarea>", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="Bio" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<Textarea className="mt-4" aria-label="Bio" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("mt-4");
    expect(textarea).toHaveClass("border-border-default");
  });

  it("is resizable via the native resize handle", () => {
    render(<Textarea aria-label="Bio" />);
    expect(screen.getByRole("textbox")).toHaveClass("resize-y");
  });

  it("sets aria-invalid when error is true", () => {
    render(<Textarea error aria-label="Bio" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid by default", () => {
    render(<Textarea aria-label="Bio" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("disables the textarea and blocks typing when disabled", async () => {
    const user = userEvent.setup();
    render(<Textarea disabled aria-label="Bio" />);
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea).toBeDisabled();
    await user.type(textarea, "Hello");
    expect(textarea).toHaveValue("");
  });

  it("shows the focus glow-focus shadow class", () => {
    render(<Textarea aria-label="Bio" />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "focus:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("has no axe violations across default, error, and disabled states", async () => {
    const { container, rerender } = render(<Textarea aria-label="Bio" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Textarea error aria-label="Bio" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Textarea disabled aria-label="Bio" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
