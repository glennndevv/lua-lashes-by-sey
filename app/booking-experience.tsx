"use client";

import Cal from "@calcom/embed-react";
import { useMemo, useState, useSyncExternalStore } from "react";

export type BookingService = {
  id: string;
  title: string;
  duration: string;
  description: string;
  calSlug: string;
  slots: string[];
};

type BookingExperienceProps = {
  services: BookingService[];
  instagramUrl: string;
  calUsername?: string;
};

type DateOption = {
  iso: string;
  weekday: string;
  day: string;
  month: string;
  long: string;
};

const weekdayFormatter = new Intl.DateTimeFormat("es-ES", { weekday: "short" });
const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "short" });
const longDateFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const subscribeToHydration = () => () => {};

function nextAvailableDates(total = 8): DateOption[] {
  const dates: DateOption[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 2);

  while (dates.length < total) {
    const dayOfWeek = cursor.getDay();

    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, "0");
      const day = String(cursor.getDate()).padStart(2, "0");

      dates.push({
        iso: `${year}-${month}-${day}`,
        weekday: weekdayFormatter.format(cursor).replace(".", ""),
        day: String(cursor.getDate()),
        month: monthFormatter.format(cursor).replace(".", ""),
        long: longDateFormatter.format(cursor),
      });
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export function BookingExperience({ services, instagramUrl, calUsername }: BookingExperienceProps) {
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const dates = useMemo(() => hydrated ? nextAvailableDates() : [], [hydrated]);

  const selectedService = services.find((service) => service.id === selectedServiceId);
  const selectedDateOption = dates.find((date) => date.iso === selectedDate);
  const calEnabled = Boolean(calUsername);
  const totalSteps = calEnabled ? 2 : 4;
  const stepLabels = calEnabled
    ? ["Servicio", "Fecha y datos"]
    : ["Servicio", "Día y hora", "Tus datos", "Resumen"];

  const requestSummary = useMemo(() => {
    if (!selectedService || !selectedDateOption || !selectedTime) return "";

    return [
      "Hola, quiero solicitar una cita en Lua Lashes by Sey:",
      `Servicio: ${selectedService.title}`,
      `Fecha: ${selectedDateOption.long}`,
      `Hora: ${selectedTime}`,
      `Nombre: ${name}`,
      `WhatsApp: ${whatsapp}`,
      email ? `Email: ${email}` : "",
      notes ? `Notas: ${notes}` : "",
      "Sé que la cita queda confirmada cuando reciba respuesta.",
    ].filter(Boolean).join("\n");
  }, [email, name, notes, selectedDateOption, selectedService, selectedTime, whatsapp]);

  const canContinue = step === 1
    ? Boolean(selectedService)
    : step === 2
      ? calEnabled || Boolean(selectedDate && selectedTime)
      : step === 3
        ? Boolean(name.trim() && whatsapp.trim())
        : false;

  function chooseService(serviceId: string) {
    setSelectedServiceId(serviceId);
    setSelectedDate("");
    setSelectedTime("");
    setCopied(false);
  }

  function chooseDate(date: string) {
    setSelectedDate(date);
    setSelectedTime("");
    setCopied(false);
  }

  async function copyRequest() {
    if (!requestSummary) return;

    try {
      await navigator.clipboard.writeText(requestSummary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="booking-experience">
      <div className="booking-progress" aria-label={`Paso ${step} de ${totalSteps}`}>
        {stepLabels.map((label, index) => {
          const number = index + 1;
          const state = number === step ? "is-current" : number < step ? "is-complete" : "";

          return (
            <div className={`booking-progress-step ${state}`} key={label} aria-current={number === step ? "step" : undefined}>
              <span>{String(number).padStart(2, "0")}</span>
              <small>{label}</small>
            </div>
          );
        })}
      </div>

      <div className="booking-panel">
        {step === 1 && (
          <div className="booking-step">
            <div className="booking-step-heading">
              <p className="booking-step-number">01 / Servicio</p>
              <h3>¿Qué estilo buscas?</h3>
              <p>Si aún no lo tienes claro, elige la opción más cercana. El diseño final se adapta durante la consulta.</p>
            </div>
            <div className="booking-service-options">
              {services.map((service) => {
                const selected = service.id === selectedServiceId;

                return (
                  <button
                    className={`booking-service-option ${selected ? "is-selected" : ""}`}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => chooseService(service.id)}
                    key={service.id}
                  >
                    <span className="booking-choice-dot" aria-hidden="true" />
                    <span>
                      <strong>{service.title}</strong>
                      <small>{service.description}</small>
                    </span>
                    <em>{service.duration}</em>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && calEnabled && selectedService && (
          <div className="booking-step booking-cal-step">
            <div className="booking-step-heading">
              <p className="booking-step-number">02 / Fecha y datos</p>
              <h3>Elige tu cita</h3>
              <p>El calendario muestra disponibilidad real y confirma tu espacio sin salir de la página.</p>
            </div>
            <Cal
              className="cal-inline"
              calLink={`${calUsername}/${selectedService.calSlug}`}
              namespace={`lua-${selectedService.id}`}
              config={{ layout: "month_view", theme: "light" }}
              style={{ width: "100%", minHeight: "720px", overflow: "auto" }}
            />
          </div>
        )}

        {step === 2 && !calEnabled && selectedService && (
          <div className="booking-step">
            <div className="booking-step-heading booking-step-heading-row">
              <div>
                <p className="booking-step-number">02 / Día y hora</p>
                <h3>Elige cuándo venir</h3>
                <p>Horario inicial de martes a sábado, de 9:00 a. m. a 6:00 p. m.</p>
              </div>
              <span className="booking-preview-label">Disponibilidad orientativa</span>
            </div>

            <div className="booking-date-options" aria-label="Fechas disponibles">
              {dates.length === 0 && <p className="booking-loading">Preparando fechas…</p>}
              {dates.map((date) => (
                <button
                  className={date.iso === selectedDate ? "is-selected" : ""}
                  type="button"
                  aria-pressed={date.iso === selectedDate}
                  onClick={() => chooseDate(date.iso)}
                  key={date.iso}
                >
                  <small>{date.weekday}</small>
                  <strong>{date.day}</strong>
                  <span>{date.month}</span>
                </button>
              ))}
            </div>

            <div className="booking-time-area">
              <p>{selectedDateOption ? `Horarios para ${selectedDateOption.long}` : "Selecciona una fecha para ver horarios"}</p>
              <div className="booking-time-options" aria-label="Horarios disponibles">
                {selectedService.slots.map((time) => (
                  <button
                    className={time === selectedTime ? "is-selected" : ""}
                    type="button"
                    aria-pressed={time === selectedTime}
                    disabled={!selectedDate}
                    onClick={() => setSelectedTime(time)}
                    key={time}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <p className="booking-buffer-note">Se contempla un margen de 30 minutos entre citas y al menos 24 horas de anticipación.</p>
          </div>
        )}

        {step === 3 && !calEnabled && (
          <div className="booking-step">
            <div className="booking-step-heading">
              <p className="booking-step-number">03 / Tus datos</p>
              <h3>¿A nombre de quién?</h3>
              <p>Estos datos solo preparan tu solicitud; no se guardan ni se envían automáticamente todavía.</p>
            </div>
            <div className="booking-form-grid">
              <label>
                <span>Nombre completo *</span>
                <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Tu nombre" required />
              </label>
              <label>
                <span>WhatsApp *</span>
                <input value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="(000) 000-0000" required />
              </label>
              <label>
                <span>Correo electrónico</span>
                <input value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" inputMode="email" type="email" placeholder="nombre@correo.com" />
              </label>
              <label className="booking-notes-field">
                <span>Notas o referencia</span>
                <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} placeholder="Cuéntanos el resultado que buscas o si necesitas retirar un set anterior." />
              </label>
            </div>
            <p className="booking-privacy-note">No incluyas información médica o financiera en este formulario.</p>
          </div>
        )}

        {step === 4 && !calEnabled && selectedService && selectedDateOption && (
          <div className="booking-step booking-review">
            <div className="booking-step-heading">
              <p className="booking-step-number">04 / Resumen</p>
              <h3>Revisa tu solicitud</h3>
              <p>La agenda definitiva aún no está conectada. Envía este resumen por Instagram y Sey confirmará disponibilidad y precio.</p>
            </div>
            <dl className="booking-summary">
              <div><dt>Servicio</dt><dd>{selectedService.title}<small>{selectedService.duration}</small></dd></div>
              <div><dt>Fecha</dt><dd>{selectedDateOption.long}</dd></div>
              <div><dt>Hora</dt><dd>{selectedTime}</dd></div>
              <div><dt>Cliente</dt><dd>{name}<small>{whatsapp}</small></dd></div>
            </dl>
            <div className="booking-confirmation-note">
              <strong>Esto todavía no confirma la cita.</strong>
              <p>El horario quedará reservado únicamente cuando recibas la confirmación de Lua Lashes by Sey.</p>
            </div>
            <div className="booking-review-actions">
              <button className="button booking-copy-button" type="button" onClick={copyRequest}>
                {copied ? "Solicitud copiada ✓" : "Copiar solicitud"}
              </button>
              <a className="button button-dark" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Abrir Instagram para enviar la solicitud (se abre en una pestaña nueva)">
                Abrir Instagram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        )}

        <div className="booking-navigation">
          {step > 1 && (
            <button className="booking-back" type="button" onClick={() => setStep((current) => current - 1)}>
              <span aria-hidden="true">←</span> Atrás
            </button>
          )}
          {step < totalSteps && !calEnabled && (
            <button className="button button-dark" type="button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>
              Continuar <span aria-hidden="true">→</span>
            </button>
          )}
          {step === 1 && calEnabled && (
            <button className="button button-dark" type="button" disabled={!canContinue} onClick={() => setStep(2)}>
              Ver disponibilidad <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
