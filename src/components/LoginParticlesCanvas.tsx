"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
};

export function LoginParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = ref.current;
    if (!canvasEl) return;
    if (canvasEl.getContext("2d") === null) return;

    const parentEl = canvasEl.parentElement;
    if (!(parentEl instanceof HTMLElement)) return;

    let raf = 0;
    let particles: Particle[] = [];
    let renderCtx: CanvasRenderingContext2D | null = null;

    function initParticles(w: number, h: number) {
      const density = Math.floor((w * h) / 10000);
      const n = Math.min(140, Math.max(48, density));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.35,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -Math.random() * 0.35 - 0.08,
        alpha: Math.random() * 0.45 + 0.12,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      const canvas = ref.current;
      const ctx = canvas?.getContext("2d");
      const root = canvas?.parentElement;
      if (!canvas || !ctx || !(root instanceof HTMLElement)) return;
      const w = root.clientWidth;
      const h = root.clientHeight;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderCtx = ctx;
      initParticles(w, h);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parentEl);

    let last = performance.now();
    function tick(now: number) {
      const root = ref.current?.parentElement;
      if (!renderCtx || !(root instanceof HTMLElement)) return;

      const dt = Math.min(32, now - last);
      last = now;
      const w = root.clientWidth;
      const h = root.clientHeight;
      renderCtx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.phase += dt * 0.0022;
        p.x += p.vx * (dt / 16) + Math.sin(p.phase) * 0.12;
        p.y += p.vy * (dt / 16);

        if (p.y < -8) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;

        const twinkle = 0.45 + 0.55 * Math.sin(p.phase * 1.7);
        const a = p.alpha * twinkle;
        renderCtx.beginPath();
        renderCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        renderCtx.fillStyle = `rgba(255, 210, 150, ${a * 0.42})`;
        renderCtx.fill();
        if (p.r > 1) {
          renderCtx.beginPath();
          renderCtx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
          renderCtx.fillStyle = `rgba(255, 180, 90, ${a * 0.08})`;
          renderCtx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-1"
      aria-hidden
    />
  );
}
