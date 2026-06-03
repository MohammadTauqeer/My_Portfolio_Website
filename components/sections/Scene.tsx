"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Float } from "@react-three/drei";
import * as THREE from "three";

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Torus ref={meshRef} args={[10, 0.5, 16, 100]}>
        <meshStandardMaterial 
          color="#0ea5e9" 
          roughness={0.3} 
          metalness={0.8}
          emissive="#0c4a6e"
          emissiveIntensity={0.2}
        />
      </Torus>
    </Float>
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
