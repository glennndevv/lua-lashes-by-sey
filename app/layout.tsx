import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../public/fonts/geist-latin.woff2",
  display: "swap",
  variable: "--font-geist",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const canonicalUrl = new URL(`${siteUrl.replace(/\/$/, "")}/`);
const ogImage = new URL(`${process.env.GITHUB_PAGES === "true" ? "/lua-lashes-by-sey" : ""}/og.png`, canonicalUrl.origin);

export const metadata: Metadata = {
  metadataBase: canonicalUrl,
  title: "Lua Lashes by Sey | Extensiones de pestañas",
  description: "Diseños de pestañas personalizados para resaltar tu mirada. Descubre nuestros servicios y agenda tu cita con Lua Lashes by Sey.",
  applicationName: "Lua Lashes by Sey",
  category: "Belleza",
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Lua Lashes by Sey",
    description: "Tu mirada, tu esencia. Extensiones de pestañas personalizadas.",
    type: "website",
    locale: "es_ES",
    siteName: "Lua Lashes by Sey",
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Lua Lashes by Sey — Tu mirada, tu esencia." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lua Lashes by Sey",
    description: "Tu mirada, tu esencia. Extensiones de pestañas personalizadas.",
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fbf8f3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
