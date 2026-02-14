import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joy Exchange | Gift Card Buyback",
  description:
    "Joy Exchange is a modern gift card desk with real-time rates, smart dashboards, and managed submissions.",
  icons: {
    icon: "/brand-logo.png",
    shortcut: "/brand-logo.png",
    apple: "/brand-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased text-slate-900`}
      >
        <Script id="performance-measure-guard" strategy="beforeInteractive">
          {`
            (() => {
              if (typeof performance === "undefined" || typeof performance.measure !== "function") {
                return;
              }
              const originalMeasure = performance.measure.bind(performance);
              performance.measure = function patchedMeasure(name, optionsOrStart, endMark) {
                try {
                  if (optionsOrStart && typeof optionsOrStart === "object") {
                    const normalized = { ...optionsOrStart };
                    if (typeof normalized.start === "number" && normalized.start < 0) {
                      normalized.start = 0;
                    }
                    if (typeof normalized.end === "number" && normalized.end < 0) {
                      normalized.end = 0;
                    }
                    if (
                      typeof normalized.start === "number" &&
                      typeof normalized.end === "number" &&
                      normalized.start > normalized.end
                    ) {
                      normalized.start = normalized.end;
                    }
                    return originalMeasure(name, normalized);
                  }
                  if (typeof endMark === "number" && endMark < 0) {
                    endMark = 0;
                  }
                  return originalMeasure(name, optionsOrStart, endMark);
                } catch (error) {
                  if (
                    error &&
                    typeof error === "object" &&
                    "message" in error &&
                    typeof error.message === "string" &&
                    error.message.includes("cannot have a negative time stamp")
                  ) {
                    return;
                  }
                  throw error;
                }
              };
            })();
          `}
        </Script>
        <div className="market-glow min-h-screen">{children}</div>
      </body>
    </html>
  );
}
