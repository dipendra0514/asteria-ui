import { COMPONENT_SOURCES, REGISTRY } from "../generated/templates.js";

export interface RegistryFile {
  path: string;
  type: "registry:ui" | "registry:lib";
}

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: readonly string[];
  registryDependencies: readonly string[];
  files: readonly RegistryFile[];
}

const ITEMS_BY_NAME = new Map<string, RegistryItem>(
  (REGISTRY.items as unknown as RegistryItem[]).map((item) => [
    item.name,
    item,
  ]),
);

export function getRegistryItem(name: string): RegistryItem | undefined {
  return ITEMS_BY_NAME.get(name);
}

export function listRegistryNames(): string[] {
  return [...ITEMS_BY_NAME.keys()];
}

export function getComponentSource(path: string): string {
  const source = COMPONENT_SOURCES[path];
  if (source === undefined) {
    throw new Error(`No embedded source found for registry file "${path}".`);
  }
  return source;
}

export interface ResolvedComponents {
  items: RegistryItem[];
  files: RegistryFile[];
  dependencies: string[];
}

/** Resolves component names plus their registryDependencies (recursively), deduped. */
export function resolveComponents(names: string[]): ResolvedComponents {
  const items: RegistryItem[] = [];
  const seenNames = new Set<string>();
  const notFound: string[] = [];

  function visit(name: string) {
    if (seenNames.has(name)) return;
    const item = getRegistryItem(name);
    if (!item) {
      notFound.push(name);
      return;
    }
    seenNames.add(name);
    for (const dep of item.registryDependencies) visit(dep);
    items.push(item);
  }

  for (const name of names) visit(name);

  if (notFound.length > 0) {
    throw new Error(
      `Unknown component(s): ${notFound.join(", ")}. Available: ${listRegistryNames().join(", ")}`,
    );
  }

  const files = dedupeBy(
    items.flatMap((item) => item.files),
    (file) => file.path,
  );
  const dependencies = [
    ...new Set(items.flatMap((item) => item.dependencies)),
  ].sort();

  return { items, files, dependencies };
}

function dedupeBy<T>(list: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of list) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    result.push(item);
  }
  return result;
}
