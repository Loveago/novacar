"use client";

import { useState, type InputHTMLAttributes } from "react";

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement>;

export default function PasswordField({ className, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={[className, "pr-12"].filter(Boolean).join(" ")}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-700"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.413-.584M9.88 5.09A9.77 9.77 0 0112 5c5 0 9 4 10 7-0.417 1.251-1.198 2.604-2.286 3.806M6.228 6.228C4.49 7.387 3.24 9.06 2 12c1 3 5 7 10 7a9.77 9.77 0 003.09-.504"
            />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
