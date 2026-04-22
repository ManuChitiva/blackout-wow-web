"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function SiteHeader() {
  const { accessToken, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const baseNavItemClass =
    "rounded-md border border-transparent px-3 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-white/15 hover:bg-white/5 hover:text-white";
  const mobileNavItemClass =
    "rounded-md border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:bg-white/5";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="shrink-0 rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 shadow-lg shadow-black/30 transition-all hover:border-amber-400/50 hover:bg-zinc-900/70"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-[0.04em] text-transparent bg-linear-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text sm:text-xl md:text-2xl">
              BLACKOUT
            </span>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200/85 sm:text-sm sm:tracking-[0.24em] md:text-base">
              WotLK Northrend
            </span>
          </span>
        </Link>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center rounded-md border border-white/15 bg-zinc-950/60 px-3 py-2 text-zinc-100 transition-all hover:bg-zinc-900/70 md:hidden"
        >
          Menú
        </button>

        <nav className="hidden items-center gap-2 rounded-lg border border-white/10 bg-zinc-950/50 p-1 shadow-lg shadow-black/30 md:flex">
          <Link className={baseNavItemClass} href="/#features">
            Servidor
          </Link>
          <Link className={baseNavItemClass} href="/tienda">
            Tienda
          </Link>
          <Link className={baseNavItemClass} href="/tienda/puntos">
            Canjear puntos
          </Link>
          {accessToken ? (
            <>
              <Link className={baseNavItemClass} href="/cuenta">
                Mi cuenta
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="rounded-md border border-red-300/30 bg-red-950/20 px-3 py-2 text-sm font-medium text-red-100 transition-all duration-200 hover:border-red-200/40 hover:bg-red-900/30"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                className="rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-4 py-2 text-sm font-semibold text-black shadow-md shadow-orange-900/40 transition-all duration-200 hover:from-amber-500 hover:to-orange-400"
                href="/registro"
              >
                Registro
              </Link>
              <Link className={baseNavItemClass} href="/login">
                Entrar
              </Link>
            </>
          )}
        </nav>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-black/80 px-4 pb-4 pt-3 md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
            <Link className={mobileNavItemClass} href="/#features" onClick={() => setMobileOpen(false)}>
              Servidor
            </Link>
            <Link className={mobileNavItemClass} href="/tienda" onClick={() => setMobileOpen(false)}>
              Tienda
            </Link>
            <Link className={mobileNavItemClass} href="/tienda/puntos" onClick={() => setMobileOpen(false)}>
              Canjear puntos
            </Link>
            {accessToken ? (
              <>
                <Link className={mobileNavItemClass} href="/cuenta" onClick={() => setMobileOpen(false)}>
                  Mi cuenta
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="rounded-md border border-red-300/30 bg-red-950/20 px-3 py-2 text-left text-sm font-medium text-red-100 transition-all hover:border-red-200/40 hover:bg-red-900/30"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-4 py-2 text-sm font-semibold text-black shadow-md shadow-orange-900/40 transition-all duration-200 hover:from-amber-500 hover:to-orange-400"
                  href="/registro"
                  onClick={() => setMobileOpen(false)}
                >
                  Registro
                </Link>
                <Link className={mobileNavItemClass} href="/login" onClick={() => setMobileOpen(false)}>
                  Entrar
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
