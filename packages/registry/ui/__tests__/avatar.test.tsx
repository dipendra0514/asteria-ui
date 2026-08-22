import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Avatar, AvatarAddButton, AvatarGroup } from "../avatar";

describe("Avatar", () => {
  it("uses alt text as the accessible name when no status is set", () => {
    render(<Avatar alt="Jane Doe" />);
    expect(screen.getByRole("img", { name: "Jane Doe" })).toBeInTheDocument();
  });

  it("suffixes the accessible name with status when present", () => {
    render(<Avatar alt="Jane Doe" status="online" />);
    expect(
      screen.getByRole("img", { name: "Jane Doe, online" }),
    ).toBeInTheDocument();
  });

  it("derives initials from alt text when no image or initials are given", () => {
    render(<Avatar alt="Jane Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("prefers explicit initials over alt-derived ones", () => {
    render(<Avatar alt="Jane Doe" initials="XY" />);
    expect(screen.getByText("XY")).toBeInTheDocument();
  });

  it("renders the image when src is provided", () => {
    render(<Avatar src="https://example.com/jane.png" alt="Jane Doe" />);
    const image = document.querySelector("img");
    expect(image).toHaveAttribute("src", "https://example.com/jane.png");
  });

  it("falls back to initials when the image fails to load", () => {
    render(<Avatar src="https://example.com/broken.png" alt="Jane Doe" />);
    const image = document.querySelector("img") as HTMLImageElement;
    fireEvent.error(image);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("forwards a ref to the underlying span", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} alt="Jane Doe" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no axe violations with an image, initials fallback, or a status dot", async () => {
    const { container, rerender } = render(<Avatar alt="Jane Doe" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Avatar alt="Jane Doe" status="online" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Avatar src="https://example.com/jane.png" alt="Jane Doe" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("AvatarGroup", () => {
  it("renders every avatar when under the max", () => {
    render(
      <AvatarGroup max={4}>
        <Avatar alt="Ann" />
        <Avatar alt="Bo" />
      </AvatarGroup>,
    );
    expect(screen.getByRole("img", { name: "Ann" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Bo" })).toBeInTheDocument();
  });

  it("collapses avatars past max into a labeled overflow indicator", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar alt="Ann" />
        <Avatar alt="Bo" />
        <Avatar alt="Cy" />
        <Avatar alt="Di" />
      </AvatarGroup>,
    );
    expect(screen.getByRole("img", { name: "Ann" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Bo" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Cy" })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "2 more" })).toBeInTheDocument();
  });

  it("has no axe violations with an overflow indicator present", async () => {
    const { container } = render(
      <AvatarGroup max={1}>
        <Avatar alt="Ann" />
        <Avatar alt="Bo" />
      </AvatarGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("AvatarAddButton", () => {
  it("has an accessible name of 'Add' by default", () => {
    render(<AvatarAddButton />);
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(<AvatarAddButton aria-label="Add member" />);
    expect(
      screen.getByRole("button", { name: "Add member" }),
    ).toBeInTheDocument();
  });

  it("hides the + glyph from assistive tech", () => {
    render(<AvatarAddButton />);
    expect(screen.getByText("+")).toHaveAttribute("aria-hidden", "true");
  });

  it("calls onClick when activated", () => {
    const onClick = vi.fn();
    render(<AvatarAddButton onClick={onClick} />);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("defaults to type=button so it never submits a surrounding form", () => {
    render(<AvatarAddButton />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("forwards a ref to the underlying button", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<AvatarAddButton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has no axe violations at any size", async () => {
    const { container, rerender } = render(<AvatarAddButton size="md" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<AvatarAddButton size="lg" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<AvatarAddButton size="xl" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
