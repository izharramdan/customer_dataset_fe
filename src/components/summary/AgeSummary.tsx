"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

// Fungsi untuk kelompok usia
const groupByAgeRange = (data: { age: number; count: number }[]) => {
  const ranges = {
    "20-29": 0,
    "30-39": 0,
    "40-49": 0,
    "50-59": 0,
    "60-69": 0,
  };

  data.forEach(({ age, count }) => {
    if (age >= 20 && age <= 29) ranges["20-29"] += count;
    else if (age >= 30 && age <= 39) ranges["30-39"] += count;
    else if (age >= 40 && age <= 49) ranges["40-49"] += count;
    else if (age >= 50 && age <= 59) ranges["50-59"] += count;
    else if (age >= 60 && age <= 69) ranges["60-69"] += count;
  });

  const total = Object.values(ranges).reduce((sum, val) => sum + val, 0);

  return Object.entries(ranges).map(([range, value]) => ({
    range,
    count: value,
    percentage: ((value / total) * 100).toFixed(1) + "%",
  }));
};

export default function AgeSummaryTab() {
  const [ageData, setAgeData] = useState<
    { age: number; count: number; percentage: string }[]
  >([]);
  const [groupedData, setGroupedData] = useState<
    { range: string; count: number; percentage: string }[]
  >([]);

  useEffect(() => {
    const fetchAgeData = async () => {
      try {
        const res = await axios.get(
          "https://customerdataset-production.up.railway.app/api/customers/summary/age"
        );
        const raw = res.data.summary;
        const ageListRaw = Object.entries(raw).map(([age, count]) => ({
          age: Number(age),
          count: Number(count),
        }));

        const total = ageListRaw.reduce((sum, d) => sum + d.count, 0);
        const ageList = ageListRaw.map((item) => ({
          ...item,
          percentage: ((item.count / total) * 100).toFixed(1) + "%",
        }));

        setAgeData(ageList);
        setGroupedData(groupByAgeRange(ageListRaw));
      } catch (err) {
        console.error("Failed to fetch age summary", err);
      }
    };

    fetchAgeData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Chart 1: Semua usia */}
      <div className="w-full h-[400px] bg-white p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Age Distribution (by Age)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" name="Jumlah">
              <LabelList dataKey="percentage" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Kelompok usia */}
      <div className="w-full h-[300px] bg-white p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Age Group Summary
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={groupedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#6366F1" name="Jumlah">
              <LabelList
                dataKey="percentage"
                position="insideTop"
                fill="#ffffff"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
