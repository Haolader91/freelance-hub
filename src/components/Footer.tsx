"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiCpuChip } from "react-icons/hi2";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Structured Footer Links
  const platformLinks: FooterSection = {
    title: "Platform",
    links: [
      { name: "Explore Projects", href: "/explore" },
      { name: "About", href: "/about" },
    ],
  };

  const legalLinks: FooterSection = {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const renderLinks = (section: FooterSection) => (
    <div>
      <h4 className="font-semibold text-slate-200 mb-4 uppercase tracking-wider text-[10px] font-mono">
        {section.title}
      </h4>
      <ul className="space-y-2.5">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-slate-500 hover:text-blue-400 transition-colors duration-200 text-xs"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-14">
      {/* Container aligned perfectly with Navbar (px-6) */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Description */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="p-1.5 bg-blue-600/10 rounded-lg border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
              <HiCpuChip className="text-blue-400 text-base" />
            </div>
            <span className="text-base font-extrabold text-slate-100 tracking-tight font-sans uppercase">
              Freelance<span className="text-blue-400">.Hub</span>
            </span>
          </Link>
          <p className="text-slate-500 leading-relaxed text-xs max-w-xs">
            TypeScript-powered Agentic AI freelance hub built for smart
            ecosystems.
          </p>
        </div>

        {/* Dynamic Sections */}
        {renderLinks(platformLinks)}
        {renderLinks(legalLinks)}

        {/* Contact Info Section */}
        <div>
          <h4 className="font-semibold text-slate-200 mb-4 uppercase tracking-wider text-[10px] font-mono">
            Contact Info
          </h4>
          <ul className="space-y-2 text-xs text-slate-500">
            <li>
              Email:{" "}
              <a
                href="mailto:support@haolader.ai"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                support@haolader.ai
              </a>
            </li>
            <li className="text-slate-500">Mawna, Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-900/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-650 text-[11px]">
        <p>© {year} Freelance.Hub. All rights reserved.</p>
        <p className="text-slate-600/80 font-mono text-[10px]">
          Designed with Premium Minimalist Aesthetic
        </p>
      </div>
    </footer>
  );
}
