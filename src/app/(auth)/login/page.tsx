"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiCpuChip } from "react-icons/hi2";
import { BiError } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await signIn.email({
        email: email.trim(),
        password: password,
        callbackURL: "/",
      });

      if (authError) {
        const errorMsg = authError.message || "Invalid email or password.";
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Welcome back! Connecting Node...");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google authentication failed.");
      toast.error("Google authentication failed.");
    }
  };

  // Freelancer Demo Fill
  const handleFreelancerDemo = () => {
    setEmail("demo.freelancer@example.com");
    setPassword("DemoPassword123!");
    setError("");
    toast.success("Loaded Freelancer Demo Credentials!");
  };

  // Client Demo Fill
  const handleClientDemo = () => {
    setEmail("demo.client@example.com");
    setPassword("DemoPassword123!");
    setError("");
    toast.success("Loaded Client Demo Credentials!");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-24 text-white">
      <Link href="/" className="flex items-center gap-2.5 group mb-6">
        <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-600/20 transition-all duration-200">
          <HiCpuChip className="text-blue-400 text-xl" />
        </div>
        <span className="text-xl font-extrabold text-slate-100 tracking-tight font-sans uppercase">
          Freelance<span className="text-blue-400">.Hub</span>
        </span>
      </Link>

      <div className="w-full max-w-md bg-slate-900 border border-slate-850/60 rounded-2xl p-8 shadow-2xl transition-all">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-100">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Log in to access your Intelligent Project Hub
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-950/40 border border-rose-900/50 text-rose-400 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200">
            <span>
              <BiError />
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2 active:scale-[0.99] cursor-pointer shadow-md shadow-blue-950"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Logging in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-850"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest font-mono">
            <span className="bg-slate-900 px-3 text-slate-500">
              Or sign in with
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={handleSocialLogin}
            type="button"
            className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 text-slate-300 cursor-pointer"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Quick Demo Fill Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleFreelancerDemo}
              type="button"
              className="bg-slate-950 text-emerald-400 hover:bg-emerald-950/20 border border-emerald-900/40 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              ⚡ Demo Freelancer
            </button>
            <button
              onClick={handleClientDemo}
              type="button"
              className="bg-slate-950 text-amber-400 hover:bg-amber-950/20 border border-amber-900/40 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              ⚡ Demo Client
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account yet?
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-400 font-semibold ml-1 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
