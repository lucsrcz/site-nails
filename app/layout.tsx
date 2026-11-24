import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Rosé — Nail Studio Minimalista",
  description:
    "Nail studio minimalista especializado em esmaltação em gel, alongamento natural e nail art autoral.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
