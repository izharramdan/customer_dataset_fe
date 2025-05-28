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

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("search", search);
    router.replace(`?${params.toString()}`);
  }, [page, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCustomers(page, 10, search);
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
    setPage(1);
    setSearch(newSearch);
  };

  return (
    <div className="w-full">
      <div className="rounded-md">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-3 items-center">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search name or email..."
            className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
            Search
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="text-xs bg-gray-100 text-gray-600 uppercase border-b">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="px-5 py-3 text-left">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-3 border-t">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          {/* Previous Button */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed transition text-sm"
          >
            {"<"}
          </button>

          {/* Page Info */}
          <div className="text-sm text-gray-800 bg-gray-100 px-4 py-2 rounded-md shadow-sm font-medium">
            Page <span className="text-blue-600 font-bold">{page}</span> of{" "}
            <span className="text-blue-600 font-bold">{totalPages}</span>
          </div>

          {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed transition text-sm"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
