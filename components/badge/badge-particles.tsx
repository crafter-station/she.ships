import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
// @ts-ignore — Three.js example module
// import { MarchingCubes as MarchingCubesImpl } from "three/examples/jsm/objects/MarchingCubes.js";
import type { ParticleConfig } from "@/lib/badge/particle-config";
import type { CardBounds } from "@/lib/badge/types";
import { stepParticles, type SimState } from "@/lib/badge/particle-sim";

// export const MC_RES = 28;

export function BadgeParticles({
  cardRef,
  isMobile,
  bounds,
  config,
}: {
  cardRef: React.MutableRefObject<any>;
  isMobile: boolean;
  bounds: CardBounds;
  config: ParticleConfig;
}) {
  // Compute group layout: index ranges and total count
  const groupLayout = useMemo(() => {
    const groups = config.groups;
    let offset = 0;
    const ranges = groups.map((g) => {
      const start = offset;
      offset += g.count;
      return { start, count: g.count };
    });
    return { ranges, total: offset };
  }, [config]);

  const count = groupLayout.total;

  // Precompute fluid flags per particle
  const { fluidFlags, hasFluid } = useMemo(() => {
    const flags = new Uint8Array(count);
    let any = false;
    for (let g = 0; g < config.groups.length; g++) {
      if (config.groups[g].fluid) {
        any = true;
        const { start, count: gCount } = groupLayout.ranges[g];
        for (let i = start; i < start + gCount; i++) {
          flags[i] = 1;
        }
      }
    }
    return { fluidFlags: flags, hasFluid: any };
  }, [config, groupLayout, count]);

  // MarchingCubes objects for fluid groups (liquid surface) — disabled for now
  // const mcObjects = useMemo(() => {
  //   return config.groups.map((group) => {
  //     if (!group.fluid) return null;
  //     const mat = new THREE.MeshPhysicalMaterial({
  //       color: group.color,
  //       roughness: Math.max(0.05, group.roughness),
  //       metalness: group.metalness,
  //       clearcoat: isMobile ? 0 : group.clearcoat,
  //       clearcoatRoughness: 0.15,
  //       emissive: new THREE.Color(group.emissive),
  //       emissiveIntensity: group.emissiveIntensity,
  //       transparent: group.opacity < 1 || group.transmission > 0,
  //       opacity: group.opacity,
  //       transmission: group.transmission,
  //       thickness: group.transmission > 0 ? 1.0 : 0,
  //       ior: 1.33,
  //       side: THREE.DoubleSide,
  //     });
  //     const mc = new MarchingCubesImpl(MC_RES, mat, false, false, 50000);
  //     mc.isolation = 50;
  //     return mc;
  //   });
  // }, [config, isMobile]);

  // Use the largest particle size for collision radius
  const maxSize = useMemo(
    () => Math.max(...config.groups.map((g) => g.size)),
    [config]
  );
  const R = maxSize;
  const DIAM = R * 2;
  const DIAM2 = DIAM * DIAM;

  // Spatial grid
  const cellSize = DIAM;
  const gridW = Math.ceil((bounds.maxX - bounds.minX) / cellSize) + 2;
  const gridH = Math.ceil((bounds.maxY - bounds.minY) / cellSize) + 2;
  const MAX_PER_CELL = 20;

  const sim = useRef<(SimState & { prevCardVel: THREE.Vector3; smoothedAccel: THREE.Vector3; smoothedAngKick: number }) | null>(null);

  if (!sim.current) {
    const px = new Float32Array(count);
    const py = new Float32Array(count);
    const ppx = new Float32Array(count);
    const ppy = new Float32Array(count);
    const h = bounds.maxY - bounds.minY;
    const fillH = h * 0.25;
    for (let i = 0; i < count; i++) {
      const x =
        bounds.minX +
        R +
        0.04 +
        Math.random() * (bounds.maxX - bounds.minX - R * 2 - 0.08);
      const y = bounds.minY + R + 0.04 + Math.random() * fillH;
      px[i] = x;
      py[i] = y;
      ppx[i] = x;
      ppy[i] = y;
    }
    sim.current = {
      px,
      py,
      ppx,
      ppy,
      prevCardVel: new THREE.Vector3(),
      smoothedAccel: new THREE.Vector3(),
      smoothedAngKick: 0,
      grid: new Int32Array(gridW * gridH * MAX_PER_CELL),
      gridCnt: new Uint8Array(gridW * gridH),
    };
  }

  // Refs for each group's instanced mesh
  const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);

  const tmp = useRef({
    mat: new THREE.Matrix4(),
    v: new THREE.Vector3(),
    q: new THREE.Quaternion(),
    iq: new THREE.Quaternion(),
    g: new THREE.Vector3(),
    a: new THREE.Vector3(),
    cv: new THREE.Vector3(),
  });

  // MC layout — disabled for now
  // const mcLayout = useMemo(() => {
  //   const bw = bounds.maxX - bounds.minX;
  //   const bh = bounds.maxY - bounds.minY;
  //   const hs = MC_RES / 2;
  //   const vMin = 1;
  //   const vMax = MC_RES - 3;
  //   const outMin = (vMin - hs) / hs;
  //   const outMax = (vMax - hs) / hs;
  //   const outRange = outMax - outMin;
  //   const outCenter = (outMin + outMax) / 2;
  //   const sx = bw / outRange;
  //   const sy = bh / outRange;
  //   const cx = (bounds.minX + bounds.maxX) / 2;
  //   const cy = (bounds.minY + bounds.maxY) / 2;
  //   const abOffset = vMin / MC_RES;
  //   const abScale = (vMax - vMin) / MC_RES;
  //   return {
  //     position: [
  //       cx - outCenter * sx,
  //       cy - outCenter * sy,
  //       bounds.frontZ + 0.02,
  //     ] as [number, number, number],
  //     scale: [sx, sy, 0.04] as [number, number, number],
  //     abOffset,
  //     abScaleX: abScale / bw,
  //     abScaleY: abScale / bh,
  //   };
  // }, [bounds]);

  useFrame((_, delta) => {
    const body = cardRef.current;
    const s = sim.current;
    const t = tmp.current;
    if (!body || !s) return;

    const dt = Math.min(delta, 0.033);
    const SUBSTEPS = 8;
    const subDt = dt / SUBSTEPS;

    // Card rotation → local gravity
    const r = body.rotation();
    t.q.set(r.x, r.y, r.z, r.w);
    t.iq.copy(t.q).invert();

    // Inertial force from card acceleration (with dead-zone + EMA smoothing)
    const lv = body.linvel();
    t.cv.set(lv.x, lv.y, lv.z);
    const linSpeed = t.cv.length();

    // Raw acceleration
    t.a
      .copy(t.cv)
      .sub(s.prevCardVel)
      .divideScalar(dt)
      .clampLength(0, 200);
    t.a.multiplyScalar(2.5);
    s.prevCardVel.copy(t.cv);

    // Dead-zone: zero out when body is nearly at rest
    if (linSpeed < 0.05) t.a.set(0, 0, 0);

    // EMA smoothing
    s.smoothedAccel.lerp(t.a, 0.15);

    // Angular velocity → tangential kick
    const av = body.angvel();
    const angMag = Math.sqrt(av.x * av.x + av.y * av.y + av.z * av.z);
    const rawAngKick = angMag < 0.01 ? 0 : angMag * 15;
    s.smoothedAngKick += (rawAngKick - s.smoothedAngKick) * 0.15;

    // Effective gravity in local frame
    t.g.set(0, -40, 0).sub(s.smoothedAccel).applyQuaternion(t.iq);

    // Run physics simulation
    stepParticles(s, {
      count,
      R,
      DIAM,
      DIAM2,
      boundsMinX: bounds.minX,
      boundsMaxX: bounds.maxX,
      boundsMinY: bounds.minY,
      boundsMaxY: bounds.maxY,
      gridW,
      gridH,
      maxPerCell: MAX_PER_CELL,
      cellSize,
      gx: t.g.x,
      gy: t.g.y,
      angKick: s.smoothedAngKick,
      subDt2: subDt * subDt,
      cornerRadius: bounds.cornerRadius,
      hasFluid,
      fluidFlags,
    }, SUBSTEPS);

    // Update visuals per group
    const { px, py } = s;
    const { ranges } = groupLayout;
    for (let g = 0; g < ranges.length; g++) {
      // Fluid MarchingCubes rendering — disabled for now
      // if (config.groups[g].fluid) {
      //   const mc = mcObjects[g];
      //   if (!mc) continue;
      //   mc.reset();
      //   const { start, count: gCount } = ranges[g];
      //   for (let li = 0; li < gCount; li++) {
      //     const gi = start + li;
      //     const nx = mcLayout.abOffset + (px[gi] - bounds.minX) * mcLayout.abScaleX;
      //     const ny = mcLayout.abOffset + (py[gi] - bounds.minY) * mcLayout.abScaleY;
      //     mc.addBall(nx, ny, 0.5, 0.06, 12);
      //   }
      //   mc.update();
      // } else {
      const mesh = meshRefs.current[g];
      if (!mesh) continue;
      const { start, count: gCount } = ranges[g];
      const groupSize = config.groups[g].size;
      for (let li = 0; li < gCount; li++) {
        const gi = start + li;
        t.mat.makeTranslation(px[gi], py[gi], bounds.frontZ + 0.01);
        t.v.set(groupSize, groupSize, groupSize * 0.4);
        t.mat.scale(t.v);
        mesh.setMatrixAt(li, t.mat);
      }
      mesh.instanceMatrix.needsUpdate = true;
      // }
    }
  });

  return (
    <>
      {config.groups.map((group, i) => {
        // MarchingCubes primitive rendering — disabled for now
        // if (group.fluid && mcObjects[i]) {
        //   return (
        //     <primitive
        //       key={`mc-${i}`}
        //       object={mcObjects[i]}
        //       position={mcLayout.position}
        //       scale={mcLayout.scale}
        //     />
        //   );
        // }
        const isTransparent = group.opacity < 1 || group.transmission > 0;
        return (
          <instancedMesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            args={[undefined, undefined, groupLayout.ranges[i].count]}
            frustumCulled={false}
          >
            <ParticleGeometry shape={group.shape} />
            <meshPhysicalMaterial
              color={group.color}
              roughness={group.roughness}
              metalness={group.metalness}
              clearcoat={isMobile ? 0 : group.clearcoat}
              clearcoatRoughness={0.2}
              emissive={group.emissive}
              emissiveIntensity={group.emissiveIntensity}
              transparent={isTransparent}
              opacity={group.opacity}
              transmission={group.transmission}
              thickness={group.transmission > 0 ? 0.5 : 0}
              ior={group.transmission > 0 ? 1.5 : 1.5}
            />
          </instancedMesh>
        );
      })}
    </>
  );
}

function ParticleGeometry({ shape }: { shape: string }) {
  switch (shape) {
    case "cube":
      return <boxGeometry args={[1.4, 1.4, 1.4]} />;
    case "diamond":
      return <octahedronGeometry args={[1.2]} />;
    case "capsule":
      return <capsuleGeometry args={[0.7, 0.6, 4, 8]} />;
    default:
      return <sphereGeometry args={[1, 8, 6]} />;
  }
}
