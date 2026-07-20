export interface JobCard {
  _id: string;
  title: string;
  shortDesc?: string;
  fullDesc?: string;
  category: string;
  minBudget: number;
  maxBudget: number;
  deadline: string;
  requirements: string[];
  clientName: string;
  clientEmail: string;
  createdAt?: string;
  aiMatchingScore?: number;
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

// Explore page
export async function getAllJobs(): Promise<JobCard[]> {
  try {
    const response = await fetch(`${baseUrl}/api/client/jobs`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch all jobs from backend server");
    }

    const data = await response.json();

    return data.success ? data.jobsCard : [];
  } catch (error) {
    console.error("Error in getAllJobs helper:", error);
    return [];
  }
}

// Explore details page
export async function getJobById(id: string): Promise<JobCard | null> {
  if (!id) return null;

  try {
    const response = await fetch(`${baseUrl}/api/client/jobs/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch job details. Status: ${response.status}`);
      return null;
    }

    const data = await response.json();

    return data.success ? data.job : null;
  } catch (error) {
    console.error("Error in getJobById helper:", error);
    return null;
  }
}

// ====================view clint page all application===================================
export async function getClientApplications(email: string) {
  try {
    const response = await fetch(
      `${baseUrl}/api/client/applications?email=${email}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { success: false, applications: [] };
  }
}
