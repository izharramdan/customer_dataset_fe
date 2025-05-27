// src/app/page.tsx
import CustomerTable from "@/components/CustomerTable";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Customer</h1>
      <CustomerTable />
    </main>
  );
}
