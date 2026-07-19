"use server";

export interface JobPostData {
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  minBudget: number;
  maxBudget: number;
  deadline: string;
  requirements: string[];
  clientName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";

export const createJob = async (newJobData: JobPostData) => {
  try {
    const res = await fetch(`${baseUrl}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJobData),
    });

    if (!res.ok) {
      throw new Error("Failed to post job to the backend engine");
    }

    return await res.json();
  } catch (error) {
    console.error("[SERVER ACTION ERROR]: Job creation pipeline failed", error);
    return { error: (error as Error).message };
  }
};
