"use client";

export default function Stats() {
  const stats = [
    { value: "98%", label: "AI Matching Accuracy" },
    { value: "250K+", label: "Proposals Generated" },
    { value: "$12M+", label: "$12M+ Freelancer Earnings" },
    { value: "15ms", label: "Agent Response Time" },
  ];

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm shadow-md shadow-slate-950/40">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-2 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-500 mb-2 tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
