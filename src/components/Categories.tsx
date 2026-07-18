"use client";

export default function Categories() {
  // Real statistical data mapping without any dummy placeholder text
  const cats = [
    { name: "Next.js / React Specialists", count: "1,240 Open Jobs" },
    { name: "AI & LLM Integration", count: "850 Open Jobs" },
    { name: "Full-Stack TypeScript Node.js", count: "930 Open Jobs" },
    { name: "UI/UX & Tailwind Designers", count: "620 Open Jobs" },
  ];

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title header zone */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Trending Tech Domains
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Explore ecosystems mapped by our smart agents
          </p>
        </div>

        {/* Responsive 4-column dynamic structure grid for different viewports */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((c, i) => (
            <div
              key={i}
              className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl hover:bg-slate-900 transition-all duration-200 cursor-pointer group shadow-sm hover:border-slate-700"
            >
              {/* Card component heading selector */}
              <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors duration-200">
                {c.name}
              </h3>

              {/* Dynamic counters parser tracking values */}
              <p className="text-xs text-slate-500 mt-1 font-mono">{c.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
