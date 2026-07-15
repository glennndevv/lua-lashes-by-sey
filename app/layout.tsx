import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const fallbackOrigin = "http://localhost:3000";

function safeOrigin(host: string | null, forwardedProtocol: string | null) {
  const candidateHost = host?.split(",")[0]?.trim() ?? "localhost:3000";
  const validHost = /^(?:localhost|127\.0\.0\.1|\[::1\]|[a-z0-9.-]+)(?::\d+)?$/i.test(candidateHost)
    ? candidateHost
    : "localhost:3000";
  const candidateProtocol = forwardedProtocol?.split(",")[0]?.trim();
  const protocol = candidateProtocol === "http" || candidateProtocol === "https"
    ? candidateProtocol
    : validHost.startsWith("localhost") || validHost.startsWith("127.0.0.1") || validHost.startsWith("[::1]")
      ? "http"
      : "https";

  try {
    return new URL(`${protocol}://${validHost}`);
  } catch {
    return new URL(fallbackOrigin);
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const origin = safeOrigin(
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"),
    requestHeaders.get("x-forwarded-proto"),
  );
  const canonicalUrl = new URL("/", origin);
  const ogImage = new URL("/og.png", origin);

  return {
    metadataBase: origin,
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
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fbf8f3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
