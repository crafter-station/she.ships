"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Loader2 } from "lucide-react";
import type { ParticleConfig } from "@/lib/badge/particle-config";
import { capConfigForMobile } from "@/lib/badge/particle-config";

type Preset = { label: string; emoji: string; config: ParticleConfig };

const FLAG_PRESETS: Preset[] = [
  {
    label: "Peru",
    emoji: "🇵🇪",
    config: {
      groups: [
        { color: "#D91023", count: 1650, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#D91023", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFFFFF", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Colombia",
    emoji: "🇨🇴",
    config: {
      groups: [
        { color: "#FCD116", count: 1250, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FCD116", emissiveIntensity: 0.5, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#003893", count: 625, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#003893", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#CE1126", count: 625, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#CE1126", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Brazil",
    emoji: "🇧🇷",
    config: {
      groups: [
        { color: "#009739", count: 1000, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#009739", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFDF00", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFDF00", emissiveIntensity: 0.5, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#002776", count: 400, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#002776", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 250, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFFFFF", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Guatemala",
    emoji: "🇬🇹",
    config: {
      groups: [
        { color: "#4997D0", count: 1250, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#4997D0", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 1250, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFFFFF", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Mexico",
    emoji: "🇲🇽",
    config: {
      groups: [
        { color: "#006341", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#006341", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFFFFF", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#CE1126", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#CE1126", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Argentina",
    emoji: "🇦🇷",
    config: {
      groups: [
        { color: "#74ACDF", count: 1100, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#74ACDF", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 1100, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFFFFF", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#F6B40E", count: 300, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#F6B40E", emissiveIntensity: 0.6, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Chile",
    emoji: "🇨🇱",
    config: {
      groups: [
        { color: "#D52B1E", count: 1250, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#D52B1E", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFFFFF", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#0039A6", count: 400, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#0039A6", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Ecuador",
    emoji: "🇪🇨",
    config: {
      groups: [
        { color: "#FFD100", count: 1250, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFD100", emissiveIntensity: 0.5, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#034EA2", count: 625, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#034EA2", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#ED1C24", count: 625, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#ED1C24", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Bolivia",
    emoji: "🇧🇴",
    config: {
      groups: [
        { color: "#D52B1E", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#D52B1E", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#F9E300", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#F9E300", emissiveIntensity: 0.5, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#007934", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#007934", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Venezuela",
    emoji: "🇻🇪",
    config: {
      groups: [
        { color: "#FFCC00", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFCC00", emissiveIntensity: 0.5, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#00247D", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#00247D", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#CF142B", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#CF142B", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Costa Rica",
    emoji: "🇨🇷",
    config: {
      groups: [
        { color: "#002B7F", count: 750, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#002B7F", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 750, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFFFFF", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#CE1126", count: 1000, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#CE1126", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "USA",
    emoji: "🇺🇸",
    config: {
      groups: [
        { color: "#B22234", count: 1000, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#B22234", emissiveIntensity: 0.4, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#FFFFFF", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#3C3B6E", count: 650, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#3C3B6E", emissiveIntensity: 0.3, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
];

const STYLE_PRESETS: Preset[] = [
  {
    label: "She Ships",
    emoji: "🚀",
    config: {
      groups: [
        { color: "#ff2d78", count: 2500, size: 0.012, shape: "sphere", metalness: 0.95, roughness: 0.9, emissive: "#000000", emissiveIntensity: 0, clearcoat: 0.5, opacity: 1, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Crafter Station",
    emoji: "⚒️",
    config: {
      groups: [
        { color: "#FFD700", count: 1500, size: 0.012, shape: "sphere", metalness: 0.95, roughness: 0.15, emissive: "#FFD700", emissiveIntensity: 0.6, clearcoat: 1.0, opacity: 1, transmission: 0, fluid: false },
        { color: "#000000", count: 600, size: 0.010, shape: "sphere", metalness: 0.95, roughness: 0.3, emissive: "#000000", emissiveIntensity: 0, clearcoat: 0.8, opacity: 1, transmission: 0, fluid: false },
        { color: "#FAFAFA", count: 400, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FAFAFA", emissiveIntensity: 0.8, clearcoat: 1.0, opacity: 1, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Moraleja",
    emoji: "💚",
    config: {
      groups: [
        { color: "#00FF7F", count: 1600, size: 0.012, shape: "sphere", metalness: 0.95, roughness: 0.2, emissive: "#00FF7F", emissiveIntensity: 0.7, clearcoat: 0.9, opacity: 1, transmission: 0, fluid: false },
        { color: "#0A0C0C", count: 900, size: 0.010, shape: "sphere", metalness: 0.95, roughness: 0.3, emissive: "#000000", emissiveIntensity: 0, clearcoat: 0.8, opacity: 1, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Kebo",
    emoji: "🐨",
    config: {
      groups: [
        { color: "#7C3AED", count: 1400, size: 0.012, shape: "sphere", metalness: 0.95, roughness: 0.2, emissive: "#7C3AED", emissiveIntensity: 0.7, clearcoat: 0.9, opacity: 1, transmission: 0, fluid: false },
        { color: "#A78BFA", count: 700, size: 0.010, shape: "sphere", metalness: 0.9, roughness: 0.25, emissive: "#A78BFA", emissiveIntensity: 0.5, clearcoat: 0.8, opacity: 1, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 400, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FFFFFF", emissiveIntensity: 0.8, clearcoat: 1.0, opacity: 1, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Neon Glow",
    emoji: "💜",
    config: {
      groups: [
        { color: "#ff00ff", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#ff00ff", emissiveIntensity: 2.0, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#00ffff", count: 850, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#00ffff", emissiveIntensity: 2.0, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#ff2d78", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#ff2d78", emissiveIntensity: 1.8, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Gold Lux",
    emoji: "✨",
    config: {
      groups: [
        { color: "#FFD700", count: 1500, size: 0.012, shape: "diamond", metalness: 0.9, roughness: 0.15, emissive: "#FFD700", emissiveIntensity: 0.8, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFA500", count: 600, size: 0.010, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#FFA500", emissiveIntensity: 0.6, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 400, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FFFFFF", emissiveIntensity: 1.5, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Ocean",
    emoji: "🌊",
    config: {
      groups: [
        { color: "#0077be", count: 1000, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#0077be", emissiveIntensity: 0.5, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#00bfff", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#00bfff", emissiveIntensity: 0.6, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#00e5ff", count: 500, size: 0.010, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#00e5ff", emissiveIntensity: 0.8, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 200, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FFFFFF", emissiveIntensity: 1.0, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Sunset",
    emoji: "🌅",
    config: {
      groups: [
        { color: "#FF4500", count: 900, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#FF4500", emissiveIntensity: 0.7, clearcoat: 0.7, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FF8C00", count: 700, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#FF8C00", emissiveIntensity: 0.6, clearcoat: 0.7, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFD700", count: 550, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#FFD700", emissiveIntensity: 0.5, clearcoat: 0.7, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#8B008B", count: 350, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#8B008B", emissiveIntensity: 0.8, clearcoat: 0.7, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Emerald",
    emoji: "💎",
    config: {
      groups: [
        { color: "#00ff88", count: 1200, size: 0.012, shape: "diamond", metalness: 0.9, roughness: 0.15, emissive: "#00ff88", emissiveIntensity: 0.7, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#00cc66", count: 800, size: 0.012, shape: "diamond", metalness: 0.9, roughness: 0.2, emissive: "#00cc66", emissiveIntensity: 0.5, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 500, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FFFFFF", emissiveIntensity: 1.2, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Lavender",
    emoji: "🪻",
    config: {
      groups: [
        { color: "#9B59B6", count: 900, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#9B59B6", emissiveIntensity: 0.6, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#D7BDE2", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#D7BDE2", emissiveIntensity: 0.4, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FF69B4", count: 500, size: 0.010, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#FF69B4", emissiveIntensity: 0.7, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 300, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FFFFFF", emissiveIntensity: 0.8, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Fire",
    emoji: "🔥",
    config: {
      groups: [
        { color: "#ff0000", count: 1000, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#ff0000", emissiveIntensity: 1.5, clearcoat: 0.5, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#ff6600", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#ff6600", emissiveIntensity: 1.2, clearcoat: 0.5, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#ffcc00", count: 500, size: 0.010, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#ffcc00", emissiveIntensity: 1.8, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 200, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FFFFFF", emissiveIntensity: 2.0, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Cyberpunk",
    emoji: "🤖",
    config: {
      groups: [
        { color: "#ff2d78", count: 800, size: 0.012, shape: "cube", metalness: 0.9, roughness: 0.2, emissive: "#ff2d78", emissiveIntensity: 1.5, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#00e5ff", count: 800, size: 0.012, shape: "cube", metalness: 0.9, roughness: 0.2, emissive: "#00e5ff", emissiveIntensity: 1.5, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#7b2eff", count: 600, size: 0.010, shape: "cube", metalness: 0.9, roughness: 0.15, emissive: "#7b2eff", emissiveIntensity: 1.8, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 300, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FFFFFF", emissiveIntensity: 2.0, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Galaxy",
    emoji: "🌌",
    config: {
      groups: [
        { color: "#1a0033", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.4, emissive: "#6600cc", emissiveIntensity: 0.8, clearcoat: 0.6, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#3300ff", count: 700, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#3300ff", emissiveIntensity: 1.0, clearcoat: 0.7, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#ff00cc", count: 600, size: 0.010, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#ff00cc", emissiveIntensity: 1.2, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 400, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#FFFFFF", emissiveIntensity: 2.5, clearcoat: 1.0, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
  {
    label: "Cherry",
    emoji: "🌸",
    config: {
      groups: [
        { color: "#FFB7C5", count: 1000, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#FFB7C5", emissiveIntensity: 0.5, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FF69B4", count: 800, size: 0.012, shape: "sphere", metalness: 0.9, roughness: 0.3, emissive: "#FF69B4", emissiveIntensity: 0.6, clearcoat: 0.8, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FFFFFF", count: 500, size: 0.010, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#FFFFFF", emissiveIntensity: 0.5, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
        { color: "#FF1493", count: 200, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.2, emissive: "#FF1493", emissiveIntensity: 1.0, clearcoat: 0.9, opacity: 0.95, transmission: 0, fluid: false },
      ],
    },
  },
];

interface ParticleInputProps {
  onGenerate: (prompt: string) => Promise<void>;
  onPreset: (config: ParticleConfig) => void;
  isLoading: boolean;
  isMobile: boolean;
  accentColor?: string;
}

export default function ParticleInput({
  onGenerate,
  onPreset,
  isLoading,
  isMobile,
  accentColor,
}: ParticleInputProps) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;
        onGenerate(prompt.trim());
      }
    },
    [prompt, isLoading, onGenerate]
  );

  const handlePresetClick = (preset: Preset) => {
    if (isLoading) return;
    onPreset(isMobile ? capConfigForMobile(preset.config) : preset.config);
  };

  const chipRow = (presets: Preset[]) => (
    <div className="flex gap-1 md:gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          disabled={isLoading}
          onClick={() => handlePresetClick(preset)}
          className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-[11px] text-white/50 hover:bg-white/10 hover:text-white/80 hover:border-white/30 transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          {preset.emoji} {preset.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-1.5 md:gap-2">
      {chipRow(FLAG_PRESETS)}
      {chipRow(STYLE_PRESETS)}

      {/* Textarea for custom AI input */}
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.badge.particlePromptCustom}
          disabled={isLoading}
          rows={1}
          className="w-full resize-none rounded-xl border border-white/20 bg-white/5 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50 backdrop-blur-sm select-text transition-colors"
          style={{ borderColor: prompt ? (accentColor || "#ff2d78") + "66" : undefined }}
        />
        {isLoading && (
          <div className="absolute right-3 bottom-2 md:bottom-3 flex items-center gap-2 text-[10px] md:text-xs" style={{ color: accentColor ? `${accentColor}99` : "rgba(255,255,255,0.4)" }}>
            <Loader2 className="w-3 h-3 animate-spin" />
            {t.badge.particlePromptLoading}
          </div>
        )}
      </div>
    </div>
  );
}
