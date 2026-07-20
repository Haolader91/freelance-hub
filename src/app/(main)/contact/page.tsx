"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Contact payload structured:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950 border border-blue-900 px-2 py-0.5 rounded uppercase tracking-wider">
              Secure Channel
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 mt-3">
              Get in Touch
            </h1>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Have questions regarding system deployment, account roles, or
              enterprise integration? Drop us a node.
            </p>
          </div>

          <div className="border-t border-slate-900 pt-6 space-y-4">
            <div>
              <h4 className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                Global Inquiries
              </h4>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                support@platform.node
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                Operational Status
              </h4>
              <p className="text-xs text-emerald-400 mt-1 font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                All Systems Fully Operational
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-850 p-6 sm:p-8 rounded-2xl relative">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-950 border border-emerald-900 text-emerald-400 font-bold">
                ✓
              </div>
              <h3 className="text-sm font-bold text-slate-200">
                Message Dispatched
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Your communication has been safely routed to our admin queue.
                We'll respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-mono text-blue-400 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-700 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-700 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="System integration inquiry"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-700 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Provide detailed description..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-700 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-lg shadow-blue-950 mt-2"
              >
                Transmit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
