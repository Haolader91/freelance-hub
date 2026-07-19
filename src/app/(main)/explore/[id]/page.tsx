"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getJobById, JobCard } from "@/lib/getApi/jobs";
import ApplyJobModal from "@/components/ApplyJobModal";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ২. মডাল ওপেন/ক্লোজ স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadJobDetails() {
      try {
        setIsLoading(true);
        const data = await getJobById(id as string);
        setJob(data);
      } catch (error) {
        console.error("Error loading job details component:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadJobDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-28 pb-16 px-4 flex justify-center items-center">
        <div className="animate-pulse space-y-4 w-full max-w-3xl">
          <div className="h-4 bg-slate-800 rounded w-1/4"></div>
          <div className="h-8 bg-slate-800 rounded w-3/4"></div>
          <div className="h-32 bg-slate-800 rounded w-full"></div>
          <div className="h-12 bg-slate-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-28 pb-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-xl p-8">
          <p className="text-slate-400 mb-4">
            Project details not found or has been removed.
          </p>
          <button
            onClick={() => router.push("/explore")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/explore"
            className="text-xs text-blue-400 hover:underline flex items-center gap-1"
          >
            ← Back to Explore Smart Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8">
              <span className="text-[10px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-900 px-2 py-0.5 rounded uppercase tracking-wider">
                {job.category || "General"}
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-3 mb-4 leading-tight">
                {job.title}
              </h1>

              <div className="bg-slate-950/60 border border-slate-850 rounded-lg p-4 mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Brief Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 italic">
                  "{job.shortDesc || "No brief overview available."}"
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
                  Detailed Project Specification
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                  {job.fullDesc ||
                    "No comprehensive requirements detailed by the client."}
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <h3 className="text-sm font-bold text-slate-200">
                  Required Skillsets & Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.requirements &&
                  Array.isArray(job.requirements) &&
                  job.requirements.length > 0 ? (
                    job.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-950 border border-slate-850 text-slate-300 px-3 py-1 rounded-md"
                      >
                        ⚡ {req}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">
                      No specific skill tags submitted.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Budget & Client Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div>
                <span className="text-[10px] block text-slate-500 uppercase font-bold tracking-wider mb-1">
                  Budget Allocation
                </span>
                <div className="text-2xl font-bold text-emerald-400">
                  ${job.minBudget} - ${job.maxBudget}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <span className="text-[10px] block text-slate-500 uppercase font-bold tracking-wider mb-1">
                  Submission Deadline
                </span>
                <div className="text-xs font-medium text-slate-300">
                  📅 {job.deadline || "Not specified"}
                </div>
              </div>

              {/* ৩. বাজেট সাইডবারের ভেতরের বাটনে স্টেট ট্রিগার করুন */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer shadow-lg shadow-blue-900/20"
              >
                Apply to This Project
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Client Ecosystem Info
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-slate-500 block">
                    Posted By:
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    {job.clientName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">
                    Communication Email:
                  </span>
                  <span className="text-xs font-mono text-blue-400 break-all">
                    {job.clientEmail}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ৪. রিটার্ন মেথডের একদম নিচে কম্পোনেন্টটি এভাবে বসিয়ে দিন */}
      {job && (
        <ApplyJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={job}
        />
      )}
    </div>
  );
}
