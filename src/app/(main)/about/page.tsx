"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-500/10 w-72 h-72 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent sm:text-5xl">
            Redefining Freelancing Ecosystem
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            We bridge the gap between clients and top-tier talent through
            algorithmic precision and decentralized workspaces.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3">
            <div className="text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
              01 / Matchmaking
            </div>
            <h3 className="text-base font-bold text-slate-200">
              AI-Driven Engine
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No more endless scrolling. Our core matrix maps skills directly to
              operational requirements with up to 98% accuracy.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3">
            <div className="text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
              02 / Workflow
            </div>
            <h3 className="text-base font-bold text-slate-200">
              Structured Nodes
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated dashboards custom-tailored for Freelancers, Clients, and
              Administrators to monitor global project integrity.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3">
            <div className="text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
              03 / Speed
            </div>
            <h3 className="text-base font-bold text-slate-200">
              Real-Time Scaling
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Optimized architectures built on Next.js ensure lightning-fast
              reloads, data handling, and instant proposal actions.
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-slate-900 border border-slate-850 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500/5 w-48 h-48 blur-2xl pointer-events-none" />
          <h2 className="text-lg font-bold text-slate-200 mb-3">
            Our Ultimate Mission
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            We believe that finding work or hiring developers shouldn't be a
            tedious process. By leveraging next-generation web technologies and
            utility frameworks, we build cleaner, faster, and highly transparent
            platforms where businesses grow without boundaries.
          </p>
          <button
            onClick={() => router.push("/explore")}
            className="bg-slate-950 border border-slate-800 hover:border-slate-700 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
          >
            Explore Active Projects
          </button>
        </div>
      </div>
    </div>
  );
}
