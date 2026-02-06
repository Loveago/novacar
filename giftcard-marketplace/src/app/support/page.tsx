import SiteShell from "@/components/SiteShell";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guards";
import { formatDateTime } from "@/lib/format";
import { sendMessageToAdmin } from "@/app/actions/messages";

export default async function SupportPage() {
  const session = await requireAuth();
  const userId = session.user.id;

  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });

  const messages = admin
    ? await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: admin.id },
            { senderId: admin.id, receiverId: userId },
          ],
        },
        orderBy: { createdAt: "asc" },
      })
    : [];

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-2xl px-6 pb-24 pt-12">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Support
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Chat with admin
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Send a message and we&apos;ll get back to you as soon as possible.
          </p>

          <div className="mt-6 max-h-[420px] space-y-3 overflow-y-auto rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
            {messages.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">
                No messages yet. Start the conversation below.
              </p>
            )}
            {messages.map((msg) => {
              const isMe = msg.senderId === userId;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                      isMe
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-900 border border-slate-200/70"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.body}</p>
                    <p
                      className={`mt-1 text-[10px] ${
                        isMe ? "text-slate-400" : "text-slate-400"
                      }`}
                    >
                      {formatDateTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <form className="mt-4 flex gap-3" action={sendMessageToAdmin}>
            <input
              name="body"
              placeholder="Type your message…"
              className="flex-1 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
              required
              autoComplete="off"
            />
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
              Send
            </button>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}
