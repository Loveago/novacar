import SiteShell from "@/components/SiteShell";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guards";
import { formatDateTime } from "@/lib/format";
import { sendMessageToAdmin } from "@/app/actions/messages";

export default async function SupportPage() {
  const session = await requireAuth();
  const userId = (session.user as { id?: string }).id ?? "";

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
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 sm:rounded-3xl sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Support
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
            Chat with admin
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Send a message and we&apos;ll get back to you as soon as possible.
          </p>

          <div className="mt-4 max-h-[50vh] space-y-3 overflow-y-auto rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 sm:mt-6 sm:max-h-[420px] sm:p-4">
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

          <form className="mt-3 flex gap-2 sm:mt-4 sm:gap-3" action={sendMessageToAdmin}>
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
