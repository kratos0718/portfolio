import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * Floating primitives behind the hero.
 *
 * The look depends on warm/cool contrast, not on the shapes: a cool slate
 * ground with a single warm key light raking across matte geometry, so the
 * lit edges read copper while the shadow sides fall into the background.
 * One small emissive sphere carries a bloom so there is a visible light
 * source motivating the warm rim.
 */

type SolidProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  drift: number;
  spin: number;
  geometry: 'box' | 'cylinder';
};

function Solid({ position, rotation, scale, drift, spin, geometry }: SolidProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * drift + phase) * 0.22;
    ref.current.rotation.x = rotation[0] + Math.sin(t * spin * 0.6 + phase) * 0.12;
    ref.current.rotation.y = rotation[1] + t * spin * 0.09;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      {geometry === 'box' ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <cylinderGeometry args={[0.42, 0.42, 1.5, 48]} />
      )}
      {/* Matte, slightly metallic: enough sheen to catch the key light on an
          edge without turning into a mirror, which would read as plastic. */}
      <meshStandardMaterial color="#3B4753" roughness={0.46} metalness={0.30} />
    </mesh>
  );
}

function Orb() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = 2.15 + Math.sin(state.clock.elapsedTime * 0.55) * 0.14;
  });
  return (
    <mesh ref={ref} position={[2.05, 2.15, 0.2]}>
      <sphereGeometry args={[0.42, 48, 48]} />
      <meshBasicMaterial color="#FFB067" toneMapped={false} />
    </mesh>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!group.current) return;
    // Parallax toward the pointer. Damped, and deliberately small: the scene
    // should feel like it has depth, not like it is chasing the cursor.
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.16 - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (-y * 0.09 - group.current.rotation.x) * 0.03;
  });

  return (
    <group ref={group}>
      <Solid geometry="box" position={[-2.9, 1.0, -0.6]} rotation={[0.5, 0.7, 0.15]} scale={2.1} drift={0.42} spin={0.28} />
      <Solid geometry="box" position={[0.3, -0.2, 0.6]} rotation={[0.42, 0.85, 0.1]} scale={3.0} drift={0.34} spin={0.2} />
      <Solid geometry="cylinder" position={[2.7, 0.7, -0.2]} rotation={[1.3, 0.2, 0.35]} scale={1.5} drift={0.5} spin={0.34} />
      <Solid geometry="box" position={[2.0, -2.1, 0.2]} rotation={[0.9, 0.4, 0.6]} scale={1.8} drift={0.46} spin={0.24} />
      <Solid geometry="cylinder" position={[-1.4, -2.4, -0.8]} rotation={[1.5, 0.6, 0.2]} scale={1.15} drift={0.56} spin={0.4} />
      <Orb />
    </group>
  );
}

export default function HeroObjects() {
  // Respect the OS setting: the drift and parallax are the whole point, so if
  // motion is unwanted there is nothing worth rendering the cost for.
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      className="hero-objects"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Cool fill so the shadow sides sit in the slate ground rather than
          going pure black, plus one warm key that does all the work. */}
      <ambientLight intensity={0.12} color="#7FA6BD" />
      <directionalLight position={[-4, 2, 3]} intensity={0.22} color="#8FB6CC" />
      <pointLight position={[3.0, 3.0, 3.0]} intensity={150} distance={24} decay={2} color="#FF9A4D" />
      <pointLight position={[-3.6, -2.4, 2.0]} intensity={26} distance={16} decay={2} color="#5C8FA8" />

      {!reduced && <Rig />}
      {reduced && (
        <group>
          <Solid geometry="box" position={[0.3, -0.2, 0.6]} rotation={[0.42, 0.85, 0.1]} scale={3.0} drift={0} spin={0} />
          <Orb />
        </group>
      )}

      <EffectComposer>
        <Bloom intensity={0.75} luminanceThreshold={0.92} luminanceSmoothing={0.2} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
