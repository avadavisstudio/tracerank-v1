"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  email: string;
  company: string;
  productName: string;
  firstValueEvent: string;
  file: File | null;
};

type AuditUploadFormProps = {
  paymentSessionId: string;
};

export default function AuditUploadForm({
  paymentSessionId,
}: AuditUploadFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    email: "",
    company: "",
    productName: "",
    firstValueEvent: "",
    file: null,
  });

  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentVerified = Boolean(paymentSessionId);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!paymentVerified) {
      setStatus("Payment verification is required before intake.");
      return;
    }

    if (!form.file) {
      setStatus("Please attach a CSV file.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Uploading CSV...");

    try {
      const body = new FormData();
      body.append("email", form.email);
      body.append("company", form.company);
      body.append("productName", form.productName);
      body.append("firstValueEvent", form.firstValueEvent);
      body.append("paymentSessionId", paymentSessionId);
      body.append("file", form.file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData?.error || "Upload failed.");
      }

      const auditId = uploadData?.auditId;

      if (!auditId) {
        throw new Error("Upload succeeded but audit ID was missing.");
      }

      setStatus("Running analysis...");

      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auditId }),
      });

      const analyzeData = await analyzeResponse.json();

      if (!analyzeResponse.ok) {
        throw new Error(analyzeData?.error || "Analysis failed.");
      }

      setStatus("Analysis complete.");
      router.push(`/audit/${auditId}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!paymentVerified ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-700">
            Payment verification is required before submitting intake.
          </p>
          <p className="mt-2 text-sm leading-6 text-red-600">
            Return to checkout and complete payment first.
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Work email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Company
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Product name
          </label>
          <input
            type="text"
            value={form.productName}
            onChange={(e) => updateField("productName", e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            placeholder="Your product"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            First value event
          </label>
          <input
            type="text"
            required
            value={form.firstValueEvent}
            onChange={(e) => updateField("firstValueEvent", e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            placeholder="first_output"
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label className="block text-sm font-medium text-neutral-800">
            Journey CSV
          </label>
          <a
            href="/sample-tracerank-events.csv"
            download
            className="text-sm font-medium text-black underline underline-offset-4"
          >
            Download sample CSV
          </a>
        </div>

        <input
          type="file"
          accept=".csv,text/csv"
          required
          disabled={!paymentVerified}
          onChange={(e) => updateField("file", e.target.files?.[0] || null)}
          className="block w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-medium file:text-white disabled:opacity-60"
        />
        <p className="mt-2 text-sm text-neutral-500">
          Required columns: user_id, session_id, event_name, stage, occurred_at
        </p>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
        <p className="text-sm font-medium text-neutral-800">Founding Audit</p>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          One journey upload. One diagnostic pass. One ranked activation readout.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting || !paymentVerified}
          className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Processing..." : "Submit audit intake"}
        </button>

        <p className="text-sm text-neutral-700">{status}</p>
      </div>
    </form>
  );
}
