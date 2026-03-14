"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  productName: string;
  website: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    productName: "",
    website: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus("Submitting...");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Submission failed.");
      }

      setStatus("Inquiry received.");
      setForm({
        name: "",
        email: "",
        company: "",
        productName: "",
        website: "",
        message: "",
      });
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
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Email
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
            placeholder="Product name"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-800">
          Website
        </label>
        <input
          type="url"
          value={form.website}
          onChange={(e) => updateField("website", e.target.value)}
          className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
          placeholder="https://yourcompany.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-800">
          Message
        </label>
        <textarea
          required
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          rows={6}
          className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
          placeholder="Tell me about your product, onboarding flow, or what you want diagnosed."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Send inquiry"}
        </button>

        <p className="text-sm text-neutral-700">{status}</p>
      </div>
    </form>
  );
}
