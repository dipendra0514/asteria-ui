export function InstallCommand({
  name,
}: {
  name: string;
}) {
  return (
    <pre className="not-prose overflow-x-auto rounded-lg border border-border-default bg-bg-secondary p-4 font-mono text-ui-sm text-fg-primary">
      <code>{`npx asteria-ui add ${name}`}</code>
    </pre>
  );
}
