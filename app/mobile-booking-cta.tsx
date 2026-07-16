"use client";

import { useEffect, useState } from "react";

export function MobileBookingCta() {
  const [bookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const bookingSection = document.querySelector("#citas");
    if (!bookingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setBookingVisible(entry.isIntersecting),
      { threshold: 0.04 },
    );

    observer.observe(bookingSection);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={`mobile-book ${bookingVisible ? "is-hidden" : ""}`}
      href="#citas"
      aria-label="Elegir servicio, fecha y hora"
      aria-hidden={bookingVisible}
      tabIndex={bookingVisible ? -1 : undefined}
    >
      Elegir cita <span aria-hidden="true">↓</span>
    </a>
  );
}
