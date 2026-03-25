import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import settings from "@/../content/settings.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://letampon2026.com";
const ogImage = "https://letampon2026.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-17-at-21.14.16.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alexis Chaussalet — Le Tampon 2026",
    template: "%s | Alexis Chaussalet – Le Tampon 2026",
  },
  description:
    "Nout' voix, nout' l'avenir — Ensemble pour Le Tampon, ensemble pour l'avenir. Découvrez le programme, la liste des 55 colistiers et les actualités de la campagne municipale 2026 à Le Tampon (La Réunion).",
  keywords: [
    "Le Tampon",
    "municipales 2026",
    "Alexis Chaussalet",
    "La Réunion",
    "élections municipales",
    "programme politique",
    "liste électorale",
    "colistiers",
    "974",
    "campagne électorale",
  ],
  authors: [{ name: "Alexis Chaussalet", url: siteUrl }],
  creator: "Alexis Chaussalet",
  publisher: "Le Tampon 2026",
  category: "politics",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Alexis Chaussalet – Le Tampon 2026",
    title: "Alexis Chaussalet — Le Tampon 2026",
    description:
      "Nout' voix, nout' l'avenir — Découvrez le programme et la liste de la campagne municipale 2026 à Le Tampon.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Alexis Chaussalet – Le Tampon 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis Chaussalet — Le Tampon 2026",
    description: "Nout' voix, nout' l'avenir — Campagne municipale 2026 à Le Tampon, La Réunion.",
    images: [ogImage],
    site: "@letampon2026",
    creator: "@letampon2026",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "https://letampon2026.com/wp-content/uploads/2025/10/cropped-Alexis-scaled-1-192x192.png",
    apple: "https://letampon2026.com/wp-content/uploads/2025/10/cropped-Alexis-scaled-1-192x192.png",
    shortcut: "https://letampon2026.com/wp-content/uploads/2025/10/cropped-Alexis-scaled-1-192x192.png",
  },
  verification: {
    // google: "VOTRE_CODE_GOOGLE_SEARCH_CONSOLE", // à décommenter après vérification
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">

        {/* ─── CADRE TEST ─── barres latérales fixes */}
        <div aria-hidden style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '3px', background: '#ffffff', zIndex: 9999, pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '3px', background: '#ffffff', zIndex: 9999, pointerEvents: 'none' }} />

        {/* Logo banner — défile naturellement avec la page */}
        <Link href="/" className="block w-full bg-white">
          <Image
            src="https://letampon2026.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-17-at-21.14.16.jpeg"
            alt={settings.siteName}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
            unoptimized
          />
        </Link>

        {/* ─── WRAPPER STICKY : barre top + navigation ─── */}
        <div style={{ position: 'sticky', top: 0, zIndex: 9999 }}>
          {/* ─── BARRE TOP ─── */}
          <div
            style={{
              background: '#0a0a0a',
              borderBottom: '2px solid #222',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            }}
            className="px-4 sm:px-6 py-2.5"
          >
            {/* Ligne 1 : titre central */}
            <div className="flex items-center justify-between gap-4">
              <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ef4444', fontWeight: 700 }}>
                ⚠ Site test
              </span>
              <a
                href="https://christendijoux.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', fontWeight: 700, textDecoration: 'none' }}
              >
                Christen Dijoux
              </a>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', opacity: 0.4 }}>
                Non officiel
              </span>
            </div>
            {/* Ligne 2 : avertissement */}
            <p style={{ fontSize: '10px', color: '#aaa', textAlign: 'center', marginTop: '3px', letterSpacing: '0.05em' }}>
              Reproduction non commerciale · Contenu appartenant à ses auteurs · Réalisé à titre de démonstration technique uniquement
            </p>
          </div>
          <Header />
        </div>
        <RevealObserver />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
