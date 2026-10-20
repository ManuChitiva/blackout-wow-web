"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useInterfaceCopy } from "@/lib/use-interface-copy";

const preferenceKey = "blackout-interface-sound";
const SoundContext = createContext({ enabled: true, toggle: () => {} });

export function InterfaceSoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    try {
      enabledRef.current = localStorage.getItem(preferenceKey) !== "off";
      setEnabled(enabledRef.current);
    } catch { /* Sound still works when browser storage is unavailable. */ }

    let lastClick = -Infinity;
    const onClick = (event: MouseEvent) => {
      if (!event.isTrusted || !enabledRef.current || !(event.target instanceof Element)) return;
      const control = event.target.closest('a[href], button, [role="button"], [role="tab"], summary, input[type="submit"], input[type="button"]');
      if (!control || control.closest('[disabled], [aria-disabled="true"], [inert], [data-ui-sound="off"]')) return;
      const audio = audioRef.current;
      const now = performance.now();
      if (!audio || now - lastClick < 80) return;
      lastClick = now;
      audio.volume = 0.2;
      audio.currentTime = 0;
      void audio.play().catch(() => { /* Never interrupt navigation if playback is blocked. */ });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  function toggle() {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    if (!next) audioRef.current?.pause();
    try { localStorage.setItem(preferenceKey, next ? "on" : "off"); } catch { /* Optional preference persistence. */ }
  }

  return (
    <SoundContext.Provider value={{ enabled, toggle }}>
      {children}
      <audio ref={audioRef} src="/sounds/wow-interface-click.mp3" preload="auto" hidden aria-hidden="true" />
    </SoundContext.Provider>
  );
}

export function InterfaceSoundToggle() {
  const { enabled, toggle } = useContext(SoundContext);
  const ui = useInterfaceCopy();
  return (
    <button type="button" className="site-sound-toggle" onClick={toggle} data-ui-sound="off"
      aria-pressed={enabled} aria-label={ui("Sonidos de interfaz")}
      title={enabled ? ui("Silenciar sonidos") : ui("Activar sonidos")}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
        {enabled ? <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" strokeLinecap="round" /> : <path className="site-sound-slash" d="m3 3 18 18" strokeLinecap="round" />}
      </svg>
      <span className="sr-only">{enabled ? ui("Sonido activado") : ui("Sonido desactivado")}</span>
    </button>
  );
}
