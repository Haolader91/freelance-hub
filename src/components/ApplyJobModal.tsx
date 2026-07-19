"use client";

import { useState } from "react";
import { JobCard } from "@/lib/getApi/jobs";
import { FaLink } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { createApplication } from "@/lib/actions/jobs";
import { useSession } from "@/lib/auth-client";
import { IoClose } from "react-icons/io5";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobCard;
}

export default function ApplyJobModal({
  isOpen,
  onClose,
  job,
}: ApplyJobModalProps) {
  const [bidAmount, setBidAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvOption, setCvOption] = useState<"file" | "link">("file");
  const [resumeLink, setResumeLink] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  if (!isOpen) return null;

  // service charge calculator
  const charge = bidAmount ? (Number(bidAmount) * 0.1).toFixed(2) : "0.00";
  const receiveAmount = bidAmount
    ? (Number(bidAmount) * 0.9).toFixed(2)
    : "0.00";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    // user session check
    if (!session?.user) {
      alert("Please log in to submit a proposal.");
      return;
    }

    if (cvOption === "file" && !resumeFile) {
      alert("Please upload your resume file first!");
      return;
    }

    setIsSubmitting(true);

    const applicantEmail = session.user.email || "no-email@example.com";
    const applicantName = session.user.name || "Anonymous User";

    const applicationData = {
      jobId: job._id,
      jobTitle: job.title,
      clientEmail: job.clientEmail || job.email,
      clientName: job.clientName,
      applicantEmail,
      applicantName,
      bidAmount: Number(bidAmount),
      serviceCharge: Number(charge),
      netEarnings: Number(receiveAmount),
      coverLetter,
      resumeType: cvOption,
      resume:
        cvOption === "link"
          ? resumeLink
          : resumeFile?.name || "No file uploaded",
      status: "pending",
      appliedAt: new Date(),
    };

    try {
      // server action
      const data = await createApplication(applicationData);

      if (data.success) {
        alert("Application submitted successfully!");
        setBidAmount("");
        setCoverLetter("");
        setResumeLink("");
        setResumeFile(null);
        onClose();
      } else {
        alert(data.message || "Failed to apply");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="modal-box bg-slate-900 border border-slate-800 text-slate-200 w-full max-w-2xl p-0 overflow-hidden rounded-2xl shadow-2xl">
        {/* header*/}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
          <div className="flex justify-between items-start">
            <div>
              <span className="badge badge-sm bg-blue-500/10 text-blue-400 border-blue-500/20 mb-2 px-2.5 py-2 font-medium">
                Submit a Proposal
              </span>
              <h3 className="font-bold text-xl text-white tracking-tight">
                {job.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <IoClose />
            </button>
          </div>
        </div>

        {/* form*/}
        <form
          onSubmit={handleSubmitApplication}
          className="p-6 space-y-6 max-h-[75vh] overflow-y-auto"
        >
          {/* Budget */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/60">
            <div>
              <span className="block text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Client's Budget
              </span>
              <span className="text-sm font-bold text-emerald-400">
                ${job.minBudget} - ${job.maxBudget}
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Client Name
              </span>
              <span className="text-sm font-bold text-slate-300">
                {job.clientName}
              </span>
            </div>
          </div>

          {/* bit amount */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Bid Details
            </h4>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800 gap-3">
                <div>
                  <span className="block text-sm font-medium text-white">
                    Total Bid Amount
                  </span>
                  <span className="text-xs text-slate-500">
                    Total amount the client will see on your proposal.
                  </span>
                </div>
                <div className="relative rounded-lg shadow-sm w-full sm:w-44">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-500 text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="input input-sm rounded text-center input-bordered bg-slate-950 border-slate-700 text-white w-full pl-7 text-sm focus:border-blue-500 font-semibold"
                    placeholder="0.00"
                    min={job.minBudget}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/20 border border-slate-800/40 border-dashed text-xs text-slate-400">
                <div>
                  <span>10% Platform Service Fee</span>
                </div>
                <span className="font-mono text-slate-500">-${charge}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-sm font-medium text-blue-300">
                <div>
                  <span className="block text-white">You'll Receive</span>
                  <span className="text-xs text-slate-400">
                    The estimated amount you'll receive after fees.
                  </span>
                </div>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  ${receiveAmount}
                </span>
              </div>
            </div>
          </div>

          {/* pdf or link upload button */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Attach Resume / CV
              </h4>
              <div className="tabs tabs-boxed bg-slate-950 border border-slate-800 p-0.5 rounded-lg">
                <button
                  type="button"
                  className={`tab tab-xs rounded-md text-xs font-medium transition-all py-1 px-3 ${cvOption === "file" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}
                  onClick={() => setCvOption("file")}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  className={`tab tab-xs rounded-md text-xs font-medium transition-all py-1 px-3 ${cvOption === "link" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}
                  onClick={() => setCvOption("link")}
                >
                  Live Link
                </button>
              </div>
            </div>

            {/* file upload */}
            {cvOption === "file" && (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-xl cursor-pointer bg-slate-950/40 hover:bg-slate-950/70 hover:border-blue-500/50 transition-all p-4 group">
                  <div className="flex flex-col items-center justify-center pt-2 pb-3 text-center">
                    <MdCloudUpload size={30} />
                    {resumeFile ? (
                      <p className="text-sm font-semibold text-emerald-400 truncate max-w-xs">
                        Selected: {resumeFile.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-xs font-medium text-slate-400 mb-0.5">
                          <span className="text-blue-400 font-semibold">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-[11px] text-slate-600">
                          PDF or DOCX (Max. 5MB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}

            {/* link upload */}
            {cvOption === "link" && (
              <div className="relative rounded-lg shadow-sm w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLink size={14} />
                </div>
                <input
                  type="url"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  className="input input-bordered p-2 bg-slate-950 border-slate-700 text-slate-200 w-full pl-9 text-sm focus:border-blue-500"
                  placeholder="https://drive.google.com/... or https://myportfolio.com/cv"
                  required={cvOption === "link"}
                />
              </div>
            )}
          </div>

          {/* cover latter */}
          <div className="form-control w-full">
            <label className="label px-0 pt-0 pb-2">
              <span className="label-text text-sm font-bold text-slate-400 uppercase tracking-wider">
                Cover Letter
              </span>
            </label>
            <textarea
              placeholder="Introduce yourself and explain why you're the perfect developer for this specific project..."
              className="textarea p-2 rounded-2xl textarea-bordered bg-slate-950 border-slate-700 text-slate-200 w-full h-36 text-sm focus:border-blue-500 focus:outline-none placeholder:text-slate-600 leading-relaxed"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              className="btn bg-slate-800 hover:bg-slate-700 border-none text-slate-300 text-xs px-5 rounded-lg transition-colors font-medium h-10 min-h-0"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn bg-blue-600 hover:bg-blue-700 border-none text-white text-xs px-6 rounded-lg transition-all font-semibold h-10 min-h-0 shadow-lg shadow-blue-600/20 ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending Proposal..." : "Submit Proposal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
