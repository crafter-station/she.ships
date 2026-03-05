"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

// ─── Types ────────────────────────────────────────────────────────────────────

type City = "lima" | "bogota" | "guatemala" | "remote";
type Row = { time: string; activity: string; color: string };

// ─── Color palette — site tokens only ────────────────────────────────────────

const C = {
  pink:     "#e9a1c9",  // primary-pink
  green:    "#7fe179",  // primary-green
  cream:    "#f2f2ef",  // primary-cream
  black:    "#131414",  // primary-black
  dark:     "#1e1f1f",  // neutral-dark
  gray:     "#6b7280",  // neutral-gray
};

// ─── Grid constants ───────────────────────────────────────────────────────────

const GRID_START = 9 * 60;  // 540 minutes since midnight (9:00)
const GRID_END   = 21 * 60; // 1260 minutes since midnight (21:00)
const SLOT        = 5;           // minutes per grid row
const TOTAL_ROWS  = (GRID_END - GRID_START) / SLOT; // 177 rows
const ROW_HEIGHT  = 1.5;         // px per row

// ─── Time helpers ─────────────────────────────────────────────────────────────

/**
 * Convert a time string like "7:00", "2:00 pm", "14:00" to minutes since midnight.
 * Handles 12h (with am/pm) and 24h formats.
 */
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

/**
 * Parse a time-range string such as:
 *   "7:00 – 7:25"   → { start: 420, end: 445 }
 *   "2:00 – 3:00 pm"→ { start: 840, end: 900 }   (pm applies to end, inferred for start)
 *   "8:00"          → { start: 480, end: 490 }   (10-minute point event)
 *
 * Rules:
 * - Split on em-dash (–) or regular dash surrounded by spaces
 * - If the trailing part carries "pm" and the leading part has no meridiem,
 *   infer pm for the leading part when its hour < 12 and would logically be pm.
 */
function parseTimeRange(timeStr: string): { start: number; end: number } {
  // "Todo el día" sentinel
  if (timeStr === "Todo el día") {
    return { start: toMins("9:00"), end: toMins("21:00") };
  }

  // Split on en/em dash or " - "
  const parts = timeStr.split(/\s*[–—-]\s*/);

  if (parts.length === 1) {
    // Point event — use 10-minute block
    const start = toMins(parts[0]);
    return { start, end: start + 10 };
  }

  const rawStart = parts[0].trim();
  const rawEnd   = parts[1].trim();

  const endMins   = toMins(rawEnd);
  const startMins = toMins(rawStart);

  // If end carries an explicit pm meridiem and start has no meridiem,
  // check if start should be coerced to pm (i.e., start < end makes no sense in AM).
  // Because toMins already handles explicit am/pm in each segment, the only
  // ambiguous case is "11:00 – 2:00 pm" where "11:00" is parsed as 11 but should
  // stay 11 (it's AM), and "2:00 pm" → 14. That case resolves correctly.
  // The tricky case: "3:00 – 7:00 pm" where start "3:00" should be 15:00.
  // We detect: rawEnd has pm, rawStart has no meridiem, and startMins < endMins
  // would only hold if we treat start as pm too.
  const endHasMeridiem = /[ap]m/i.test(rawEnd);
  const startHasMeridiem = /[ap]m/i.test(rawStart);

  if (endHasMeridiem && !startHasMeridiem) {
    // Re-parse start forcing pm if the naive startMins would be before endMins
    // only when coerced to pm (i.e., start hour < 12 and start + 12*60 <= endMins)
    const startH = startMins / 60; // fractional hour
    const naivePmStart = startMins + 12 * 60;
    // If start hour is in 1–11 range and naive pm start ≤ end, apply pm
    if (startH < 12 && naivePmStart <= endMins && startMins < endMins === false) {
      return { start: naivePmStart, end: endMins };
    }
  }

  return { start: startMins, end: endMins };
}

/** Convert absolute minutes to a CSS grid row number (1-based). */
function toGridRow(mins: number): number {
  return Math.round((mins - GRID_START) / SLOT) + 1;
}

/** Build inline styles for a positioned event block. */
function blockStyle(timeStr: string, color: string): React.CSSProperties {
  const { start, end } = parseTimeRange(timeStr);
  const rowStart = toGridRow(start);
  const rowEnd   = toGridRow(end);
  return {
    gridRow:         `${rowStart} / ${rowEnd}`,
    backgroundColor: color,
    border:          `1px solid rgba(255,255,255,0.12)`,
    padding:         "4px 8px",
    overflow:        "hidden",
    display:         "flex",
    flexDirection:   "column",
    justifyContent:  "flex-start",
    zIndex:          1,
  };
}

/** Duration in minutes for a time string. */
function durationMins(timeStr: string): number {
  if (timeStr === "Todo el día") return 12 * 60;
  const { start, end } = parseTimeRange(timeStr);
  return end - start;
}

// ─── Schedule data ────────────────────────────────────────────────────────────

const friday: Row[] = [
  { time: "18:55 – 19:00", activity: "Intro y llegada de participantes",                                           color: C.dark },
  { time: "19:00 – 19:25", activity: "Bienvenida por Natalia Jiménez, Founder de XAIA Lab",                        color: C.pink },
  { time: "19:25 – 19:30", activity: "Indicaciones de la hackathon, saludo a partners, sponsors y organizadores",  color: C.dark },
  { time: "19:30 – 19:50", activity: "Keynote Sezzle — Sponsor Platinum oficial",                                  color: C.cream },
  { time: "19:50 – 20:00", activity: "Ronda de preguntas",                                                         color: C.dark },
  { time: "20:00",         activity: "🟢 ¡Inicia la hackathon!",                                                   color: C.green },
];

const saturdayByCity: Record<City, Row[]> = {
  lima: [
    { time: "9:00",           activity: "Entrada a PUCP y recojo de merch",                    color: C.pink },
    { time: "9:00 – 11:00",   activity: "Desayuno / Coffee break",                             color: C.dark },
    { time: "11:00 – 14:00",  activity: "Sesiones de contacto con mentoras",                   color: C.pink },
    { time: "14:00 – 15:00",  activity: "Almuerzo",                                            color: C.dark },
    { time: "15:00 – 19:00",  activity: "Trabajo en proyectos",                                color: C.cream },
    { time: "19:00 – 20:00",  activity: "Coffee break",                                        color: C.dark },
    { time: "20:00 – 21:00",  activity: "Trabajo en proyectos (sprint final del día)",         color: C.cream },
  ],
  bogota: [
    { time: "9:00",           activity: "Entrada a Globant Connecta y recojo de merch",        color: C.pink },
    { time: "9:00 – 11:00",   activity: "Desayuno / Coffee break",                             color: C.dark },
    { time: "11:00 – 14:00",  activity: "Sesiones de contacto con mentoras",                   color: C.pink },
    { time: "14:00 – 15:00",  activity: "Almuerzo",                                            color: C.dark },
    { time: "15:00 – 19:00",  activity: "Trabajo en proyectos",                                color: C.cream },
  ],
  guatemala: [
    { time: "Todo el día",    activity: "Trabajo en proyectos desde Guatemala",                color: C.cream },
  ],
  remote: [
    { time: "Todo el día",    activity: "Trabajo en proyectos desde tu sede o de manera remota", color: C.cream },
  ],
};

const sunday: Row[] = [
  { time: "9:00 – 12:00",  activity: "Avance final de proyectos + último contacto con mentoras",               color: C.cream },
  { time: "12:00 – 13:00", activity: "Grabación de pitches y subida a Devpost",                                color: C.green },
  { time: "13:00 – 13:05", activity: "Indicaciones finales y cierre",                                          color: C.dark },
  { time: "13:05 – 13:30", activity: "Mensaje de cierre por Larissa, GTM de ElevenLabs",                       color: C.pink },
  { time: "13:30",         activity: "🏁 Fin de la hackathon",                                                  color: C.green },
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

function DayHeader({ label, subtitle, color }: { label: string; subtitle?: string; color: string }) {
  // Use dark text on light backgrounds (cream), white on dark/pink/green
  const isLight = color === C.cream;
  const textColor = isLight ? C.black : "#ffffff";
  return (
    <div
      style={{ backgroundColor: color, border: `1px solid rgba(255,255,255,0.15)` }}
      className="px-3 py-2"
    >
      <p
        style={{ color: textColor }}
        className="font-[family-name:var(--font-title)] text-xs font-black uppercase leading-tight"
      >
        {label}
      </p>
      {subtitle && (
        <p style={{ color: isLight ? C.gray : "rgba(255,255,255,0.65)" }} className="text-[10px] mt-0.5 leading-tight">{subtitle}</p>
      )}
    </div>
  );
}

/** A single positioned event block inside the proportional grid. */
function EventBlock({ row, column }: { row: Row; column: number }) {
  const dur = durationMins(row.time);
  const isShort = dur < 30;
  const isTiny  = dur < 15;
  const style = blockStyle(row.time, row.color);
  // Light backgrounds need dark text; dark/pink/green backgrounds use white/near-white
  const isLightBg = row.color === C.cream;
  const textColor = isLightBg ? C.black : "#ffffff";
  const mutedColor = isLightBg ? C.gray : "rgba(255,255,255,0.6)";

  return (
    <div style={{ ...style, gridColumn: column, padding: isShort ? "2px 4px" : "4px 8px" }}>
      {!isTiny && !isShort && (
        <span
          style={{
            fontSize: "8px",
            fontWeight: 900,
            color: mutedColor,
            lineHeight: 1.2,
            display: "block",
            marginBottom: "1px",
            fontFamily: "var(--font-title)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.time === "Todo el día" ? "9:00 – 21:00" : row.time}
        </span>
      )}
      {!isTiny && (
        <span
          style={{
            fontSize: isShort ? "7px" : "9px",
            fontWeight: 500,
            color: textColor,
            lineHeight: 1.2,
            display: "block",
            overflow: "hidden",
          }}
        >
          {row.activity}
        </span>
      )}
    </div>
  );
}

/** Grouped time range labels on the left axis — shows meaningful blocks, not every hour. */
function TimeAxis() {
  // Each entry: label shown, start time string, end time string (for row span)
  const groups: { label: string; start: string; end: string }[] = [
    { label: "9:00 – 11:00",  start: "9:00",  end: "11:00" },
    { label: "11:00 – 14:00", start: "11:00", end: "14:00" },
    { label: "14:00 – 15:00", start: "14:00", end: "15:00" },
    { label: "15:00 – 19:00", start: "15:00", end: "19:00" },
    { label: "19:00 – 21:00", start: "19:00", end: "21:00" },
  ];

  return (
    <>
      {groups.map((g) => {
        const rowStart = toGridRow(toMins(g.start));
        const rowEnd   = toGridRow(toMins(g.end));
        return (
          <div
            key={g.label}
            style={{
              gridRow:        `${rowStart} / ${rowEnd}`,
              gridColumn:     1,
              display:        "flex",
              alignItems:     "flex-start",
              justifyContent: "flex-end",
              paddingRight:   "6px",
              paddingTop:     "3px",
            }}
          >
            <span
              style={{
                fontSize:    "7px",
                fontWeight:  700,
                color:       "rgba(255,255,255,0.35)",
                fontFamily:  "var(--font-title)",
                whiteSpace:  "nowrap",
                lineHeight:  1.2,
                textAlign:   "right",
                writingMode: "vertical-rl",
                transform:   "rotate(180deg)",
              }}
            >
              {g.label}
            </span>
          </div>
        );
      })}
    </>
  );
}

/** Horizontal rule lines at group boundaries spanning columns 2-4. */
function GroupRules() {
  const boundaries = ["9:00", "11:00", "14:00", "15:00", "19:00", "21:00"];
  return (
    <>
      {boundaries.map((t) => {
        const rowStart = toGridRow(toMins(t));
        return (
          <div
            key={t}
            style={{
              gridRow:       `${rowStart} / ${rowStart + 1}`,
              gridColumn:    "2 / 5",
              borderTop:     "1px solid rgba(255,255,255,0.1)",
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

      {/* City chips — filter Saturday column */}
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

      {/* Scrollable calendar grid with sticky headers */}
      <div style={{ overflowX: "auto" }}>
        {/* Day header bar — inside scroll container so columns stay aligned */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "60px 1fr 1fr 1fr",
            gap:                 "2px",
            marginBottom:        "2px",
            minWidth:            "600px",
          }}
        >
          <div /> {/* empty time-axis corner */}
          <DayHeader label="Vie 6 · Kick-off" color={C.pink} />
          <DayHeader
            label="Sáb 7 · Build Day"
            subtitle={citySubtitle[city]}
            color={C.green}
          />
          <DayHeader label="Dom 8 · Demo Day" color={C.cream} />
        </div>
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "60px 1fr 1fr 1fr",
            gridTemplateRows:    `repeat(${TOTAL_ROWS}, ${ROW_HEIGHT}px)`,
            gap:                 "2px",
            minWidth:            "600px",
            position:            "relative",
          }}
        >
          {/* Group boundary rules */}
          <GroupRules />

          {/* Time axis labels */}
          <TimeAxis />

          {/* Friday events — column 2 */}
          {friday.map((row, i) => (
            <EventBlock key={`fri-${i}`} row={row} column={2} />
          ))}

          {/* Saturday events — column 3 */}
          {satRows.map((row, i) => (
            <EventBlock key={`sat-${i}`} row={row} column={3} />
          ))}

          {/* Sunday events — column 4 */}
          {sunday.map((row, i) => (
            <EventBlock key={`sun-${i}`} row={row} column={4} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
