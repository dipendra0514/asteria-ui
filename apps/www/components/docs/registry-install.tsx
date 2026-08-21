import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { InstallTabs } from "./install-tabs";

function resolveRegistryRoot() {
  const candidates = [
    join(process.cwd(), "../../packages/registry"),
    join(process.cwd(), "packages/registry"),
  ];
  const match = candidates.find((dir) =>
    existsSync(join(dir, "ui/avatar.tsx")),
  );
  if (!match) {
    throw new Error(
      `Could not find packages/registry. Tried:\n${candidates.join("\n")}`,
    );
  }
  return match;
}

export function RegistryInstall({
  name,
  files,
}: {
  name: string;
  files: string[];
}) {
  const root = resolveRegistryRoot();
  const manual = files
    .map((file) => {
      const source = readFileSync(join(root, file), "utf8");
      return `// ${file}\n${source.trimEnd()}`;
    })
    .join("\n\n");

  return <InstallTabs name={name} manual={manual} />;
}

export function AvatarInstall() {
  return (
    <RegistryInstall name="avatar" files={["ui/avatar.tsx", "lib/cn.ts"]} />
  );
}
