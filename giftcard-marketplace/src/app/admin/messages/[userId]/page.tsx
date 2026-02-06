import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";
import { formatDateTime } from "@/lib/format";
import { sendAdminReply } from "@/app/actions/messages";

export default async function AdminConversationPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const session = await requireAdmin();
  const adminId = (session.user as { id?: string }).id ?? "";
  const { userId } = await params;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return (
      <SiteShell>
        <div className="mx-auto w-full max-w-2xl px-6 pb-24 pt-12 text-center">
          <p className="text-slate-500">User not found.</p>
        </div>
      </SiteShell>
    );
  }

  // Mark unread messages as read directly (not via server action)
  await prisma.message.updateMany({
    where: {
      senderId: userId,
      receiverId: adminId,
      isRead: false,
    },
    data: { isRead: true },
  });

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: adminId },
        { senderId: adminId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-2xl px-6 pb-24 pt-12">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Conversation
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                {user.name ?? user.email}
              </h1>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <Link
              href="/admin/messages"
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300"
            >
              All messages
            </Link>
          </div>

          <div className="mt-6 max-h-[420px] space-y-3 overflow-y-auto rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
            {messages.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">
                No messages in this conversation.
              </p>
            )}
            {messages.map((msg) => {
              const fromAdmin = msg.senderId === adminId;
              return (
                <div
                  key={msg.id}
                  className={`flex ${fromAdmin ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                      fromAdmin
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-900 border border-slate-200/70"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.body}</p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {formatDateTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <form className="mt-4 flex gap-3" action={sendAdminReply}>
            <input type="hidden" name="userId" value={userId} />
            <input
              name="body"
              placeholder="Type your reply…"
              className="flex-1 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
              required
              autoComplete="off"
            />
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
              Reply
            </button>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}
