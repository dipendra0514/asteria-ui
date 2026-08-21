export function ComingSoon({ name }: { name: string }) {
  return (
    <div className="not-prose my-6 rounded-lg border border-border-default bg-bg-secondary p-4">
      <p className="text-ui-sm font-medium text-fg-primary">Coming soon</p>
      <p className="mt-1 text-ui-sm text-fg-secondary">
        {name} is a stub so the sidebar matches the intended IA. Real content
        lands with the Figma pull — don&apos;t treat this page as the spec yet.
      </p>
    </div>
  );
}
