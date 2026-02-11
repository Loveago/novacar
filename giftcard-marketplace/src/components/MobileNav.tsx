"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string };

type MobileNavProps = {
  links: NavLink[];
  userName?: string | null;
  isLoggedIn: boolean;
};

export default function MobileNav({ links, userName, isLoggedIn }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const panel = mounted
    ? createPortal(
        <div
          className={`fixed inset-0 z-50 transition duration-300 ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />
          <div
            className={`absolute inset-0 flex h-full w-full flex-col overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_30px_120px_rgba(2,6,23,0.6)] transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-xs font-semibold text-white">
                  NC
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Novacard</p>
                  <p className="text-base font-semibold tracking-wide">Market</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/40 hover:text-white"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isLoggedIn && userName && (
              <div className="border-b border-white/10 px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Signed in as</p>
                <p className="mt-1 text-sm font-semibold text-white">{userName}</p>
              </div>
            )}

            <nav className="flex-1 px-5 py-6">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">Navigation</p>
              <div className="mt-4 space-y-3">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`group flex items-center justify-between rounded-2xl border px-4 py-3 text-base font-semibold transition-all duration-200 ${
                        active
                          ? "border-white bg-white text-slate-900 shadow-xl shadow-white/30"
                          : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`h-4 w-4 transition-transform duration-200 ${
                          active ? "text-slate-900" : "text-white/60 group-hover:translate-x-1"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="border-t border-white/10 px-5 py-6 space-y-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center justify-center rounded-full border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                  >
                    My account
                  </Link>
                  <form action="/api/auth/signout" method="POST">
                    <button className="w-full rounded-full border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="flex w-full items-center justify-center rounded-full border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-white/30 transition hover:-translate-y-0.5"
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <div className="flex w-5 flex-col items-center gap-[5px]">
          <span
            className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {panel}
    </div>
  );
}
