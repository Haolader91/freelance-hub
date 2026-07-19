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
  clientEmail?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";

export const createJob = async (newJobData: JobPostData) => {
  try {
    const res = await fetch(`${baseUrl}/api/client/jobs`, {
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

export interface ApplicationPostData {
  jobId: string;
  jobTitle: string;
  clientEmail?: string;
  clientName: string;
  applicantEmail: string;
  applicantName: string;
  bidAmount: number;
  serviceCharge: number;
  netEarnings: number;
  coverLetter: string;
  resumeType: "file" | "link";
  resume: string;
  status: string;
  appliedAt: Date;
}

export const createApplication = async (
  newApplicationData: ApplicationPostData,
) => {
  try {
    const res = await fetch(`${baseUrl}/api/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newApplicationData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || "Failed to submit proposal to the backend engine",
      );
    }

    return await res.json();
  } catch (error) {
    console.error(
      "[SERVER ACTION ERROR]: Application submission pipeline failed",
      error,
    );
    return { success: false, message: (error as Error).message };
  }
};
