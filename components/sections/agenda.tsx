"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

type City = "lima" | "bogota" | "guatemala" | "remote";

const friday = [
  { time: "6:55 – 7:00", activity: "Intro y llegada de participantes" },
  { time: "7:00 – 7:25", activity: "Bienvenida por Natalia Jiménez, Founder de XAIA Lab" },
  { time: "7:25 – 7:30", activity: "Indicaciones de la hackathon, saludo a partners, sponsors y organizadores" },
  { time: "7:30 – 7:50", activity: "Keynote Sezzle — Sponsor Platinum oficial" },
  { time: "7:50 – 8:00", activity: "Ronda de preguntas" },
  { time: "8:00", activity: "🟢 ¡Inicia la hackathon!" },
];

const saturdayByCity: Record<City, { time: string; activity: string }[]> = {
  lima: [
    { time: "9:00", activity: "Entrada a PUCP y recojo de merch" },
    { time: "9:00 – 11:00", activity: "Desayuno / Coffee break" },
    { time: "11:00 – 2:00 pm", activity: "Sesiones de contacto con mentoras" },
    { time: "2:00 – 3:00 pm", activity: "Almuerzo" },
    { time: "3:00 – 7:00 pm", activity: "Trabajo en proyectos" },
    { time: "7:00 – 8:00 pm", activity: "Coffee break" },
    { time: "8:00 – 9:00 pm", activity: "Trabajo en proyectos (sprint final del día)" },
  ],
  bogota: [
    { time: "9:00", activity: "Entrada a Globant Connecta y recojo de merch" },
    { time: "9:00 – 11:00", activity: "Desayuno / Coffee break" },
    { time: "11:00 – 2:00 pm", activity: "Sesiones de contacto con mentoras" },
    { time: "2:00 – 3:00 pm", activity: "Almuerzo" },
    { time: "3:00 – 7:00 pm", activity: "Trabajo en proyectos" },
  ],
  guatemala: [
    { time: "Todo el día", activity: "Trabajo en proyectos (remoto desde Guatemala)" },
  ],
  remote: [
    { time: "Todo el día", activity: "Trabajo en proyectos desde tu sede o de manera remota" },
  ],
};

const citySubtitle: Record<City, string> = {
  lima: "Presencial · PUCP · Hora Perú (GMT-5)",
  bogota: "Presencial · Globant Connecta · Hora Colombia (GMT-5)",
  guatemala: "Virtual · Hora Guatemala (GMT-6)",
  remote: "Virtual · Tu huso horario",
};

const sunday = [
  { time: "9:00 – 12:00 pm", activity: "Avance final de proyectos + último contacto con mentoras" },
  { time: "12:00 – 1:00 pm", activity: "Grabación de pitches y subida a Devpost" },
  { time: "1:00 – 1:05 pm", activity: "Indicaciones finales y cierre" },
  { time: "1:05 – 1:30 pm", activity: "Mensaje de cierre por Larissa, GTM de ElevenLabs — Partner oficial" },
  { time: "1:30 pm", activity: "🏁 Fin de la hackathon" },
];

const cities: { id: City; label: string }[] = [
  { id: "lima", label: "Lima" },
  { id: "bogota", label: "Bogotá" },
  { id: "guatemala", label: "Guatemala" },
  { id: "remote", label: "Remote" },
];

function ScheduleTable({ rows }: { rows: { time: string; activity: string }[] }) {
  return (
    <div className="w-full border border-white/10 overflow-hidden">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-[120px_1fr] border-b border-white/10 last:border-b-0 ${
            i % 2 === 0 ? "bg-white/[0.02]" : ""
          }`}
        >
          <div className="px-3 py-2.5 border-r border-white/10">
            <span className="font-[family-name:var(--font-title)] text-xs font-bold text-primary-pink whitespace-nowrap">
              {row.time}
            </span>
          </div>
          <div className="px-3 py-2.5">
            <span className="text-primary-cream text-xs md:text-sm">{row.activity}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Agenda() {
  const { t } = useTranslation();
  const [city, setCity] = useState<City>("lima");

  return (
    <SectionWrapper variant="dark" id="agenda" className="min-h-fit">
      <div className="mb-10">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.agenda.label}
        </span>
        <h2 className="font-[family-name:var(--font-title)] text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl uppercase">
          {t.agenda.headline}{" "}
          <span className="text-primary-pink">{t.agenda.headlineAccent}</span>
        </h2>
      </div>

      {/* City chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {cities.map((c) => (
          <button
            key={c.id}
            onClick={() => setCity(c.id)}
            className={`px-4 py-1.5 text-sm font-bold uppercase tracking-wider border-2 transition-colors ${
              city === c.id
                ? "bg-primary-pink border-primary-pink text-white"
                : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Two-column: Friday + Saturday */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Friday */}
        <div className="space-y-3">
          <div>
            <h3 className="font-[family-name:var(--font-title)] text-lg font-black text-white uppercase">
              Viernes 6 de marzo
            </h3>
            <p className="text-white/50 text-xs mt-0.5">Kick-off Virtual · Hora Perú (GMT-5)</p>
          </div>
          <ScheduleTable rows={friday} />
        </div>

        {/* Saturday */}
        <div className="space-y-3">
          <div>
            <h3 className="font-[family-name:var(--font-title)] text-lg font-black text-white uppercase">
              Sábado 7 de marzo
            </h3>
            <p className="text-white/50 text-xs mt-0.5">{citySubtitle[city]}</p>
          </div>
          <ScheduleTable rows={saturdayByCity[city]} />
        </div>
      </div>

      {/* Sunday — full width */}
      <div className="space-y-3">
        <div>
          <h3 className="font-[family-name:var(--font-title)] text-lg font-black text-white uppercase">
            Domingo 8 de marzo — Demo Day & Cierre
          </h3>
          <p className="text-white/50 text-xs mt-0.5">Todas las sedes · Hora Perú (GMT-5)</p>
        </div>
        <ScheduleTable rows={sunday} />
      </div>
    </SectionWrapper>
  );
}
