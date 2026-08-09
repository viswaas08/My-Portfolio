import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const QuantumMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1.2, 0]} />
        <MeshDistortMaterial
          color="#00f3ff"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
};

export const FloatingQuantumCore: React.FC = () => {
  return (
    <div className="w-full h-[380px] md:h-[450px] relative flex items-center justify-center">
      {/* Glow radial overlay */}
      <div className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute w-56 h-56 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow delay-700" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f3ff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#a855f7" />
        <QuantumMesh />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
};
