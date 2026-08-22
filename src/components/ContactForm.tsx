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
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  function showToast(type: "success" | "error") {
    setToast(type);
    setTimeout(() => setToast(null), 3500);
  }

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
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();
      form.reset();
      setFileName("");
      showToast("success");
    } catch {
      showToast("error");
    } finally {
      setSending(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-primary-soft bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  return (
    <div className="relative rounded-2xl border border-primary-soft bg-white p-6 shadow-sm sm:p-8">
      {/* Toast */}
      {toast && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl"
          style={{ animation: "fadeIn 0.15s ease-out" }}
        >
          <div
            className={`pointer-events-auto flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-2xl ${
              toast === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast === "success" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            {toast === "success" ? dict.contact.form.success : dict.contact.form.error}
          </div>
        </div>
      )}

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
              {fileName || "Choisir un fichier…"}
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
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-primary-dark px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {sending ? dict.contact.form.sending : dict.contact.form.send}
        </button>
      </form>
    </div>
  );
}
