import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="relative overflow-hidden border-t border-sky-500/20 bg-[#050508]">
        <div
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center opacity-40 blur-[1px] saturate-[0.95]"
          style={{
            backgroundImage:
              "url('https://static.wixstatic.com/media/5dd8a0_0f8a518f22884179b5a40e90d9fa216d~mv2.png')",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-contain bg-bottom bg-no-repeat opacity-92 saturate-[1]"
          style={{
            backgroundImage:
              "url('https://static.wixstatic.com/media/5dd8a0_0f8a518f22884179b5a40e90d9fa216d~mv2.png')",
          }}
        />
        <div className="fire-embers pointer-events-none absolute inset-0 opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/28 via-black/36 to-black/45" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.10),transparent_35%),radial-gradient(circle_at_78%_45%,rgba(249,115,22,0.14),transparent_38%)]" />
        <div className="relative min-h-[420px] md:min-h-[620px]">
          <nav className="absolute left-1/2 top-8 z-10 w-[min(1100px,92%)] -translate-x-1/2 border-y border-amber-200/20 bg-black/38 px-4 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.55)] backdrop-blur-[1.5px] md:top-10 md:px-7">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-100 md:gap-x-7 md:text-sm">
              <Link href="/#features" className="relative pr-4 transition-colors hover:text-amber-100 md:pr-7 after:pointer-events-none after:absolute after:right-0 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-amber-200/30">
                Servidor
              </Link>
              <Link href="/terminos-y-condiciones" className="relative pr-4 transition-colors hover:text-amber-100 md:pr-7 after:pointer-events-none after:absolute after:right-0 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-amber-200/30">
                Terminos y condiciones
              </Link>
              <Link href="/registro" className="relative pr-4 transition-colors hover:text-amber-100 md:pr-7 after:pointer-events-none after:absolute after:right-0 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-amber-200/30">
                Registro
              </Link>
              <Link href="/login" className="transition-colors hover:text-amber-100">
                Entrar
              </Link>
            </div>
          </nav>
          <p className="absolute bottom-8 left-1/2 z-10 w-[92%] -translate-x-1/2 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-300/90 md:bottom-10 md:text-xs">
            Copyright © 2010-2026 Blackout WoW. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
