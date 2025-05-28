// app/customer/page.tsx
import { Suspense } from 'react';
import CustomerTable from '@/components/CustomerTable';

export default function CustomerPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Customer</h1>
      <Suspense fallback={<div>Loading customer table...</div>}>
        <CustomerTable />
      </Suspense>
    </main>
  );
}
