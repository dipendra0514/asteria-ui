import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";

// fumadocs-mdx@11.10 returns `files` as a lazy function; fumadocs-core@15.8
// expects an array. Bridge at runtime, keep the MDX Source type for inference.
const generated = docs.toFumadocsSource();
const files =
  typeof generated.files === "function"
    ? (generated.files as unknown as () => (typeof generated)["files"])()
    : generated.files;

export const source = loader({
  baseUrl: "/docs",
  source: { files } as typeof generated,
});
