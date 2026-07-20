"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaFilePdf,
} from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import {
  getClientApplications,
  updateApplicationStatus,
} from "@/lib/getApi/jobs";

export default function ViewApplicantsPage() {
  const { data: session, isPending: isSessionPending } = useSession();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      if (!session?.user?.email) return;

      setIsLoading(true);
      try {
        console.log("Fetching for email:", session.user.email);
        const res = await getClientApplications(session.user.email);
        console.log("API Response:", res);

        if (res?.success) {
          setApplications(res.applications || []);
        } else if (Array.isArray(res)) {
          setApplications(res);
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isSessionPending) {
      loadApplications();
    }
  }, [session?.user?.email, isSessionPending]);

  //  status updated
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await updateApplicationStatus(id, newStatus);
      if (res?.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app,
          ),
        );
      } else {
        alert(res?.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isSessionPending || isLoading) {
    return (
      <div className="text-center py-12 text-slate-400 text-sm">
        Loading proposals...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-4">
        <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <FaUsers className="text-purple-400" /> Inbound Application Pipelines
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review profiles, matching coefficients and screen target applicants.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 text-sm">
          No application proposals found for {session?.user?.email}.
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-750 transition-all"
            >
              <div className="flex items-start sm:items-center gap-3">
                {/* Fallback Letter Avatar */}
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                  {app.applicantName
                    ? app.applicantName.charAt(0).toUpperCase()
                    : "A"}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-200">
                      {app.applicantName}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ${app.bidAmount} Bid
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Applied for:{" "}
                    <span className="text-slate-300 font-medium">
                      {app.jobTitle}
                    </span>
                  </p>

                  <p className="text-[11px] text-slate-500 mt-1 italic max-w-lg line-clamp-2">
                    {app.coverLetter}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    {/* Resume / Portfolio Link */}
                    {app.resume && (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-blue-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        {app.resumeType === "link" ? (
                          <>
                            <FaExternalLinkAlt size={8} /> Live Link / CV
                          </>
                        ) : (
                          <>
                            <FaFilePdf size={9} /> {app.resume}
                          </>
                        )}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {updatingId === app._id ? (
                  <span className="text-xs text-slate-500 animate-pulse">
                    Updating...
                  </span>
                ) : app.status === "shortlisted" ? (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                    Shortlisted
                  </span>
                ) : app.status === "rejected" ? (
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl">
                    Rejected
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(app._id, "rejected")}
                      className="bg-slate-950 hover:bg-rose-500/10 border border-slate-850 hover:border-rose-500/30 text-rose-400 p-2 rounded-xl transition-all cursor-pointer"
                      title="Reject Application"
                    >
                      <FaTimes size={12} />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, "shortlisted")}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <FaCheck size={10} /> Shortlist
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
