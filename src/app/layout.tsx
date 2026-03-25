import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import settings from "@/../content/settings.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexis Chaussalet — Le Tampon 2026",
  description: "Nout\u2019 voix, nout\u2019 l\u2019avenir \u2014 Ensemble pour Le Tampon, ensemble pour l\u2019avenir.",
  keywords: ["Le Tampon", "municipales 2026", "Alexis Chaussalet", "R\u00e9union"],
  icons: {
    icon: "https://letampon2026.com/wp-content/uploads/2025/10/cropped-Alexis-scaled-1-192x192.png",
    apple: "https://letampon2026.com/wp-content/uploads/2025/10/cropped-Alexis-scaled-1-192x192.png",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
