"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { getAllJobs } from "@/lib/getApi/jobs";

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const res: any = await getAllJobs();

        if (Array.isArray(res)) {
          setJobs(res);
        } else if (res && typeof res === "object") {
          const responseObj = res as Record<string, any>;
          if (Array.isArray(responseObj.jobs)) {
            setJobs(responseObj.jobs);
          } else if (Array.isArray(responseObj.data)) {
            setJobs(responseObj.data);
          } else {
            setJobs([]);
          }
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching browse jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job: any) => {
    const matchesSearch =
      job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || job?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">
          Browse Available Jobs
        </h1>
        <p className="text-xs text-slate-400">
          Find and apply to the latest client requests.
        </p>
      </div>

      {/* 🔍 Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3.5 text-slate-500 text-xs" />
          <input
            type="text"
            placeholder="Search by title, skills, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Graphics Design">Graphics Design</option>
        </select>
      </div>

      {/* Job Feed Listing */}
      {loading ? (
        <div className="text-center py-10 text-xs text-slate-500 font-mono animate-pulse">
          Loading active jobs...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-8 text-center rounded-xl text-xs text-slate-400 font-mono">
          No jobs found matching your criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job: any) => {
            const jobId = job?._id || job?.id;

            return (
              <div
                key={jobId}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-xl transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950/50 border border-blue-900/50 px-2 py-0.5 rounded">
                      {job?.category || "General"}
                    </span>
                    <h2 className="text-base font-bold text-slate-100 mt-1">
                      {job?.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-emerald-400 font-mono">
                      ${job?.minBudget || 0} - ${job?.maxBudget || 0}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Fixed Budget
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {job?.description}
                </p>

                {/* Skills Tags */}
                {job?.skills && Array.isArray(job.skills) && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-850 text-xs">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Posted{" "}
                    {job?.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "Recently"}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/explore/${jobId}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    >
                      Apply / Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
