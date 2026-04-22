"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function SiteHeader() {
  const { accessToken, canManageDashboard, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const baseNavItemClass =
    "rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-300/90 transition-all duration-200 hover:text-amber-200";
  const mobileNavItemClass =
    "rounded-md border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:bg-white/5";

  return (
    <header className="navbar-aura sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <Link
          href="/"
          className="shrink-0 rounded-md border border-white/10 bg-zinc-950/50 px-2.5 py-1.5 transition-all hover:border-amber-400/40 hover:bg-zinc-900/70"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-[0.08em] text-transparent bg-linear-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text sm:text-base">
              BLACKOUT
            </span>
            <span className="font-display text-[9px] font-semibold uppercase tracking-[0.2em] text-sky-200/80 sm:text-[10px]">
              WotLK
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

        <nav className="hidden items-center gap-1 border-y border-white/10 px-2 py-1 md:flex">
          <Link className={baseNavItemClass} href="/#features">
            Servidor
          </Link>
          {accessToken ? (
            <>
              <Link className={baseNavItemClass} href="/tienda">
                Tienda
              </Link>
              <Link className={baseNavItemClass} href="/tienda/puntos">
                Canjear puntos
              </Link>
              {canManageDashboard && (
                <Link className={baseNavItemClass} href="/dashboard/productos">
                  Dashboard
                </Link>
              )}
              <Link className={baseNavItemClass} href="/cuenta">
                Mi cuenta
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="ml-1 rounded border border-red-300/30 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-red-200 transition-all hover:border-red-200/50 hover:bg-red-900/20"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                className="rounded border border-amber-400/40 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-200 transition-all hover:bg-amber-500/10"
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
            {accessToken ? (
              <>
                <Link className={mobileNavItemClass} href="/tienda" onClick={() => setMobileOpen(false)}>
                  Tienda
                </Link>
                <Link className={mobileNavItemClass} href="/tienda/puntos" onClick={() => setMobileOpen(false)}>
                  Canjear puntos
                </Link>
                {canManageDashboard && (
                  <Link className={mobileNavItemClass} href="/dashboard/productos" onClick={() => setMobileOpen(false)}>
                    Dashboard
                  </Link>
                )}
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
