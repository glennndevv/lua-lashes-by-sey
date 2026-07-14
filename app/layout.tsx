import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;

  return {
    title: "Lua Lashes by Sey | Extensiones de pestañas",
    description: "Diseños de pestañas personalizados para resaltar tu mirada. Descubre nuestros servicios y agenda tu cita con Lua Lashes by Sey.",
    openGraph: {
      title: "Lua Lashes by Sey",
      description: "Tu mirada, tu esencia. Extensiones de pestañas personalizadas.",
      type: "website",
      images: [{ url: ogImage, width: 1733, height: 909, alt: "Lua Lashes by Sey — Tu mirada, tu esencia." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Lua Lashes by Sey",
      description: "Tu mirada, tu esencia. Extensiones de pestañas personalizadas.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
