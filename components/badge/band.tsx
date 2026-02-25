import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import type { ParticleConfig } from "@/lib/badge/particle-config";
import { BadgeParticles } from "@/components/badge/badge-particles";

export interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  cardTextureUrl?: string;
  particleConfig: ParticleConfig;
  configKey: string;
}

export function Band({
  maxSpeed = 50,
  minSpeed = 10,
  isMobile = false,
  cardTextureUrl,
  particleConfig,
  configKey,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  };

  const { nodes, materials } = useGLTF("/badge/id-card.glb") as any;
  const texture = useTexture("/badge/lanyard.png") as THREE.Texture;

  // Compute exact card geometry bounds in body-local space
  const cardBounds = useMemo(() => {
    const geo = nodes.card.geometry as THREE.BufferGeometry;
    geo.computeBoundingBox();
    const bb = geo.boundingBox!;
    const scale = 2.25;
    const oY = -1.2;
    const oZ = -0.05;
    const w = (bb.max.x - bb.min.x) * scale;
    return {
      minX: bb.min.x * scale,
      maxX: bb.max.x * scale,
      minY: bb.min.y * scale + oY,
      maxY: bb.max.y * scale + oY,
      frontZ: bb.max.z * scale + oZ,
      cornerRadius: w * 0.06,
    };
  }, [nodes]);

  // Load custom card texture if provided
  const [customCardTexture, setCustomCardTexture] =
    useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!cardTextureUrl) {
      setCustomCardTexture(null);
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.load(cardTextureUrl, (loadedTexture) => {
      loadedTexture.flipY = false;
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      setCustomCardTexture(loadedTexture);
    });

    return () => {
      if (customCardTexture) {
        customCardTexture.dispose();
      }
    };
  }, [cardTextureUrl]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  // Subtle drop animation when particle config changes
  const prevConfigKey = useRef(configKey);
  useEffect(() => {
    if (prevConfigKey.current === configKey) return;
    prevConfigKey.current = configKey;
    const body = card.current;
    if (!body) return;
    // Wake everything up and give a small upward nudge
    [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
    body.applyImpulse({ x: 0, y: 3, z: 0 }, true);
  }, [configKey]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(
            1,
            ref.current.lerped.distanceTo(ref.current.translation())
          )
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(
        curve.getPoints(isMobile ? 16 : 32)
      );
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z,
      });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[1.5, 4.5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <BadgeParticles
            key={configKey}
            cardRef={card}
            isMobile={isMobile}
            bounds={cardBounds}
            config={particleConfig}
          />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={
                  cardTextureUrl && customCardTexture
                    ? customCardTexture
                    : materials["base.001"]?.map ?? materials.base?.map
                }
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[2000, 1000]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
