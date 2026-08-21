export type PropRow = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border-default">
      <table className="w-full min-w-[36rem] text-left text-ui-sm">
        <thead className="border-b border-border-default bg-bg-secondary text-fg-secondary">
          <tr>
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-border-default last:border-0"
            >
              <td className="px-4 py-2.5 font-mono text-fg-brand">{row.name}</td>
              <td className="px-4 py-2.5 font-mono text-fg-secondary">
                {row.type}
              </td>
              <td className="px-4 py-2.5 font-mono text-fg-tertiary">
                {row.defaultValue ?? "—"}
              </td>
              <td className="px-4 py-2.5 text-fg-secondary">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
