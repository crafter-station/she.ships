/**
 * Pure particle physics simulation — Verlet integration, PBD collision,
 * fluid cohesion/viscosity.  No React, no Three.js rendering.
 */

export interface SimState {
  px: Float32Array;
  py: Float32Array;
  ppx: Float32Array;
  ppy: Float32Array;
  grid: Int32Array;
  gridCnt: Uint8Array;
}

export interface SimParams {
  count: number;
  R: number;
  DIAM: number;
  DIAM2: number;
  boundsMinX: number;
  boundsMaxX: number;
  boundsMinY: number;
  boundsMaxY: number;
  gridW: number;
  gridH: number;
  maxPerCell: number;
  cellSize: number;
  gx: number;
  gy: number;
  angKick: number;
  subDt2: number;
  cornerRadius: number;
  hasFluid: boolean;
  fluidFlags: Uint8Array;
}

export function stepParticles(s: SimState, p: SimParams, substeps: number) {
  const { px, py, ppx, ppy, grid, gridCnt } = s;
  const {
    count, R, DIAM, DIAM2,
    boundsMinX, boundsMaxX, boundsMinY, boundsMaxY,
    gridW, gridH, maxPerCell, cellSize,
    gx, gy, angKick, subDt2,
    cornerRadius,
    hasFluid, fluidFlags,
  } = p;

  const PAD = 0.04;
  const bx0 = boundsMinX + R + PAD;
  const bx1 = boundsMaxX - R - PAD;
  const by0 = boundsMinY + R + PAD;
  const by1 = boundsMaxY - R - PAD;

  // Corner arc centers — inset by cornerRadius from the rectangular bounds
  const CR = Math.max(0, cornerRadius - R - PAD);
  const cr2 = CR * CR;
  const cx0 = bx0 + CR; // left corners X
  const cx1 = bx1 - CR; // right corners X
  const cy0 = by0 + CR; // bottom corners Y
  const cy1 = by1 - CR; // top corners Y
  const halfW = (boundsMaxX - boundsMinX) * 0.5;
  const halfH = (boundsMaxY - boundsMinY) * 0.5;
  const centerX = (boundsMinX + boundsMaxX) * 0.5;
  const centerY = (boundsMinY + boundsMaxY) * 0.5;
  const ox = boundsMinX - cellSize;
  const oy = boundsMinY - cellSize;
  const VERLET_DAMP = 0.985;

  for (let step = 0; step < substeps; step++) {
    // (1) Verlet integration
    for (let i = 0; i < count; i++) {
      const vx = (px[i] - ppx[i]) * VERLET_DAMP;
      const vy = (py[i] - ppy[i]) * VERLET_DAMP;
      const rx = (px[i] - centerX) / halfW;
      const ry = (py[i] - centerY) / halfH;
      const ax = gx - ry * angKick;
      const ay = gy + rx * angKick;

      ppx[i] = px[i];
      ppy[i] = py[i];
      px[i] += vx + ax * subDt2;
      py[i] += vy + ay * subDt2;
    }

    // (2) Boundary constraints (clamp + kill velocity on contact + rounded corners)
    for (let i = 0; i < count; i++) {
      if (px[i] < bx0) { px[i] = bx0; ppx[i] = bx0; }
      else if (px[i] > bx1) { px[i] = bx1; ppx[i] = bx1; }
      if (py[i] < by0) { py[i] = by0; ppy[i] = by0; }
      else if (py[i] > by1) { py[i] = by1; ppy[i] = by1; }

      // Round corners: if particle is in a corner square, constrain to arc
      if (CR > 0) {
        let cdx = 0, cdy = 0;
        if (px[i] < cx0 && py[i] < cy0) { cdx = px[i] - cx0; cdy = py[i] - cy0; }
        else if (px[i] > cx1 && py[i] < cy0) { cdx = px[i] - cx1; cdy = py[i] - cy0; }
        else if (px[i] < cx0 && py[i] > cy1) { cdx = px[i] - cx0; cdy = py[i] - cy1; }
        else if (px[i] > cx1 && py[i] > cy1) { cdx = px[i] - cx1; cdy = py[i] - cy1; }
        if (cdx !== 0 || cdy !== 0) {
          const cd2 = cdx * cdx + cdy * cdy;
          if (cd2 > cr2) {
            const cd = Math.sqrt(cd2);
            px[i] -= cdx - (cdx / cd) * CR;
            py[i] -= cdy - (cdy / cd) * CR;
            ppx[i] = px[i];
            ppy[i] = py[i];
          }
        }
      }
    }

    // (3) PBD collision projection
    for (let pass = 0; pass < 3; pass++) {
      gridCnt.fill(0);
      for (let i = 0; i < count; i++) {
        const cx = Math.max(
          0,
          Math.min(gridW - 1, ((px[i] - ox) / cellSize) | 0)
        );
        const cy = Math.max(
          0,
          Math.min(gridH - 1, ((py[i] - oy) / cellSize) | 0)
        );
        const ci = cy * gridW + cx;
        if (gridCnt[ci] < maxPerCell) {
          grid[ci * maxPerCell + gridCnt[ci]] = i;
          gridCnt[ci]++;
        }
      }

      const fwd = pass % 2 === 0;
      const yStart = fwd ? 0 : gridH - 1;
      const yEnd = fwd ? gridH : -1;
      const yStep = fwd ? 1 : -1;
      const xStart = fwd ? 0 : gridW - 1;
      const xEnd = fwd ? gridW : -1;
      const xStep = fwd ? 1 : -1;

      for (let cy = yStart; cy !== yEnd; cy += yStep) {
        for (let cx = xStart; cx !== xEnd; cx += xStep) {
          const ci = cy * gridW + cx;
          const cnt = gridCnt[ci];
          if (cnt === 0) continue;
          const co = ci * maxPerCell;

          for (let a = 0; a < cnt; a++) {
            const i = grid[co + a];
            for (let b = a + 1; b < cnt; b++) {
              const j = grid[co + b];
              const dx = px[j] - px[i];
              const dy = py[j] - py[i];
              const d2 = dx * dx + dy * dy;
              if (d2 < DIAM2 && d2 > 1e-8) {
                const d = Math.sqrt(d2);
                const corr = ((DIAM - d) * 0.5) / d;
                px[i] -= dx * corr;
                py[i] -= dy * corr;
                px[j] += dx * corr;
                py[j] += dy * corr;
              }
            }

            for (let dy = 0; dy <= 1; dy++) {
              const ny2 = cy + dy;
              if (ny2 < 0 || ny2 >= gridH) continue;
              const dxStart = dy === 0 ? 1 : -1;
              for (let dx = dxStart; dx <= 1; dx++) {
                const nx2 = cx + dx;
                if (nx2 < 0 || nx2 >= gridW) continue;
                const ni = ny2 * gridW + nx2;
                const ncnt = gridCnt[ni];
                const no2 = ni * maxPerCell;
                for (let b = 0; b < ncnt; b++) {
                  const j = grid[no2 + b];
                  const ddx = px[j] - px[i];
                  const ddy = py[j] - py[i];
                  const dd2 = ddx * ddx + ddy * ddy;
                  if (dd2 < DIAM2 && dd2 > 1e-8) {
                    const dd = Math.sqrt(dd2);
                    const corr = ((DIAM - dd) * 0.5) / dd;
                    px[i] -= ddx * corr;
                    py[i] -= ddy * corr;
                    px[j] += ddx * corr;
                    py[j] += ddy * corr;
                  }
                }
              }
            }
          }
        }
      }
    }

    // (3.5) Fluid cohesion + XSPH viscosity
    if (hasFluid) {
      gridCnt.fill(0);
      for (let i = 0; i < count; i++) {
        const fcx = Math.max(0, Math.min(gridW - 1, ((px[i] - ox) / cellSize) | 0));
        const fcy = Math.max(0, Math.min(gridH - 1, ((py[i] - oy) / cellSize) | 0));
        const fci = fcy * gridW + fcx;
        if (gridCnt[fci] < maxPerCell) {
          grid[fci * maxPerCell + gridCnt[fci]] = i;
          gridCnt[fci]++;
        }
      }

      const COHESION = 0.0012;
      const VISC = 0.06;
      const FLUID_RANGE2 = DIAM2 * 6.25;

      for (let fcy = 0; fcy < gridH; fcy++) {
        for (let fcx = 0; fcx < gridW; fcx++) {
          const fci = fcy * gridW + fcx;
          const fcnt = gridCnt[fci];
          if (fcnt === 0) continue;
          const fco = fci * maxPerCell;

          for (let fa = 0; fa < fcnt; fa++) {
            const fi = grid[fco + fa];
            if (!fluidFlags[fi]) continue;

            for (let dcy = 0; dcy <= 1; dcy++) {
              const ny = fcy + dcy;
              if (ny >= gridH) continue;
              const dxStart2 = dcy === 0 ? 0 : -1;
              for (let dcx = dxStart2; dcx <= 1; dcx++) {
                const nx = fcx + dcx;
                if (nx < 0 || nx >= gridW) continue;
                const ni = ny * gridW + nx;
                const ncnt = gridCnt[ni];
                const no = ni * maxPerCell;
                const startB = (dcy === 0 && dcx === 0) ? fa + 1 : 0;

                for (let fb = startB; fb < ncnt; fb++) {
                  const fj = grid[no + fb];
                  if (!fluidFlags[fj]) continue;

                  const fdx = px[fj] - px[fi];
                  const fdy = py[fj] - py[fi];
                  const fd2 = fdx * fdx + fdy * fdy;
                  if (fd2 > FLUID_RANGE2 || fd2 < 1e-8) continue;

                  const fd = Math.sqrt(fd2);

                  if (fd2 > DIAM2) {
                    const coh = COHESION * (1 - fd / (DIAM * 2.5));
                    const cnx = fdx / fd * coh;
                    const cny = fdy / fd * coh;
                    px[fi] += cnx;
                    py[fi] += cny;
                    px[fj] -= cnx;
                    py[fj] -= cny;
                  }

                  if (fd2 < DIAM2 * 4) {
                    const dvx = (px[fj] - ppx[fj]) - (px[fi] - ppx[fi]);
                    const dvy = (py[fj] - ppy[fj]) - (py[fi] - ppy[fi]);
                    ppx[fi] -= VISC * dvx;
                    ppy[fi] -= VISC * dvy;
                    ppx[fj] += VISC * dvx;
                    ppy[fj] += VISC * dvy;
                  }
                }
              }
            }
          }
        }
      }
    }

    // (4) Re-enforce boundary after projection (clamp + kill velocity + rounded corners)
    for (let i = 0; i < count; i++) {
      if (px[i] < bx0) { px[i] = bx0; ppx[i] = bx0; }
      else if (px[i] > bx1) { px[i] = bx1; ppx[i] = bx1; }
      if (py[i] < by0) { py[i] = by0; ppy[i] = by0; }
      else if (py[i] > by1) { py[i] = by1; ppy[i] = by1; }

      if (CR > 0) {
        let cdx = 0, cdy = 0;
        if (px[i] < cx0 && py[i] < cy0) { cdx = px[i] - cx0; cdy = py[i] - cy0; }
        else if (px[i] > cx1 && py[i] < cy0) { cdx = px[i] - cx1; cdy = py[i] - cy0; }
        else if (px[i] < cx0 && py[i] > cy1) { cdx = px[i] - cx0; cdy = py[i] - cy1; }
        else if (px[i] > cx1 && py[i] > cy1) { cdx = px[i] - cx1; cdy = py[i] - cy1; }
        if (cdx !== 0 || cdy !== 0) {
          const cd2 = cdx * cdx + cdy * cdy;
          if (cd2 > cr2) {
            const cd = Math.sqrt(cd2);
            px[i] -= cdx - (cdx / cd) * CR;
            py[i] -= cdy - (cdy / cd) * CR;
            ppx[i] = px[i];
            ppy[i] = py[i];
          }
        }
      }
    }
  }
}
