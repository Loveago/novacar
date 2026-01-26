import SiteShell from "@/components/SiteShell";

const contactOptions = [
  {
    title: "Live chat",
    detail: "Get instant help via Telegram or in-app chat.",
  },
  {
    title: "Payout support",
    detail: "We resolve payout issues within 2 hours.",
  },
  {
    title: "Compliance desk",
    detail: "Dedicated support for KYC and document review.",
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Contact
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Talk to the NovaCard team
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Reach out for account verification, liquidity partnerships, or
              marketplace support.
            </p>
            <form className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                  placeholder="First name"
                />
                <input
                  className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                  placeholder="Last name"
                />
              </div>
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                placeholder="Work email"
              />
              <textarea
                className="min-h-[120px] w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                placeholder="Tell us what you need"
              />
              <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
                Send message
              </button>
            </form>
          </div>
          <div className="space-y-5">
            {contactOptions.map((option) => (
              <div
                key={option.title}
                className="rounded-3xl border border-slate-200/70 bg-white/90 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {option.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{option.detail}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Support channels
              </p>
              <p className="mt-3 text-sm text-slate-200">
                support@novacard.com · +233 50 112 9032
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Telegram: @novacardmarket
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
