"use client";

import { CalendarDays, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { CALENDLY_URL } from "@/lib/links";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Failed to send message");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <section id="contact" className="bg-offwhite py-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="text-center">
          <p className="eyebrow">Let&apos;s Talk</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Ready to Solve Your Integration Problems?
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-gray-brand sm:text-lg">
            Tell us what you&apos;re dealing with. We&apos;ll respond within one
            business day.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[640px]">
          <div className="rounded-lg border border-iig-border bg-white p-8">
            <CalendarDays size={32} className="text-blue-signal" strokeWidth={1.75} />
            <h3 className="mt-4 font-display text-2xl font-semibold text-navy">
              Schedule a Discovery Call
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-gray-brand">
              30 minutes. No sales pitch. Just an honest conversation about
              your integration challenges.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded bg-blue-signal px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-hover"
            >
              Open Scheduling Link
            </a>
          </div>

          <div className="my-12 flex items-center gap-4">
            <span className="h-px flex-1 bg-iig-border" />
            <span className="text-[13px] text-steel">— or send a message —</span>
            <span className="h-px flex-1 bg-iig-border" />
          </div>

          {status === "success" ? (
            <div className="rounded-lg border border-iig-border bg-white p-8 text-center">
              <CheckCircle size={36} className="mx-auto text-emerald-500" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-2xl font-semibold text-navy">
                Message Sent
              </h3>
              <p className="mt-2 text-[15px] text-gray-brand">
                Thanks — we&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Field
                label="Name"
                name="name"
                type="text"
                required
                autoComplete="name"
              />
              <Field
                label="Organization"
                name="organization"
                type="text"
                required
                autoComplete="organization"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                optional
              />
              <div>
                <label
                  htmlFor="message"
                  className="block text-[13px] font-medium text-navy"
                >
                  What integration challenges are you facing?{" "}
                  <span className="text-blue-signal">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full rounded border border-iig-border bg-white px-4 py-3 text-[15px] text-navy outline-none transition-colors focus:border-blue-signal focus:ring-[3px] focus:ring-blue-signal/10"
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-12 w-full items-center justify-center rounded bg-blue-signal px-5 text-sm font-medium text-white transition-colors hover:bg-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
              {status === "error" && error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  optional,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[13px] font-medium text-navy">
        {label}{" "}
        {required && <span className="text-blue-signal">*</span>}
        {optional && <span className="text-steel"> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded border border-iig-border bg-white px-4 py-3 text-[15px] text-navy outline-none transition-colors focus:border-blue-signal focus:ring-[3px] focus:ring-blue-signal/10"
      />
    </div>
  );
}
