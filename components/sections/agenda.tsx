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

// Variable row heights: taller for 19:00–20:30 so events are readable
const ROW_HEIGHT_NORMAL = 3;
const ROW_HEIGHT_TALL   = 8;
const TALL_START_ROW = (19 * 60 - GRID_START) / SLOT;      // 120 (0-indexed)
const TALL_END_ROW   = (20.5 * 60 - GRID_START) / SLOT;    // 138 (0-indexed)
const GRID_TEMPLATE_ROWS = [
  `repeat(${TALL_START_ROW}, ${ROW_HEIGHT_NORMAL}px)`,
  `repeat(${TALL_END_ROW - TALL_START_ROW}, ${ROW_HEIGHT_TALL}px)`,
  `repeat(${TOTAL_ROWS - TALL_END_ROW}, ${ROW_HEIGHT_NORMAL}px)`,
].join(" ");

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

const ALL_DAY = "ALL_DAY";

function parseTimeRange(timeStr: string): { start: number; end: number } {
  if (timeStr === ALL_DAY) return { start: toMins("9:00"), end: toMins("21:00") };
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
  if (timeStr === ALL_DAY) return 12 * 60;
  const { start, end } = parseTimeRange(timeStr);
  return end - start;
}

// ─── Schedule structure (times + colors only — activities come from i18n) ─────

const FRIDAY_STRUCTURE:   { time: string; color: string }[] = [
  { time: "18:55 – 19:00", color: C.pink  },
  { time: "19:00 – 19:25", color: C.pink  },
  { time: "19:25 – 19:30", color: C.cream },
  { time: "19:30 – 20:00", color: C.cream },
  { time: "20:00 – 21:00", color: C.green },
];

const SAT_LIMA_STRUCTURE: { time: string; color: string }[] = [
  { time: "9:00",          color: C.pink  },
  { time: "9:00 – 11:00",  color: C.cream },
  { time: "11:00 – 14:00", color: C.pink  },
  { time: "14:00 – 15:00", color: C.green },
  { time: "15:00 – 19:00", color: C.cream },
  { time: "19:00 – 20:00", color: C.green },
  { time: "20:00 – 21:00", color: C.pink  },
];

const SAT_BOGOTA_STRUCTURE: { time: string; color: string }[] = [
  { time: "9:00",          color: C.pink  },
  { time: "9:00 – 11:00",  color: C.cream },
  { time: "11:00 – 14:00", color: C.pink  },
  { time: "14:00 – 15:00", color: C.green },
  { time: "15:00 – 19:00", color: C.cream },
];

const SAT_OTHER_STRUCTURE: { time: string; color: string }[] = [
  { time: ALL_DAY, color: C.cream },
];

const SUNDAY_STRUCTURE: { time: string; color: string }[] = [
  { time: "9:00 – 12:00",  color: C.cream },
  { time: "12:00 – 13:00", color: C.green },
  { time: "13:00 – 13:30", color: C.pink  },
  { time: "13:30 – 14:00", color: C.green },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DayHeader({ label, subtitle }: { label: string; subtitle?: string }) {
  return (
    <div className="px-3 py-2">
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
  const isTiny  = dur < 15;
  const isShort = dur < 40;

  const { start, end } = parseTimeRange(row.time);
  const rowStart = toGridRow(start);
  const rowEnd   = toGridRow(end);

  // All blocks: show their color by default, darken on hover
  const bgColor   = hovered ? C.black : row.color;
  const textColor = hovered ? "#ffffff" : C.black;

  // Format display time: strip seconds, show short range
  const displayTime = row.time === ALL_DAY ? "9:00 – 21:00" : row.time;

  return (
    // Outer cell: occupies the grid position, provides 2px inset margin
    <div
      title={`${displayTime} · ${row.activity}`}
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
            fontSize:    isShort ? "8px" : "9px",
            fontWeight:  700,
            color:       textColor,
            lineHeight:  1.2,
            display:     "block",
            overflow:    "hidden",
            whiteSpace:  "nowrap",
            textOverflow:"ellipsis",
            fontFamily:  "var(--font-title)",
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

  const friday = FRIDAY_STRUCTURE.map((s, i) => ({ ...s, activity: t.agenda.friday[i] }));
  const sunday  = SUNDAY_STRUCTURE.map((s, i) => ({ ...s, activity: t.agenda.sunday[i] }));

  const saturdayByCity: Record<City, Row[]> = {
    lima:      SAT_LIMA_STRUCTURE.map((s, i)   => ({ ...s, activity: t.agenda.saturdayLima[i] })),
    bogota:    SAT_BOGOTA_STRUCTURE.map((s, i) => ({ ...s, activity: t.agenda.saturdayBogota[i] })),
    guatemala: SAT_OTHER_STRUCTURE.map((s, i)  => ({ ...s, activity: t.agenda.saturdayGuatemala[i] })),
    remote:    SAT_OTHER_STRUCTURE.map((s, i)  => ({ ...s, activity: t.agenda.saturdayRemote[i] })),
  };
  const satRows = saturdayByCity[city];

  const citySubtitle: Record<City, string> = Object.fromEntries(
    t.agenda.cities.map((c) => [c.id, c.subtitle])
  ) as Record<City, string>;

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
        {t.agenda.cities.map((c) => (
          <button
            key={c.id}
            onClick={() => setCity(c.id as City)}
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
          borderBottom:        "1px solid rgba(255,255,255,0.15)",
        }}>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.15)" }} />
          <DayHeader label={t.agenda.dayFriday} />
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
            <DayHeader label={t.agenda.daySaturday} subtitle={citySubtitle[city]} />
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
            <DayHeader label={t.agenda.daySunday} />
          </div>
        </div>

        {/* Time grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "44px 1fr 1fr 1fr",
          gridTemplateRows:    GRID_TEMPLATE_ROWS,
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
