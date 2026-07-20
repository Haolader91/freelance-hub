"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { CiWarning } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import {
  getClientApplications,
  getClientPostedJobs,
  getFreelancerApplications,
} from "@/lib/getApi/jobs";

export default function UnifiedRoleDashboard() {
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [clientApplicationsCount, setClientApplicationsCount] =
    useState<number>(0);

  // Client States
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [isJobsLoading, setIsJobsLoading] = useState(false);

  // Freelancer States
  const [freelancerApplications, setFreelancerApplications] = useState<any[]>(
    [],
  );
  const [isAppsLoading, setIsAppsLoading] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user as any;

  const userRole = user?.role?.toLowerCase() || "freelancer";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch Data based on User Role
  useEffect(() => {
    if (!user?.email) return;

    if (userRole === "client") {
      async function fetchClientDashboardData() {
        try {
          setIsJobsLoading(true);
          // Posted Jobs Fetch
          const data = await getClientPostedJobs(user.email);
          setRecentJobs(
            Array.isArray(data)
              ? data.slice(0, 5)
              : data?.jobs?.slice(0, 5) || [],
          );

          // Inbound Applications Fetch for Total Applicants Count
          const appsRes = await getClientApplications(user.email);
          if (appsRes?.success) {
            setClientApplicationsCount(appsRes.applications?.length || 0);
          } else if (Array.isArray(appsRes)) {
            setClientApplicationsCount(appsRes.length);
          }
        } catch (error) {
          console.error("Error fetching client dashboard data:", error);
        } finally {
          setIsJobsLoading(false);
        }
      }
      fetchClientDashboardData();
    } else {
      async function fetchFreelancerApps() {
        try {
          setIsAppsLoading(true);
          const res = await getFreelancerApplications(user.email);
          if (Array.isArray(res)) {
            setFreelancerApplications(res);
          } else if (res?.applications) {
            setFreelancerApplications(res.applications);
          } else if (res?.success && Array.isArray(res.data)) {
            setFreelancerApplications(res.data);
          }
        } catch (error) {
          console.error(
            "Error fetching freelancer dashboard applications:",
            error,
          );
        } finally {
          setIsAppsLoading(false);
        }
      }
      fetchFreelancerApps();
    }
  }, [user?.email, userRole]);

  if (!isMounted || isPending) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 💳 Dynamic Welcome Header Panel */}
      <div className="mb-8 pb-6 border-b border-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {userRole === "freelancer" ? (
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
              Freelancer Dashboard{" "}
              <span className="text-blue-400 font-medium">
                Welcome, {user?.name || "User"}
              </span>
            </h1>
          ) : (
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
              Client Console{" "}
              <span className="text-indigo-400 font-medium">
                Welcome, {user?.name || "Client"}
              </span>
            </h1>
          )}
          <p className="text-xs text-slate-500 mt-1">
            Displaying automated workspace insights for {userRole} flow
            structure.
          </p>
        </div>

        {userRole === "freelancer" && (
          <button
            onClick={() => setShowProfileSetup(true)}
            className="sm:self-center bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5"
          >
            <CiWarning size={16} /> Profile 85% Complete
          </button>
        )}
      </div>

      {/* 📊 CONDITION A: FREELANCER METRICS */}
      {userRole === "freelancer" && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl col-span-2 lg:col-span-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1">
              <FaCheck className="text-emerald-400" />
              Profile Completion
            </div>
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              85%
            </div>
            <div className="w-full bg-slate-950 h-1 rounded-full mt-2 overflow-hidden border border-slate-850">
              <div className="bg-emerald-500 h-full w-[85%] rounded-full" />
            </div>
          </div>

          {/* 💼 APPLIED JOBS (DYNAMIC COUNT) */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              💼 Applied Jobs
            </div>
            <div className="text-xl font-extrabold text-blue-500 font-mono">
              {isAppsLoading ? "..." : freelancerApplications.length}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              ❤️ Saved Jobs
            </div>
            <div className="text-xl font-extrabold text-rose-400 font-mono">
              0
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              🤖 AI Recommended
            </div>
            <div className="text-xl font-extrabold text-indigo-400 font-mono">
              15
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              📄 Shortlisted
            </div>
            <div className="text-xl font-extrabold text-amber-400 font-mono">
              {
                freelancerApplications.filter(
                  (a) =>
                    a.status === "shortlisted" || a.status === "Shortlisted",
                ).length
              }
            </div>
          </div>
        </div>
      )}

      {/* 📊 CONDITION B: CLIENT METRICS */}
      {userRole === "client" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              📢 Active Jobs
            </div>
            <div className="text-xl font-extrabold text-indigo-500 font-mono">
              {recentJobs.length}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              👥 Total Applicants
            </div>
            <div className="text-xl font-extrabold text-blue-400 font-mono">
              {isJobsLoading ? "..." : clientApplicationsCount}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              🤝 Hired Freelancers
            </div>
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              0
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              🤖 AI Devs Match
            </div>
            <div className="text-xl font-extrabold text-purple-400 font-mono">
              24
            </div>
          </div>
        </div>
      )}

      {/* 🔄 Dynamic Feed Context */}
      <div className="space-y-8">
        {userRole === "freelancer" ? (
          /* FREELANCER RECENT APPLICATIONS (DYNAMIC BACKEND DATA) */
          <div className="animate-in fade-in duration-200">
            <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Recent
              Applications
            </h2>

            {isAppsLoading ? (
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-xs text-slate-500 font-mono animate-pulse">
                Fetching recent applications...
              </div>
            ) : freelancerApplications.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center text-xs text-slate-500 font-mono">
                No job applications submitted yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {freelancerApplications.slice(0, 5).map((app) => (
                  <div
                    key={app._id || app.id}
                    className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">
                        {app.jobTitle || app.role || "Applied Position"}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {app.company || app.clientEmail || "Client Listing"} •
                        Bid:{" "}
                        <span className="text-emerald-400 font-mono font-bold">
                          ${app.bidAmount || app.expectedSalary || "0"}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded border font-mono tracking-wider ${
                        app.status === "Interview" ||
                        app.status === "shortlisted"
                          ? "bg-emerald-950/40 border-emerald-900 text-emerald-400"
                          : app.status === "Rejected" ||
                              app.status === "rejected"
                            ? "bg-rose-950/40 border-rose-900 text-rose-400"
                            : "bg-amber-950/40 border-amber-900 text-amber-400"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* CLIENT WORKSPACE STATUS */
          <div className="animate-in fade-in duration-200">
            <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Client
              Workspace Status
            </h2>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 font-mono">
              Review applicant responses directly from the Inbound Pipelines
              menu.
            </div>
          </div>
        )}

        {/* SECTION 2: General Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-widest font-mono">
              {userRole === "freelancer"
                ? "🤖 Recommended Jobs"
                : "📢 Recent Posted Jobs"}
            </h2>

            {userRole === "freelancer" ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-400">
                AI Agent has matched 15 target listings to your current
                technical stack (React, Next.js, Tailwind CSS).
              </div>
            ) : (
              <div className="space-y-2">
                {isJobsLoading && (
                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-xs text-slate-500 font-mono animate-pulse">
                    Fetching recent deployment nodes...
                  </div>
                )}

                {!isJobsLoading && recentJobs.length === 0 && (
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-500 font-mono">
                    No active job entries found. Go to "Post a Job" to
                    initialize.
                  </div>
                )}

                {!isJobsLoading &&
                  recentJobs.length > 0 &&
                  recentJobs.map((job) => (
                    <div
                      key={job._id}
                      className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between hover:border-slate-750 transition-colors"
                    >
                      <div className="space-y-0.5 truncate pr-4">
                        <h4 className="text-xs font-bold text-slate-200 truncate">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                          <span className="text-blue-400">{job.category}</span>
                          <span>•</span>
                          <span>
                            ${job.minBudget}-${job.maxBudget}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                          job.status === "Closed"
                            ? "bg-slate-950 border-slate-850 text-slate-600"
                            : "bg-emerald-950/30 border-emerald-900 text-emerald-400"
                        }`}
                      >
                        {job.status || "Active"}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-widest font-mono">
              Latest Messages
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl divide-y divide-slate-850 overflow-hidden">
              <div className="p-3 text-xs flex justify-between items-center hover:bg-slate-850/20">
                <span className="text-slate-300 font-medium">
                  System Core Sync
                </span>
                <span className="text-[10px] text-slate-600 font-mono">
                  Just now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🛠️ PROFILE SETUP MODAL */}
      {showProfileSetup && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
                ⚙️ Profile System Setup
              </h3>
              <button
                onClick={() => setShowProfileSetup(false)}
                className="text-xs text-slate-500 hover:text-white font-mono cursor-pointer"
              >
                [CLOSE]
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Update your professional metadata preferences, skills
              configuration stacks, and verification parameters.
            </p>
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  Display Title / Brand Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name || "User Name"}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  Core Tech Stack Tags
                </label>
                <input
                  type="text"
                  defaultValue="React, Next.js, Tailwind CSS"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
            </div>
            <button
              onClick={() => setShowProfileSetup(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl mt-4 transition-all cursor-pointer"
            >
              Save Setup Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
