"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

// Warna untuk tiap interest
const COLORS = [
  "#6366F1",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#F43F5E",
  "#14B8A6",
];

type InterestData = {
  name: string;
  value: number;
  percentage: string;
};

export default function InterestSummaryTab() {
  const [data, setData] = useState<InterestData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://customerdataset-production.up.railway.app/api/customers/summary/interest"
        );
        const raw = res.data.summary as Record<string, number>;
        const total = Object.values(raw).reduce((sum, val) => sum + val, 0);

        const chartData = Object.entries(raw).map(([key, value]) => ({
          name: key,
          value,
          percentage: ((value / total) * 100).toFixed(1) + "%",
        }));

        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch interest summary", err);
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
            cx="50%"
            cy="50%"
            outerRadius={150}
            innerRadius={60}
            dataKey="value"
            nameKey="name"
            label={({ name, percentage }) => `${name} (${percentage})`}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}`, name]}
          />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
