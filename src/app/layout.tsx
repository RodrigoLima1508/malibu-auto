import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malibu Automotiva | Funilaria, Pintura e Recuperação Automotiva",
  description:
    "Especialistas em recuperação automotiva de alta qualidade. Funilaria, pintura, polimento, vitrificação e muito mais. Solicite seu orçamento agora!",
  keywords: [
    "funilaria",
    "pintura automotiva",
    "polimento",
    "vitrificação",
    "recuperação automotiva",
    "estética automotiva",
    "São Paulo",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--background-card)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
