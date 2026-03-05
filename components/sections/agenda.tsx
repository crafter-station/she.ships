"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

// ─── Types ────────────────────────────────────────────────────────────────────

type City = "lima" | "bogota" | "guatemala" | "remote";
type Row = { time: string; activity: string; color: string };

// ─── Color palette — site tokens only ────────────────────────────────────────

const C = {
  pink:    "#e9a1c9",  // primary-pink
  green:   "#7fe179",  // primary-green
  cream:   "#f2f2ef",  // primary-cream
  black:   "#131414",  // primary-black
  dark:    "#1e1f1f",  // neutral-dark
  gray:    "#6b7280",  // neutral-gray
};

// Background of the whole grid — pink tint
const BG = "rgba(233,161,201,0.18)";

// ─── Grid constants ───────────────────────────────────────────────────────────

const GRID_START = 9 * 60;   // 9:00
const GRID_END   = 21 * 60;  // 21:00
const SLOT       = 5;        // minutes per row
const TOTAL_ROWS = (GRID_END - GRID_START) / SLOT; // 144 rows
const ROW_HEIGHT = 3;        // px per row — total ~432px

// ─── Time helpers ─────────────────────────────────────────────────────────────

function toMins(t: string): number {
  const clean = t.trim().toLowerCase();
  const isPm  = clean.includes("pm");
  const isAm  = clean.includes("am");
  const digits = clean.replace(/[^0-9:]/g, "");
  const [hStr, mStr = "0"] = digits.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (isPm && h !== 12) h += 12;
  if (isAm && h === 12) h = 0;
  return h * 60 + m;
}

function parseTimeRange(timeStr: string): { start: number; end: number } {
  if (timeStr === "Todo el día") return { start: toMins("9:00"), end: toMins("21:00") };
  const parts = timeStr.split(/\s*[–—-]\s*/);
  if (parts.length === 1) {
    const start = toMins(parts[0]);
    return { start, end: start + 10 };
  }
  const rawStart = parts[0].trim();
  const rawEnd   = parts[1].trim();
  const endMins   = toMins(rawEnd);
  const startMins = toMins(rawStart);
  const endHasMeridiem   = /[ap]m/i.test(rawEnd);
  const startHasMeridiem = /[ap]m/i.test(rawStart);
  if (endHasMeridiem && !startHasMeridiem) {
    const naivePmStart = startMins + 12 * 60;
    if (startMins < 12 * 60 && naivePmStart <= endMins && !(startMins < endMins)) {
      return { start: naivePmStart, end: endMins };
    }
  }
  return { start: startMins, end: endMins };
}

function toGridRow(mins: number): number {
  return Math.round((mins - GRID_START) / SLOT) + 1;
}

function durationMins(timeStr: string): number {
  if (timeStr === "Todo el día") return 12 * 60;
  const { start, end } = parseTimeRange(timeStr);
  return end - start;
}

// ─── Schedule data ────────────────────────────────────────────────────────────

const friday: Row[] = [
  { time: "18:55 – 19:00", activity: "Intro y llegada de participantes",                                           color: C.pink },
  { time: "19:00 – 19:25", activity: "Bienvenida por Natalia Jiménez, Founder de XAIA Lab",                        color: C.pink },
  { time: "19:25 – 19:30", activity: "Indicaciones de la hackathon, saludo a partners, sponsors y organizadores",  color: C.cream },
  { time: "19:30 – 19:50", activity: "Keynote Sezzle — Sponsor Platinum oficial",                                  color: C.cream },
  { time: "19:50 – 20:00", activity: "Ronda de preguntas",                                                         color: C.pink },
  { time: "20:00",         activity: "🟢 ¡Inicia la hackathon!",                                                   color: C.green },
];

const saturdayByCity: Record<City, Row[]> = {
  lima: [
    { time: "9:00",           activity: "Entrada a PUCP y recojo de merch",                    color: C.pink },
    { time: "9:00 – 11:00",   activity: "Desayuno / Coffee break",                             color: C.cream },
    { time: "11:00 – 14:00",  activity: "Sesiones de contacto con mentoras",                   color: C.pink },
    { time: "14:00 – 15:00",  activity: "Almuerzo",                                            color: C.green },
    { time: "15:00 – 19:00",  activity: "Trabajo en proyectos",                                color: C.cream },
    { time: "19:00 – 20:00",  activity: "Coffee break",                                        color: C.green },
    { time: "20:00 – 21:00",  activity: "Trabajo en proyectos (sprint final del día)",         color: C.pink },
  ],
  bogota: [
    { time: "9:00",           activity: "Entrada a Globant Connecta y recojo de merch",        color: C.pink },
    { time: "9:00 – 11:00",   activity: "Desayuno / Coffee break",                             color: C.cream },
    { time: "11:00 – 14:00",  activity: "Sesiones de contacto con mentoras",                   color: C.pink },
    { time: "14:00 – 15:00",  activity: "Almuerzo",                                            color: C.green },
    { time: "15:00 – 19:00",  activity: "Trabajo en proyectos",                                color: C.cream },
  ],
  guatemala: [
    { time: "Todo el día", activity: "Trabajo en proyectos desde Guatemala",                   color: C.cream },
  ],
  remote: [
    { time: "Todo el día", activity: "Trabajo en proyectos desde tu sede o de manera remota",  color: C.cream },
  ],
};

const sunday: Row[] = [
  { time: "9:00 – 12:00",  activity: "Avance final de proyectos + último contacto con mentoras",  color: C.cream },
  { time: "12:00 – 13:00", activity: "Grabación de pitches y subida a Devpost",                   color: C.green },
  { time: "13:00 – 13:05", activity: "Indicaciones finales y cierre",                             color: C.cream },
  { time: "13:05 – 13:30", activity: "Mensaje de cierre por Larissa, GTM de ElevenLabs",          color: C.pink },
  { time: "13:30",         activity: "🏁 Fin de la hackathon",                                     color: C.green },
];

const cities: { id: City; label: string }[] = [
  { id: "lima",      label: "Lima" },
  { id: "bogota",    label: "Bogotá" },
  { id: "guatemala", label: "Guatemala" },
  { id: "remote",    label: "Remote" },
];

const citySubtitle: Record<City, string> = {
  lima:      "Presencial · PUCP · GMT-5",
  bogota:    "Presencial · Globant Connecta · GMT-5",
  guatemala: "Virtual · GMT-6",
  remote:    "Virtual · Tu huso horario",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function DayHeader({ label, subtitle }: { label: string; subtitle?: string }) {
  return (
    <div
      style={{ backgroundColor: BG, borderBottom: `1px solid rgba(255,255,255,0.15)` }}
      className="px-3 py-2"
    >
      <p className="font-[family-name:var(--font-title)] text-xs font-black uppercase leading-tight"
         style={{ color: "#ffffff" }}>
        {label}
      </p>
      {subtitle && (
        <p className="text-[9px] mt-0.5 leading-tight" style={{ color: "rgba(255,255,255,0.6)" }}>{subtitle}</p>
      )}
    </div>
  );
}

function EventBlock({ row, column }: { row: Row; column: number }) {
  const [hovered, setHovered] = useState(false);
  const dur     = durationMins(row.time);
  const isTiny  = dur < 10;
  const isShort = dur < 25;

  const { start, end } = parseTimeRange(row.time);
  const rowStart = toGridRow(start);
  const rowEnd   = toGridRow(end);

  // All blocks: show their color by default, darken on hover
  const bgColor   = hovered ? C.black : row.color;
  const textColor = hovered ? "#ffffff" : C.black;

  // Format display time: strip seconds, show short range
  const displayTime = row.time === "Todo el día" ? "9:00 – 21:00" : row.time;

  return (
    // Outer cell: occupies the grid position, provides 2px inset margin
    <div
      style={{
        gridRow:    `${rowStart} / ${rowEnd}`,
        gridColumn: column,
        padding:    "2px",
        zIndex:     1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    {/* Inner visual block: rounded via clip-path (overrides border-radius: 0 !important) */}
    <div style={{
        height:          "100%",
        backgroundColor: bgColor,
        clipPath:        "inset(0 round 4px)",
        padding:         isTiny ? "1px 4px" : isShort ? "2px 5px" : "4px 6px",
        overflow:        "hidden",
        display:         "flex",
        flexDirection:   "column",
        justifyContent:  "flex-start",
        cursor:          "default",
        transition:      "background-color 0.12s ease",
      }}
    >
      {!isTiny && (
        <span
          style={{
            fontSize:   isShort ? "8px" : "9px",
            fontWeight: 700,
            color:      textColor,
            lineHeight: 1.2,
            display:    "block",
            overflow:   "hidden",
            fontFamily: "var(--font-title)",
          }}
        >
          {row.activity}
        </span>
      )}
      {!isTiny && !isShort && (
        <span
          style={{
            fontSize:   "8px",
            fontWeight: 400,
            color:      textColor,
            opacity:    0.6,
            lineHeight: 1.2,
            display:    "block",
            marginTop:  "1px",
            fontFamily: "var(--font-body)",
          }}
        >
          {displayTime}
        </span>
      )}
    </div>
    </div>
  );
}

/** Per-hour labels on the left axis */
function TimeAxis() {
  const hours: number[] = [];
  for (let h = 9; h <= 21; h++) hours.push(h);
  return (
    <>
      {hours.map((h) => {
        const rowStart = toGridRow(h * 60);
        return (
          <div
            key={h}
            style={{
              gridRow:        `${rowStart} / ${rowStart + 1}`,
              gridColumn:     1,
              display:        "flex",
              alignItems:     "flex-start",
              justifyContent: "flex-end",
              paddingRight:   "6px",
              paddingTop:     "1px",
            }}
          >
            <span style={{
              fontSize:   "8px",
              fontWeight: 700,
              color:      "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-title)",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}>
              {h}:00
            </span>
          </div>
        );
      })}
    </>
  );
}

/** Thin horizontal lines at each hour */
function HourRules() {
  const hours: number[] = [];
  for (let h = 9; h <= 21; h++) hours.push(h);
  return (
    <>
      {hours.map((h) => {
        const rowStart = toGridRow(h * 60);
        return (
          <div
            key={h}
            style={{
              gridRow:       `${rowStart} / ${rowStart + 1}`,
              gridColumn:    "2 / 5",
              borderTop:     `1px solid rgba(255,255,255,0.1)`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Agenda() {
  const { t } = useTranslation();
  const [city, setCity] = useState<City>("lima");
  const satRows = saturdayByCity[city];

  return (
    <SectionWrapper variant="dark" id="agenda" className="min-h-fit">
      {/* Section heading */}
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
      <div className="flex flex-wrap gap-2 mb-6">
        {cities.map((c) => (
          <button
            key={c.id}
            onClick={() => setCity(c.id)}
            style={{
              backgroundColor: city === c.id ? C.pink : "transparent",
              color:           city === c.id ? C.black : C.cream,
              border:          `1px solid ${city === c.id ? C.pink : "rgba(255,255,255,0.2)"}`,
              opacity:         city === c.id ? 1 : 0.7,
            }}
            className="px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-colors"
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ overflowX: "auto" }}>
        {/* Day headers */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "44px 1fr 1fr 1fr",
          gap:                 0,
          minWidth:            "560px",
          borderLeft:          "1px solid rgba(255,255,255,0.15)",
          borderTop:           "1px solid rgba(255,255,255,0.15)",
          borderRight:         "1px solid rgba(255,255,255,0.15)",
        }}>
          <div style={{ backgroundColor: BG, borderRight: "1px solid rgba(255,255,255,0.15)" }} />
          <DayHeader label="Vie 6 · Kick-off" />
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
            <DayHeader label="Sáb 7 · Build Day" subtitle={citySubtitle[city]} />
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
            <DayHeader label="Dom 8 · Demo Day" />
          </div>
        </div>

        {/* Time grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "44px 1fr 1fr 1fr",
          gridTemplateRows:    `repeat(${TOTAL_ROWS}, ${ROW_HEIGHT}px)`,
          gap:                 0,
          minWidth:            "560px",
          backgroundColor:     BG,
          border:              "1px solid rgba(255,255,255,0.15)",
          position:            "relative",
        }}>
          {/* Column dividers */}
          <div style={{ gridRow: "1 / -1", gridColumn: 2, borderLeft: "1px solid rgba(255,255,255,0.15)", pointerEvents: "none" }} />
          <div style={{ gridRow: "1 / -1", gridColumn: 3, borderLeft: "1px solid rgba(255,255,255,0.15)", pointerEvents: "none" }} />
          <div style={{ gridRow: "1 / -1", gridColumn: 4, borderLeft: "1px solid rgba(255,255,255,0.15)", pointerEvents: "none" }} />

          <HourRules />
          <TimeAxis />

          {friday.map((row, i) => (
            <EventBlock key={`fri-${i}`} row={row} column={2} />
          ))}
          {satRows.map((row, i) => (
            <EventBlock key={`sat-${i}`} row={row} column={3} />
          ))}
          {sunday.map((row, i) => (
            <EventBlock key={`sun-${i}`} row={row} column={4} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
