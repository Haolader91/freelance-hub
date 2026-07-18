"use client";

import { useState } from "react";

export default function FAQ() {
  // Frequently Asked Questions array structure holding real platform data
  const faqs = [
    {
      q: "How does the Better-Auth mechanism operate?",
      a: "It leverages an ultra-secure, session-based authentication layer directly integrated with the MongoDB cluster, built natively to support scalable multiple system roles.",
    },
    {
      q: "What is the expected win-rate of the AI Proposal Generator?",
      a: "Since the autonomous system cross-references verifiable developer skillsets with specific project logic, conversion rates yield an average 80% increase compared to legacy manual inputs.",
    },
  ];

  // React state hook setup tracking current active selector index
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Component main title header element */}
        <h2 className="text-center text-2xl font-bold mb-10 text-slate-100 tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* Main accordion container stack mapping object array */}
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors duration-200"
            >
              {/* Trigger button handler checking active states dynamically */}
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-6 py-4 font-semibold text-sm flex justify-between items-center text-slate-200 hover:text-white transition-colors duration-200"
              >
                <span>{f.q}</span>
                <span className="text-base font-mono text-slate-400 select-none">
                  {openIdx === i ? "−" : "+"}
                </span>
              </button>

              {/* Conditional render execution parsing open index positions */}
              {openIdx === i && (
                <div className="px-6 pb-4 text-xs text-slate-400 border-t border-slate-850 pt-2 leading-relaxed animate-in fade-in duration-200">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
