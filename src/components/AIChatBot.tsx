"use client";

import { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: "user" | "ai"; text: string }>
  >([
    {
      sender: "ai",
      text: "Hi! I am FreelanceHub Agentic AI Assistant. How can I assist you with jobs or hiring today?",
    },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "No response received." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Failed to connect to AI server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 border border-indigo-400/30"
        >
          <FaRobot className="text-xl" />
          <span className="text-xs font-bold font-mono hidden sm:inline">
            AI Agent
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-slate-900 border border-slate-800 w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-200">
          <div className="bg-slate-950 border-b border-slate-800 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
                <FaRobot className="text-indigo-400 text-base" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-100 font-mono">
                  FreelanceHub AI
                </h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  Agentic Assistance
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 p-1"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 rounded-xl ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none whitespace-pre-wrap"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-slate-400 text-[11px] animate-pulse font-mono">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="p-2.5 bg-slate-950 border-t border-slate-800 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask AI agent..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
