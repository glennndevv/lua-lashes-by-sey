# Lua Lashes by Sey

Sitio web de Lua Lashes by Sey, publicado en GitHub Pages.

## Despliegue

Cada push a `main` genera una exportación estática de Next.js y la publica mediante GitHub Actions en:

<https://glennndevv.github.io/lua-lashes-by-sey/>

Landing page para los servicios de extensiones de pestañas de Lua Lashes by Sey. Presenta servicios, duraciones aproximadas, galería, experiencia, preguntas frecuentes y un flujo de reserva por Instagram.

## Desarrollo local

Requiere Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Validación

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` genera el build de producción y verifica el HTML renderizado, los metadatos sociales, el contenido de conversión, `robots.txt`, `sitemap.xml` y la ausencia de rutas locales en los activos de fuentes.

## Contenido principal

- `app/page.tsx`: servicios, galería, preguntas frecuentes y enlaces de reserva.
- `app/layout.tsx`: metadatos, canonical y configuración social.
- `app/globals.css`: identidad visual y diseño responsive.
- `public/`: fotografías, fuente autoalojada y tarjeta social.

El enlace de reserva está centralizado en `bookingUrl`, al inicio de `app/page.tsx`.
