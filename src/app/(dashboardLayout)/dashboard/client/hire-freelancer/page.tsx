"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import { getFreelancers } from "@/lib/getApi/jobs";
import OfferModal from "@/components/dashboard/OfferModal";

export default function HireFreelancerPage() {
  const [talents, setTalents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedFreelancer, setSelectedFreelancer] = useState<any | null>(
    null,
  );

  useEffect(() => {
    async function fetchTalents() {
      try {
        setLoading(true);
        const res = await getFreelancers();
        if (res.success) {
          setTalents(res.freelancers || []);
        }
      } catch (error) {
        console.error("Failed to load talents:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTalents();
  }, []);

  const filteredTalents = talents.filter((t) => {
    const query = searchQuery.toLowerCase();

    const nameMatch = t.name ? t.name.toLowerCase().includes(query) : false;
    const emailMatch = t.email ? t.email.toLowerCase().includes(query) : false;
    const roleMatch = t.role ? t.role.toLowerCase().includes(query) : false;

    const titleMatch = t.title ? t.title.toLowerCase().includes(query) : false;
    const skillMatch = Array.isArray(t.skills)
      ? t.skills.some((s: string) => s.toLowerCase().includes(query))
      : false;

    return nameMatch || emailMatch || roleMatch || titleMatch || skillMatch;
  });

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="border-b border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            🤝 Discover Global Talent
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Directly explore premium digital engineers and initiate direct hire
            pipelines.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1 flex items-center">
          <FaSearch className="absolute left-3 text-slate-600 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or role..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-600"
          />
        </div>
        <button className="bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer">
          <FaFilter /> Filter
        </button>
      </div>

      {/* Talents List */}
      {loading ? (
        <div className="text-center py-10 text-xs text-slate-500 font-mono animate-pulse">
          Loading talent directory...
        </div>
      ) : filteredTalents.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-xs font-mono">
          No freelancers match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTalents.map((t) => (
            <div
              key={t._id || t.id}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center font-bold text-slate-300 shrink-0">
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={t.name || "Freelancer"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    t.name?.charAt(0).toUpperCase() || "F"
                  )}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold text-slate-200 truncate">
                    {t.name || "Unnamed Freelancer"}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    {t.email || "No email provided"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono font-bold bg-blue-950/80 text-blue-400 border border-blue-900/40 px-2 py-0.5 rounded-md uppercase">
                      {t.role || "FREELANCER"}
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono">
                      {t.exp || "1+ yrs"} Exp • ${t.hourlyRate || "25"}/hr
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedFreelancer(t)}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-blue-400 p-2.5 rounded-xl transition-all cursor-pointer text-xs flex items-center gap-1.5 font-bold shrink-0"
              >
                <FaPaperPlane size={10} /> Offer
              </button>
            </div>
          ))}
        </div>
      )}

      {/*  Selected Freelancer  */}
      {selectedFreelancer && (
        <OfferModal
          freelancer={selectedFreelancer}
          onClose={() => setSelectedFreelancer(null)}
        />
      )}
    </div>
  );
}
