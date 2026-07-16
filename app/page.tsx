import { MobileNav } from "./mobile-nav";
import { BookingExperience, type BookingService } from "./booking-experience";
import { MobileBookingCta } from "./mobile-booking-cta";

const bookingUrl = "https://www.instagram.com/lualashes_by_sey/";
const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME?.trim();
const basePath = process.env.GITHUB_PAGES === "true" ? "/lua-lashes-by-sey" : "";
const asset = (path: string) => `${basePath}${path}`;
const imageSrcSet = (name: string, widths: number[]) => (
  widths.map((width) => `${asset(`/${name}-${width}.webp`)} ${width}w`).join(", ")
);

type ResponsiveImageProps = {
  alt: string;
  fallback: string;
  height: number;
  name: string;
  priority?: boolean;
  sizes: string;
  width: number;
  widths: number[];
};

function ResponsiveImage({ alt, fallback, height, name, priority = false, sizes, width, widths }: ResponsiveImageProps) {
  return (
    <picture>
      <source type="image/webp" srcSet={imageSrcSet(name, widths)} sizes={sizes} />
      <img
        className="media-fill"
        src={asset(fallback)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

const services = [
  {
    id: "clasicas",
    number: "01",
    title: "Clásicas",
    copy: "Una extensión por pestaña natural para un acabado limpio, sutil y elegante.",
    time: "2 h aprox.",
    calSlug: "clasicas",
    slots: ["09:00", "11:30", "14:00", "16:00"],
  },
  {
    id: "hibridas",
    number: "02",
    title: "Híbridas",
    copy: "El equilibrio perfecto entre definición y volumen, diseñado para tu mirada.",
    time: "2 h 15 min aprox.",
    calSlug: "hibridas",
    slots: ["09:00", "12:00", "15:15"],
  },
  {
    id: "volumen",
    number: "03",
    title: "Volumen",
    copy: "Abanicos ligeros y personalizados para una mirada intensa sin perder comodidad.",
    time: "2 h 30 min aprox.",
    calSlug: "volumen",
    slots: ["09:00", "12:15", "15:00"],
  },
  {
    id: "retoques",
    number: "04",
    title: "Retoques",
    copy: "Mantenimiento para conservar la forma, densidad y frescura de tu set.",
    time: "Desde 1 h 15 min",
    calSlug: "retoques",
    slots: ["09:00", "10:45", "12:30", "14:45", "16:30"],
  },
];

const bookingServices: BookingService[] = services.map((service) => ({
  id: service.id,
  title: service.title,
  duration: service.time,
  description: service.copy,
  calSlug: service.calSlug,
  slots: service.slots,
}));

const work = [
  { name: "lash-closeup", fallback: "/lash-closeup.jpg", widths: [480, 800, 1200], width: 1200, height: 1800, alt: "Detalle de pestañas largas y definidas", className: "work-tall work-one" },
  { name: "lash-application", fallback: "/lash-application.jpg", widths: [640, 1000, 1600], width: 1800, height: 1200, alt: "Aplicación profesional de extensiones de pestañas", className: "work-wide work-two" },
  { name: "lash-detail", fallback: "/lash-detail.jpg", widths: [480, 800, 1215], width: 1215, height: 1800, alt: "Primer plano de una mirada con pestañas", className: "work-small work-three" },
];

const faqs = [
  {
    question: "¿Qué estilo debo elegir?",
    answer: "No necesitas decidirlo sola. Al consultar tu cita, cuéntame el resultado que buscas y revisamos qué opción se adapta mejor a tu mirada y a tus pestañas naturales.",
  },
  {
    question: "¿Cuánto tiempo dura la cita?",
    answer: "La duración aproximada va desde 1 h 15 min para algunos retoques hasta 2 h 30 min para un set de volumen. El tiempo exacto depende del servicio y del diseño.",
  },
  {
    question: "¿Cómo debo llegar a mi cita?",
    answer: "Ven sin máscara de pestañas y con el área de los ojos limpia. Así podremos dedicar el tiempo de la cita directamente al diseño y la aplicación.",
  },
  {
    question: "¿Cómo confirmo precio y disponibilidad?",
    answer: "Escríbeme por Instagram indicando el servicio que te interesa y tus días preferidos. Te confirmaré disponibilidad, precio y los detalles necesarios antes de reservar.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Lua Lashes by Sey",
  description: "Servicio de extensiones de pestañas con diseños personalizados, clásicas, híbridas, volumen y retoques.",
  sameAs: [bookingUrl],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de pestañas",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.copy,
      },
    })),
  },
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <main id="contenido" tabIndex={-1}>
        <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Lua Lashes, inicio">
          <span>LUA</span>
          <small>Lashes by Sey</small>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a href="#trabajo">Mi trabajo</a>
          <a href="#preguntas">Preguntas</a>
          <a href="#citas">Citas</a>
        </nav>
        <MobileNav />
        </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Extensiones personalizadas</p>
          <h1>Tu mirada,<br />tu esencia.</h1>
          <p className="hero-intro">
            Diseños de pestañas creados para resaltar tu belleza natural y hacerte sentir espectacular, todos los días.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#citas">Agenda tu cita <span aria-hidden="true">→</span></a>
            <a className="text-link" href="#trabajo">Ver resultados <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-notes" aria-label="Beneficios">
            <span>Diseño personalizado</span>
            <span>Aplicación delicada</span>
            <span>Atención con cita</span>
          </div>
        </div>

        <div className="hero-visual">
          <ResponsiveImage
            name="lash-detail"
            fallback="/lash-detail.jpg"
            alt="Mirada con pestañas largas y definidas"
            width={1215}
            height={1800}
            widths={[480, 800, 1215]}
            priority
            sizes="(max-width: 800px) 100vw, 48vw"
          />
          <div className="hero-badge">
            <span className="badge-mark">L</span>
            <p><strong>Detalles que</strong><br />transforman tu mirada.</p>
          </div>
          <p className="vertical-label">LASH ARTISTRY · BEAUTY STUDIO</p>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <span>CLÁSICAS</span><i>✦</i><span>HÍBRIDAS</span><i>✦</i><span>VOLUMEN</span><i>✦</i><span>RETOQUES</span><i>✦</i><span>DISEÑO PERSONALIZADO</span>
      </div>

      <section className="services section" id="servicios">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> Servicios</p>
            <h2>Un estilo para<br /><em>cada mirada.</em></h2>
          </div>
          <p className="section-lead">
            Cada set se adapta a la forma de tus ojos, tus pestañas naturales y el resultado que quieres conseguir.
          </p>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
              <div className="service-meta">
                <span>{service.time}</span>
                <a href="#citas" aria-label={`Elegir una cita de ${service.title}`}>↘</a>
              </div>
            </article>
          ))}
        </div>
        <p className="pricing-note">Precios y disponibilidad se confirman al reservar.</p>
      </section>

      <section className="portfolio section" id="trabajo">
        <div className="portfolio-title">
          <p className="eyebrow eyebrow-light"><span /> Mi trabajo</p>
          <h2>Precisión en<br /><em>cada detalle.</em></h2>
        </div>
        <div className="work-grid">
          {work.map((item, index) => (
            <figure className={item.className} key={item.name}>
              <ResponsiveImage
                name={item.name}
                fallback={item.fallback}
                widths={item.widths}
                width={item.width}
                height={item.height}
                alt={item.alt}
                sizes="(max-width: 700px) 88vw, 50vw"
              />
              <figcaption>0{index + 1} / Lua Lashes</figcaption>
            </figure>
          ))}
        </div>
        <a className="instagram-link" href={bookingUrl} target="_blank" rel="noreferrer" aria-label="Ver más trabajos en Instagram (se abre en una pestaña nueva)">
          Más trabajos en @lualashes_by_sey <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="experience section">
        <div className="experience-image">
          <ResponsiveImage
            name="lash-application"
            fallback="/lash-application.jpg"
            widths={[640, 1000, 1600]}
            width={1800}
            height={1200}
            alt="Proceso cuidadoso de aplicación de pestañas"
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <div className="image-stamp">BEAUTY<br />IN EVERY<br />DETAIL</div>
        </div>
        <div className="experience-copy">
          <p className="eyebrow"><span /> La experiencia</p>
          <h2>Tu momento<br /><em>para ti.</em></h2>
          <p>
            Un espacio tranquilo, una aplicación cuidadosa y un diseño pensado para que salgas sintiéndote más tú que nunca.
          </p>
          <ul>
            <li><span>01</span> Consulta y diseño personalizado</li>
            <li><span>02</span> Aplicación cómoda y precisa</li>
            <li><span>03</span> Guía de cuidado para mayor duración</li>
          </ul>
        </div>
      </section>

      <section className="faq section" id="preguntas">
        <div className="faq-intro">
          <p className="eyebrow"><span /> Antes de reservar</p>
          <h2>Resuelve tus<br /><em>preguntas.</em></h2>
          <p>La información esencial para que llegues a tu cita con tranquilidad y sepas qué esperar.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="booking section" id="citas">
        <div className="booking-copy">
          <p className="eyebrow eyebrow-light"><span /> Reserva</p>
          <h2>Tu próxima mirada<br />empieza <em>aquí.</em></h2>
          <p>
            Elige servicio, fecha y hora en un mismo lugar. Mientras conectamos la agenda definitiva, la disponibilidad es orientativa y se confirma personalmente por Instagram.
          </p>
          <div className="booking-facts" aria-label="Configuración inicial de las citas">
            <span><strong>Mar–Sáb</strong> Días de atención</span>
            <span><strong>9:00–18:00</strong> Horario inicial</span>
            <span><strong>24 h</strong> Anticipación mínima</span>
          </div>
        </div>
        <BookingExperience services={bookingServices} instagramUrl={bookingUrl} calUsername={calUsername} />
      </section>

      <footer>
        <div className="footer-brand">
          <span>LUA</span>
          <small>Lashes by Sey</small>
        </div>
        <div className="footer-links">
          <a href="#servicios">Servicios</a>
          <a href="#trabajo">Mi trabajo</a>
          <a href="#preguntas">Preguntas</a>
          <a href="#citas">Reservar</a>
          <a href={bookingUrl} target="_blank" rel="noreferrer" aria-label="Visitar Instagram (se abre en una pestaña nueva)">Instagram ↗</a>
        </div>
        <p>Atención únicamente con cita previa.</p>
        <p className="copyright">© {new Date().getFullYear()} Lua Lashes by Sey</p>
      </footer>

      <MobileBookingCta />
      </main>
    </>
  );
}
