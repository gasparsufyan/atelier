import type { Metadata } from "next";
import { fontClassNames } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier",
  description:
    "A living preview for discovery phases. Explore core aesthetics, light/dark themes, and typography, then export your chosen direction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontClassNames} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
