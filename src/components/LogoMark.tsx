"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Coloca el logo del cliente en `public/logo.png` (recomendado ~600px ancho, fondo transparente).
 */
type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  const [broken, setBroken] = useState(false);
  const logoClassName = className ?? "h-12 w-auto object-contain object-left";

  if (broken) {
    return (
      <div className="flex flex-col leading-tight">
        <span className="font-display text-xl font-bold tracking-tight text-transparent [background:linear-gradient(90deg,#fbbf24,#ea580c)] bg-clip-text">
          BLACKOUT WOW
        </span>
        <span className="text-[10px] uppercase tracking-[0.35em] text-sky-200/80">
          Wrath of the Lich King
        </span>
      </div>
    );
  }

  return (
    <Image
      src="/logo-transparent.png"
      alt="BLACKOUT WOW — Wrath of the Lich King"
      width={280}
      height={72}
      className={logoClassName}
      priority
      onError={() => setBroken(true)}
    />
  );
}
