"use client";

import { useState } from "react";
import type { Dictionary } from "@/data/ui";

/**
 * Contact form backed by Netlify Forms. Netlify detects the form from the
 * static copy in public/__forms.html at deploy time; submissions show up in
 * the Netlify dashboard (Forms) and can be forwarded to email from there.
 * If posting fails (e.g. running locally), the visitor gets the email address.
 */
const FORM_NAME = "contact";
const FORM_ENDPOINT = "/__forms.html";

type Status = "idle" | "sending" | "sent" | "failed";

export default function ContactForm({
  variant = "standard",
  labels,
  email,
}: {
  variant?: "standard" | "matrix";
  labels: Dictionary["contact"]["form"];
  email: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const matrix = variant === "matrix";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const label = matrix ? "block font-mono-matrix text-matrix-highlight text-sm mb-2" : "block font-semibold mb-2";
  const input = matrix
    ? "w-full bg-matrix-black/50 border-2 border-matrix-accent/30 rounded px-4 py-3 font-mono-matrix text-matrix-light-gray focus:border-matrix-accent outline-none transition-all"
    : "w-full rounded-xl bg-surface px-4 py-3 text-ink ring-1 ring-line placeholder:text-lichen/70 transition-shadow hover:ring-pine/50";
  const button = matrix
    ? "w-full py-4 font-mono-matrix border-2 rounded transition-all duration-300 bg-matrix-accent/20 border-matrix-accent text-matrix-accent hover:bg-matrix-accent/30 hover:shadow-phosphor disabled:opacity-60"
    : "inline-flex items-center justify-center rounded-full bg-pine px-6 py-3 font-semibold text-on-pine transition-colors hover:bg-ink disabled:opacity-60";
  const note = matrix ? "font-mono-matrix text-sm" : "text-[15px]";
  const id = (field: string) => `${variant}-${field}`;

  return (
    <form
      id="contact-form"
      name={FORM_NAME}
      method="POST"
      onSubmit={handleSubmit}
      className={matrix ? "scroll-mt-24 space-y-6" : "scroll-mt-24 space-y-5"}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Honeypot: hidden from people, bots tend to fill it in. */}
      <p className="hidden">
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor={id("name")} className={label}>
          {labels.name}
        </label>
        <input
          id={id("name")}
          name="name"
          type="text"
          required
          autoComplete="name"
          className={input}
          placeholder={labels.namePlaceholder}
        />
      </div>
      <div>
        <label htmlFor={id("email")} className={label}>
          {labels.email}
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          required
          autoComplete="email"
          className={input}
          placeholder={labels.emailPlaceholder}
        />
      </div>
      <div>
        <label htmlFor={id("message")} className={label}>
          {labels.message}
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={matrix ? 6 : 5}
          className={`${input} resize-none`}
          placeholder={labels.messagePlaceholder}
        />
      </div>

      <div>
        <label htmlFor={id("repo")} className={label}>
          {labels.repo}
        </label>
        <input id={id("repo")} name="repo" type="url" className={input} placeholder="https://" />
      </div>

      <div role="status" aria-atomic="true">
        {status === "sent" && (
          <div className={`rounded-lg border px-4 py-3 ${matrix ? "border-matrix-accent/50 bg-matrix-black/80 text-matrix-light-gray" : "border-pine/30 bg-surface text-ink"}`}>
            <p className={matrix ? "font-mono-matrix font-semibold text-matrix-accent" : "font-semibold text-pine"}>
              {labels.sentTitle}
            </p>
            <p className="mt-1">{labels.sent}</p>
          </div>
        )}
      </div>

      <button type="submit" className={button} disabled={status === "sending"}>
        {status === "sending" ? labels.sending : labels.submit}
      </button>

      <div aria-live="polite">
        {status === "failed" && (
          <p className={`${note} ${matrix ? "text-red-400" : "text-ink"}`}>
            {labels.failed}{" "}
            <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4">
              {email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
