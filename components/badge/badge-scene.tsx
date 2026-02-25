"use client";

import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import type { ParticleConfig } from "@/lib/badge/particle-config";
import { defaultParticleConfig } from "@/lib/badge/particle-config";
import { Band } from "@/components/badge/band";

extend({ MeshLineGeometry, MeshLineMaterial });

function CameraRig({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    if (isMobile) {
      camera.position.set(1.45, -0.5, 8.5);
      (camera as THREE.PerspectiveCamera).fov = 34;
    } else {
      camera.position.set(0, 0, 7);
      (camera as THREE.PerspectiveCamera).fov = 38;
    }
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [isMobile, camera]);
  return null;
}

useGLTF.preload("/badge/id-card.glb");
useTexture.preload("/badge/lanyard_ss.jpg");

interface BadgeSceneProps {
  gravity?: [number, number, number];
  cardTextureUrl?: string;
  particleConfig?: ParticleConfig;
}

export default function BadgeScene({
  gravity = [0, -40, 0],
  cardTextureUrl,
  particleConfig = defaultParticleConfig,
}: BadgeSceneProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Serialize config to use as a stable key for remounting particles
  const configKey = useMemo(
    () => JSON.stringify(particleConfig),
    [particleConfig]
  );

  return (
    <div className="w-full h-full touch-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 38 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <CameraRig isMobile={isMobile} />
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60} interpolate>
          <Band
            isMobile={isMobile}
            cardTextureUrl={cardTextureUrl}
            particleConfig={particleConfig}
            configKey={configKey}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
