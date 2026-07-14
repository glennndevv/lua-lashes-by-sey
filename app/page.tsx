import Image from "next/image";

const bookingUrl = "https://www.instagram.com/lualashes_by_sey/";

const services = [
  {
    number: "01",
    title: "Clásicas",
    copy: "Una extensión por pestaña natural para un acabado limpio, sutil y elegante.",
    time: "2 h aprox.",
  },
  {
    number: "02",
    title: "Híbridas",
    copy: "El equilibrio perfecto entre definición y volumen, diseñado para tu mirada.",
    time: "2 h 15 min aprox.",
  },
  {
    number: "03",
    title: "Volumen",
    copy: "Abanicos ligeros y personalizados para una mirada intensa sin perder comodidad.",
    time: "2 h 30 min aprox.",
  },
  {
    number: "04",
    title: "Retoques",
    copy: "Mantenimiento para conservar la forma, densidad y frescura de tu set.",
    time: "Desde 1 h 15 min",
  },
];

const work = [
  { src: "/lash-closeup.jpg", alt: "Detalle de pestañas largas y definidas", className: "work-tall work-one" },
  { src: "/lash-application.jpg", alt: "Aplicación profesional de extensiones de pestañas", className: "work-wide work-two" },
  { src: "/lash-detail.jpg", alt: "Primer plano de una mirada con pestañas", className: "work-small work-three" },
  { src: "/lash-closeup.jpg", alt: "Acabado elegante de extensiones de pestañas", className: "work-small work-four" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Lua Lashes, inicio">
          <span>LUA</span>
          <small>Lashes by Sey</small>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a href="#trabajo">Mi trabajo</a>
          <a href="#citas">Citas</a>
        </nav>
        <a className="header-cta" href={bookingUrl} target="_blank" rel="noreferrer">
          Reservar <span aria-hidden="true">↗</span>
        </a>
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
          <Image
            src="/lash-detail.jpg"
            alt="Mirada con pestañas largas y definidas"
            fill
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
                <a href={bookingUrl} target="_blank" rel="noreferrer" aria-label={`Consultar ${service.title} en Instagram`}>↗</a>
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
            <figure className={item.className} key={`${item.className}-${index}`}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
              <figcaption>0{index + 1} / Lua Lashes</figcaption>
            </figure>
          ))}
        </div>
        <a className="instagram-link" href={bookingUrl} target="_blank" rel="noreferrer">
          Más trabajos en @lualashes_by_sey <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="experience section">
        <div className="experience-image">
          <Image src="/lash-application.jpg" alt="Proceso cuidadoso de aplicación de pestañas" fill sizes="(max-width: 800px) 100vw, 50vw" />
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

      <section className="booking section" id="citas">
        <div className="booking-copy">
          <p className="eyebrow eyebrow-light"><span /> Reserva</p>
          <h2>Tu próxima mirada<br />empieza <em>aquí.</em></h2>
          <p>
            Escríbeme por Instagram para elegir tu servicio, consultar disponibilidad y confirmar tu cita.
          </p>
          <a className="button button-light" href={bookingUrl} target="_blank" rel="noreferrer">
            Reservar por Instagram <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="booking-card">
          <p className="card-kicker">Antes de tu cita</p>
          <ol>
            <li><span>1</span><div><strong>Elige tu estilo</strong><p>Cuéntame el resultado que buscas o envíame una referencia.</p></div></li>
            <li><span>2</span><div><strong>Consulta disponibilidad</strong><p>Coordinamos el día y la hora que mejor te funcionen.</p></div></li>
            <li><span>3</span><div><strong>Confirma tu espacio</strong><p>Recibirás los detalles y recomendaciones para tu visita.</p></div></li>
          </ol>
          <p className="clean-note">Ven sin máscara de pestañas y con el área de los ojos limpia.</p>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <span>LUA</span>
          <small>Lashes by Sey</small>
        </div>
        <div className="footer-links">
          <a href="#servicios">Servicios</a>
          <a href="#trabajo">Mi trabajo</a>
          <a href="#citas">Reservar</a>
          <a href={bookingUrl} target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <p>Atención únicamente con cita previa.</p>
        <p className="copyright">© {new Date().getFullYear()} Lua Lashes by Sey</p>
      </footer>

      <a className="mobile-book" href={bookingUrl} target="_blank" rel="noreferrer">
        Agendar cita <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
