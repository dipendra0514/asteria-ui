import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";

expect.extend(matchers);

// jsdom has no ResizeObserver — Radix's overlay primitives (Tooltip's Arrow sizing,
// Popover/Select positioning, etc.) construct one on mount, so every Radix-based
// overlay test needs this stub.
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
