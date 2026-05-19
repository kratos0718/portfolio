import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
// drei helpers available if needed
import * as THREE from 'three';

/* Interactive 3D orb cluster that follows the mouse — replaces the encrypted character model */

function CoreSphere({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y += (mouse.current.x * 0.6 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-mouse.current.y * 0.4 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Core */}
      <mesh>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshStandardMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.25}
          emissive="#00f5ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner solid */}
      <mesh>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color="#001820"
          transparent
          opacity={0.95}
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>

      {/* Cyan glow sphere */}
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial
          color="#00f5ff"
          transparent
          opacity={0.06}
          emissive="#00f5ff"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Outer ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.008, 8, 120]} />
        <meshStandardMaterial color="#00f5ff" transparent opacity={0.4} emissive="#00f5ff" emissiveIntensity={0.6} />
      </mesh>

      {/* Outer ring 2 */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.7, 0.006, 8, 120]} />
        <meshStandardMaterial color="#00c8d4" transparent opacity={0.25} emissive="#00c8d4" emissiveIntensity={0.4} />
      </mesh>

      {/* Orbiting satellite dots */}
      {[0, 1, 2, 3].map((i) => (
        <OrbitDot key={i} index={i} />
      ))}
    </group>
  );
}

function OrbitDot({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const offset = (index / 4) * Math.PI * 2;
  const radius = 1.6 + (index % 2) * 0.3;
  const speed = 0.5 + index * 0.15;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.7) * 0.4,
      Math.sin(t) * radius
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2} />
    </mesh>
  );
}

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [size]);

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} color="#00f5ff" intensity={3} />
      <pointLight position={[-3, -2, 2]} color="#004455" intensity={2} />
      <pointLight position={[0, -4, 1]} color="#000a0f" intensity={1} />
      <CoreSphere mouse={mouse} />
    </>
  );
}
