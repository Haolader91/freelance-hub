"use client";

import { getAllJobs, JobCard } from "@/lib/getApi/jobs";
import Link from "next/link";
import { useState, useEffect } from "react";

function CardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 animate-pulse flex flex-col justify-between h-[360px]">
      <div>
        <div className="w-full h-36 bg-slate-800 rounded-lg mb-4"></div>
        <div className="h-4 bg-slate-800 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-slate-800 rounded w-full mb-2"></div>
        <div className="h-3 bg-slate-800 rounded w-5/6 mb-4"></div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-slate-800 rounded w-1/3"></div>
          <div className="h-3 bg-slate-800 rounded w-1/4"></div>
        </div>
        <div className="h-9 bg-slate-800 rounded-lg w-full mt-2"></div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [projects, setProjects] = useState<JobCard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [budgetRange, setBudgetRange] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLiveJobs() {
      try {
        setIsLoading(true);
        const liveJobs = await getAllJobs();
        setProjects(liveJobs);
      } catch (error) {
        console.error("Failed to load global jobs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadLiveJobs();
  }, []);

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.shortDesc?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      let matchesBudget = true;
      const maxBudget = Number(project.maxBudget) || 0;
      if (budgetRange === "low") matchesBudget = maxBudget <= 50;
      if (budgetRange === "high") matchesBudget = maxBudget > 50;

      return matchesSearch && matchesCategory && matchesBudget;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return (
          new Date(b.deadline || "").getTime() -
          new Date(a.createdAt || a.deadline || "").getTime()
        );
      }
      if (sortBy === "aiScore") {
        return (b.aiMatchingScore || 0) - (a.aiMatchingScore || 0);
      }
      if (sortBy === "budget") {
        return (Number(b.maxBudget) || 0) - (Number(a.maxBudget) || 0);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* header*/}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100">
            Explore Smart Projects
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Discover high-converting project nodes curated directly from the
            database ecosystem.
          </p>
        </div>

        {/* Filter */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Search Keywords
            </label>
            <input
              type="text"
              placeholder="e.g. Next.js, AI, Microservices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* filter Category*/}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors text-slate-300"
            >
              <option value="All">All Categories</option>
              <option value="AI & LLM Integration">AI & LLM Integration</option>
              <option value="Full-Stack TypeScript">
                Full-Stack TypeScript
              </option>
              <option value="UI/UX & Tailwind">UI/UX & Tailwind</option>
              <option value="Next.js / React Specialists">
                Next.js / React Specialists
              </option>
            </select>
          </div>

          {/* filter budget */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Budget Range
            </label>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors text-slate-300"
            >
              <option value="All">Any Budget</option>
              <option value="low">Under $50</option>
              <option value="high">Above $50</option>
            </select>
          </div>

          {/* sort filter*/}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors text-slate-300"
            >
              <option value="latest">Latest Posts</option>
              <option value="aiScore">AI Match Score</option>
              <option value="budget">Highest Budget</option>
            </select>
          </div>
        </div>

        {/* main layout */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-900 rounded-xl">
            <p className="text-sm text-slate-500">
              No live database projects found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all h-[360px] relative group"
              >
                <div>
                  {/* image */}
                  <div className="w-full h-32 bg-slate-950 rounded-lg mb-4 border border-slate-850 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-[10px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-900 px-1.5 py-0.5 rounded">
                      🤖 {project.aiMatchingScore || 90}% Match
                    </div>
                    <span className="text-2xl opacity-40">💻</span>
                  </div>

                  {/* title */}
                  <h3 className="text-sm font-bold text-slate-200 line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.shortDesc ||
                      "No project description provided by the client."}
                  </p>
                </div>

                {/* মেটা ইনফো এবং বাটন অ্যাকশন */}
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {/* requirements */}
                    {project.requirements &&
                    Array.isArray(project.requirements) &&
                    project.requirements.length > 0 ? (
                      project.requirements.slice(0, 3).map((req, index) => (
                        <span
                          key={index}
                          className="text-[9px] bg-slate-950 border border-slate-850 text-slate-400 px-2 py-0.5 rounded truncate max-w-[100px]"
                        >
                          {req}
                        </span>
                      ))
                    ) : (
                      <span className="text-[9px] bg-slate-950 border border-slate-850 text-slate-500 px-2 py-0.5 rounded">
                        General Requirements
                      </span>
                    )}
                  </div>

                  {/* minBudget এবং maxBudget */}
                  <div className="flex justify-between items-center text-[11px] font-medium pt-2 border-t border-slate-850 text-slate-400">
                    <span className="text-emerald-400 font-bold">
                      ${project.minBudget || 0} - ${project.maxBudget || 0}
                    </span>
                    <span className="max-w-25 truncate text-slate-500">
                      {project.category
                        ? project.category.split(" ")[0]
                        : "General"}
                    </span>
                  </div>

                  <Link
                    href={`/explore/${project._id}`}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-xs transition-colors mt-2 block cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
