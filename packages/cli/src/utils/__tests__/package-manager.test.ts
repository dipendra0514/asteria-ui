import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { detectPackageManager, installCommand } from "../package-manager.js";

describe("detectPackageManager", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "asteria-cli-pm-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("defaults to npm when no lockfile is present", () => {
    expect(detectPackageManager(dir)).toBe("npm");
  });

  it("detects pnpm from pnpm-lock.yaml", () => {
    writeFileSync(join(dir, "pnpm-lock.yaml"), "");
    expect(detectPackageManager(dir)).toBe("pnpm");
  });

  it("detects yarn from yarn.lock", () => {
    writeFileSync(join(dir, "yarn.lock"), "");
    expect(detectPackageManager(dir)).toBe("yarn");
  });

  it("detects bun from bun.lockb", () => {
    writeFileSync(join(dir, "bun.lockb"), "");
    expect(detectPackageManager(dir)).toBe("bun");
  });
});

describe("installCommand", () => {
  it("builds the right install invocation per package manager", () => {
    expect(installCommand("pnpm", ["clsx"])).toBe("pnpm add clsx");
    expect(installCommand("yarn", ["clsx"])).toBe("yarn add clsx");
    expect(installCommand("bun", ["clsx"])).toBe("bun add clsx");
    expect(installCommand("npm", ["clsx", "tailwind-merge"])).toBe(
      "npm install clsx tailwind-merge",
    );
  });
});
