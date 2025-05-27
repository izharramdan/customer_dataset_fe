'use client';
import { useEffect, useState } from 'react';
import { getAllCustomers } from '@/services/customerService';

export default function HomePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCustomers()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching customers:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Data</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Age</th>
            <th className="border px-2 py-1">Gender</th>
            <th className="border px-2 py-1">Device</th>
            <th className="border px-2 py-1">Interest</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cust, idx) => (
            <tr key={cust._id} className="border-t">
              <td className="border px-2 py-1">{idx + 1}</td>
              <td className="border px-2 py-1">{cust.name}</td>
              <td className="border px-2 py-1">{cust.email}</td>
              <td className="border px-2 py-1">{cust.age}</td>
              <td className="border px-2 py-1">{cust.gender}</td>
              <td className="border px-2 py-1">{cust.brand_device}</td>
              <td className="border px-2 py-1">{cust.digital_interest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
