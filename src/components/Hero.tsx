"use client";

import Link from "next/link";

export default function Hero() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[70vh] w-full bg-slate-950 flex flex-col items-center justify-between overflow-hidden border-b border-slate-900 pt-20 pb-8">
      {/* Background Ambient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-6000" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-8000" />

      {/* Main Content Area */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-6 my-auto">
        {/* 1. animated badge */}
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-full text-[11px] font-bold text-blue-400 font-mono tracking-wide backdrop-blur-sm shadow-inner transition-all duration-300 hover:border-blue-500/30">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Next-Gen Agentic AI Matching Ecosystem
        </div>

        {/* 2. Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
          Hire Top Developers Managed by{" "}
          <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-pulse">
            Agentic AI
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed animate-in fade-in slide-in-from-bottom-4 delay-200 duration-700">
          Skip the endless scrolling. Our smart AI Engine analyzes project
          logic, auto-matches perfect tech stacks, and crafts high-converting
          winning proposals instantly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-in fade-in slide-in-from-bottom-3 delay-300 duration-700">
          <Link
            href="/explore"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-950/60 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            Explore Smart Projects
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            Join as Freelancer
          </Link>
        </div>
      </div>

      {/* Scroll Down Button with Click Event */}
      <button
        onClick={scrollToFeatures}
        className="relative z-10 pt-3 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer group focus:outline-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold font-mono group-hover:text-blue-400 transition-colors">
          Discover Features
        </span>
        <div className="w-5 h-8 border-2 border-slate-700 group-hover:border-blue-500 rounded-full flex justify-center p-1 transition-colors">
          <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
}
