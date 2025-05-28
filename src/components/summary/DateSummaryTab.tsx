"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function DateSummaryTab() {
  const [data, setData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://customerdataset-production.up.railway.app/api/customers/summary/date"
        );
        const raw = res.data.summary;
        const dateList = Object.entries(raw)
          .map(([date, count]) => ({
            date,
            count: Number(count),
          }))
          .sort((a, b) => a.date.localeCompare(b.date));
        setData(dateList);
      } catch (err) {
        console.error("Failed to fetch date summary", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-md shadow">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3B82F6"
            name="Jumlah"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
