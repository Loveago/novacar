export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/80 mt-auto">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Joy Exchange
          </p>
          <p className="mt-2 text-base font-semibold text-slate-900 sm:mt-3 sm:text-lg">
            A modern desk for instant gift card liquidity.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Bank-grade compliance, live FX routing, and lightning payouts across
            Africa, the US, and EU corridors.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Marketplace</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>Live rates</li>
            <li>Seller dashboard</li>
            <li>Security & compliance</li>
            <li>Liquidity partners</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>help@joyexchange.io</li>
            <li>+233 50 112 9032</li>
            <li>Telegram: @joyexchange</li>
            <li>Terms & privacy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/70 py-4 text-center text-xs text-slate-400">
        Built for real-time gift card liquidity. All rights reserved.
      </div>
    </footer>
  );
}
