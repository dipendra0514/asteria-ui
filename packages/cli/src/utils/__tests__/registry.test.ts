import { describe, expect, it } from "vitest";
import {
  getRegistryItem,
  listRegistryNames,
  resolveComponents,
} from "../registry.js";

describe("registry", () => {
  it("lists every registry item by name", () => {
    const names = listRegistryNames();
    expect(names).toContain("button");
    expect(names).toContain("tabs");
    expect(names.length).toBeGreaterThanOrEqual(19);
  });

  it("looks up a single item by name", () => {
    const button = getRegistryItem("button");
    expect(button?.title).toBe("Button");
  });

  it("resolves a component with no registry dependencies to just itself", () => {
    const resolved = resolveComponents(["button"]);
    expect(resolved.items.map((i) => i.name)).toEqual(["button"]);
  });

  it("pulls in registryDependencies recursively and dedupes them", () => {
    const resolved = resolveComponents(["field"]);
    const names = resolved.items.map((i) => i.name);
    expect(names).toContain("input");
    expect(names).toContain("field");
    // input must come before field, since field composes it
    expect(names.indexOf("input")).toBeLessThan(names.indexOf("field"));
  });

  it("dedupes shared files and dependencies across multiple requested components", () => {
    const resolved = resolveComponents(["button", "input"]);
    const cnFiles = resolved.files.filter((f) => f.path === "lib/cn.ts");
    expect(cnFiles).toHaveLength(1);
    const clsxDeps = resolved.dependencies.filter((d) => d === "clsx");
    expect(clsxDeps).toHaveLength(1);
  });

  it("does not duplicate a component requested both directly and as a dependency", () => {
    const resolved = resolveComponents(["input", "field"]);
    expect(resolved.items.filter((i) => i.name === "input")).toHaveLength(1);
  });

  it("throws a clear error listing valid names when a component is unknown", () => {
    expect(() => resolveComponents(["not-a-real-component"])).toThrowError(
      /Unknown component\(s\): not-a-real-component/,
    );
  });
});
