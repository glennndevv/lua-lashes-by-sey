"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Mi trabajo" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#citas", label: "Citas" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-trigger"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span className="mobile-nav-label">Menú</span>
      </button>

      {open ? (
        <div className="mobile-nav-overlay" id="mobile-navigation">
          <div className="mobile-nav-topline">
            <div className="mobile-nav-brand" aria-hidden="true">
              <span>LUA</span>
              <small>Lashes by Sey</small>
            </div>
            <button type="button" className="mobile-nav-close" onClick={() => setOpen(false)}>
              Cerrar <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav aria-label="Navegación móvil">
            {links.map((link, index) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {link.label}
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
