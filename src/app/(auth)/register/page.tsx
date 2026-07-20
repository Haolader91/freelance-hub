"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiCpuChip } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { BiError } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CLIENT" | "FREELANCER">("FREELANCER");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      toast.error("Password is too short.");
      return;
    }

    setError("");
    setLoading(true);

    const { data, error: authError } = await authClient.signUp.email({
      email: email.trim(),
      password: password,
      name: name.trim(),
      role: role,
      callbackURL: "/",
    });

    if (authError) {
      const errorMsg = authError.message || "An error occurred during sign up.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
    } else {
      setLoading(false);
      toast.success("Account created successfully! Welcome");
      setTimeout(() => {
        router.push("/");
      }, 1200);
    }
  };

  const handleSocialLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google authentication failed.");
      toast.error("Google authentication failed.");
    }
  };

  const handleDemoFill = () => {
    if (role === "CLIENT") {
      setName("AK Haolader (Client)");
      setEmail("demo.client@example.com");
      setPassword("DemoPassword123!");
      toast.success("Loaded Client demo credentials!");
    } else {
      setName("AK Haolader");
      setEmail("demo.freelancer@example.com");
      setPassword("DemoPassword123!");
      toast.success("Loaded Freelancer demo credentials!");
    }
    setError("");
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
            Create Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Join the Intelligent Agentic AI Freelance System
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

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>

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
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              Select Your Role <span className="text-blue-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["CLIENT", "FREELANCER"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 text-[11px] font-bold rounded-xl border transition-all uppercase tracking-wide cursor-pointer ${
                    role === r
                      ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-950/50"
                      : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-300 hover:border-slate-800"
                  }`}
                >
                  {r.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2 active:scale-[0.99] cursor-pointer shadow-md shadow-blue-950"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-850"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest font-mono">
            <span className="bg-slate-900 px-3 text-slate-500">
              Or connect via
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={handleSocialLogin}
            type="button"
            className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 text-slate-300 cursor-pointer"
          >
            <FcGoogle />
            Continue with Google
          </button>

          <button
            onClick={handleDemoFill}
            type="button"
            className="w-full bg-slate-950 text-emerald-400 hover:bg-emerald-950/20 border border-emerald-900/40 py-2.5 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer"
          >
            Auto-Fill {role === "CLIENT" ? "Client" : "Freelancer"} Demo
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-400 font-semibold ml-1 transition-colors"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
