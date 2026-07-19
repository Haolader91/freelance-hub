// src/lib/api.ts

export interface JobCard {
  _id: string;
  title: string;
  type: string;
  applicants?: number;
  status: "Active" | "Closed" | "Draft";
  clientEmail: string;
  [key: string]: any;
}

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";

export async function getClientPostedJobs(email: string): Promise<JobCard[]> {
  if (!email) return [];

  try {
    const response = await fetch(
      `${baseUrl}/api/client/my-jobs?email=${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs from backend server");
    }

    const data = await response.json();
    return data.success ? data.jobsCard : [];
  } catch (error) {
    console.error("Error in getClientPostedJobs helper:", error);
    throw error;
  }
}
