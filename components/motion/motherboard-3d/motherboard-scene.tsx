"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  Stars,
  Sparkles,
  MeshDistortMaterial,
  Trail
} from "@react-three/drei";
import * as THREE from "three";
import { skillGroups } from "@/lib/site-data";
import { SkillChip3D } from "./skill-chip-3d";

const MotherboardBase = () => {
  // Complex Traces (Copper paths)
  const traces = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      pos: [(Math.random() - 0.5) * 30, -0.145, (Math.random() - 0.5) * 26],
      scale: [Math.random() * 8 + 2, 0.005, 0.04],
      rotation: (Math.floor(Math.random() * 4) * Math.PI) / 4, // 0, 45, 90 deg
    }));
  }, []);

  // Variety of SMD Components
  const components = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const type = Math.random();
      return {
        id: i,
        type: type > 0.85 ? 'capacitor' : type > 0.6 ? 'resistor' : 'ic',
        pos: [(Math.random() - 0.5) * 32, -0.1, (Math.random() - 0.5) * 28],
        size: type > 0.85 ? [0.15, 0.3, 0.15] : [Math.random() * 0.3 + 0.1, 0.05, Math.random() * 0.2 + 0.1],
        color: type > 0.85 ? "#334155" : type > 0.6 ? "#4c1d95" : "#0f172a",
        rotation: (Math.random() * Math.PI) / 2
      };
    });
  }, []);

  // Large Motherboard Elements (Heat sinks, slots)
  const largeElements = useMemo(() => [
    { pos: [14, -0.05, 0], size: [1.2, 0.4, 10], label: "PCI_EXPRESS_GEN4_X16" },
    { pos: [-14, -0.05, -6], size: [2.5, 0.6, 2.5], label: "LOGIC_CORE_A1" },
    { pos: [-14, -0.05, 6], size: [2.5, 0.6, 2.5], label: "LOGIC_CORE_B2" },
    { pos: [0, -0.05, 12], size: [12, 0.3, 1.2], label: "SYSTEM_MEMORY_DDR5" },
    { pos: [10, -0.05, -10], size: [3, 0.5, 3], label: "NVME_STORAGE_S1" },
  ], []);

  return (
    <group>
      {/* PCB Surface - Matte & Technical */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.15, 0]}>
        <planeGeometry args={[38, 32]} />
        <meshStandardMaterial color="#050508" roughness={0.9} metalness={0} />
      </mesh>

      {/* Traces (Copper) */}
      {traces.map(t => (
        <mesh key={t.id} position={t.pos as any} rotation-y={t.rotation}>
          <boxGeometry args={t.scale as any} />
          <meshStandardMaterial color="#4c1d95" transparent opacity={0.3} emissive="#4c1d95" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* SMD Components */}
      {components.map(c => (
        <mesh key={c.id} position={c.pos as any} rotation-y={c.rotation}>
          {c.type === 'capacitor' ? (
            <cylinderGeometry args={[c.size[0], c.size[0], c.size[1], 12]} />
          ) : (
            <boxGeometry args={c.size as any} />
          )}
          <meshStandardMaterial color={c.color} roughness={0.8} metalness={0} />
        </mesh>
      ))}

      {/* Large Elements (Heat sinks with fins) */}
      {largeElements.map((el, i) => (
        <group key={i} position={el.pos as any}>
          <mesh>
            <boxGeometry args={el.size as any} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0} />
          </mesh>
          {/* Finned detail for heat sinks */}
          {el.size[1] > 0.4 && Array.from({ length: 8 }).map((_, j) => (
            <mesh key={j} position={[0, 0.2, (j - 3.5) * 0.25]}>
              <boxGeometry args={[el.size[0] * 0.95, 0.4, 0.05]} />
              <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0} />
            </mesh>
          ))}
          <Html transform pointerEvents="none" position={[0, el.size[1] + 0.1, 0]} rotation={[-Math.PI/2, 0, 0]} scale={0.1}>
            <div className="text-[10px] font-mono text-white/30 uppercase whitespace-nowrap bg-black/60 px-2 py-0.5 rounded border border-white/5 backdrop-blur-sm shadow-xl font-bold">
              {el.label}
            </div>
          </Html>
        </group>
      ))}

      {/* Technical Silkscreen Graphics */}
      <group rotation-x={-Math.PI / 2} position={[0, -0.14, 0]}>
        <Html transform pointerEvents="none" position={[-15, 13, 0]} scale={0.25}>
          <div className="text-[12px] font-mono text-white/5 uppercase tracking-[2.5em] whitespace-nowrap font-black">
            SJMVNE_SYSTEM_ARCHITECTURE_V5.0
          </div>
        </Html>
        <Html transform pointerEvents="none" position={[12, -12, 0]} scale={0.15}>
          <div className="text-[14px] font-mono text-purple-500/10 uppercase tracking-widest border-l-4 border-purple-500/20 pl-4 py-2 font-bold">
            DATA_ENGINEERING_STATION<br />
            REV_04_2026_EST
          </div>
        </Html>
      </group>
    </group>
  );
};



const MainSystemBus = ({ zones, color, speed, offset }: { zones: any[], color: string, speed: number, offset: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const pathPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const allChips = zones.flatMap(z => z.chips);
    const shuffled = [...allChips].sort(() => Math.random() - 0.5);
    shuffled.forEach(chip => {
      points.push(new THREE.Vector3(chip.position[0], -0.12, chip.position[2]));
    });
    return points;
  }, [zones]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(pathPoints, true), [pathPoints]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = (state.clock.getElapsedTime() * speed + offset) % 1;
    const t = time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;
    
    const pos = curve.getPointAt(t);
    meshRef.current.position.copy(pos);
    
    const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 1;
    meshRef.current.scale.setScalar(pulse * 0.6);
  });

  return (
    <group>
      <Trail
        width={0.4}
        length={4}
        color={new THREE.Color(color)}
        attenuation={(t) => t * t}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={10} />
          <pointLight color={color} distance={4} intensity={6} />
        </mesh>
      </Trail>
    </group>
  );
};

const MicroSignal = ({ zones, sig }: { zones: any[], sig: any }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const startPos = useMemo(() => {
    const z = zones[sig.start];
    const c = z.chips[Math.floor(Math.random() * z.chips.length)];
    return new THREE.Vector3(c.position[0], -0.12, c.position[2]);
  }, [zones, sig]);
  
  const endPos = useMemo(() => {
    const z = zones[sig.end];
    const c = z.chips[Math.floor(Math.random() * z.chips.length)];
    return new THREE.Vector3(c.position[0], -0.12, c.position[2]);
  }, [zones, sig]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const rawT = (state.clock.getElapsedTime() + sig.delay) % sig.duration / sig.duration;
    const t = rawT < 0.5 ? 2 * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 2) / 2;
    
    const pos = new THREE.Vector3().lerpVectors(startPos, endPos, t);
    meshRef.current.position.copy(pos);
    meshRef.current.scale.setScalar(Math.sin(t * Math.PI) * 0.5);
  });

  return (
    <Trail
      width={0.15}
      length={2}
      color={new THREE.Color(sig.color)}
      attenuation={(t) => t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={sig.color} emissive={sig.color} emissiveIntensity={8} transparent />
        <pointLight color={sig.color} distance={2} intensity={3} />
      </mesh>
    </Trail>
  );
};

const MicroSignals = ({ zones }: { zones: any[] }) => {
  const [signals] = useState(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    start: Math.floor(Math.random() * zones.length),
    end: Math.floor(Math.random() * zones.length),
    delay: Math.random() * 10,
    duration: 4 + Math.random() * 4,
    color: ["#a855f7", "#3b82f6", "#06b6d4", "#ffffff"][Math.floor(Math.random() * 4)]
  })));

  return (
    <group>
      {signals.map((sig) => (
        <MicroSignal key={sig.id} zones={zones} sig={sig} />
      ))}
    </group>
  );
};

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const zones = useMemo(() => {
    const spacingX = 6.5;
    const spacingZ = 5.0;
    const chipsPerRow = 4;
    const chipSpacing = 1.4;

    return skillGroups.map((group, gIdx) => {
      const zoneX = (gIdx % 3 - 1) * spacingX;
      const zoneZ = (Math.floor(gIdx / 3) - 0.5) * spacingZ;

      return {
        ...group,
        chips: group.skills.map((skill, sIdx) => {
          const row = Math.floor(sIdx / chipsPerRow);
          const col = sIdx % chipsPerRow;
          const x = zoneX + (col - (chipsPerRow - 1) / 2) * chipSpacing;
          const z = zoneZ + (row - 1) * chipSpacing;
          return { skill, position: [x, 0, z] as [number, number, number] };
        })
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetRotationX = mouse.y * 0.15;
    const targetRotationY = mouse.x * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, delta * 5);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 5);
  });

  return (
    <group ref={groupRef}>
      {/* Real Motherboard Base */}
      <MotherboardBase />

      {/* The Trinity of Data Streams: Purple, Blue, White (Slow & Fluid) */}
      <MainSystemBus zones={zones} color="#a855f7" speed={0.012} offset={0} />
      <MainSystemBus zones={zones} color="#3b82f6" speed={0.018} offset={0.3} />
      <MainSystemBus zones={zones} color="#ffffff" speed={0.008} offset={0.7} />

      {/* Random Micro-Signals between chips */}
      <MicroSignals zones={zones} />

      {/* Sparkles as data packets */}
      <Sparkles 
        count={80} 
        scale={[25, 1, 20]} 
        size={1.5} 
        speed={0.4} 
        color="#c084fc" 
        position={[0, 0.5, 0]} 
      />

      {/* Grid removed for cleaner hardware look */}

      {zones.map((zone) => (
        <group key={zone.id}>
          {/* Zone Label using safe HTML - High Resolution */}
          <group position={[zone.chips[0].position[0], 0.25, zone.chips[0].position[2] - 1.2]}>
            <Html transform rotation={[-Math.PI / 2, 0, 0]} pointerEvents="none" scale={0.25}>
              <div className="whitespace-nowrap text-[40px] font-mono text-purple-400/80 uppercase tracking-[0.5em] bg-black/50 px-8 py-3 rounded-full border border-purple-500/30 backdrop-blur-lg">
                [ {zone.label} ]
              </div>
            </Html>
          </group>

          {zone.chips.map((chip, idx) => (
            <SkillChip3D key={`${zone.id}-${idx}`} skill={chip.skill} position={chip.position} />
          ))}
        </group>
      ))}
    </group>
  );
}

export function MotherboardScene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <div className="h-[500px] w-full md:h-[600px] lg:h-[700px] bg-[#0a0a0c]" />;
  }

  return (
    <div className="h-[500px] w-full md:h-[600px] lg:h-[700px] cursor-grab active:cursor-grabbing bg-[#0a0a0c] relative">
      <div className="absolute top-4 left-4 z-10 text-[10px] text-white/30 font-mono">
        {isMobile ? "TOUCH TO TILT • TAP CHIPS TO LIFT" : "DRAG TO TILT • HOVER CHIPS TO LIFT"}
      </div>
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 15, 15], fov: 35 }}
        shadows
      >
        <color attach="background" args={["#020203"]} />
        
        {/* Atmosphere */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lights */}
        <ambientLight intensity={4} />
        <hemisphereLight intensity={3} color="#ffffff" groundColor="#1e1b4b" />
        <pointLight position={[20, 30, 20]} intensity={20} color="#8b5cf6" distance={100} />
        <pointLight position={[-20, 20, -20]} intensity={15} color="#3b82f6" distance={100} />
        <directionalLight 
          position={[0, 30, 0]} 
          intensity={5} 
          color="#ffffff" 
        />
        
        <OrbitControls 
          enablePan={true}
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={5}
          maxDistance={35}
          makeDefault
        />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Float>
      </Canvas>
    </div>
  );
}
