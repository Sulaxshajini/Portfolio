"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Mood } from "./types";

const lerp = THREE.MathUtils.lerp;

function Bot({ mood }: { mood: Mood }) {
  const root = useRef<THREE.Group>(null!);
  const head = useRef<THREE.Group>(null!);
  const eyeL = useRef<THREE.Mesh>(null!);
  const eyeR = useRef<THREE.Mesh>(null!);
  const mouth = useRef<THREE.Mesh>(null!);
  const armR = useRef<THREE.Group>(null!);
  const armL = useRef<THREE.Group>(null!);
  const halo = useRef<THREE.Mesh>(null!);
  const orbit = useRef<THREE.Group>(null!);
  const bits = useRef<THREE.Group>(null!);
  const tip = useRef<THREE.MeshStandardMaterial>(null!);

  const shell = { color: "#efe9ff", metalness: 0.35, roughness: 0.22 } as const;

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    const talking = mood === "talking" || mood === "answering";
    const happy = mood === "excited" || mood === "greeting";
    const thinking = mood === "thinking";

    root.current.position.y = Math.sin(t * 1.4) * 0.12 + (mood === "excited" ? Math.abs(Math.sin(t * 6)) * 0.25 : 0);
    // head follows pointer a little
    const tx = s.pointer.x * 0.45 + (thinking ? 0.35 : 0) + (talking ? Math.sin(t * 7) * 0.05 : 0);
    const ty = -s.pointer.y * 0.25 + (thinking ? -0.2 : 0);
    head.current.rotation.y = lerp(head.current.rotation.y, tx, 1 - Math.pow(0.001, dt));
    head.current.rotation.x = lerp(head.current.rotation.x, ty, 1 - Math.pow(0.001, dt));
    head.current.rotation.z = lerp(head.current.rotation.z, talking ? Math.sin(t * 5) * 0.04 : mood === "listening" ? 0.08 : 0, 0.1);

    // blink + expression
    const blink = Math.sin(t * 1.1) > 0.985 ? 0.08 : 1;
    const ey = (thinking ? 0.5 : mood === "listening" ? 1.2 : happy ? 0.55 : 1) * blink;
    for (const e of [eyeL.current, eyeR.current]) {
      e.scale.y = lerp(e.scale.y, 0.2 * ey, 0.25);
      e.rotation.z = lerp(e.rotation.z, happy ? (e === eyeL.current ? 0.35 : -0.35) : 0, 0.15);
    }
    mouth.current.scale.y = talking ? 0.5 + Math.abs(Math.sin(t * 9)) * 1.4 : lerp(mouth.current.scale.y, happy ? 1.6 : 1, 0.2);

    // arms
    armR.current.rotation.z = lerp(armR.current.rotation.z, mood === "greeting" ? 2.4 + Math.sin(t * 9) * 0.35 : happy ? 2.2 + Math.sin(t * 8) * 0.2 : -0.18 + Math.sin(t * 1.4) * 0.05, 0.15);
    armL.current.rotation.z = lerp(armL.current.rotation.z, happy ? -2.2 - Math.sin(t * 8) * 0.2 : 0.18 - Math.sin(t * 1.4) * 0.05, 0.15);

    halo.current.rotation.z += dt * 0.6;
    halo.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.8) * 0.15;
    bits.current.rotation.y += dt * 0.5;
    orbit.current.rotation.y += dt * 2.6;
    orbit.current.scale.setScalar(lerp(orbit.current.scale.x, thinking ? 1 : 0.001, 0.12));
    tip.current.emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.6;
  });

  return (
    <group ref={root} position={[0, -0.1, 0]}>
      {/* body */}
      <mesh position={[0, -1.55, 0]}><capsuleGeometry args={[0.62, 0.55, 12, 32]} /><meshStandardMaterial {...shell} /></mesh>
      <mesh position={[0, -1.45, 0.58]}><circleGeometry args={[0.24, 32]} /><meshStandardMaterial color="#1a0f33" /></mesh>
      <mesh position={[0, -1.45, 0.6]}><circleGeometry args={[0.13, 32]} /><meshStandardMaterial color="#c4b5fd" emissive="#a78bfa" emissiveIntensity={2} /></mesh>

      {/* arms */}
      <group ref={armR} position={[0.78, -1.15, 0]}>
        <mesh position={[0, -0.42, 0]}><capsuleGeometry args={[0.15, 0.55, 8, 16]} /><meshStandardMaterial {...shell} /></mesh>
        <mesh position={[0, -0.82, 0]}><sphereGeometry args={[0.17, 16, 16]} /><meshStandardMaterial color="#ddd2ff" metalness={0.4} roughness={0.3} /></mesh>
      </group>
      <group ref={armL} position={[-0.78, -1.15, 0]}>
        <mesh position={[0, -0.42, 0]}><capsuleGeometry args={[0.15, 0.55, 8, 16]} /><meshStandardMaterial {...shell} /></mesh>
        <mesh position={[0, -0.82, 0]}><sphereGeometry args={[0.17, 16, 16]} /><meshStandardMaterial color="#ddd2ff" metalness={0.4} roughness={0.3} /></mesh>
      </group>

      {/* head */}
      <group ref={head} position={[0, 0.25, 0]}>
        <mesh scale={[1.28, 1, 1.05]}><sphereGeometry args={[1, 64, 64]} /><meshStandardMaterial {...shell} /></mesh>
        <mesh position={[0, 0.04, 0.6]} scale={[1.02, 0.7, 0.52]}><sphereGeometry args={[1, 48, 48]} /><meshStandardMaterial color="#12082a" metalness={0.7} roughness={0.12} /></mesh>
        {/* eyes */}
        <mesh ref={eyeL} position={[-0.4, 0.1, 1.1]} scale={[0.17, 0.2, 0.05]}><sphereGeometry args={[1, 24, 24]} /><meshStandardMaterial color="#e9d5ff" emissive="#c4b5fd" emissiveIntensity={2.4} /></mesh>
        <mesh ref={eyeR} position={[0.4, 0.1, 1.1]} scale={[0.17, 0.2, 0.05]}><sphereGeometry args={[1, 24, 24]} /><meshStandardMaterial color="#e9d5ff" emissive="#c4b5fd" emissiveIntensity={2.4} /></mesh>
        {/* mouth */}
        <mesh ref={mouth} position={[0, -0.2, 1.1]} rotation={[0, 0, Math.PI]}><torusGeometry args={[0.1, 0.02, 12, 24, Math.PI]} /><meshStandardMaterial color="#f9a8d4" emissive="#f472b6" emissiveIntensity={1.2} /></mesh>
        {/* blush */}
        {[-0.68, 0.68].map((x) => (
          <mesh key={x} position={[x, -0.12, 0.98]} rotation={[0, x * 0.5, 0]}><circleGeometry args={[0.13, 24]} /><meshBasicMaterial color="#f9a8d4" transparent opacity={0.55} /></mesh>
        ))}
        {/* ears */}
        {[-1.3, 1.3].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh scale={[0.2, 0.34, 0.34]}><sphereGeometry args={[1, 24, 24]} /><meshStandardMaterial color="#ddd2ff" metalness={0.4} roughness={0.3} /></mesh>
            <mesh position={[x > 0 ? 0.16 : -0.16, 0, 0]} scale={[0.06, 0.16, 0.16]}><sphereGeometry args={[1, 16, 16]} /><meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} /></mesh>
          </group>
        ))}
        {/* antenna */}
        <mesh position={[0, 1.15, 0]}><cylinderGeometry args={[0.035, 0.035, 0.4, 12]} /><meshStandardMaterial color="#c4b5fd" metalness={0.5} roughness={0.3} /></mesh>
        <mesh position={[0, 1.42, 0]}><sphereGeometry args={[0.12, 24, 24]} /><meshStandardMaterial ref={tip} color="#f9a8d4" emissive="#f472b6" emissiveIntensity={1.5} /></mesh>
      </group>

      {/* thinking orbit */}
      <group ref={orbit} position={[0, 0.25, 0]} scale={0.001}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[Math.cos((i / 6) * Math.PI * 2) * 1.9, Math.sin(i * 1.7) * 0.5, Math.sin((i / 6) * Math.PI * 2) * 1.9]}>
            <sphereGeometry args={[0.07, 12, 12]} /><meshBasicMaterial color={i % 2 ? "#f9a8d4" : "#c4b5fd"} />
          </mesh>
        ))}
      </group>

      {/* halo + floating details */}
      <mesh ref={halo} position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.25, 0.012, 8, 96]} /><meshBasicMaterial color="#c4b5fd" transparent opacity={0.6} /></mesh>
      <group ref={bits} position={[0, -0.4, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[Math.cos((i / 4) * Math.PI * 2) * 2.2, Math.sin(i * 2) * 0.7, Math.sin((i / 4) * Math.PI * 2) * 2.2]} rotation={[i, i * 2, 0]}>
            <octahedronGeometry args={[0.1 + (i % 2) * 0.05]} /><meshStandardMaterial color="#e9d5ff" emissive="#a78bfa" emissiveIntensity={1.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function Motobot3D({ mood = "idle", className = "" }: { mood?: Mood; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className}>
      <Canvas frameloop={visible ? "always" : "never"} dpr={[1, 1.6]} camera={{ position: [0, -1.0, 9.2], fov: 34 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.9} />
        <hemisphereLight args={["#e9d5ff", "#2a1459", 0.7]} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-4, 1, 4]} intensity={60} color="#8b5cf6" />
        <pointLight position={[4, -2, 3]} intensity={40} color="#f9a8d4" />
        <Bot mood={mood} />
      </Canvas>
    </div>
  );
}
