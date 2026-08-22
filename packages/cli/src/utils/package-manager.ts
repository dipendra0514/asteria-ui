import { existsSync } from "node:fs";
import { join } from "node:path";

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

const LOCKFILES: Record<string, PackageManager> = {
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "bun.lockb": "bun",
  "package-lock.json": "npm",
};

/** Detects the target project's package manager from its lockfile, defaulting to npm. */
export function detectPackageManager(cwd: string): PackageManager {
  for (const [lockfile, manager] of Object.entries(LOCKFILES)) {
    if (existsSync(join(cwd, lockfile))) return manager;
  }
  return "npm";
}

export function installCommand(
  manager: PackageManager,
  packages: string[],
): string {
  const list = packages.join(" ");
  switch (manager) {
    case "pnpm":
      return `pnpm add ${list}`;
    case "yarn":
      return `yarn add ${list}`;
    case "bun":
      return `bun add ${list}`;
    default:
      return `npm install ${list}`;
  }
}
