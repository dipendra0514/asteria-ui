import { NewBadge } from "@/components/docs/new-badge";
import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import type { Node } from "fumadocs-core/page-tree";

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

// Sidebar "New" badge: pages opt in via `new: true` frontmatter (see
// source.config.ts's extended schema). Applied to the page tree once, here,
// rather than per-render in the layout — the tree is only built once anyway.
const newPageUrls = new Set(
  source.getPages().filter((page) => page.data.new).map((page) => page.url),
);

function withNewBadges(node: Node): Node {
  if (node.type === "page" && newPageUrls.has(node.url)) {
    return {
      ...node,
      name: (
        <span className="flex items-center gap-1.5">
          {node.name}
          <NewBadge />
        </span>
      ),
    };
  }
  if (node.type === "folder") {
    return { ...node, children: node.children.map(withNewBadges) };
  }
  return node;
}

source.pageTree.children = source.pageTree.children.map(withNewBadges);
