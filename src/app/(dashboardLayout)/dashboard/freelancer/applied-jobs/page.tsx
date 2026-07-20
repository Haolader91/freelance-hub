"use client";

import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaExternalLinkAlt,
  FaFilePdf,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { getFreelancerApplications } from "@/lib/getApi/jobs";

export default function AppliedJobsPage() {
  const { data: session, isPending: isSessionPending } = useSession();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMyApplications() {
      if (!session?.user?.email) return;

      setIsLoading(true);
      try {
        const res = await getFreelancerApplications(session.user.email);
        if (res?.success) {
          setApplications(res.applications || []);
        }
      } catch (err) {
        console.error("Failed to load applied jobs:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isSessionPending) {
      loadMyApplications();
    }
  }, [session?.user?.email, isSessionPending]);

  // Application status badge generator
  const renderStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "shortlisted":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <FaCheckCircle size={10} /> Shortlisted
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full">
            <FaTimesCircle size={10} /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            <FaClock size={10} /> Pending
          </span>
        );
    }
  };

  if (isSessionPending || isLoading) {
    return (
      <div className="text-center py-12 text-slate-400 text-sm">
        Loading applied jobs...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-4">
        <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <FaBriefcase className="text-blue-400" /> Applied Jobs
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track all job proposals you have submitted and their status.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 text-sm">
          You haven't applied for any jobs yet.
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-750 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base font-bold text-slate-200">
                    {app.jobTitle}
                  </h3>
                  {renderStatusBadge(app.status)}
                </div>

                <p className="text-xs text-slate-400">
                  Client Name:{" "}
                  <span className="text-slate-300 font-medium">
                    {app.clientName || "Unknown Client"}
                  </span>
                </p>

                <p className="text-[11px] text-slate-500 italic max-w-lg line-clamp-2">
                  My Proposal: "{app.coverLetter}"
                </p>

                {/* Submitted Resume/Portfolio Link */}
                {app.resume && (
                  <div className="pt-1">
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      {app.resumeType === "link" ? (
                        <>
                          <FaExternalLinkAlt size={8} /> Submitted Portfolio /
                          CV
                        </>
                      ) : (
                        <>
                          <FaFilePdf size={9} /> {app.resume}
                        </>
                      )}
                    </a>
                  </div>
                )}
              </div>

              {/* Financial Stats */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 border-slate-800/80 pt-2 sm:pt-0 gap-1 text-right">
                <span className="text-xs text-slate-400">Your Bid Amount</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  ${app.bidAmount}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Take-home: ${app.netEarnings}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
