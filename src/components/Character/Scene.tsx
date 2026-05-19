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
          color="#333333"
          wireframe
          transparent
          opacity={0.2}
          emissive="#111111"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Inner solid */}
      <mesh>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color="#e8e4dc"
          transparent
          opacity={0.95}
          roughness={0.15}
          metalness={0.4}
          envMapIntensity={1}
        />
      </mesh>

      {/* Subtle sphere */}
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial
          color="#aaaaaa"
          transparent
          opacity={0.04}
          emissive="#333333"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Outer ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.008, 8, 120]} />
        <meshStandardMaterial color="#333333" transparent opacity={0.35} emissive="#111111" emissiveIntensity={0.1} />
      </mesh>

      {/* Outer ring 2 */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.7, 0.006, 8, 120]} />
        <meshStandardMaterial color="#666666" transparent opacity={0.2} emissive="#444444" emissiveIntensity={0.1} />
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
      <meshStandardMaterial color="#444444" emissive="#222222" emissiveIntensity={0.3} />
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
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 3, 3]} color="#ffffff" intensity={1.5} />
      <pointLight position={[-3, -2, 2]} color="#f0ede8" intensity={1} />
      <pointLight position={[0, -4, 1]} color="#e8e4dc" intensity={0.5} />
      <CoreSphere mouse={mouse} />
    </>
  );
}
