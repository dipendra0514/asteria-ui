import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { ProgressBar } from "../progress-bar";

describe("ProgressBar", () => {
  it("renders with role=progressbar and the given accessible label", () => {
    render(<ProgressBar value={40} label="Uploading file" />);
    expect(
      screen.getByRole("progressbar", { name: "Uploading file" }),
    ).toBeInTheDocument();
  });

  it("reflects value/min/max via aria attributes", () => {
    render(<ProgressBar value={40} max={80} label="Uploading file" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "80");
  });

  it("renders the fill at the correct percentage width", () => {
    render(<ProgressBar value={30} max={100} label="Uploading file" />);
    const bar = screen.getByRole("progressbar");
    const fill = bar.firstChild as HTMLElement;
    expect(fill).toHaveStyle({ width: "30%" });
  });

  it("clamps the fill width to 100% when value exceeds max", () => {
    render(<ProgressBar value={150} max={100} label="Uploading file" />);
    const fill = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(fill).toHaveStyle({ width: "100%" });
  });

  it("clamps the fill width to 0% when value is negative", () => {
    render(<ProgressBar value={-10} max={100} label="Uploading file" />);
    const fill = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(fill).toHaveStyle({ width: "0%" });
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<ProgressBar value={40} label="Uploading file" className="mt-4" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveClass("mt-4");
    expect(bar).toHaveClass("bg-bg-tertiary");
  });

  it("forwards a ref to the underlying div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ProgressBar ref={ref} value={40} label="Uploading file" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations at 0%, partial, and 100% progress", async () => {
    const { container, rerender } = render(
      <ProgressBar value={0} label="Uploading file" />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(<ProgressBar value={50} label="Uploading file" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<ProgressBar value={100} label="Uploading file" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
