import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, readConfig, writeConfig } from "../config.js";

describe("config", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "asteria-cli-config-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("returns null when no components.json exists", () => {
    expect(readConfig(dir)).toBeNull();
  });

  it("round-trips a written config", () => {
    writeConfig(dir, DEFAULT_CONFIG);
    expect(readConfig(dir)).toEqual(DEFAULT_CONFIG);
  });
});
