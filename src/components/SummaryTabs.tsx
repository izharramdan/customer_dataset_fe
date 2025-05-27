"use client";

import { useState } from "react";

const tabs = [
  "Gender",
  "Age",
  "Device",
  "Interest",
  "Location",
  "Login Hour",
  "Date",
  "Location Type",
];

export default function SummaryTabs() {
  const [activeTab, setActiveTab] = useState("Gender");

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold mb-2">{activeTab} Summary</h2>
        {/* Render sesuai tab */}
        <div className="text-gray-600">[Chart or data for {activeTab}]</div>
      </div>
    </div>
  );
}
