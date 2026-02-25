import { z } from "zod";

export const particleShapes = [
  "sphere",
  "cube",
  "diamond",
  "capsule",
] as const;

export const particleGroupSchema = z.object({
  color: z
    .string()
    .describe("CSS hex color, e.g. '#ffd700'"),
  count: z
    .number()
    .int()
    .min(10)
    .max(1800)
    .describe("Number of particles in this group"),
  size: z
    .number()
    .min(0.008)
    .max(0.04)
    .describe("Particle radius (0.012 is default)"),
  shape: z
    .enum(particleShapes)
    .describe("Particle shape: sphere (round), cube (blocky), diamond (faceted gem), capsule (pill/elongated)"),
  metalness: z
    .number()
    .min(0)
    .max(1)
    .describe("Material metalness (0=matte, 1=metal)"),
  roughness: z
    .number()
    .min(0)
    .max(1)
    .describe("Material roughness (0=glossy, 1=rough)"),
  emissive: z
    .string()
    .describe("Emissive hex color for glow, e.g. '#000000' for no glow"),
  emissiveIntensity: z
    .number()
    .min(0)
    .max(3)
    .describe("Emissive intensity (0=no glow, 2+=strong glow)"),
  clearcoat: z
    .number()
    .min(0)
    .max(1)
    .describe("Clearcoat layer (0=none, 1=full glossy coat)"),
  opacity: z
    .number()
    .min(0.15)
    .max(1)
    .describe("Opacity (1=solid, 0.3-0.6=fluid/glass look)"),
  transmission: z
    .number()
    .min(0)
    .max(1)
    .describe("Glass transmission (0=opaque, 0.5-0.9=liquid/glass look)"),
  fluid: z
    .boolean()
    .describe("Enable fluid physics: cohesion (surface tension) + viscosity for liquid behavior"),
});

export const particleConfigSchema = z.object({
  groups: z
    .array(particleGroupSchema)
    .min(1)
    .max(4)
    .describe("1-4 particle groups with distinct visual properties"),
});

export type ParticleGroup = z.infer<typeof particleGroupSchema>;
export type ParticleConfig = z.infer<typeof particleConfigSchema>;

const MOBILE_MAX_PARTICLES = 500;

const MOBILE_PARTICLE_SIZE = 0.025;

/** Scale group counts proportionally so total doesn't exceed the mobile cap, and bump particle size. */
export function capConfigForMobile(config: ParticleConfig): ParticleConfig {
  const total = config.groups.reduce((s, g) => s + g.count, 0);
  const scale = total > MOBILE_MAX_PARTICLES ? MOBILE_MAX_PARTICLES / total : 1;
  return {
    groups: config.groups.map((g) => ({
      ...g,
      count: scale < 1 ? Math.max(10, Math.round(g.count * scale)) : g.count,
      size: MOBILE_PARTICLE_SIZE,
    })),
  };
}

export const defaultParticleConfig: ParticleConfig = {
  groups: [
    {
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
    },
  ],
};
