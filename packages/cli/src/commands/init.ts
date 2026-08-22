import { execSync } from "node:child_process";
import { join } from "node:path";
import { THEME_CSS, TOKENS_CSS } from "../generated/templates.js";
import { DEFAULT_CONFIG, readConfig, writeConfig } from "../utils/config.js";
import {
  detectPackageManager,
  installCommand,
} from "../utils/package-manager.js";
import { getComponentSource } from "../utils/registry.js";
import { writeFileSafe } from "../utils/write-file.js";

export interface InitOptions {
  cwd: string;
  force: boolean;
}

const INIT_DEPENDENCIES = [
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
];

export function runInit({ cwd, force }: InitOptions): void {
  const existing = readConfig(cwd);
  const config = existing ?? DEFAULT_CONFIG;

  if (!existing) {
    writeConfig(cwd, config);
    console.log("✔ Created components.json");
  } else {
    console.log("• components.json already exists, reusing its paths");
  }

  const results = [
    writeFileSafe(join(cwd, config.tailwind.tokens), TOKENS_CSS, force),
    writeFileSafe(join(cwd, config.tailwind.theme), THEME_CSS, force),
    writeFileSafe(
      join(cwd, config.aliases.lib, "cn.ts"),
      getComponentSource("lib/cn.ts"),
      force,
    ),
  ];

  for (const result of results) {
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

  const manager = detectPackageManager(cwd);
  console.log(
    `\nInstalling ${INIT_DEPENDENCIES.join(", ")} with ${manager}...`,
  );
  execSync(installCommand(manager, INIT_DEPENDENCIES), {
    cwd,
    stdio: "inherit",
  });

  console.log(
    "\nDone. Add your first component with:\n  npx asteria-ui add button",
  );
}
