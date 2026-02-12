import Link from 'next/link';

export function DataTable({ rows, editPath }: { rows: Array<{ id: number; slug: string }>; editPath: string }) {
  return (
    <table className="w-full border bg-white">
      <thead><tr><th className="p-2 text-left">ID</th><th className="p-2 text-left">Slug</th><th /></tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="p-2">{r.id}</td>
            <td className="p-2">{r.slug}</td>
            <td className="p-2"><Link href={`${editPath}/${r.id}`}>Edit</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
