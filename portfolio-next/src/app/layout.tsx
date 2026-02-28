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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-background text-foreground antialiased selection:bg-[#c8ff00] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
