import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";
import { formatDateTime } from "@/lib/format";

export default async function AdminMessagesPage() {
  const session = await requireAdmin();
  const adminId = session.user.id;

  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: adminId }, { receiverId: adminId }],
    },
    include: { sender: true, receiver: true },
    orderBy: { createdAt: "desc" },
  });

  const conversationMap = new Map<
    string,
    {
      userId: string;
      userName: string;
      userEmail: string;
      lastMessage: string;
      lastAt: Date;
      unread: number;
    }
  >();

  for (const msg of messages) {
    const otherUser =
      msg.senderId === adminId ? msg.receiver : msg.sender;
    const existing = conversationMap.get(otherUser.id);

    if (!existing) {
      const unread =
        msg.senderId !== adminId && !msg.isRead ? 1 : 0;
      conversationMap.set(otherUser.id, {
        userId: otherUser.id,
        userName: otherUser.name ?? otherUser.email,
        userEmail: otherUser.email,
        lastMessage: msg.body,
        lastAt: msg.createdAt,
        unread,
      });
    } else {
      if (msg.senderId !== adminId && !msg.isRead) {
        existing.unread += 1;
      }
    }
  }

  const conversations = Array.from(conversationMap.values());

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Messages
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            All user conversations. Click to view and reply.
          </p>

          <div className="mt-6 space-y-3">
            {conversations.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">
                No messages yet.
              </p>
            )}
            {conversations.map((conv) => (
              <Link
                key={conv.userId}
                href={`/admin/messages/${conv.userId}`}
                className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/80 px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 truncate">
                      {conv.userName}
                    </p>
                    {conv.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{conv.userEmail}</p>
                  <p className="mt-1 truncate text-sm text-slate-600">
                    {conv.lastMessage}
                  </p>
                </div>
                <p className="ml-4 shrink-0 text-xs text-slate-400">
                  {formatDateTime(conv.lastAt)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
