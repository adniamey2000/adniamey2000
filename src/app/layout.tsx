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
    "Niamey 2000",
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
        url: "/og-default.jpg",
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
    images: ["/og-default.jpg"],
  },
  other: {
    "theme-color": "#5256C7",
  },
  alternates: {
    canonical: "https://adniamey2000.vercel.app/fr",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${lora.variable} antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#5256C7" />
        <meta name="contact" content="adniamey2000@gmail.com" />
        <meta name="google-site-verification" content="TXAQ3P0aYcCFOJvZrrDnxQY0V4OTXJi_jlY0TxlCGeU" />
        <meta name="msvalidate.01" content="C1B2B591B7E5F16F07AF49BCF2784DFC" />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
