"use client";

export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Smart Recommendation",
      desc: "Our intelligent agents analyze developer skills, past reviews, and core preferences to match the absolute perfect projects directly to your ecosystem dashboard.",
    },
    {
      icon: "✍️",
      title: "AI Proposal Generator",
      desc: "Instantly reads comprehensive project documentation, cross-references freelancer portfolio data, and builds high-converting, tailor-made technical proposals.",
    },
    {
      icon: "🎯",
      title: "Strict Stack Validation",
      desc: "Leverages a robust TypeScript-backed verification engine to parse and strictly validate codebase architectural requirements before matching.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-slate-950 text-white border-b border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Core Agentic Features
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto leading-relaxed">
            Unlike traditional freelancing platforms, our ecosystem is driven by
            autonomous, reasoning AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-950/20"
            >
              <div className="text-3xl mb-4 select-none">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-slate-100 tracking-tight">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
