import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { particleConfigSchema } from "@/lib/badge/particle-config";
import { llmRatelimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success, limit, remaining, reset } = await llmRatelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Try again tomorrow." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }

  const { prompt, isMobile } = await req.json();
  const maxTotal = isMobile ? 500 : 2500;

  const { object } = await generateObject({
    model: gateway("openai/gpt-oss-120b"),
    schema: particleConfigSchema,
    system: `You are a creative particle designer for a 3D badge visualization.
The badge is a conference lanyard card with small particles that fill the card surface like liquid beads.
The particles use PBD physics — they slosh around, collide, and settle under gravity.

Given a user description, generate a ParticleConfig with 1-4 groups of particles.
Each group has: color (hex), count, size (radius 0.008-0.04, default 0.012), shape, metalness (0-1), roughness (0-1), emissive (hex), emissiveIntensity (0-3), clearcoat (0-1), opacity (0.15-1), transmission (0-1), fluid (boolean).

Available shapes:
- "sphere" — round balls, classic look, great for bubbles, beads, pearls
- "cube" — blocky, great for retro/pixel/voxel aesthetics
- "diamond" — faceted octahedron, great for gems, crystals, luxury themes
- "capsule" — elongated pill shape, great for organic/biological/fluid themes

Fluid & glass effects:
- For "fluid/liquid" particles: set fluid=true for real liquid physics (cohesion + viscosity). Combine with sphere or capsule shape, opacity 0.3-0.6, transmission 0.5-0.9 for a see-through liquid look.
- fluid=true adds surface tension (particles clump together) and viscosity (they flow smoothly as a group) — like water or mercury.
- For "glass" particles: set transmission to 0.7-0.95 with low roughness, fluid=false.
- For "bubble" particles: sphere shape, high transmission (0.8+), low opacity (0.3-0.5), fluid=true for cohesive clusters.
- For "lava/mercury": fluid=true, high metalness, low roughness, medium opacity.
- For "water": fluid=true, sphere shape, color="#1e90ff", transmission=0.6, opacity=0.5, roughness=0.05, clearcoat=1.
- IMPORTANT: When fluid=true, particles are rendered as a smooth liquid surface (MarchingCubes isosurface) instead of individual spheres. The shape field is ignored for fluid groups.
- Solid particles: opacity=1, transmission=0, fluid=false (default).

Rules:
- The TOTAL count across all groups MUST equal exactly ${maxTotal}. Distribute proportionally based on the user's description.
- IMPORTANT: Use highly saturated, vivid, punchy colors (saturation 80-100%). Prefer pure, electric tones like #ff0055, #00ff88, #ffcc00, #7b2eff, #00e5ff — never dull or desaturated. Colors must pop against the dark badge background.
- IMPORTANT: Always set emissive to the same color as the particle (or a brighter variant) with emissiveIntensity 0.3-0.8 by default. This makes colors glow and look vibrant. Only use emissive="#000000" for intentionally dark/matte groups.
- IMPORTANT: Default opacity should be 0.75-0.85 for a glass-bead look. Only use opacity=1 when the user explicitly asks for solid/matte particles. Combine with transmission 0.1-0.3 for subtle depth.
- For "glowing" particles, set emissive to a bright color and emissiveIntensity to 1.5-2.5.
- For "metallic" particles, set metalness to 0.7-1.0 and roughness to 0.1-0.3, opacity 0.85-0.95.
- For "matte" particles, set metalness to 0-0.1 and roughness to 0.6-0.9.
- Default clearcoat is 0.8 for glossy, 0 for matte.
- Use size 0.012 for all groups by default. Only vary slightly (0.010-0.014) for subtle accent differences.
- Mix shapes creatively! e.g. diamond gems + small glowing spheres, or cubes + fluid capsules.
- Be creative! Interpret poetic or abstract descriptions into beautiful particle combinations.`,
    prompt,
  });

  // Force metalness and minimum opacity for all groups
  object.groups.forEach((g: { metalness: number; opacity: number }) => {
    g.metalness = 0.9;
    if (g.opacity < 0.9) g.opacity = 0.9;
  });

  // Force total count to exactly maxTotal
  const total = object.groups.reduce((s: number, g: { count: number }) => s + g.count, 0);
  if (total !== maxTotal) {
    const scale = maxTotal / total;
    let remaining = maxTotal;
    object.groups.forEach((g: { count: number; metalness: number }, i: number) => {
      if (i === object.groups.length - 1) {
        g.count = remaining;
      } else {
        g.count = Math.max(10, Math.round(g.count * scale));
        remaining -= g.count;
      }
    });
  }

  return Response.json(object);
}
