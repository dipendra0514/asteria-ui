"use client";

import { Tab, Tabs } from "fumadocs-ui/components/tabs";

export function InstallTabs({
  name,
  manual,
}: {
  name: string;
  manual: string;
}) {
  return (
    <Tabs items={["CLI", "Manual"]} groupId="install">
      <Tab value="CLI">
        <pre className="overflow-x-auto rounded-lg border border-border-default bg-bg-secondary p-4 font-mono text-ui-sm text-fg-primary">
          <code>{`npx asteria-ui add ${name}`}</code>
        </pre>
      </Tab>
      <Tab value="Manual">
        <pre className="overflow-x-auto rounded-lg border border-border-default bg-bg-secondary p-4 font-mono text-ui-sm text-fg-primary">
          <code>{manual}</code>
        </pre>
      </Tab>
    </Tabs>
  );
}
