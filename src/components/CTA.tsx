"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-16 bg-linear-to-b from-slate-950 to-slate-900 border-b border-slate-900 text-center text-white relative overflow-hidden">
      {/* 🔮 Top center glow shadow layout layer element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main core heading text segment mapping */}
        <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
          Ready to Automate Your Workflows?
        </h2>

        {/* Professional contextual summary parsing without placeholder labels */}
        <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
          Sign up today to discover your first AI-matched full-stack project or
          onboard elite remote developers instantly into your technical network.
        </p>

        {/* Active router action navigation link trigger handler */}
        <Link
          href="/signUp"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-950/60 hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer"
        >
          Get Started For Free
        </Link>
      </div>
    </section>
  );
}
