export const dynamic = "force-static";

export function GET(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
