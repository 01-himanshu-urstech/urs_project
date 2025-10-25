// components/ReportsAnalytics.tsx
"use client";

import React from "react";
import { FaUser, FaGraduationCap, FaAward } from "react-icons/fa";

interface ReportCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ icon, title, value, change }) => (
  <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 w-64">
    <div className="text-orange-300 text-3xl mb-4">{icon}</div>
    <div className="text-gray-500 text-sm">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-orange-400 mt-1">{change}</div>
  </div>
);

const ReportsAnalytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-4">

      <div className="flex flex-wrap gap-56">
        <ReportCard
          icon={<FaUser />}
          title="Total Trainers"
          value={595}
          change="+5.2% from last month"
        />
        <ReportCard
          icon={<FaGraduationCap />}
          title="Total Job Posters"
          value={520}
          change="+1.1% from last month"
        />
        <ReportCard
          icon={<FaAward />}
          title="Requirements"
          value={3.4}
          change="+0.2 from last month"
        />
      </div>
    </div>
  );
};

export default ReportsAnalytics;
