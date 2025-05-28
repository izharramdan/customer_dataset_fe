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
  PieChart, Pie, Cell
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LocationTab() {
  const [data, setData] = useState<
    { location: string; count: number; percentage: string }[]
  >([]);
  const [locationTypeData, setLocationTypeData] = useState<
    { type: string; count: number; percentage: string }[]
  >([]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const res = await axios.get(
          "https://customerdataset-production.up.railway.app/api/customers/summary/location"
        );
        const raw = res.data.summary;
        const locationListRaw = Object.entries(raw).map(
          ([location, count]) => ({
            location,
            count: Number(count),
          })
        );

        const total = locationListRaw.reduce((sum, d) => sum + d.count, 0);
        const locationList = locationListRaw.map((item) => ({
          ...item,
          percentage: ((item.count / total) * 100).toFixed(1) + "%",
        }));

        setData(locationList);
      } catch (err) {
        console.error("Failed to fetch location summary", err);
      }
    };

    const fetchLocationTypeData = async () => {
      try {
        const res = await axios.get(
          "https://customerdataset-production.up.railway.app/api/customers/summary/locationtype"
        );
        const raw = res.data.summary;
        const typeListRaw = Object.entries(raw).map(([type, count]) => ({
          type,
          count: Number(count),
        }));

        const total = typeListRaw.reduce((sum, d) => sum + d.count, 0);
        const typeList = typeListRaw.map((item) => ({
          ...item,
          percentage: ((item.count / total) * 100).toFixed(1) + "%",
        }));

        setLocationTypeData(typeList);
      } catch (err) {
        console.error("Failed to fetch location type summary", err);
      }
    };

    fetchLocationData();
    fetchLocationTypeData();
  }, []);

  const COLORS = ["#10B981", "#3B82F6", "#F59E42", "#EF4444", "#A78BFA"];

  return (
    <div className="w-full bg-white p-4 rounded-md shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Location Summary</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="location" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10B981" name="Jumlah">
                <LabelList dataKey="percentage" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/3 h-[400px] flex flex-col items-center justify-center">
          <h3 className="text-md font-semibold mb-2 text-gray-700">Location Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={locationTypeData}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ type, percentage }) => `${type} (${percentage})`}
              >
                {locationTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    
  );
}
