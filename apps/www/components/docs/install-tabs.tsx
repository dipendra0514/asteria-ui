"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@asteria-ui/registry/ui/tabs";

export function InstallTabs({
  name,
  manual,
}: {
  name: string;
  manual: string;
}) {
  return (
    <Tabs defaultValue="cli" className="not-prose my-4">
      <TabsList variant="pill" aria-label="Installation method">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli" className="mt-3">
        <pre className="overflow-x-auto rounded-lg border border-border-default bg-bg-secondary p-4 font-mono text-ui-sm text-fg-primary">
          <code>{`npx asteria-ui add ${name}`}</code>
        </pre>
      </TabsContent>
      <TabsContent value="manual" className="mt-3">
        <pre className="overflow-x-auto rounded-lg border border-border-default bg-bg-secondary p-4 font-mono text-ui-sm text-fg-primary">
          <code>{manual}</code>
        </pre>
      </TabsContent>
    </Tabs>
  );
}
