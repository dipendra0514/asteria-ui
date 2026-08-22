"use client";

import { Button } from "@asteria-ui/registry/ui/button";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";

export function SearchTrigger() {
  const { setOpenSearch } = useSearchContext();

  return (
    <Button
      variant="secondary"
      size="sm"
      leadingIcon={<Search />}
      onClick={() => setOpenSearch(true)}
      aria-label="Search"
    >
      Search
    </Button>
  );
}
