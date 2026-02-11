import SiteShell from "@/components/SiteShell";
import { updateUser } from "@/app/actions/users";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 sm:rounded-3xl sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Admin users
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
            Manage users
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track seller volume, status, and verification level.
          </p>

          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 sm:rounded-3xl sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {user.name ?? "Unnamed user"}
                    </p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                    {user.role}
                  </span>
                </div>
                <form
                  action={updateUser}
                  className="mt-4 grid gap-4 md:grid-cols-2"
                >
                  <input type="hidden" name="id" value={user.id} />
                  <input
                    name="name"
                    defaultValue={user.name ?? ""}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <input
                    name="email"
                    defaultValue={user.email}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <select
                    name="role"
                    defaultValue={user.role}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <input
                    name="paymentDetails"
                    defaultValue={user.paymentDetails ?? ""}
                    placeholder="Payment details"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 md:col-span-2">
                    Update user
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
