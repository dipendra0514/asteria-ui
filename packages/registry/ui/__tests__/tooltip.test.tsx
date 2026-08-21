import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

function BasicTooltip() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Helpful info</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("is not visible until triggered", () => {
    render(<BasicTooltip />);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows on hover", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Helpful info",
    );
  });

  it("shows on focus", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Helpful info",
    );
  });

  it("dismisses on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  });

  it("links the trigger to the tooltip content via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    const tooltip = await screen.findByRole("tooltip");
    const trigger = screen.getByText("Hover me");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("forwards a ref to the underlying content element", async () => {
    const ref = React.createRef<HTMLDivElement>();
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent ref={ref}>Helpful info</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(ref.current).toBeInstanceOf(HTMLDivElement));
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    expect(await axe(container)).toHaveNoViolations();
  });
});
