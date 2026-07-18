"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { HiCpuChip } from "react-icons/hi2";
import {
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiUser,
  FiX,
  FiLayout,
} from "react-icons/fi";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";

interface UserSession {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: string | null;
  };
}

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession() as {
    data: UserSession | null;
    isPending: boolean;
  };

  const isLoggedIn: boolean = !!session;
  const user = session?.user;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = (): void => setIsOpen(!isOpen);
  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    ...(isMounted && isLoggedIn
      ? [{ name: "Dashboard", href: "/dashboard" }]
      : []),
  ];

  const handleLogout = async (): Promise<void> => {
    try {
      await authClient.signOut();
      toast.success("Disconnected Node successfully!");
      setIsDropdownOpen(false);
      setIsOpen(false);
      router.push("/");
    } catch (error: unknown) {
      toast.error("Failed to disconnect. Try again.");
    }
  };

  const userInitial: string = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950 border-b border-slate-900 backdrop-blur-md bg-opacity-90 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
            <HiCpuChip className="text-blue-400 text-xl" />
          </div>
          <span className="text-xl font-extrabold text-slate-100 tracking-tight font-sans uppercase">
            Freelance<span className="text-blue-400">.Hub</span>
          </span>
        </Link>

        {/*  Desktop Navigation Links*/}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-blue-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* 👤 Desktop Login & User Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          {!isMounted || isPending ? (
            <div className="w-8 h-8 rounded-full bg-slate-900 animate-pulse border border-slate-880" />
          ) : !isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-950 active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 p-1.5 pr-3 bg-slate-900 hover:bg-slate-850 border border-slate-850 rounded-full transition-all focus:outline-none cursor-pointer"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/30 shrink-0 bg-blue-600/20 flex items-center justify-center text-xs font-bold text-blue-400 uppercase">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="user avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    userInitial
                  )}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-slate-200 leading-none capitalize">
                    {user?.name}
                  </p>
                </div>
                <FiChevronDown
                  className={`text-slate-400 text-sm transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-slate-900 border border-slate-850 rounded-2xl shadow-xl p-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-850 mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider">
                      Role Matrix
                    </p>
                    <p className="text-xs font-mono font-bold text-blue-400 mt-0.5 uppercase">
                      {user?.role || "FREELANCER"}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      pathname === "/dashboard"
                        ? "text-blue-400 bg-blue-950/30 border border-blue-900/30"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    <FiLayout
                      className={
                        pathname === "/dashboard"
                          ? "text-blue-400"
                          : "text-slate-400"
                      }
                    />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      pathname.startsWith("/dashboard/profile")
                        ? "text-blue-400 bg-blue-950/30 border border-blue-900/30"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    <FiUser
                      className={
                        pathname.startsWith("/dashboard/profile")
                          ? "text-blue-400"
                          : "text-slate-400"
                      }
                    />
                    <span>My Profile</span>
                  </Link>

                  <div className="h-[1px] bg-slate-850 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-950/30 transition-all text-left cursor-pointer"
                  >
                    <FiLogOut />
                    <span>Disconnect</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 📱 Mobile Menu Icons */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-slate-400 hover:text-slate-200 focus:outline-none p-1 cursor-pointer"
          >
            {isOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-blue-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="h-[1px] bg-slate-900 my-4" />

          {!isMounted || isPending ? (
            <div className="w-full h-10 rounded-xl bg-slate-900 animate-pulse border border-slate-850" />
          ) : !isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={toggleMenu}
                className="w-full text-center text-sm font-bold text-slate-400 hover:text-slate-200 py-2.5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={toggleMenu}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold tracking-wide transition-all"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-1">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-blue-500/30 bg-blue-600/20 flex items-center justify-center text-sm font-bold text-blue-400 uppercase">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="user avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    userInitial
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200 capitalize">
                    {user?.name}
                  </p>
                  <p className="text-xs text-blue-400 uppercase font-mono tracking-wider">
                    {user?.role || "Freelancer"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/dashboard/profile"
                  onClick={toggleMenu}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    pathname.startsWith("/dashboard/profile")
                      ? "bg-blue-950/40 border-blue-500/30 text-blue-400"
                      : "bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-850"
                  }`}
                >
                  <FiUser />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-rose-950/40 hover:bg-rose-900/30 text-rose-400 border border-rose-900/40 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <FiLogOut />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
