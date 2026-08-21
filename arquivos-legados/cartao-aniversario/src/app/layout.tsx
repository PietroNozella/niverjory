import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operação Borahae: Missão Aniversário",
  description:
    "Cartão de aniversário interativo em formato de missão diplomática secreta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
