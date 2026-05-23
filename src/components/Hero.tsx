"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { CALENDLY_URL } from "@/lib/links";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulse: boolean;
  phase: number;
};

const NODE_COUNT = 22;
const CONNECT_DIST = 150;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    let lastFrame = 0;
    const targetFps = 60;
    const frameInterval = 1000 / targetFps;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: reducedMotion ? 0 : (Math.random() - 0.5) * 0.25,
        vy: reducedMotion ? 0 : (Math.random() - 0.5) * 0.25,
        pulse: i < 3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            const alpha = 0.15 * (1 - d / CONNECT_DIST);
            ctx.strokeStyle = `rgba(43, 108, 176, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(43, 108, 176, 0.6)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (now: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(step);
        return;
      }
      if (now - lastFrame < frameInterval) {
        rafId = requestAnimationFrame(step);
        return;
      }
      lastFrame = now;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= 0 || n.x >= width) n.vx *= -1;
        if (n.y <= 0 || n.y >= height) n.vy *= -1;
        n.phase += 0.02;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            const alpha = 0.15 * (1 - d / CONNECT_DIST);
            ctx.strokeStyle = `rgba(43, 108, 176, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const scale = n.pulse ? 1 + 0.3 * Math.sin(n.phase) : 1;
        const baseAlpha = n.pulse ? 0.6 + 0.3 * Math.sin(n.phase) : 0.6;
        ctx.fillStyle = `rgba(43, 108, 176, ${baseAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    resize();
    seed();
    if (reducedMotion) {
      drawStatic();
    } else {
      rafId = requestAnimationFrame(step);
    }

    const onResize = () => {
      resize();
      seed();
      if (reducedMotion) drawStatic();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-navy text-white"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 sm:px-8">
        <div className="mx-auto flex max-w-[800px] flex-col items-center text-center">
          <p className="eyebrow">Healthcare IT Integration</p>
          <h1 className="mt-6 font-display font-bold leading-[1.05] tracking-tight text-white text-[36px] sm:text-[44px] lg:text-[56px]">
            Your Lab&apos;s Integration
            <br />
            Problems Stop Here.
          </h1>
          <p className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-steel sm:text-[20px]">
            IIG provides expert Cloverleaf, Mirth Connect, HL7, and FHIR integration services
            exclusively for specialty clinical laboratories. When your LIS needs
            to talk to Epic, Cerner, or 40 other systems — we make it work.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-blue-signal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-hover"
            >
              Schedule a Call
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded border border-white/70 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              See Our Services
            </a>
          </div>
        </div>
      </div>
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-steel"
      >
        <ChevronDown className="chevron-bounce" size={28} strokeWidth={1.5} />
      </a>
    </section>
  );
}
