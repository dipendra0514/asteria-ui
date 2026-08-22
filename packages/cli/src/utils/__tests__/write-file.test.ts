import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { writeFileSafe } from "../write-file.js";

describe("writeFileSafe", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "asteria-cli-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("writes a new file and creates parent directories", () => {
    const path = join(dir, "nested", "file.ts");
    const result = writeFileSafe(path, "hello", false);
    expect(result.status).toBe("written");
    expect(readFileSync(path, "utf8")).toBe("hello");
  });

  it("skips an existing file when force is false", () => {
    const path = join(dir, "file.ts");
    writeFileSafe(path, "original", false);
    const result = writeFileSafe(path, "new content", false);
    expect(result.status).toBe("skipped-exists");
    expect(readFileSync(path, "utf8")).toBe("original");
  });

  it("overwrites an existing file when force is true", () => {
    const path = join(dir, "file.ts");
    writeFileSafe(path, "original", false);
    const result = writeFileSafe(path, "new content", true);
    expect(result.status).toBe("overwritten");
    expect(readFileSync(path, "utf8")).toBe("new content");
  });
});
