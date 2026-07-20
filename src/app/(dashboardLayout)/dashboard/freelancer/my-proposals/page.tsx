"use client";

import { useEffect, useState } from "react";
import {
  FaPaperPlane,
  FaDollarSign,
  FaClock,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { getFreelancerOffers } from "@/lib/getApi/jobs"; // 👈 Lib action import

export default function ProposalsPage() {
  const { data: session, isPending: isSessionPending } = useSession();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadOffers() {
      if (!session?.user?.email) return;

      setLoading(true);
      try {
        const res = await getFreelancerOffers(session.user.email);
        if (res?.success) {
          setOffers(res.offers || []);
        }
      } catch (err) {
        console.error("Failed to load offers:", err);
      } finally {
        setLoading(false);
      }
    }

    if (!isSessionPending) {
      loadOffers();
    }
  }, [session?.user?.email, isSessionPending]);

  if (isSessionPending || loading) {
    return (
      <div className="text-center py-12 text-slate-500 text-xs font-mono animate-pulse">
        Loading received proposals and offers...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-900 pb-4">
        <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <FaPaperPlane className="text-blue-400" /> Direct Client Offers
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review direct contract invitations sent by clients to your profile.
        </p>
      </div>

      {/* Offers List */}
      {offers.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-xs font-mono">
          No direct job offers received yet.
        </div>
      ) : (
        <div className="space-y-3">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">
                    From: {offer.clientName || offer.clientEmail}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded flex items-center gap-0.5">
                    <FaDollarSign size={9} /> {offer.budget}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      offer.status === "accepted"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                        : offer.status === "rejected"
                          ? "bg-rose-950 text-rose-400 border border-rose-900"
                          : "bg-amber-950/60 text-amber-400 border border-amber-900/50"
                    }`}
                  >
                    {offer.status || "pending"}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  "{offer.message}"
                </p>

                <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <FaClock size={9} /> Sent on:{" "}
                  {new Date(offer.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              {offer.status === "pending" && (
                <div className="flex items-center gap-2 shrink-0">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer">
                    <FaCheck size={10} /> Accept
                  </button>
                  <button className="bg-slate-950 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 text-rose-400 p-2.5 rounded-xl transition-all cursor-pointer">
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
