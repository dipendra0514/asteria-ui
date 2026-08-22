"use client";

import { Button } from "@asteria-ui/registry/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@asteria-ui/registry/ui/tabs";
import * as React from "react";
import { Moon, Sun } from "lucide-react";

export function ComponentPlayground({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  const [previewTheme, setPreviewTheme] = React.useState<"dark" | "light">(
    "dark",
  );

  return (
    <Tabs
      defaultValue="preview"
      className="not-prose my-6 overflow-hidden rounded-lg border border-border-default bg-bg-secondary"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border-default px-3 py-2">
        <TabsList variant="pill">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Light preview"
            aria-pressed={previewTheme === "light"}
            onClick={() => setPreviewTheme("light")}
            className={
              previewTheme === "light" ? "bg-bg-tertiary" : undefined
            }
          >
            <Sun className="size-4" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Dark preview"
            aria-pressed={previewTheme === "dark"}
            onClick={() => setPreviewTheme("dark")}
            className={previewTheme === "dark" ? "bg-bg-tertiary" : undefined}
          >
            <Moon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <TabsContent value="preview" className="m-0">
        <div
          data-preview-theme={previewTheme}
          style={{ colorScheme: previewTheme }}
          className="flex min-h-40 flex-wrap items-center justify-center gap-3 bg-bg-primary p-8"
        >
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code" className="m-0">
        <pre className="overflow-x-auto bg-bg-primary p-4 font-mono text-ui-sm text-fg-primary">
          <code>{code}</code>
        </pre>
      </TabsContent>
    </Tabs>
  );
}
