"use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "info";

let globalToast: {
  show: (message: string, type?: ToastType) => void;
} = { show: () => {} };

export function showToast(message: string, type: ToastType = "success") {
  globalToast.show(message, type);
}

export default function ToastProvider() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("success");

  useEffect(() => {
    globalToast = {
      show(msg: string, t: ToastType = "success") {
        setMessage(msg);
        setType(t);
        setVisible(true);
      },
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-primary-dark",
  };

  const icons = {
    success: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    error: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    info: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  };

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2" style={{ animation: "slideUp 0.2s ease-out" }}>
      <div className={`pointer-events-auto flex items-center gap-3 rounded-full ${colors[type]} px-6 py-3.5 text-sm font-semibold text-white shadow-2xl`}>
        {icons[type]}
        {message}
      </div>
    </div>
  );
}
