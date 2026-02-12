'use client';

import { AdminGate } from '@/components/AdminGate';

export default function DashboardPage() {
  return (
    <AdminGate>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Manage lessons, categories, and programs.</p>
      </div>
    </AdminGate>
  );
}
