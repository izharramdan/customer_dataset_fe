import { Suspense } from "react";
import SummaryTabs from "@/components/SummaryTabs";

export default function SummaryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Summary</h1>
      <Suspense fallback={<div>Loading data...</div>}>
        <SummaryTabs />
      </Suspense>
    </div>
  );
}
