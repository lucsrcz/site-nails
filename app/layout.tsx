import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nayara Oliveira Estúdio — Fibra de Vidro, Molde F1 & Gel",
  description:
    "Nayara Oliveira Estúdio (@nayara_designernail): especialista em fibra de vidro, método molde F1, esmaltação em gel, blindagem e curso Florescendo no Molde F1.",
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
