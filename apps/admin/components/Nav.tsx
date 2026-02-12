import Link from 'next/link';

export function Nav() {
  return (
    <nav className="flex gap-4 border-b bg-white p-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/lessons">Lessons</Link>
      <Link href="/programs">Programs</Link>
      <Link href="/categories">Categories</Link>
    </nav>
  );
}
