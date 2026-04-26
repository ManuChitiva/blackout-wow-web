import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";

export default function HomePage() {
  const dragonModelSrc = "";
  const contentBlocks = [
    {
      title: "Contenido 100% custom",
      points: [
        "Leveo personalizado de nivel 1 a 100 con progresion constante.",
        "Teleporter custom para moverte rapido entre zonas importantes.",
        "Pets y monturas custom, incluyendo contenido desde Cataclysm hasta The War Within.",
        "Morphs y monturas tematicas inspiradas en universos como Dragon Ball Z y Star Wars.",
      ],
    },
    {
      title: "PvE custom",
      points: [
        "Raids personalizadas con equipamiento progresivo para todo tipo de jugador.",
        "Tiers custom desde T1 hasta T20 para mantener metas de progreso claras.",
        "World Bosses exclusivos con recompensas especiales y zonas de reto.",
        "Contenido pensado para jugadores nuevos, casuales y competitivos.",
      ],
    },
    {
      title: "PvP activo",
      points: [
        "Duel Zone personalizada, Battlegrounds activos y zonas PvP.",
        "Combates casuales y competitivos con actividad diaria entre jugadores.",
        "Progresion y recompensas orientadas tanto a PvP como a PvE.",
        "Sistema enfocado en juego limpio y competencia real.",
      ],
    },
    {
      title: "Sistemas especiales",
      points: [
        "Sistema avanzado para cambio de druida y otras mejoras de calidad de vida.",
        "Tienda integrada dentro del juego para facilitar la experiencia.",
        "Progresion balanceada con enfoque no pay to win.",
        "Contenido diseñado para avanzar jugando y disfrutar en comunidad.",
      ],
    },
  ];

  return (
    <SiteShell>
      <section className="section-fire-aura relative overflow-hidden border-b border-white/10">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="https://video.wixstatic.com/video/5dd8a0_58ecfec5ead544e1bb89e339ce47a859/720p/mp4/file.mp4"
            type="video/mp4"
          />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.16),transparent_42%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.14),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[url('/feature-bg-treant.png')] bg-cover bg-center opacity-10 mix-blend-screen" />
        <div className="hero-drift pointer-events-none absolute inset-0 opacity-35" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:gap-14 md:py-28">
          <div className="reveal-up">
            <p className="font-display text-sm uppercase tracking-[0.35em] text-sky-200/80">
              BLACKOUT · Wrath of the Lich King
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-2xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
              Bienvenido a Blackout-WoW{" "}
              <span className="glow-ember bg-linear-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Vive una experiencia custom completa.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              Progresion hasta nivel 100, raids y tiers exclusivos, PvE
              avanzado, PvP activo, miles de opciones de personalizacion y
              nuevas fases cada 3 meses para que siempre tengas algo nuevo por
              hacer.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
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
              <Link
                href="/downloads/blackout-wow-3.3.5a-client.zip"
                className="metal-border rounded-md border border-amber-400/35 bg-amber-950/30 px-6 py-3 text-sm font-semibold text-amber-100 hover:bg-amber-900/45 sm:px-8 sm:text-base"
              >
                Descarga el cliente oficial
              </Link>
              <Link
                href="#fases-actualizaciones"
                className="metal-border rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10 sm:px-8 sm:text-base"
              >
                Fases y actualizaciones
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              Consulta las reglas del servidor en{" "}
              <Link
                href="/terminos-y-condiciones"
                className="text-sky-300 hover:text-sky-200 hover:underline"
              >
                terminos y condiciones
              </Link>
              .
            </p>
          </div>

          <div className="reveal-up hidden justify-center md:flex">
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

      <section
        id="features"
        className="relative mx-auto max-w-6xl overflow-hidden px-4 py-16"
      >
        <Image
          src="https://static.wixstatic.com/media/5dd8a0_9222be68baa94d82b57cdd840b2ec278~mv2.png"
          alt="Frostmourne decorativa"
          width={1500}
          height={1800}
          className="hero-sword pointer-events-none absolute -right-16 bottom-0 z-0 hidden h-auto w-[220px] rotate-6 opacity-30 lg:block xl:w-[300px]"
          priority={false}
        />
        <div className="feature-fire-particles fire-embers pointer-events-none absolute -inset-x-8 -inset-y-10 z-0 opacity-55" />
        <h2 className="font-display text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
          Caracteristicas principales del servidor
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-zinc-400 md:text-base">
          Blackout-WoW esta construido para ofrecer una experiencia fresca,
          estable y divertida, donde siempre existe una nueva meta por cumplir.
        </p>
        <div className="relative z-10 mt-12 grid gap-6 md:grid-cols-2">
          {contentBlocks.map((f, idx) => (
            <div
              key={f.title}
              className="feature-card reveal-up metal-border rounded-xl border border-white/10 bg-zinc-950/70 p-6"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <h3 className="feature-card-title font-display mt-2 text-lg font-semibold text-amber-400">
                {f.title}
              </h3>
              <ul className="feature-card-list mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
                {f.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        id="fases-actualizaciones"
        className="mx-auto max-w-6xl px-4 pb-14"
      >
        <div className="reveal-up rounded-2xl border border-white/10 bg-zinc-950/55 p-5 md:p-8">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-amber-300/85">
            Visual Demo
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-zinc-100 md:text-3xl">
            Descarga el cliente oficial
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-zinc-400 md:text-base">
            Instala BLACKOUT WoW 3.3.5a en minutos. Descarga el cliente completo
            y entra al reino con la configuracion recomendada para una
            experiencia estable desde el primer login.
          </p>

          <div className="dragon-modal-shell mt-6">
            <div
              className="dragon-modal-bg"
              style={{
                backgroundImage:
                  "url('https://wowcircle.me/dragonflight/en/assets/img/ui/tab/bg3.webp')",
              }}
            />
            <div className="dragon-modal-vignette" />
            {dragonModelSrc ? (
              <model-viewer
                className="dragon-modal-model"
                src={dragonModelSrc}
                camera-controls
                disable-zoom
                disable-pan
                auto-rotate
                rotation-per-second="12deg"
                interaction-prompt="none"
                camera-orbit="-10deg 70deg 3.7m"
                min-camera-orbit="-30deg 55deg 3.2m"
                max-camera-orbit="20deg 85deg 4.2m"
                field-of-view="22deg"
                shadow-intensity="0.55"
                exposure="1.05"
                environment-image="neutral"
                poster="https://wowcircle.me/dragonflight/en/assets/img/iridikron.webp"
                alt="Iridikron 3D model preview"
              />
            ) : null}
            <img
              src="https://wowcircle.me/dragonflight/en/assets/img/iridikron.webp"
              alt="Iridikron fallback"
              className="dragon-modal-fallback"
              loading="lazy"
            />
            <div className="dragon-modal-content">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200/90">
                Cliente recomendado
              </p>
              <h3 className="font-display mt-2 text-2xl text-zinc-100 md:text-3xl">
                Comienza Tu Aventura En Blackout
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
                Descarga el cliente completo de Wrath of the Lich King 3.3.5a,
                conecta con tu cuenta y entra directamente al reino sin
                configuraciones complejas.
              </p>
              <p className="mt-2 text-xs text-zinc-400/90">
                Si no inicia la descarga, verifica tu bloqueador del navegador o
                prueba desde otro mirror.
              </p>
              <div className="mt-6">
                <Link
                  href="/downloads/blackout-wow-3.3.5a-client.zip"
                  className="inline-flex rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-5 py-2.5 text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-400"
                >
                  Descargar cliente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="reveal-up rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-zinc-100">
            Fases y actualizaciones
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
            El servidor evoluciona por fases. Cada 3 meses llega contenido nuevo
            con mejoras importantes, nuevos retos y recompensas para mantener la
            experiencia activa para jugadores nuevos y veteranos.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { phase: "Fase 1", name: "Lanzamiento", status: "Activa" },
              {
                phase: "Fase 2",
                name: "Expansion de contenido",
                status: "Proxima",
              },
              { phase: "Fase 3", name: "Nuevos retos", status: "Programada" },
              {
                phase: "Fase 4",
                name: "Actualizacion mayor",
                status: "Programada",
              },
            ].map((p) => (
              <div
                key={p.phase}
                className="rounded-lg border border-white/10 bg-black/35 p-4"
              >
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {p.phase}
                </p>
                <h3 className="mt-2 font-display text-base text-zinc-100">
                  {p.name}
                </h3>
                <p
                  className={`mt-2 text-xs font-semibold ${
                    p.status === "Activa"
                      ? "text-emerald-400"
                      : p.status === "Proxima"
                        ? "text-sky-300"
                        : "text-zinc-500"
                  }`}
                >
                  {p.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="font-display text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
          Nuestra vision
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Comunidad activa",
              body: "Queremos un entorno estable y divertido donde todos puedan progresar, competir y cooperar.",
              tag: "Comunidad",
            },
            {
              title: "Progreso real",
              body: "El enfoque no pay to win permite avanzar jugando, aprendiendo y participando.",
              tag: "Progreso",
            },
            {
              title: "Personalizacion total",
              body: "Transfiguraciones masivas, monturas, pets y morphs para crear tu propio estilo.",
              tag: "Identidad",
            },
          ].map((n, idx) => (
            <article
              key={n.title}
              className="reveal-up rounded-xl border border-white/10 bg-zinc-950/65 p-5"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300/80">
                {n.tag}
              </p>
              <h3 className="font-display mt-2 text-lg text-zinc-100">
                {n.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-400">{n.body}</p>
              <p className="mt-4 text-xs text-zinc-500">Blackout-WoW 3.3.5</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="reveal-up cta-fire-border rounded-2xl border border-white/10 bg-zinc-950/70 p-8 text-center">
            <div className="cta-fire-particles fire-embers pointer-events-none absolute -inset-x-10 -inset-y-12 opacity-75" />
            <h2 className="font-display text-3xl font-semibold text-zinc-50">
              Tu aventura empieza hoy
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400">
              Crea tu cuenta y forma parte del reino BLACKOUT. El Lich King no
              espera.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/registro"
                className="rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-6 py-3 text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-400"
              >
                Registrarme ahora
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/5"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
