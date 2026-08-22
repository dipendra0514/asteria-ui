import { execSync } from "node:child_process";
import { basename, join } from "node:path";
import { readConfig } from "../utils/config.js";
import {
  detectPackageManager,
  installCommand,
} from "../utils/package-manager.js";
import {
  type RegistryFile,
  getComponentSource,
  resolveComponents,
} from "../utils/registry.js";
import { writeFileSafe } from "../utils/write-file.js";

export interface AddOptions {
  cwd: string;
  force: boolean;
}

function destinationFor(
  file: RegistryFile,
  cwd: string,
  aliases: { components: string; lib: string },
): string {
  const dir = file.type === "registry:lib" ? aliases.lib : aliases.components;
  return join(cwd, dir, basename(file.path));
}

export function runAdd(names: string[], { cwd, force }: AddOptions): void {
  const config = readConfig(cwd);
  if (!config) {
    console.error("No components.json found. Run `npx asteria-ui init` first.");
    process.exitCode = 1;
    return;
  }

  let resolved: ReturnType<typeof resolveComponents>;
  try {
    resolved = resolveComponents(names);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
    return;
  }

  const requested = new Set(names);
  const pulledIn = resolved.items.filter((item) => !requested.has(item.name));

  console.log(`Adding: ${resolved.items.map((item) => item.name).join(", ")}`);
  if (pulledIn.length > 0) {
    console.log(
      `  (pulled in as dependencies: ${pulledIn.map((item) => item.name).join(", ")})`,
    );
  }

  for (const file of resolved.files) {
    const dest = destinationFor(file, cwd, config.aliases);
    const result = writeFileSafe(dest, getComponentSource(file.path), force);
    if (result.status === "skipped-exists") {
      console.log(
        `• ${result.path} already exists, skipping (use --force to overwrite)`,
      );
    } else {
      console.log(
        `✔ ${result.status === "overwritten" ? "Overwrote" : "Wrote"} ${result.path}`,
      );
    }
  }

  if (resolved.dependencies.length > 0) {
    const manager = detectPackageManager(cwd);
    console.log(
      `\nInstalling ${resolved.dependencies.join(", ")} with ${manager}...`,
    );
    execSync(installCommand(manager, resolved.dependencies), {
      cwd,
      stdio: "inherit",
    });
  }

  console.log("\nDone.");
}
