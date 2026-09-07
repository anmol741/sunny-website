"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type Props = {
  formType: "contact" | "showing";
  listingAddress?: string;
  listingMls?: string;
  onSuccess?: () => void;
  compact?: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({
  formType,
  listingAddress,
  listingMls,
  onSuccess,
  compact = false,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;

    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          formType,
          listingAddress,
          listingMls,
          consent,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
      setConsent(false);
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-6 text-center">
        <p className="font-serif text-xl text-navy">Thank you!</p>
        <p className="mt-2 text-sm text-navy/70">
          Your message has been received. Sunny or a member of his team will
          be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {listingAddress ? (
        <input type="hidden" name="listingAddress" value={listingAddress} />
      ) : null}

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-navy">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-navy/15 bg-white px-3 py-2 text-navy outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-navy">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-md border border-navy/15 bg-white px-3 py-2 text-navy outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-navy/15 bg-white px-3 py-2 text-navy outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          defaultValue={
            formType === "showing" && listingAddress
              ? `I'd like to request a showing for ${listingAddress}.`
              : ""
          }
          className="w-full resize-none rounded-md border border-navy/15 bg-white px-3 py-2 text-navy outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-navy/70">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy/30 text-accent focus:ring-accent"
        />
        <span>
          I agree to be contacted by Century 21 Canada and Sunny Chadha via
          call, email, and text for real estate services. To opt out, you can
          reply &quot;stop&quot; at any time or reply &quot;help&quot; for
          assistance. You can also click the unsubscribe link in the emails.
          Message and data rates may apply. Message frequency may vary.{" "}
          <Link
            href="/privacy-policy"
            className="underline decoration-accent/50 underline-offset-2 hover:text-accent"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {status === "error" ? (
        <p className="text-sm text-red-600">
          Something went wrong sending your message. Please try again or call
          the office directly.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting" || !consent}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting"
          ? "Sending..."
          : formType === "showing"
            ? "Request Showing"
            : "Send Message"}
      </button>
    </form>
  );
}
