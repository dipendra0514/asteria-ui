#!/usr/bin/env node
import { Command } from "commander";
import { runAdd } from "./commands/add.js";
import { runInit } from "./commands/init.js";
import { listRegistryNames } from "./utils/registry.js";

function runSafely(fn: () => void): void {
  try {
    fn();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

const program = new Command();

program
  .name("asteria-ui")
  .description("shadcn-style copy-paste CLI for Asteria UI")
  .version("0.0.0");

program
  .command("init")
  .description(
    "write tokens.css, theme.css, cn(), and install core dependencies",
  )
  .option("--cwd <path>", "target directory", process.cwd())
  .option("--force", "overwrite existing files", false)
  .action((options: { cwd: string; force: boolean }) => {
    runSafely(() => runInit(options));
  });

program
  .command("add")
  .description("copy one or more components into your project")
  .argument(
    "<components...>",
    `component name(s), e.g. button. Available: ${listRegistryNames().join(", ")}`,
  )
  .option("--cwd <path>", "target directory", process.cwd())
  .option("--force", "overwrite existing files", false)
  .action((components: string[], options: { cwd: string; force: boolean }) => {
    runSafely(() => runAdd(components, options));
  });

program.parse();
