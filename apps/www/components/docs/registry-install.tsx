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

export function ButtonInstall() {
  return (
    <RegistryInstall
      name="button"
      files={["ui/button.tsx", "lib/cn.ts", "lib/with-icon-size.tsx"]}
    />
  );
}

export function BadgeInstall() {
  return <RegistryInstall name="badge" files={["ui/badge.tsx", "lib/cn.ts"]} />;
}

export function InputInstall() {
  return (
    <RegistryInstall
      name="input"
      files={["ui/input.tsx", "lib/cn.ts", "lib/with-icon-size.tsx"]}
    />
  );
}

export function FieldInstall() {
  return <RegistryInstall name="field" files={["ui/field.tsx", "lib/cn.ts"]} />;
}

export function TextareaInstall() {
  return (
    <RegistryInstall name="textarea" files={["ui/textarea.tsx", "lib/cn.ts"]} />
  );
}

export function CheckboxInstall() {
  return (
    <RegistryInstall name="checkbox" files={["ui/checkbox.tsx", "lib/cn.ts"]} />
  );
}

export function RadioGroupInstall() {
  return (
    <RegistryInstall name="radio-group" files={["ui/radio-group.tsx", "lib/cn.ts"]} />
  );
}

export function SwitchInstall() {
  return <RegistryInstall name="switch" files={["ui/switch.tsx", "lib/cn.ts"]} />;
}

export function AlertInstall() {
  return <RegistryInstall name="alert" files={["ui/alert.tsx", "lib/cn.ts"]} />;
}

export function SpinnerInstall() {
  return <RegistryInstall name="spinner" files={["ui/spinner.tsx", "lib/cn.ts"]} />;
}

export function DividerInstall() {
  return <RegistryInstall name="divider" files={["ui/divider.tsx", "lib/cn.ts"]} />;
}

export function SkeletonInstall() {
  return <RegistryInstall name="skeleton" files={["ui/skeleton.tsx", "lib/cn.ts"]} />;
}

export function ProgressBarInstall() {
  return (
    <RegistryInstall name="progress-bar" files={["ui/progress-bar.tsx", "lib/cn.ts"]} />
  );
}

export function BreadcrumbsInstall() {
  return (
    <RegistryInstall name="breadcrumbs" files={["ui/breadcrumbs.tsx", "lib/cn.ts"]} />
  );
}

export function TooltipInstall() {
  return <RegistryInstall name="tooltip" files={["ui/tooltip.tsx", "lib/cn.ts"]} />;
}

export function DropdownMenuInstall() {
  return (
    <RegistryInstall
      name="dropdown-menu"
      files={["ui/dropdown-menu.tsx", "lib/cn.ts", "lib/with-icon-size.tsx"]}
    />
  );
}

export function ModalInstall() {
  return <RegistryInstall name="modal" files={["ui/modal.tsx", "lib/cn.ts"]} />;
}

export function TabsInstall() {
  return <RegistryInstall name="tabs" files={["ui/tabs.tsx", "lib/cn.ts"]} />;
}
