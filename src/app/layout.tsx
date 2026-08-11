import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AD Niamey 2000",
  description:
    "Site officiel de l'Assemblée de Dieu Niamey 2000 — Annoncer la bonne nouvelle de Christ à Niamey, au Niger et au-delà.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${lora.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
