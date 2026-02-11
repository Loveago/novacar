import Link from "next/link";
import { logoutUser } from "@/app/actions/auth";
import { auth } from "@/lib/auth";
import MobileNav from "./MobileNav";

const publicLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "FAQ", href: "/faq" },
];

const userLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transactions", href: "/transactions" },
  { label: "Profile", href: "/profile" },
  { label: "Support", href: "/support" },
];

const adminLinks = [
  { label: "Admin", href: "/admin" },
  { label: "Gift Cards", href: "/admin/gift-cards" },
  { label: "Submissions", href: "/admin/submissions" },
  { label: "Users", href: "/admin/users" },
  { label: "Messages", href: "/admin/messages" },
];

export default async function TopNav() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const mobileLinks = [
    ...publicLinks,
    ...(session ? userLinks : []),
    ...(isAdmin ? adminLinks : []),
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-sky-500 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 sm:h-10 sm:w-10 sm:rounded-2xl">
            JE
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 sm:text-sm">
              Joy Exchange
            </p>
            <p className="font-[var(--font-space-grotesk)] text-base font-semibold text-slate-900 sm:text-lg">
              Gift Market
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-900">
              {link.label}
            </Link>
          ))}
          {session
            ? userLinks.slice(0, 2).map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-slate-900">
                  {link.label}
                </Link>
              ))
            : null}
          {isAdmin
            ? adminLinks.slice(0, 2).map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-slate-900">
                  {link.label}
                </Link>
              ))
            : null}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-3 lg:flex">
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
            <>
              <Link
                href="/auth/login"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full border border-white/60 bg-gradient-to-r from-cyan-100 via-sky-200 to-indigo-200 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-200/60 transition hover:-translate-y-0.5 hover:shadow-sky-300"
              >
                Create account
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <MobileNav
          links={mobileLinks}
          userName={session?.user?.name ?? session?.user?.email ?? null}
          isLoggedIn={!!session}
        />
      </div>
    </header>
  );
}
