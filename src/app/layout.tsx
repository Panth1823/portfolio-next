import type { Metadata } from "next";
import { Inter as InterGoogle } from "next/font/google";
import "./globals.css";

const inter = InterGoogle({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio — Journey",
  description:
    "A cinematic scroll-driven portfolio journey showcasing design experience.",
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
      </head>
      <body
        className={`${inter.className} antialiased selection:bg-[#c8ff00] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
