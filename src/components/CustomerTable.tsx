"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getAllCustomers } from "@/services/customerService";
import { useRouter, useSearchParams } from "next/navigation";

interface Customer {
  _id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  brand_device: string;
}

export default function CustomerTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromParams = Number(searchParams.get("page")) || 1;
  const searchQueryFromParams = searchParams.get("search") || "";

  const [page, setPage] = useState(pageFromParams);
  const [search, setSearch] = useState(searchQueryFromParams);
  const [data, setData] = useState<Customer[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Update URL when page or search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("search", search);
    router.replace(`?${params.toString()}`);
  }, [page, search]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCustomers(page, 10, search); // ⬅️ Search dikirim ke backend
        setData(res.data);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchData();
  }, [page, search]);

  const columns: ColumnDef<Customer>[] = [
    {
      header: "No.",
      cell: (info) => (page - 1) * 10 + info.row.index + 1,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "brand_device", header: "Device" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSearch = formData.get("search")?.toString().trim() || "";
    setPage(1); // reset ke page pertama
    setSearch(newSearch);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Table</h2>

      {/* 🔍 Search Input */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search name or email..."
          className="border px-3 py-2 rounded w-full max-w-md"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-5 py-3">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-3 border-t">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
