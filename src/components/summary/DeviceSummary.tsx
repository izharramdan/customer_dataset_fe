"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

// Warna-warna untuk tiap brand
const COLORS = [
  "#6366F1",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#3B82F6",
  "#8B5CF6",
  "#EF4444",
  "#14B8A6",
  "#F43F5E",
  "#84CC16",
];

export default function DeviceSummaryTab() {
  const [data, setData] = useState<
    { name: string; value: number; percentage: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://customerdataset-production.up.railway.app/api/customers/summary/device"
        );
        const raw = res.data.summary as Record<string, number>; // 👈 Beri anotasi tipe eksplisit

        const total = Object.values(raw).reduce((sum, val) => sum + val, 0);
        const chartData = Object.entries(raw).map(([key, value]) => ({
          name: key,
          value: value,
          percentage: ((value / total) * 100).toFixed(1) + "%",
        }));

        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch device summary", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[500px] bg-white p-4 rounded-md shadow">
     
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, percentage }) => `${name} (${percentage})`}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
