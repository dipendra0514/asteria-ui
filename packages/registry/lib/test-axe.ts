import { configureAxe } from "vitest-axe";

// jsdom has no real layout/paint engine, so color-contrast results are meaningless noise there.
export const axe = configureAxe({
  rules: { "color-contrast": { enabled: false } },
});
