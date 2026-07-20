"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { createJob } from "@/lib/actions/jobs";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";

export default function AddProjectPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [category, setCategory] = useState("AI & LLM Integration");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const [reqInput, setReqInput] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleAddRequirement = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (reqInput.trim() && !requirements.includes(reqInput.trim())) {
      setRequirements([...requirements, reqInput.trim()]);
      setReqInput("");
    }
  };

  const handleRemoveRequirement = (indexToRemove: number) => {
    setRequirements(requirements.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !shortDesc.trim() ||
      !fullDesc.trim() ||
      !minBudget ||
      !maxBudget ||
      !deadline
    ) {
      toast.error("Please fill in all required fields.", { theme: "dark" });
      return;
    }

    if (requirements.length === 0) {
      toast.error("Please add at least one Tech Stack Requirement tag.", {
        theme: "dark",
      });
      return;
    }

    setLoading(true);

    try {
      const resData = await createJob({
        title,
        shortDesc,
        fullDesc,
        category,
        minBudget: Number(minBudget),
        maxBudget: Number(maxBudget),
        deadline,
        requirements,
        clientName: session?.user?.name || "Anonymous",
        clientEmail: session?.user?.email,
      });

      if (resData?.error) {
        throw new Error(resData.error);
      }

      toast.success(
        "Project node published successfully into the Database via Action!",
        {
          theme: "dark",
        },
      );

      setTitle("");
      setShortDesc("");
      setFullDesc("");
      setMinBudget("");
      setMaxBudget("");
      setDeadline("");
      setRequirements([]);
    } catch (err: any) {
      console.error("Frontend Submit Error:", err);
      toast.error(
        err.message || "Failed to create project. Please try again.",
        {
          theme: "dark",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
          Authenticating secure routing...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={4000} />

      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="mb-6 pb-4 border-b border-slate-850">
          <h1 className="text-2xl font-extrabold text-slate-100">
            Post a New Smart Project
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish your project requirements seamlessly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build Real-time Agentic AI CRM Canvas"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Short Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="A one-sentence hook displaying in project cards"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Full Technical Overview <span className="text-red-500">*</span>
            </label>
            <textarea
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              rows={6}
              placeholder="Provide a detailed roadmap..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Domain Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
              >
                <option value="AI & LLM Integration">
                  AI & LLM Integration
                </option>
                <option value="Full-Stack TypeScript">
                  Full-Stack TypeScript
                </option>
                <option value="UI/UX & Tailwind">UI/UX & Tailwind</option>
                <option value="Next.js / React Specialists">
                  Next.js / React Specialists
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Target Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Estimated Budget (USD) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                placeholder="Min ($)"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="Max ($)"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Tech Stack Requirements <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddRequirement(e)}
                placeholder="e.g. Next.js"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleAddRequirement()}
                className="bg-slate-800 hover:bg-slate-750 border border-slate-750 text-slate-200 text-xs font-bold px-5 rounded-lg cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {requirements.map((req, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-blue-950/50 border border-blue-900 text-blue-400 px-3 py-1 rounded-lg text-xs font-semibold"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className="text-blue-500 hover:text-blue-300 font-bold ml-1 cursor-pointer"
                  >
                    <IoCloseOutline />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded-lg text-sm shadow-lg shadow-blue-950 flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Publishing via Action..." : "Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
