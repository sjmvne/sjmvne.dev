"use client";

import { useEffect, useRef } from "react";

/**
 * Hero: canvas-based orbiting particles + aurora that follows the mouse.
 * GSAP ticker drives the particle loop for buttery-smooth 60fps.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    // ── Particles ────────────────────────────────────────────────────────────
    const ACCENT = "139, 92, 246";
    const N = 60;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      pulse: number; pulseSpeed: number;
    };

    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
    }));

    // ── Render loop ───────────────────────────────────────────────────────────
    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Aurora behind mouse
      const { x: mx, y: my } = mouse.current;
      const aurora = ctx.createRadialGradient(mx, my, 0, mx, my, 320);
      aurora.addColorStop(0, `rgba(${ACCENT}, 0.12)`);
      aurora.addColorStop(0.5, `rgba(${ACCENT}, 0.04)`);
      aurora.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, W, H);

      // Secondary static aurora (top-right)
      const a2 = ctx.createRadialGradient(W * 0.8, H * 0.1, 0, W * 0.8, H * 0.1, 400);
      a2.addColorStop(0, `rgba(${ACCENT}, 0.06)`);
      a2.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx.fillStyle = a2;
      ctx.fillRect(0, 0, W, H);

      // Particles
      for (const p of particles) {
        p.pulse += p.pulseSpeed;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${alpha})`;
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${ACCENT}, ${0.15 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-70"
    />
  );
}
