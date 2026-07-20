"use client";

import { useState, useEffect } from "react";
import { FaBriefcase, FaEllipsisV } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { getClientPostedJobs, JobCard } from "@/lib/getApi/jobs";

export default function MyPostedJobsPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [jobsCard, setJobsCard] = useState<JobCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    async function loadJobs() {
      try {
        setIsLoading(true);

        const data = await getClientPostedJobs(user?.email as string);
        setJobsCard(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadJobs();
  }, [user?.email]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-4">
        <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <FaBriefcase className="text-blue-500" /> Directory of Posted Jobs
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage active listings, toggle status loops, or inspect submissions.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="bg-slate-900/50 border border-slate-800/60 p-5 rounded-xl animate-pulse h-20 w-full"
            />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-xs font-mono">
          ❌ Error: {error}
        </div>
      )}

      {!isLoading && !error && jobsCard.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-xs text-slate-500 font-mono">
          No jobs found for {user?.email}. Deploy your first job requirement to
          get started!
        </div>
      )}

      {!isLoading && !error && jobsCard.length > 0 && (
        <div className="space-y-2">
          {jobsCard.map((post) => (
            <div
              key={post._id}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-750 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-200">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 max-w-xl truncate">
                  {post.shortDesc}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 pt-1">
                  <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-850 text-slate-400">
                    {post.category}
                  </span>
                  <span>
                    Budget: ${post.minBudget} - ${post.maxBudget}
                  </span>
                  <span className="text-slate-600">
                    Deadline: {post.deadline}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${
                    post.status === "Closed"
                      ? "bg-slate-950 border-slate-800 text-slate-500"
                      : post.status === "Draft"
                        ? "bg-amber-950/40 border-amber-900 text-amber-400"
                        : "bg-emerald-950/40 border-emerald-900 text-emerald-400"
                  }`}
                >
                  {post.status || "Active"}
                </span>
                <button className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                  <FaEllipsisV size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
