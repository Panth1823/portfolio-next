import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeDock from "@/components/ThemeDock";
import AIChatWrapper from "@/components/AIChatWrapper";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL("https://shvetha.com"),
  title: {
    default: "Shvetha's Portfolio",
    template: "%s | Shvetha's Portfolio",
  },
  description:
    "A cinematic scroll-driven portfolio journey showcasing design experience.",
  applicationName: "Shvetha's Portfolio",
  authors: [{ name: "Shvetha" }],
  generator: "Next.js",
  keywords: ["Shvetha", "Portfolio", "Product Design", "UX Design"],
  openGraph: {
    title: "Shvetha's Portfolio",
    description: "A cinematic scroll-driven portfolio journey showcasing design experience.",
    url: "https://shvetha.com",
    siteName: "Shvetha's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shvetha's Portfolio",
    description: "A cinematic scroll-driven portfolio journey showcasing design experience.",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Prevent flash: read theme from localStorage before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${manrope.className} ${manrope.variable} antialiased selection:bg-[#c8ff00] selection:text-black`}
      >
        <ThemeDock />
        <AIChatWrapper />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
