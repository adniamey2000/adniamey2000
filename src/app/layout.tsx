import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://adniamey2000.vercel.app"),
  title: {
    default: "AD Niamey 2000 — Assemblée de Dieu au Niger",
    template: "%s | AD Niamey 2000",
  },
  description:
    "Site officiel de l'Assemblée de Dieu Niamey 2000 — Annoncer la bonne nouvelle de Christ à Niamey, au Niger et au-delà. Culte, prière, enseignement et communion fraternelle.",
  keywords: [
    "église Niamey",
    "Assemblée de Dieu Niger",
    "AD Niamey 2000",
    "culte chrétien Niamey",
    "prière Niger",
    "évangile Niger",
    "Yantala Niamey",
    "église évangélique Niger",
  ],
  authors: [{ name: "AD Niamey 2000" }],
  creator: "AD Niamey 2000",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    siteName: "AD Niamey 2000",
    title: "AD Niamey 2000 — Assemblée de Dieu au Niger",
    description:
      "Site officiel de l'Assemblée de Dieu Niamey 2000 — Annoncer la bonne nouvelle de Christ à Niamey, au Niger et au-delà.",
    url: "https://adniamey2000.vercel.app",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "AD Niamey 2000 — Assemblée de Dieu au Niger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AD Niamey 2000 — Assemblée de Dieu au Niger",
    description:
      "Site officiel de l'Assemblée de Dieu Niamey 2000 — Annoncer la bonne nouvelle de Christ à Niamey, au Niger et au-delà.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://adniamey2000.vercel.app",
    languages: {
      "fr": "https://adniamey2000.vercel.app/fr",
      "en": "https://adniamey2000.vercel.app/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.jpg",
  },
  contact: {
    email: "adniamey2000@gmail.com",
  },
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
