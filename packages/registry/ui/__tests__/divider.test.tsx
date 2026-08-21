import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Divider } from "../divider";

describe("Divider", () => {
  it("renders with role=separator", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("does not set aria-orientation for the default horizontal orientation", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).not.toHaveAttribute(
      "aria-orientation",
    );
  });

  it("sets aria-orientation=vertical for a vertical divider", () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("renders as a plain line with no label", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toHaveClass("h-px", "w-full");
  });

  it("renders a label between two line segments when given one", () => {
    render(<Divider label="OR" />);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<Divider className="mt-4" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("mt-4");
    expect(divider).toHaveClass("bg-border-default");
  });

  it("forwards a ref to the underlying div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations across plain, labeled, and vertical variants", async () => {
    const { container, rerender } = render(<Divider />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Divider label="OR" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Divider orientation="vertical" label="OR" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
