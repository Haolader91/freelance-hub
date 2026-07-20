import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, reply: "GROQ_API_KEY is missing in .env file." },
        { status: 500 },
      );
    }

    const systemPrompt = `You are FreelanceHub AI Assistant, an intelligent agentic helper for a freelance marketplace platform. 
    Help users with finding jobs, submitting proposals, hiring freelancers, and navigating the platform.
    Keep your answers concise, professional, and friendly. User query: ${message}`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, reply: data?.error?.message || "API Error" },
        { status: 500 },
      );
    }

    const replyText =
      data?.choices?.[0]?.message?.content ||
      "Hello! How can I help you with FreelanceHub today?";

    return NextResponse.json({ success: true, reply: replyText });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, reply: "Server connection failed." },
      { status: 500 },
    );
  }
}
