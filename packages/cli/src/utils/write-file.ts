import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export interface WriteResult {
  path: string;
  status: "written" | "skipped-exists" | "overwritten";
}

/**
 * Writes a file, refusing to clobber local edits unless `force` is set —
 * `init`/`add` should never silently overwrite a file the user may have
 * customized.
 */
export function writeFileSafe(
  path: string,
  content: string,
  force: boolean,
): WriteResult {
  const exists = existsSync(path);
  if (exists && !force) {
    return { path, status: "skipped-exists" };
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  return { path, status: exists ? "overwritten" : "written" };
}
