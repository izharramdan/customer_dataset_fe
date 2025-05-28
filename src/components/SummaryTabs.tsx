"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GenderSummaryTab from "./summary/GenderSummaryTabs";
import AgeSummaryTab from "./summary/AgeSummary";
import DeviceSummaryTab from "./summary/DeviceSummary";
import InterestSummaryTab from "./summary/InterestSummaryTab";
import LocationTab from "./summary/LocationSummaryTab";
import DateSummaryTab from "./summary/DateSummaryTab";

const tabs = ["Gender", "Age", "Device", "Interest", "Location", "Date"];

export default function SummaryTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam && tabs.includes(tabParam) ? tabParam : "Gender");

  // Update URL saat tab berubah
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("tab", activeTab);
    router.replace(`?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Sync state jika user mengubah query string manual
  useEffect(() => {
    if (tabParam && tabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParam]);

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
        {activeTab === "Gender" && <GenderSummaryTab />}
        {activeTab === "Age" && <AgeSummaryTab />}
        {activeTab === "Device" && <DeviceSummaryTab />}
        {activeTab === "Interest" && <InterestSummaryTab />}
        {activeTab === "Location" && <LocationTab />}
        {activeTab === "Date" && <DateSummaryTab />}

        <div className="text-gray-600">data for {activeTab}</div>
      </div>
    </div>
  );
}