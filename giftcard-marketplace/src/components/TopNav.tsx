import Link from "next/link";
import { logoutUser } from "@/app/actions/auth";
import { auth } from "@/lib/auth";

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Rates", href: "/marketplace#rates" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
];

export default async function TopNav() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white font-semibold">
            NC
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Novacard
            </p>
            <p className="font-[var(--font-space-grotesk)] text-lg font-semibold">
              Market
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link href="/admin" className="transition hover:text-slate-900">
              Admin
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                {session.user.name ?? "My account"}
              </Link>
              <form action={logoutUser}>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 sm:inline-flex"
            >
              Log in
            </Link>
          )}
          <Link
            href={session ? "/dashboard" : "/auth/register"}
            className="rounded-full border border-white/60 bg-gradient-to-r from-cyan-100 via-sky-200 to-indigo-200 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-200/60 transition hover:-translate-y-0.5 hover:shadow-sky-300"
          >
            {session ? "Open dashboard" : "Create account"}
          </Link>
        </div>
      </div>
    </header>
  );
}
