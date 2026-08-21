import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "✦ Asteria UI",
  },
  links: [
    { text: "Docs", url: "/docs", active: "nested-url" },
    {
      text: "Components",
      url: "/docs/components/avatar",
      active: "nested-url",
    },
    // TODO: real repo URL
    {
      text: "GitHub",
      url: "https://github.com/asteria-ui/asteria-ui",
      external: true,
    },
  ],
};
