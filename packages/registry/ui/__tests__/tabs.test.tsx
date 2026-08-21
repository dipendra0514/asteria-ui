import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

function BasicTabs(props: { variant?: "underline" | "pill" }) {
  return (
    <Tabs defaultValue="account">
      <TabsList variant={props.variant} aria-label="Settings">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team" disabled>
          Team
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="billing">Billing settings</TabsContent>
      <TabsContent value="team">Team settings</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders a tablist with three tabs and shows the default panel", () => {
    render(<BasicTabs />);
    expect(
      screen.getByRole("tablist", { name: "Settings" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Account settings");
  });

  it("marks the active tab with aria-selected", () => {
    render(<BasicTabs />);
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("links each tab to its panel via aria-controls", () => {
    render(<BasicTabs />);
    const tab = screen.getByRole("tab", { name: "Account" });
    const panel = screen.getByRole("tabpanel");
    expect(tab).toHaveAttribute("aria-controls", panel.id);
  });

  it("switches panels when a tab is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    await user.click(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Billing settings");
  });

  it("navigates between tabs with arrow keys", async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    screen.getByRole("tab", { name: "Account" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Billing settings");
  });

  it("disables a tab and skips it during interaction", () => {
    render(<BasicTabs />);
    expect(screen.getByRole("tab", { name: "Team" })).toHaveAttribute(
      "data-disabled",
    );
  });

  it("shows the focus-visible glow-focus shadow class on triggers", () => {
    render(<BasicTabs />);
    expect(screen.getByRole("tab", { name: "Account" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("applies pill-variant classes when variant=pill", () => {
    render(<BasicTabs variant="pill" />);
    expect(screen.getByRole("tab", { name: "Account" })).toHaveClass(
      "rounded-full",
    );
  });

  it("forwards a ref to the underlying trigger", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Example">
          <TabsTrigger ref={ref} value="a">
            A
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">A content</TabsContent>
      </Tabs>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has no axe violations for underline and pill variants", async () => {
    const { container, rerender } = render(<BasicTabs variant="underline" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<BasicTabs variant="pill" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
