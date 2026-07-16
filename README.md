# Lua Lashes by Sey

Sitio web de Lua Lashes by Sey, publicado en GitHub Pages.

## Despliegue

Cada push a `main` genera una exportación estática de Next.js y la publica mediante GitHub Actions en:

<https://glennndevv.github.io/lua-lashes-by-sey/>

Landing page para los servicios de extensiones de pestañas de Lua Lashes by Sey. Presenta servicios, duraciones aproximadas, galería, experiencia, preguntas frecuentes y un flujo de reserva dentro de la página.

## Agenda de citas

La página incluye una experiencia provisional para elegir servicio, fecha, hora y preparar los datos de la solicitud. Mientras no exista una cuenta de agenda conectada, se informa claramente que la disponibilidad es orientativa y la confirmación se completa por Instagram.

La configuración inicial usa estos valores editables:

- Atención de martes a sábado, de 9:00 a. m. a 6:00 p. m.
- Anticipación mínima de 24 horas.
- Margen de 30 minutos entre citas.
- Eventos de Cal.com con los slugs `clasicas`, `hibridas`, `volumen` y `retoques`.

Para activar reservas reales dentro de la página:

1. Crear la cuenta y los cuatro tipos de evento en Cal.com.
2. Añadir `NEXT_PUBLIC_CAL_USERNAME` como variable del repositorio en GitHub Actions con el nombre de usuario de Cal.com, sin `@`.
3. Volver a ejecutar el despliegue. La sección sustituirá automáticamente el modo provisional por el calendario real de cada servicio.

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

- `app/page.tsx`: servicios, galería, preguntas frecuentes y configuración de reserva.
- `app/booking-experience.tsx`: selección de servicio, fecha, hora, datos y calendario integrado.
- `app/mobile-booking-cta.tsx`: llamada fija móvil que se oculta al entrar en la sección de reserva.
- `app/layout.tsx`: metadatos, canonical y configuración social.
- `app/globals.css`: identidad visual y diseño responsive.
- `public/`: fotografías, fuente autoalojada y tarjeta social.

El enlace provisional está centralizado en `bookingUrl` y la integración real usa `NEXT_PUBLIC_CAL_USERNAME`.
