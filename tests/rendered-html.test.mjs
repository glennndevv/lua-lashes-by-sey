import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "https://lua-lashes.example"), {
      headers: {
        accept: pathname.endsWith(".xml") ? "application/xml" : "text/html",
        host: "lua-lashes.example",
        "x-forwarded-host": "lua-lashes.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Lua Lashes landing page with production metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /<title>Lua Lashes by Sey \| Extensiones de pestañas<\/title>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/lua-lashes\.example\/"/i);
  assert.match(html, /<meta property="og:image" content="https:\/\/lua-lashes\.example\/og\.png"/i);
  assert.match(html, /<meta property="og:image:width" content="1200"/i);
  assert.match(html, /<meta property="og:image:height" content="630"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Codex is working/i);
});

test("renders accessible conversion and service content", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Saltar al contenido/i);
  assert.match(html, /Tu mirada,[\s\S]*tu esencia\./i);
  assert.match(html, /Clásicas/);
  assert.match(html, /Híbridas/);
  assert.match(html, /Volumen/);
  assert.match(html, /Retoques/);
  assert.match(html, /Resuelve tus[\s\S]*preguntas\./i);
  assert.match(html, /¿Qué estilo buscas\?/i);
  assert.match(html, /disponibilidad es orientativa/i);
  assert.match(html, /Mar–Sáb/i);
  assert.match(html, /Elegir cita/i);
  assert.match(html, /aria-label="Abrir menú"/i);
  assert.match(html, /lash-detail-480\.webp 480w/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /BeautySalon/);
  assert.match(html, /se abre en una pestaña nueva/i);
});

test("serves crawlable robots and sitemap routes", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  assert.match(robotsResponse.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/lua-lashes\.example\/sitemap\.xml/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /^application\/xml\b/i);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>https:\/\/lua-lashes\.example\/<\/loc>/);
});

test("keeps generated server output free of local filesystem font URLs", async () => {
  const serverBundle = await readFile(new URL("../dist/server/index.js", import.meta.url), "utf8");
  assert.doesNotMatch(serverBundle, /\/Users\//);
});
