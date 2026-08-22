import { SearchTrigger } from "@/components/docs/search-trigger";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "✦ Asteria UI",
  },
  searchToggle: {
    components: {
      sm: <SearchTrigger />,
      lg: <SearchTrigger />,
    },
  },
  links: [
    { text: "Docs", url: "/docs", active: "nested-url" },
    {
      text: "Components",
      url: "/docs/components/avatar",
      active: "nested-url",
    },
    {
      text: "GitHub",
      url: "https://github.com/dipendra0514/asteria-ui",
      external: true,
    },
  ],
};
