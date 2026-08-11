"use client";

import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";

const MAX_FILE_BYTES = 10 * 1024 * 1024;

export default function ContactForm({
  dict,
  lang,
}: {
  dict: Dict;
  lang: Locale;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("document");
    if (file instanceof File && file.size > 0 && file.size > MAX_FILE_BYTES) {
      setFileError(dict.contact.form.fileTooBig);
      return;
    }
    setFileError("");
    formData.set("lang", lang);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setFileName("");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-primary-soft bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  return (
    <div className="rounded-2xl border border-primary-soft bg-white p-6 shadow-sm sm:p-8">
      {status === "sent" ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p className="font-serif text-lg font-bold">{dict.contact.form.success}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-semibold text-primary-dark transition hover:text-ink"
          >
            ← {dict.nav.contact}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                {dict.contact.form.name}
              </label>
              <input
                id="name"
                name="name"
                required
                className={inputClass}
                placeholder={dict.contact.form.name}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                {dict.contact.form.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="vous@exemple.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
              {dict.contact.form.subject}
            </label>
            <select
              id="subject"
              name="subject"
              required
              className={`${inputClass} appearance-none bg-white`}
            >
              <option value="" disabled selected>
                {dict.contact.form.subjectPlaceholder}
              </option>
              {dict.contact.form.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              {dict.contact.form.message}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="document" className="mb-1.5 block text-sm font-medium">
              {dict.contact.form.document}
            </label>
            <label
              htmlFor="document"
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-primary-soft bg-primary-soft/30 px-4 py-3 text-sm text-muted transition hover:border-primary-dark hover:bg-primary-soft/50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-primary-dark">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              <span className="truncate">
                {fileName || dict.contact.form.documentHint}
              </span>
              <span className="sr-only">{dict.contact.form.document}</span>
            </label>
            <input
              id="document"
              name="document"
              type="file"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFileName(file ? file.name : "");
                if (file && file.size > MAX_FILE_BYTES) {
                  setFileError(dict.contact.form.fileTooBig);
                } else {
                  setFileError("");
                }
              }}
            />
            {fileError ? (
              <p className="mt-1.5 text-xs text-red-600">{fileError}</p>
            ) : (
              <p className="mt-1.5 text-xs text-muted">
                {dict.contact.form.documentHint}
              </p>
            )}
          </div>
          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {dict.contact.form.error}
            </div>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-primary-dark px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? dict.contact.form.sending : dict.contact.form.send}
          </button>
        </form>
      )}
    </div>
  );
}
