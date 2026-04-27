"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { skillGroups, type SkillLevel, type Skill } from "@/lib/site-data";
import { useTheme } from "next-themes";
import * as LucideIcons from "lucide-react";
import {
  SiSap,
  SiDassaultsystemes,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiWordpress,
  SiJquery,
  SiLodash,
  SiJson,
  SiMqtt,
  SiBlender,
  SiAnthropic,
  SiPerplexity,
  SiGit,
  SiLinux,
  SiGnubash,
  SiPostman,
  SiMysql,
  SiVscodium,
  SiDatagrip,
  SiGooglegemini,
  SiOllama
} from "@icons-pack/react-simple-icons";

const skillToSimpleIcon: Record<string, any> = {
  "SAPUI5": SiSap,
  "SAP MII": SiSap,
  "SAP ME": SiSap,
  "SAP PCo": SiSap,
  "ABAP": SiSap,
  "HANA": SiSap,
  "Apriso": SiDassaultsystemes,
  "JS ES6": SiJavascript,
  "TS": SiTypescript,
  "HTML/CSS": SiCss,
  "React/Next": SiNextdotjs,
  "Tailwind": SiTailwindcss,
  "WordPress": SiWordpress,
  "jQuery": SiJquery,
  "Lodash": SiLodash,
  "SQL Server": SiDatagrip,
  "MySQL": SiMysql,
  "REST APIs": SiJson,
  "MQTT": SiMqtt,
  "Gemini": SiGooglegemini,
  "Ollama": SiOllama,
  "Perplexity": SiPerplexity,
  "Claude Code": SiAnthropic,
  "Photoshop": LucideIcons.Image,
  "Blender": SiBlender,
};

interface SkillChip3DProps {
  skill: Skill;
  position: [number, number, number];
  color?: string;
}

export function SkillChip3D({ skill, position, color }: SkillChip3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === "dark";
  
  // Design tokens based on theme
  const baseColor = isDark ? "#1a1a1e" : "#f1f5f9";
  const borderColor = isDark ? "#3f3f46" : "#e2e8f0";
  const accentColor = "#8b5cf6"; // Violet-500

  // Animation values
  const targetY = hovered ? 0.25 : 0;
  const targetEmissive = hovered ? accentColor : "#000000";
  const targetIntensity = hovered ? 1.5 : 0;

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    
    // Position Lerp
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y, 
      targetY, 
      delta * 12
    );

    // Material Lerp
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.emissive.lerp(new THREE.Color(targetEmissive), delta * 12);
      meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        meshRef.current.material.emissiveIntensity,
        targetIntensity,
        delta * 12
      );
    }
  });

  // Resolve Icon
  const IconComponent = useMemo(() => {
    if (skillToSimpleIcon[skill.name]) return skillToSimpleIcon[skill.name];
    if (typeof skill.icon === 'string' && (LucideIcons as any)[skill.icon]) {
      return (LucideIcons as any)[skill.icon];
    }
    return LucideIcons.HelpCircle;
  }, [skill]);

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[0.8, 0.2, 0.8]} // W, H, D
        radius={0.05}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onPointerDown={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
      >
        <meshStandardMaterial 
          color={isDark ? "#2a2a2e" : "#f8fafc"} 
          roughness={0.8} 
          metalness={0.1}
          emissive={hovered ? accentColor : "#000000"}
          emissiveIntensity={hovered ? 1.5 : 0}
        />
        
        {/* Perfectly Centered Skill Icon */}
        <group position={[0, 0.11, 0]}>
          <Html 
            transform 
            rotation={[-Math.PI / 2, 0, 0]} 
            pointerEvents="none" 
            scale={0.25} 
            center
          >
            <div className="flex items-center justify-center w-40 h-40">
              <div className="text-white drop-shadow-[0_0_15px_rgba(139,92,246,0.9)]">
                <IconComponent size={100} strokeWidth={1.5} />
              </div>
            </div>
          </Html>
        </group>

        {/* Skill Name - Projected on the board surface below the chip */}
        {hovered && (
          <group position={[0, -0.1, 0.8]}>
            <Html 
              transform 
              rotation={[-Math.PI / 2, 0, 0]} 
              pointerEvents="none" 
              scale={0.25} 
              center
            >
              <div className="whitespace-nowrap text-[36px] font-mono font-bold text-purple-400 uppercase tracking-widest bg-black/40 px-8 py-3 rounded-xl border border-purple-500/30 backdrop-blur-sm shadow-2xl">
                {skill.name}
              </div>
            </Html>
          </group>
        )}

        {/* Signal Bars Indicator in 3D */}
        <SignalBars3D level={skill.level} hovered={hovered} />
        
        {/* Chip Pins (Visual Detail) */}
        <Pins side="left" />
        <Pins side="right" />
      </RoundedBox>

      {/* Connection Glow under the chip */}
      {hovered && (
        <pointLight
          position={[0, -0.1, 0]}
          distance={1.5}
          intensity={2}
          color={accentColor}
        />
      )}
    </group>
  );
}

function Pins({ side }: { side: "left" | "right" }) {
  const count = 3;
  const gap = 0.15;
  const x = side === "left" ? -0.42 : 0.42;
  
  return (
    <group position={[x, 0, 0]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, 0, (i - (count - 1) / 2) * gap]}>
          <boxGeometry args={[0.08, 0.04, 0.04]} />
          <meshStandardMaterial color="#52525b" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function SignalBars3D({ level, hovered }: { level: string; hovered: boolean }) {
  const levels: Record<string, number> = {
    Mastery: 3,
    Fluent: 2,
    Competent: 1,
    Exploring: 0,
  };
  const filled = levels[level] || 0;
  
  return (
    <group position={[0.22, 0.11, -0.28]}>
      {[1, 2, 3].map((i) => (
        <mesh key={i} position={[i * 0.06, (i * 0.03) / 2, 0]}>
          <boxGeometry args={[0.04, i * 0.03, 0.02]} />
          <meshStandardMaterial 
            color={i <= filled ? "#8b5cf6" : "#3f3f46"} 
            emissive={i <= filled ? "#8b5cf6" : "#000000"}
            emissiveIntensity={hovered && i <= filled ? 2 : 0.5}
            transparent
            opacity={i <= filled ? 1 : 0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
