import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nayara Oliveira Studio — Fibra de Vidro, Molde F1 & Gel",
  description:
    "Nayara Oliveira Studio (@nayara_designernail): especialista em fibra de vidro, método molde F1, esmaltação em gel, blindagem e cursos.",
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
