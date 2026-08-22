"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@asteria-ui/registry/ui/tabs";
import { ComponentPlayground } from "./component-playground";

export function TabsHero() {
  return (
    <ComponentPlayground
      code={`<Tabs defaultValue="account">
  <TabsList aria-label="Settings">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
    <TabsTrigger value="team">Team</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="billing">Billing settings</TabsContent>
  <TabsContent value="team">Team settings</TabsContent>
</Tabs>`}
    >
      <div className="w-full max-w-sm">
        <Tabs defaultValue="account">
          <TabsList aria-label="Settings">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="pt-4 text-ui-sm text-fg-secondary">
            Account settings
          </TabsContent>
          <TabsContent value="billing" className="pt-4 text-ui-sm text-fg-secondary">
            Billing settings
          </TabsContent>
          <TabsContent value="team" className="pt-4 text-ui-sm text-fg-secondary">
            Team settings
          </TabsContent>
        </Tabs>
      </div>
    </ComponentPlayground>
  );
}

export function TabsPillVariant() {
  return (
    <ComponentPlayground
      code={`<TabsList variant="pill" aria-label="View">
  <TabsTrigger value="list">List</TabsTrigger>
  <TabsTrigger value="grid">Grid</TabsTrigger>
</TabsList>`}
    >
      <Tabs defaultValue="list">
        <TabsList variant="pill" aria-label="View">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="grid">Grid</TabsTrigger>
        </TabsList>
      </Tabs>
    </ComponentPlayground>
  );
}
