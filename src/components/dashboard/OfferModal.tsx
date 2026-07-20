"use client";

import { useState } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { sendDirectOffer } from "@/lib/actions/jobs";
import { toast } from "react-toastify";

interface OfferModalProps {
  freelancer: {
    name?: string;
    email: string;
  };
  onClose: () => void;
}

export default function OfferModal({ freelancer, onClose }: OfferModalProps) {
  const { data: session } = useSession();
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!budget || !message) {
      alert("Please enter budget and project details!");
      return;
    }

    setLoading(true);

    try {
      const res = await sendDirectOffer({
        freelancerEmail: freelancer.email,
        freelancerName: freelancer.name || "Freelancer",
        clientEmail: session?.user?.email || "",
        clientName: session?.user?.name || "Client",
        budget,
        message,
      });

      if (res?.success) {
        toast.success("Direct offer sent successfully to Database! 🎉");
        onClose();
      } else {
        toast.error(res?.message || "Failed to send offer");
      }
    } catch (error) {
      console.error("Failed to submit offer:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-5 space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <FaPaperPlane className="text-blue-400" /> Send Direct Offer
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Target Freelancer Profile Box */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
            {freelancer.name?.charAt(0).toUpperCase() || "F"}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-200 truncate">
              {freelancer.name || "Unnamed Freelancer"}
            </h4>
            <p className="text-[10px] text-slate-500 truncate">
              {freelancer.email}
            </p>
          </div>
        </div>

        {/* Offer Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
              Offer Budget ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 350"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-600 font-mono"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
              Project Description / Proposal Note
            </label>
            <textarea
              rows={3}
              placeholder="Write job details or contract requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-600 resize-none"
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Direct Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
