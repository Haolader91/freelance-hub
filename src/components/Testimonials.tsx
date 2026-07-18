"use client";

export default function Testimonials() {
  // Global client review feedback dataset structure
  const reviews = [
    {
      name: "Alex R.",
      role: "Enterprise Client",
      text: "The AI Recommendation engine matched the absolute top 3 TypeScript developers to my project within seconds of submission. Eliminated the traditional vetting friction completely!",
    },
    {
      name: "Rahat Khan",
      role: "Full-Stack Engineer",
      text: "The custom proposal generator accelerated my daily workflow immensely. Being able to choose tones and instantly get tailormade cover letters is an absolute game-changer.",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Component layout top title text wrapper */}
        <h2 className="text-center text-2xl font-bold mb-12 text-slate-100 tracking-tight">
          Trusted by Developers Globally
        </h2>

        {/* Dynamic review listing grid for responsive execution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between shadow-sm transition-all duration-200 hover:border-slate-700"
            >
              {/* String feedback parsing render */}
              <p className="text-slate-400 text-sm italic leading-relaxed">
                "{r.text}"
              </p>

              {/* Profile metadata info divider container row */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="font-bold text-slate-200 text-sm">
                  {r.name}
                </span>

                {/* Visual badge indicator parsing roles data */}
                <span className="text-[10px] bg-blue-950 border border-blue-900 px-2 py-0.5 rounded text-blue-400 uppercase font-mono tracking-wider">
                  {r.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
