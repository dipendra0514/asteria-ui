import { render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("is hidden from assistive technology", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("defaults to the text variant with a fixed line height", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("h-4", "w-full");
  });

  it("renders a circle variant with rounded-full", () => {
    const { container } = render(
      <Skeleton variant="circle" className="size-12" />,
    );
    expect(container.firstChild).toHaveClass("rounded-full", "size-12");
  });

  it("renders a rect variant with rounded-sm", () => {
    const { container } = render(
      <Skeleton variant="rect" className="h-24 w-full" />,
    );
    expect(container.firstChild).toHaveClass("rounded-sm");
  });

  it("is animated via animate-pulse", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("forwards a ref to the underlying div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations across all three variants", async () => {
    const { container, rerender } = render(<Skeleton variant="text" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Skeleton variant="circle" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Skeleton variant="rect" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
