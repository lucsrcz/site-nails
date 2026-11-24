import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOREN NAILS — Unhas em Gel & Cursos",
  description:
    "LOREN NAILS: unhas em gel de alta precisão e cursos profissionais para nail designers.",
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
