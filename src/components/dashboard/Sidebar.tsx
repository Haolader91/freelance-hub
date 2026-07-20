"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { HiCpuChip } from "react-icons/hi2";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const role = (user as any)?.role?.toLowerCase() || "freelancer";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const freelancerLinks = [
    { name: "Overview Dashboard", path: "/dashboard" },

    { name: "💼 Applied Jobs", path: "/dashboard/freelancer/applied-jobs" },
    { name: "🔍 Browse Jobs", path: "/dashboard/freelancer/browse-jobs" },
    { name: "💼 My Proposals", path: "/dashboard/freelancer/my-proposals" },
  ];

  const clientLinks = [
    { name: "Overview Dashboard", path: "/dashboard" },

    { name: "📊 Workspace Analytics", path: "/dashboard/client/analytics" },

    { name: "🤝 Hire Freelancer", path: "/dashboard/client/hire-freelancer" },
    { name: "📁 My Posted Jobs", path: "/dashboard/client/my-posted-jobs" },
    { name: "➕ Post New Job", path: "/dashboard/client/post-job" },
    { name: "👥 View Applicants", path: "/dashboard/client/view-applicants" },
  ];

  const menuItems = role === "client" ? clientLinks : freelancerLinks;

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100";

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/";
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-30">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
            <HiCpuChip className="text-blue-400 text-xl" />
          </div>
          <span className="text-xl font-extrabold text-slate-100 tracking-tight font-sans uppercase">
            Freelance<span className="text-blue-400">.Hub</span>
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-850 rounded-lg cursor-pointer"
        >
          {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-6 shrink-0 z-20
        fixed md:sticky top-0 left-0 h-screen transition-transform duration-300 md:translate-x-0
        ${isOpen ? "translate-x-0 top-14 h-[calc(100vh-3.5rem)]" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="space-y-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group border-b border-slate-850 pb-6"
          >
            <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
              <HiCpuChip className="text-blue-400 text-xl" />
            </div>
            <span className="text-xl font-extrabold text-slate-100 tracking-tight font-sans uppercase">
              Freelance<span className="text-blue-400">.Hub</span>
            </span>
          </Link>

          <div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono mb-3">
              Navigation Links
            </div>

            <nav className="space-y-1">
              {!isPending &&
                menuItems.map((link, idx) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={idx}
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full text-left px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                        isActive
                          ? "bg-slate-800 text-blue-400 border-l-2 border-blue-500"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-850/30"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
            </nav>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-850 space-y-3">
          {isPending ? (
            <div className="flex items-center gap-3 px-2 pb-2 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-slate-800" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-slate-800 rounded-sm w-3/4" />
                <div className="h-2 bg-slate-800 rounded-sm w-1/2" />
              </div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3 px-2">
              <div className="relative w-9 h-9 border border-slate-700 rounded-xl overflow-hidden bg-slate-950">
                <Image
                  src={user.image || defaultAvatar}
                  alt={user.name || "User Avatar"}
                  fill
                  sizes="36px"
                  className="object-cover"
                  priority={true}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate capitalize">
                  {user.name}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-500 truncate">
                  {role === "client" ? "Client Owner" : "Freelancer"}
                </p>
              </div>
            </div>
          ) : (
            <div className="px-2 py-1 text-xs text-slate-500 italic">
              Not signed in
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={isPending}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <FaSignOutAlt className="text-sm" />
            Logout Account
          </button>
        </div>
      </aside>
    </>
  );
}
