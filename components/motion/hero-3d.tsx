"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Soft contrast colors based on theme
  const color = theme === "light" ? "#0f172a" : "#f8fafc";
  const opacity = theme === "light" ? 0.04 : 0.06;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Base slow rotation
    meshRef.current.rotation.x += 0.0005;
    meshRef.current.rotation.y += 0.001;
    
    // Subtle parallax effect on camera
    state.camera.position.x += (mouse.current.x * 0.8 - state.camera.position.x) * 0.02;
    state.camera.position.y += (mouse.current.y * 0.8 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.0, 1]} />
      <meshBasicMaterial 
        color={color} 
        wireframe={true} 
        transparent={true} 
        opacity={opacity} 
      />
    </mesh>
  );
}

export function Hero3DBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  // Prevent hydration mismatch for theme-dependent colors
  if (!mounted) return null; 

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]} // Limit DPR on high-res screens for performance
        gl={{ antialias: true, alpha: true }}
      >
        <AbstractShape />
      </Canvas>
    </div>
  );
}
