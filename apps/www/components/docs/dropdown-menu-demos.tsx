"use client";

import { Button } from "@asteria-ui/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@asteria-ui/registry/ui/dropdown-menu";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { ComponentPlayground } from "./component-playground";

export function DropdownMenuHero() {
  return (
    <ComponentPlayground
      code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Open menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem leadingIcon={<Pencil />}>Edit</DropdownMenuItem>
    <DropdownMenuItem leadingIcon={<Copy />} shortcut="⌘D">
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuItem leadingIcon={<Trash2 />} destructive>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem leadingIcon={<Pencil />}>Edit</DropdownMenuItem>
          <DropdownMenuItem leadingIcon={<Copy />} shortcut="⌘D">
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem leadingIcon={<Trash2 />} destructive>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ComponentPlayground>
  );
}
