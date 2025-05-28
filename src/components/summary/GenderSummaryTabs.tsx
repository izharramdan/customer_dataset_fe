"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ["#4F46E5", "#EC4899"]; // Blue & Pink

export default function GenderSummaryTab() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://customerdataset-production.up.railway.app/api/customers/summary/gender"
        );
        const summary = res.data.summary;
        const chartData = Object.entries(summary).map(([key, value]) => ({
          name: key,
          value: Number(value),
        }));
        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch gender summary", err);
      }
    };

    fetchData();
  }, []);

  // Label formatter untuk menampilkan persentase
  const renderLabel = ({ percent }: { percent: number }) =>
    `${(percent * 100).toFixed(1)}%`;

  return (
    <div className="w-full h-96 bg-white p-4 rounded-md shadow">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={renderLabel}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
