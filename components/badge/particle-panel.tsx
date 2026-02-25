"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Copy } from "lucide-react";
import {
  particleShapes,
  capConfigForMobile,
  type ParticleConfig,
  type ParticleGroup,
} from "@/lib/badge/particle-config";

const DEFAULT_GROUP: ParticleGroup = {
  color: "#ff2d78",
  count: 1800,
  size: 0.012,
  shape: "sphere",
  metalness: 0.95,
  roughness: 0.9,
  emissive: "#000000",
  emissiveIntensity: 0,
  clearcoat: 0.5,
  opacity: 1,
  transmission: 0,
  fluid: false,
};

const PRESETS: { label: string; config: ParticleConfig }[] = [
  {
    label: "Default",
    config: {
      groups: [
        { ...DEFAULT_GROUP },
      ],
    },
  },
  // {
  //   label: "Water",
  //   config: {
  //     groups: [
  //       {
  //         color: "#1e90ff",
  //         count: 900,
  //         size: 0.018,
  //         shape: "sphere",
  //         metalness: 0,
  //         roughness: 0.05,
  //         emissive: "#000000",
  //         emissiveIntensity: 0,
  //         clearcoat: 1,
  //         opacity: 0.5,
  //         transmission: 0.6,
  //         fluid: true,
  //       },
  //     ],
  //   },
  // },
  {
    label: "Lava",
    config: {
      groups: [
        {
          color: "#ff4500",
          count: 1200,
          size: 0.012,
          shape: "sphere",
          metalness: 0.3,
          roughness: 0.2,
          emissive: "#ff6600",
          emissiveIntensity: 1.5,
          clearcoat: 0.6,
          opacity: 0.8,
          transmission: 0.2,
          fluid: false,
        },
        {
          color: "#1a1a1a",
          count: 600,
          size: 0.012,
          shape: "diamond",
          metalness: 0.1,
          roughness: 0.9,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 0,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
      ],
    },
  },
  {
    label: "Mercury",
    config: {
      groups: [
        {
          color: "#c0c0c0",
          count: 1800,
          size: 0.012,
          shape: "sphere",
          metalness: 1,
          roughness: 0.05,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 1,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
      ],
    },
  },
  {
    label: "Neon",
    config: {
      groups: [
        {
          color: "#ff2d78",
          count: 900,
          size: 0.012,
          shape: "sphere",
          metalness: 0.1,
          roughness: 0.2,
          emissive: "#ff2d78",
          emissiveIntensity: 2,
          clearcoat: 0.8,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
        {
          color: "#00ffff",
          count: 900,
          size: 0.012,
          shape: "sphere",
          metalness: 0.1,
          roughness: 0.2,
          emissive: "#00ffff",
          emissiveIntensity: 2,
          clearcoat: 0.8,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
      ],
    },
  },
  {
    label: "Gems",
    config: {
      groups: [
        {
          color: "#e040fb",
          count: 600,
          size: 0.012,
          shape: "diamond",
          metalness: 0.3,
          roughness: 0.1,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 1,
          opacity: 0.8,
          transmission: 0.4,
          fluid: false,
        },
        {
          color: "#ffd700",
          count: 1200,
          size: 0.012,
          shape: "sphere",
          metalness: 0.9,
          roughness: 0.15,
          emissive: "#ffd700",
          emissiveIntensity: 0.5,
          clearcoat: 0.8,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
      ],
    },
  },
  {
    label: "Pixel",
    config: {
      groups: [
        {
          color: "#ff0000",
          count: 600,
          size: 0.012,
          shape: "cube",
          metalness: 0,
          roughness: 0.8,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 0,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
        {
          color: "#00ff00",
          count: 600,
          size: 0.012,
          shape: "cube",
          metalness: 0,
          roughness: 0.8,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 0,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
        {
          color: "#0066ff",
          count: 600,
          size: 0.012,
          shape: "cube",
          metalness: 0,
          roughness: 0.8,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 0,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
      ],
    },
  },
  // {
  //   label: "Bubbles",
  //   config: {
  //     groups: [
  //       {
  //         color: "#88ddff",
  //         count: 900,
  //         size: 0.022,
  //         shape: "sphere",
  //         metalness: 0,
  //         roughness: 0.05,
  //         emissive: "#000000",
  //         emissiveIntensity: 0,
  //         clearcoat: 1,
  //         opacity: 0.35,
  //         transmission: 0.85,
  //         fluid: true,
  //       },
  //     ],
  //   },
  // },
  {
    label: "Colombia",
    config: {
      groups: [
        {
          color: "#FCD116",
          count: 900,
          size: 0.012,
          shape: "sphere",
          metalness: 0.1,
          roughness: 0.4,
          emissive: "#FCD116",
          emissiveIntensity: 0.3,
          clearcoat: 0.6,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
        {
          color: "#003893",
          count: 450,
          size: 0.012,
          shape: "sphere",
          metalness: 0.1,
          roughness: 0.4,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 0.6,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
        {
          color: "#CE1126",
          count: 450,
          size: 0.012,
          shape: "sphere",
          metalness: 0.1,
          roughness: 0.4,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 0.6,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
      ],
    },
  },
  {
    label: "Peru",
    config: {
      groups: [
        {
          color: "#D91023",
          count: 1200,
          size: 0.012,
          shape: "sphere",
          metalness: 0.1,
          roughness: 0.4,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 0.6,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
        {
          color: "#FFFFFF",
          count: 600,
          size: 0.012,
          shape: "sphere",
          metalness: 0.1,
          roughness: 0.4,
          emissive: "#000000",
          emissiveIntensity: 0,
          clearcoat: 0.6,
          opacity: 1,
          transmission: 0,
          fluid: false,
        },
      ],
    },
  },
];

interface ParticlePanelProps {
  config: ParticleConfig;
  onChange: (config: ParticleConfig) => void;
  isMobile: boolean;
}

export default function ParticlePanel({
  config,
  onChange,
  isMobile,
}: ParticlePanelProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);

  const updateGroup = (idx: number, patch: Partial<ParticleGroup>) => {
    const groups = config.groups.map((g, i) =>
      i === idx ? { ...g, ...patch } : g
    );
    onChange({ groups });
  };

  const addGroup = () => {
    if (config.groups.length >= 4) return;
    onChange({ groups: [...config.groups, { ...DEFAULT_GROUP }] });
    setExpanded(config.groups.length);
  };

  const removeGroup = (idx: number) => {
    if (config.groups.length <= 1) return;
    const groups = config.groups.filter((_, i) => i !== idx);
    onChange({ groups });
    setExpanded(null);
  };

  const duplicateGroup = (idx: number) => {
    if (config.groups.length >= 4) return;
    const groups = [...config.groups];
    groups.splice(idx + 1, 0, { ...config.groups[idx] });
    onChange({ groups });
    setExpanded(idx + 1);
  };

  const totalCount = config.groups.reduce((s, g) => s + g.count, 0);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 rounded-lg bg-black/80 border border-white/20 px-3 py-2 text-xs text-white/60 hover:text-white hover:border-white/40 backdrop-blur-sm transition-all font-mono"
      >
        Particles
      </button>
    );
  }

  const applyPreset = (presetConfig: ParticleConfig) => {
    onChange(isMobile ? capConfigForMobile(presetConfig) : presetConfig);
    setExpanded(0);
  };

  return (
    <div
      className={
        isMobile
          ? "fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-xl bg-black/90 border-t border-white/20 backdrop-blur-md text-white text-xs font-mono"
          : "fixed top-4 right-4 z-50 w-80 max-h-[90vh] overflow-y-auto rounded-xl bg-black/90 border border-white/20 backdrop-blur-md text-white text-xs font-mono"
      }
    >
      {/* Mobile drag handle */}
      {isMobile && (
        <div className="flex justify-center pt-2 pb-0">
          <div className="w-10 h-1 rounded-full bg-white/30" />
        </div>
      )}
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-sm">Particle Panel</span>
        <div className="flex items-center gap-3">
          <span className="text-white/40">{totalCount} total</span>
          <button
            onClick={() => setOpen(false)}
            className="text-white/40 hover:text-white"
          >
            x
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="px-3 pt-3 pb-1 flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset.config)}
            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] text-white/50 hover:bg-white/15 hover:text-white hover:border-white/30 transition-all"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="p-3 pt-1 flex flex-col gap-2">
        {config.groups.map((group, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-white/10 overflow-hidden"
          >
            {/* Group header */}
            <button
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 transition-colors"
            >
              <div
                className="w-3 h-3 rounded-sm border border-white/30 shrink-0"
                style={{ backgroundColor: group.color }}
              />
              <span className="flex-1 text-left">
                Group {idx + 1} — {group.shape}
                {group.fluid ? " (fluid)" : ""}
              </span>
              <span className="text-white/30">{group.count}</span>
              {expanded === idx ? (
                <ChevronUp className="w-3 h-3 text-white/30" />
              ) : (
                <ChevronDown className="w-3 h-3 text-white/30" />
              )}
            </button>

            {/* Group controls */}
            {expanded === idx && (
              <div className="px-3 pb-3 flex flex-col gap-2 border-t border-white/5 pt-2">
                {/* Color + Shape row */}
                <div className="flex gap-2">
                  <label className="flex-1 flex flex-col gap-1">
                    <span className="text-white/40">Color</span>
                    <input
                      type="color"
                      value={group.color}
                      onChange={(e) =>
                        updateGroup(idx, { color: e.target.value })
                      }
                      className="w-full h-7 bg-transparent border border-white/20 rounded cursor-pointer"
                    />
                  </label>
                  <label className="flex-1 flex flex-col gap-1">
                    <span className="text-white/40">Shape</span>
                    <select
                      value={group.shape}
                      onChange={(e) =>
                        updateGroup(idx, {
                          shape: e.target.value as ParticleGroup["shape"],
                        })
                      }
                      className="h-7 bg-black border border-white/20 rounded px-1 text-white"
                    >
                      {particleShapes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Count */}
                <Slider
                  label="Count"
                  value={group.count}
                  min={10}
                  max={isMobile ? 500 : 2500}
                  step={10}
                  onChange={(v) => updateGroup(idx, { count: v })}
                />

                {/* Size */}
                <Slider
                  label="Size"
                  value={group.size}
                  min={0.008}
                  max={0.04}
                  step={0.001}
                  onChange={(v) => updateGroup(idx, { size: v })}
                />

                {/* Material */}
                <Slider
                  label="Metalness"
                  value={group.metalness}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={(v) => updateGroup(idx, { metalness: v })}
                />
                <Slider
                  label="Roughness"
                  value={group.roughness}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={(v) => updateGroup(idx, { roughness: v })}
                />
                <Slider
                  label="Clearcoat"
                  value={group.clearcoat}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={(v) => updateGroup(idx, { clearcoat: v })}
                />

                {/* Emissive */}
                <div className="flex gap-2">
                  <label className="w-16 flex flex-col gap-1">
                    <span className="text-white/40">Emissive</span>
                    <input
                      type="color"
                      value={group.emissive}
                      onChange={(e) =>
                        updateGroup(idx, { emissive: e.target.value })
                      }
                      className="w-full h-7 bg-transparent border border-white/20 rounded cursor-pointer"
                    />
                  </label>
                  <div className="flex-1">
                    <Slider
                      label="Intensity"
                      value={group.emissiveIntensity}
                      min={0}
                      max={3}
                      step={0.1}
                      onChange={(v) =>
                        updateGroup(idx, { emissiveIntensity: v })
                      }
                    />
                  </div>
                </div>

                {/* Transparency */}
                <Slider
                  label="Opacity"
                  value={group.opacity}
                  min={0.15}
                  max={1}
                  step={0.05}
                  onChange={(v) => updateGroup(idx, { opacity: v })}
                />
                <Slider
                  label="Transmission"
                  value={group.transmission}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={(v) => updateGroup(idx, { transmission: v })}
                />

                {/* Fluid toggle */}
                <label className="flex items-center gap-2 py-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={group.fluid}
                    onChange={(e) =>
                      updateGroup(idx, { fluid: e.target.checked })
                    }
                    className="accent-primary-pink"
                  />
                  <span>Fluid physics</span>
                </label>

                {/* Actions */}
                <div className="flex gap-2 pt-1 border-t border-white/5">
                  <button
                    onClick={() => duplicateGroup(idx)}
                    disabled={config.groups.length >= 4}
                    className="flex items-center gap-1 text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                  >
                    <Copy className="w-3 h-3" /> Duplicate
                  </button>
                  <button
                    onClick={() => removeGroup(idx)}
                    disabled={config.groups.length <= 1}
                    className="flex items-center gap-1 text-red-400/60 hover:text-red-400 disabled:opacity-20 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add group */}
        <button
          onClick={addGroup}
          disabled={config.groups.length >= 4}
          className="w-full flex items-center justify-center gap-1 py-2 rounded-lg border border-dashed border-white/15 text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 transition-all"
        >
          <Plus className="w-3 h-3" /> Add group
        </button>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span className="text-white/40">{label}</span>
        <span className="text-white/60 tabular-nums">
          {step >= 1 ? value : value.toFixed(3)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 appearance-none bg-white/10 rounded-full accent-primary-pink cursor-pointer [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full"
      />
    </label>
  );
}
