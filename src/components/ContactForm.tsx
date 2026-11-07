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
    : "block text-sm font-medium text-[#D1D1D1] mb-1";
  const input = matrix
    ? "w-full bg-matrix-black/50 border-2 border-matrix-primary-green/30 rounded px-4 py-3 font-mono-matrix text-matrix-light-gray focus:border-matrix-primary-green outline-none transition-all"
    : "w-full px-3 py-2 border border-[#00F0FF]/60 rounded-md bg-[#0A0A0A] text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]";
  const button = matrix
    ? "w-full py-4 font-mono-matrix border-2 rounded transition-all duration-300 bg-matrix-primary-green/20 border-matrix-primary-green text-matrix-primary-green hover:bg-matrix-primary-green/30 hover:shadow-neon-green"
    : "w-full bg-[#00F0FF] text-[#0A0A0A] py-2 px-4 rounded-md hover:bg-[#00D1E0] transition-colors duration-200 font-bold";

  return (
    <form onSubmit={handleSubmit} className={matrix ? "space-y-6" : "space-y-4"}>
      <div>
        <label htmlFor={`${variant}-name`} className={label}>
          {matrix ? "NAME_INPUT:" : "Name"}
        </label>
        <input
          id={`${variant}-name`}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={input}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor={`${variant}-message`} className={label}>
          {matrix ? "MESSAGE_CONTENT:" : "Message"}
        </label>
        <textarea
          id={`${variant}-message`}
          required
          rows={matrix ? 6 : 5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${input} resize-none`}
          placeholder="What do you need help with?"
        />
      </div>
      <button type="submit" className={button}>
        {matrix ? "> SEND_MESSAGE" : "Send via email"}
      </button>
      {opened && (
        <p className={matrix ? "font-mono-matrix text-sm text-matrix-primary-green" : "text-sm text-[#D1D1D1]"} role="status">
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
