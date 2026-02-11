import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { faqItems } from "@/data/marketplace";

export default function FaqPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 sm:rounded-3xl sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Help Center
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
            Frequently asked questions
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Everything you need to know about selling gift cards on NovaCard.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-5">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-200/70 bg-white/90 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {item.question}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200/70 bg-slate-900 p-5 text-white sm:mt-10 sm:rounded-3xl sm:p-6">
          <h3 className="text-xl font-semibold">Still need help?</h3>
          <p className="mt-2 text-sm text-slate-200">
            Our support team responds in under 10 minutes during market hours.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
          >
            Contact support
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
