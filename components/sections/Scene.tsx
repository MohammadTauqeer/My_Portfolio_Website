"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Float } from "@react-three/drei";
import * as THREE from "three";

const Ring = ({ radius, speed, position, opacity, color }: {
  radius: number;
  speed: { x: number; y: number };
  position: [number, number, number];
  opacity: number;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * speed.x;
    meshRef.current.rotation.y += delta * speed.y;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Torus ref={meshRef} args={[radius, 0.15, 16, 100]} position={position}>
        <meshStandardMaterial 
          color={color} 
          roughness={0.4} 
          metalness={0.6}
          emissive={color}
          emissiveIntensity={0.1}
          transparent
          opacity={opacity}
        />
      </Torus>
    </Float>
  );
};

const AnimatedShape = () => {
  const ringConfigs = [
    { 
      radius: 10, // Centerpiece
      speed: { x: 0.1, y: 0.15 }, 
      position: [0, 0, 0] as [number, number, number], 
      opacity: 0.5, 
      color: "#0ea5e9" 
    },
    { 
      radius: 6, // Smaller and behind
      speed: { x: -0.12, y: 0.1 }, 
      position: [-12, 10, -5] as [number, number, number], 
      opacity: 0.4, 
      color: "#38bdf8" 
    },
    { 
      radius: 14, // Larger and further
      speed: { x: 0.05, y: -0.08 }, 
      position: [15, -12, -10] as [number, number, number], 
      opacity: 0.3, 
      color: "#0ea5e9" 
    },
    { 
      radius: 18, // Even larger and further
      speed: { x: -0.04, y: 0.06 }, 
      position: [-20, -15, -15] as [number, number, number], 
      opacity: 0.2, 
      color: "#0c4a6e" 
    },
    { 
      radius: 8, // Intermediate size and distance
      speed: { x: 0.15, y: -0.15 }, 
      position: [18, 12, -8] as [number, number, number], 
      opacity: 0.25, 
      color: "#7dd3fc" 
    },
  ];

  return (
    <>
      {ringConfigs.map((config, i) => (
        <Ring key={i} {...config} />
      ))}
    </>
  );
};

const Scene = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AnimatedShape />
      </Canvas>
    </div>
  );
};

export default Scene;
