"use client";

import { useState } from "react";
import { contact } from "@/data/portfolio";

/**
 * Contact form with no backend: it opens the visitor's email app with the
 * message already filled in. Swap the submit handler for Formspree/Resend
 * later if you want messages delivered without leaving the page.
 */
export default function ContactForm({ variant = "standard" }: { variant?: "standard" | "matrix" }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\n— ${name}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const matrix = variant === "matrix";
  const label = matrix
    ? "block font-mono-matrix text-matrix-electric-blue text-sm mb-2"
    : "block font-semibold mb-2";
  const input = matrix
    ? "w-full bg-matrix-black/50 border-2 border-matrix-primary-green/30 rounded px-4 py-3 font-mono-matrix text-matrix-light-gray focus:border-matrix-primary-green outline-none transition-all"
    : "w-full rounded-xl bg-surface px-4 py-3 text-ink ring-1 ring-line placeholder:text-lichen/70 transition-shadow hover:ring-pine/50";
  const button = matrix
    ? "w-full py-4 font-mono-matrix border-2 rounded transition-all duration-300 bg-matrix-primary-green/20 border-matrix-primary-green text-matrix-primary-green hover:bg-matrix-primary-green/30 hover:shadow-neon-green"
    : "inline-flex items-center justify-center rounded-full bg-pine px-6 py-3 font-semibold text-on-pine transition-colors hover:bg-ink";

  return (
    <form onSubmit={handleSubmit} className={matrix ? "space-y-6" : "space-y-5"}>
      <div>
        <label htmlFor={`${variant}-name`} className={label}>
          {matrix ? "NAME_INPUT:" : "Your name"}
        </label>
        <input
          id={`${variant}-name`}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={input}
          placeholder={matrix ? "Your name" : "Ana Souza"}
        />
      </div>
      <div>
        <label htmlFor={`${variant}-message`} className={label}>
          {matrix ? "MESSAGE_CONTENT:" : "What's going on?"}
        </label>
        <textarea
          id={`${variant}-message`}
          required
          rows={matrix ? 6 : 5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${input} resize-none`}
          placeholder={matrix ? "What do you need help with?" : "The app deploys but login fails on production…"}
        />
      </div>
      <button type="submit" className={button}>
        {matrix ? "> SEND_MESSAGE" : "Write the email"}
      </button>
      {!matrix && (
        <p className="text-[15px] text-lichen">This opens your email app with the message filled in.</p>
      )}
      {opened && (
        <p className={matrix ? "font-mono-matrix text-sm text-matrix-primary-green" : "text-[15px] text-lichen"} role="status">
          Your email app should open now. If it doesn&apos;t, write to{" "}
          <a href={`mailto:${contact.email}`} className="underline">
            {contact.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
