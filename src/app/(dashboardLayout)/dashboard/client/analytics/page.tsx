"use client";

import { useState, useEffect } from "react";
import {
  FaChartBar,
  FaArrowUp,
  FaWallet,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getAnalyticsData } from "@/lib/getApi/jobs";

interface ChartItem {
  name: string;
  count: number;
  fill: string;
}

interface AnalyticsState {
  totalBudgetSpent: number;
  hiringConversion: string;
  activeJobs: number;
  totalFreelancers: number;
  chartData: ChartItem[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true);
        const res = await getAnalyticsData();
        if (res.success) {
          setData(res.analytics);
        }
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xs text-slate-500 font-mono animate-pulse">
        Loading workspace metrics and rendering charts...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-900 pb-4">
        <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <FaChartBar className="text-blue-400" /> Workspace Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time performance metrics and pipeline ecosystem breakdown.
        </p>
      </div>

      {/* Dynamic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider font-mono">
              Total Budget
            </span>
            <FaWallet className="text-blue-500 text-xs" />
          </div>
          <div className="text-xl font-extrabold font-mono text-white">
            ${data?.totalBudgetSpent?.toLocaleString() || "0.00"}
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <FaArrowUp /> Dynamic Sync
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider font-mono">
              Hiring Conversion
            </span>
            <FaUsers className="text-purple-500 text-xs" />
          </div>
          <div className="text-xl font-extrabold font-mono text-white">
            {data?.hiringConversion || "0"}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">
            Conversion based on shortlisted pipeline
          </div>
        </div>

        {/* Card 3: Exact Active Jobs Count */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider font-mono">
              Active Jobs
            </span>
            <FaBriefcase className="text-amber-500 text-xs" />
          </div>
          <div className="text-xl font-extrabold font-mono text-white">
            {String(data?.activeJobs || 0).padStart(2, "0")} Jobs
          </div>
          <div className="text-[10px] text-amber-400 mt-1 font-mono">
            {data?.totalFreelancers || 0} Talents registered
          </div>
        </div>
      </div>

      {/* 📊 Recharts Section */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
        <h3 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
          Inbound Applications Status Breakdown
        </h3>

        <div className="h-56 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.chartData || []}>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#1e293b",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                {data?.chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
