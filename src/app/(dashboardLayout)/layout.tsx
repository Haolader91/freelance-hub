"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="pt-20 pb-8 px-4 md:pt-8 md:px-8 max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
