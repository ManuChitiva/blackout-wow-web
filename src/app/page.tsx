import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.12),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.1),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:gap-12 md:py-28">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.4em] text-sky-200/80">
              Wrath of the Lich King
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-6xl">
              El norte te llama.{" "}
              <span className="glow-ember bg-linear-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Forja tu leyenda
              </span>{" "}
              en Northrend.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-zinc-400">
              Servidor privado enfocado en experiencia clásica WotLK, una sola comunidad y un solo reino.
              Crea tu cuenta, conecta con el cliente 3.3.5a y entra al hielo eterno.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/registro"
                className="metal-border rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-6 py-3 text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-400 sm:px-8 sm:text-base"
              >
                Crear cuenta
              </Link>
              <Link
                href="/tienda"
                className="metal-border rounded-md border border-sky-400/40 bg-sky-950/40 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-900/50 sm:px-8 sm:text-base"
              >
                Ver tienda
              </Link>
            </div>
          </div>

          <div className="hidden justify-center md:flex">
            <div className="hero-logo-frame metal-border relative overflow-hidden rounded-2xl border border-white/10 bg-transparent p-10 shadow-2xl shadow-black/35">
              <div className="hero-logo-aura pointer-events-none absolute inset-6 rounded-full bg-radial-[at_50%_50%] from-amber-300/18 via-sky-300/8 to-transparent" />
              <div className="hero-logo-sheen pointer-events-none absolute inset-y-6 left-0 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-sky-300/15 to-transparent" />
              {/* Logo destacado para equilibrar el hero en desktop */}
              <Image
                src="/logo-transparent.png"
                alt="BLACKOUT WOW — Wrath of the Lich King"
                width={420}
                height={120}
                className="hero-logo-image relative h-auto w-[360px] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative isolate mx-auto max-w-6xl overflow-hidden px-4 py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 right-0 w-full bg-contain bg-center bg-no-repeat opacity-20 blur-[1px] md:w-[58%] md:bg-right md:opacity-25"
          style={{ backgroundImage: "url('/feature-bg-treant.png')" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-l from-black/25 via-transparent to-black/10"
        />

        <div className="relative">
          <h2 className="font-display text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
            Diseñado para jugadores <span className="glow-frost text-sky-200">hardcore</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "AzerothCore",
                body: "Registro y cambio de clave vía SOAP, misma filosofía que wow-libre-client — un solo reino, sin ruido.",
              },
              {
                title: "Cuenta unificada",
                body: "Portal con JWT: tras el login ves estado de tu cuenta de juego y número de personajes en el reino.",
              },
              {
                title: "Tienda PayPal",
                body: "Donaciones seguras con PayPal Checkout. Los packs aparecen en la tienda en cuanto configures las credenciales.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="metal-border rounded-lg border border-white/10 bg-zinc-950/70 p-6 backdrop-blur"
              >
                <h3 className="font-display text-lg font-semibold text-amber-400">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
