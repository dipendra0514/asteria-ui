import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export interface AsteriaConfig {
  $schema: string;
  aliases: {
    components: string;
    lib: string;
  };
  tailwind: {
    tokens: string;
    theme: string;
  };
}

export const CONFIG_FILE = "components.json";

export const DEFAULT_CONFIG: AsteriaConfig = {
  $schema: "https://asteria-ui.com/schema.json",
  aliases: {
    components: "components/ui",
    lib: "lib",
  },
  tailwind: {
    tokens: "styles/tokens.css",
    theme: "styles/theme.css",
  },
};

export function configPath(cwd: string): string {
  return join(cwd, CONFIG_FILE);
}

export function readConfig(cwd: string): AsteriaConfig | null {
  const path = configPath(cwd);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

export function writeConfig(cwd: string, config: AsteriaConfig): void {
  writeFileSync(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`);
}
