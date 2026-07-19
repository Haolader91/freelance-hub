"use client";

import { useState, useEffect } from "react";

import { useSession } from "@/lib/auth-client";
import { CiWarning } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";

interface FreelancerJob {
  id: string;
  role: string;
  company: string;
  status: "Interview" | "Pending" | "Rejected";
  score: number;
}

interface ClientApplicant {
  id: string;
  name: string;
  appliedRole: string;
  matchScore: number;
  status: "Shortlisted" | "Reviewed" | "New";
}

export default function UnifiedRoleDashboard() {
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const userRole = (user as any)?.role?.toLowerCase() || "freelancer";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [freelancerJobs] = useState<FreelancerJob[]>([
    {
      id: "1",
      role: "Next.js / React Specialist",
      company: "LogiChain.AI Ecosystem",
      status: "Interview",
      score: 98,
    },
    {
      id: "2",
      role: "Full-Stack TypeScript Developer",
      company: "CyberNetix Solutions",
      status: "Pending",
      score: 92,
    },
  ]);

  const [clientApplicants] = useState<ClientApplicant[]>([
    {
      id: "app-1",
      name: "Tamim Iqbal",
      appliedRole: "Next.js Developer",
      matchScore: 98,
      status: "Shortlisted",
    },
    {
      id: "app-2",
      name: "Juniya Rahman",
      appliedRole: "UI/UX Designer",
      matchScore: 89,
      status: "New",
    },
  ]);

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
                Welcome, {user?.name || "TechSoft Ltd."}
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
            className="sm:self-center bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer"
          >
            <CiWarning /> Profile 85% Complete
          </button>
        )}
      </div>

      {/* 📊 CONDITION A: FREELANCER METRICS */}
      {userRole === "freelancer" && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl col-span-2 lg:col-span-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              <FaCheck />
              Profile Completion
            </div>
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              85%
            </div>
            <div className="w-full bg-slate-950 h-1 rounded-full mt-2 overflow-hidden border border-slate-850">
              <div className="bg-emerald-500 h-full w-[85%] rounded-full" />
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              💼 Applied Jobs
            </div>
            <div className="text-xl font-extrabold text-blue-500 font-mono">
              12
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              ❤️ Saved Jobs
            </div>
            <div className="text-xl font-extrabold text-rose-400 font-mono">
              8
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
              📄 Proposals
            </div>
            <div className="text-xl font-extrabold text-amber-400 font-mono">
              22
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
              10
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              👥 Total Applicants
            </div>
            <div className="text-xl font-extrabold text-blue-400 font-mono">
              145
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              🤝 Hired Freelancers
            </div>
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              12
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              🤖 AI Recommended Devs
            </div>
            <div className="text-xl font-extrabold text-purple-400 font-mono">
              38
            </div>
          </div>
        </div>
      )}

      {/* 🔄 Dynamic Feed Context */}
      <div className="space-y-8">
        {userRole === "freelancer" ? (
          <div className="animate-in fade-in duration-200">
            <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Recent
              Applications
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {freelancerJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">
                      {job.role}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {job.company}
                    </p>
                  </div>
                  <span
                    className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded border font-mono tracking-wider ${job.status === "Interview" ? "bg-blue-950/40 border-blue-900 text-blue-400" : "bg-amber-950/40 border-amber-900 text-amber-400"}`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-200">
            <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Recent
              Applicants
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {clientApplicants.map((app) => (
                <div
                  key={app.id}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">
                      {app.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Applied for: {app.appliedRole}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {app.matchScore}% Match
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-800 bg-slate-950 text-slate-400 font-mono">
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
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
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-400">
              {userRole === "freelancer"
                ? "AI Agent has matched 15 target listings to your current technical stack."
                : `${user?.name || "TechSoft Ltd."} has 10 active job post entries listed in global directories.`}
            </div>
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
                  defaultValue={
                    user?.name ||
                    (userRole === "freelancer"
                      ? "Tamim Iqbal"
                      : "TechSoft Ltd.")
                  }
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
