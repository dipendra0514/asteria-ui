import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { BreadcrumbItem, Breadcrumbs } from "../breadcrumbs";

function BasicTrail() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
      <BreadcrumbItem current>Installation</BreadcrumbItem>
    </Breadcrumbs>
  );
}

describe("Breadcrumbs", () => {
  it("renders a nav with an accessible label of Breadcrumb", () => {
    render(<BasicTrail />);
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });

  it("renders each item as a link, except the current page", () => {
    render(<BasicTrail />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(
      screen.queryByRole("link", { name: "Installation" }),
    ).not.toBeInTheDocument();
  });

  it("marks the current page with aria-current=page", () => {
    render(<BasicTrail />);
    const current = screen.getByText("Installation").closest("li");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders separators that are hidden from assistive technology", () => {
    render(<BasicTrail />);
    const nav = screen.getByRole("navigation");
    const hiddenSeparators = nav.querySelectorAll("li[aria-hidden='true']");
    expect(hiddenSeparators).toHaveLength(2);
  });

  it("does not render a trailing separator after the last item", () => {
    render(<BasicTrail />);
    const list = screen.getByRole("navigation").querySelector("ol");
    const separators = list?.querySelectorAll("li[aria-hidden='true']") ?? [];
    expect(separators).toHaveLength(2);
  });

  it("shows the focus-visible glow-focus shadow class on link items", () => {
    render(<BasicTrail />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("forwards a ref to the underlying anchor", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Breadcrumbs>
        <BreadcrumbItem ref={ref} href="/">
          Home
        </BreadcrumbItem>
      </Breadcrumbs>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("has no axe violations for a full trail", async () => {
    const { container } = render(<BasicTrail />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
