"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
const MotionContext = createContext({ paused: true });
export function WarcraftMotion({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    // Motion starts automatically; an old manual pause must not persist.
    const update = () => setPaused(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return <MotionContext.Provider value={{ paused }}><div className="warcraft-motion-root" data-motion={paused ? "paused" : "playing"}>{children}</div></MotionContext.Provider>;
}
/** Decorative video: only loads and plays onscreen, with motion preferences respected. */
export function AmbientVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const { paused } = useContext(MotionContext);
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = ref.current; if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { setVisible(entry.isIntersecting); if (entry.isIntersecting) setLoaded(true); }, { threshold: 0.01 });
    observer.observe(element); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = ref.current;
    const sync = () => { if (!element || paused || !visible || document.hidden) element?.pause(); else void element.play().catch(() => {}); };
    sync(); element?.addEventListener("canplay", sync); document.addEventListener("visibilitychange", sync);
    return () => { element?.removeEventListener("canplay", sync); document.removeEventListener("visibilitychange", sync); element?.pause(); };
  }, [paused, visible, loaded]);
  return <div className={`wc-ambient ${className}`} aria-hidden="true"><img src={poster} alt="" decoding="async"/><video ref={ref} src={(loaded && !paused) || ready ? src : undefined} poster={poster} autoPlay={visible && !paused} muted loop playsInline preload="none" onPlaying={() => setReady(true)} onError={() => setReady(false)} style={{ opacity: ready ? 1 : 0 }}/></div>;
}
