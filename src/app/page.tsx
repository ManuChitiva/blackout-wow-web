import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { SiteShell } from "@/components/SiteShell";
import { NavHomeAuraText } from "@/components/NavHomeAuraText";
import { BackgroundLoopVideo } from "@/components/BackgroundLoopVideo";
import { SITE_NAME, SITE_TITLE } from "@/lib/seo";
import { defaultLng, isSupportedLanguage } from "@/i18n/settings";

export const metadata: Metadata = {
  title: "Servidor WoW Custom 3.3.5a",
  description:
    "Explora BLACKOUT WOW: servidor WotLK custom con progresion 1-100, raids, PvP activo y contenido nuevo por fases.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} - Servidor WoW Custom 3.3.5a`,
    description:
      "Servidor WotLK con progresion custom, eventos, tienda y comunidad activa.",
    url: "/",
  },
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const rawLang = cookieStore.get("lang")?.value;
  const lang = isSupportedLanguage(rawLang) ? rawLang : defaultLng;
  const tx = {
    es: {
      heroTagline: "Servidor WoW · WotLK · 3.3.5a",
      heroTaglineSub: "El mejor servidor",
      create: "Crear cuenta",
      connect: "Como conectarme",
      seeRules: "Consulta las reglas del servidor en",
      terms: "terminos y condiciones",
      features: "Caracteristicas principales del servidor",
      featuresBody:
        "Blackout-WoW esta construido para ofrecer una experiencia fresca, estable y divertida, donde siempre existe una nueva meta por cumplir.",
      serverInfo: "Informacion general del servidor",
      phases: "Fases y actualizaciones",
      vision: "Nuestra vision",
      why: "¿Por que Blackout?",
      start: "Tu aventura empieza hoy",
      startBody: "Crea tu cuenta y forma parte del reino BLACKOUT. El Lich King no espera.",
      signupNow: "Registrarme ahora",
      iHave: "Ya tengo cuenta",
      downloadTitle: "Descarga el cliente oficial",
      downloadCta: "Descargar cliente",
      quickHighlights: [
        { label: "Nivel maximo", value: "100", note: "Progresion custom" },
        { label: "Contenido", value: "100% custom", note: "PvE, PvP y sistemas" },
        { label: "Fases", value: "Cada 3 meses", note: "Actualizaciones activas" },
        { label: "Modelo", value: "No pay to win", note: "Progreso real jugando" },
      ],
      contentBlocks: [
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
      ],
      serverInfoColumns: [
        [
          "Nivel maximo 100.",
          "Leveo personalizado desde nivel 1 hasta 100.",
          "Teleporter custom para facilitar el movimiento.",
          "Pets personalizados y monturas custom.",
        ],
        [
          "Monturas inspiradas en universos como Dragon Ball Z y Star Wars.",
          "Morphs especiales para crear una identidad unica.",
          "Mas de 100.000 items disponibles para transfiguracion.",
          "Contenido balanceado para jugador casual y competitivo.",
        ],
        [
          "Raids custom con progresion por tiers.",
          "World Bosses exclusivos y recompensas especiales.",
          "Duel Zone, Battlegrounds activos y zonas PvP.",
          "Eventos por fase con recompensas y desafios nuevos.",
        ],
      ],
      whyCards: [
        {
          title: "Comunidad activa",
          body: "Un servidor con jugadores comprometidos para ayudarte, competir y progresar.",
        },
        {
          title: "Progresion constante",
          body: "Nuevas fases, sistemas y contenido nuevo para desafiarte todo el año.",
        },
        {
          title: "Experiencia custom completa",
          body: "Contenido diseñado para entregar una experiencia diferente a cualquier otro servidor.",
        },
        {
          title: "Servidor estable",
          body: "Infraestructura optimizada para ofrecer la mejor experiencia de juego posible.",
        },
      ],
      visionCards: [
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
      ],
    },
    en: {
      heroTagline: "WoW realm · WotLK · 3.3.5a",
      heroTaglineSub: "Best server",
      create: "Create account",
      connect: "How to connect",
      seeRules: "Check the server rules at",
      terms: "terms and conditions",
      features: "Main server features",
      featuresBody:
        "Blackout-WoW is built to deliver a fresh, stable and fun experience where there is always a new goal to achieve.",
      serverInfo: "General server information",
      phases: "Phases and updates",
      vision: "Our vision",
      why: "Why Blackout?",
      start: "Your adventure starts today",
      startBody: "Create your account and join the BLACKOUT realm. The Lich King is waiting.",
      signupNow: "Sign up now",
      iHave: "I already have an account",
      downloadTitle: "Download the official client",
      downloadCta: "Download client",
      quickHighlights: [
        { label: "Max level", value: "100", note: "Custom progression" },
        { label: "Content", value: "100% custom", note: "PvE, PvP and systems" },
        { label: "Phases", value: "Every 3 months", note: "Active updates" },
        { label: "Model", value: "No pay to win", note: "Real progress by playing" },
      ],
      contentBlocks: [
        {
          title: "100% custom content",
          points: [
            "Custom leveling from 1 to 100 with constant progression.",
            "Custom teleporter to move quickly between key zones.",
            "Custom pets and mounts, including content from Cataclysm to The War Within.",
            "Themed morphs and mounts inspired by universes like Dragon Ball Z and Star Wars.",
          ],
        },
        {
          title: "Custom PvE",
          points: [
            "Custom raids with progressive gear for every type of player.",
            "Custom tiers from T1 to T20 with clear progression goals.",
            "Exclusive world bosses with special rewards and challenge zones.",
            "Content designed for new, casual and competitive players.",
          ],
        },
        {
          title: "Active PvP",
          points: [
            "Custom duel zone, active battlegrounds and PvP areas.",
            "Casual and competitive combat with daily player activity.",
            "Progression and rewards focused on both PvP and PvE.",
            "System focused on fair play and real competition.",
          ],
        },
        {
          title: "Special systems",
          points: [
            "Advanced druid form switch and other quality-of-life improvements.",
            "In-game integrated store to simplify the experience.",
            "Balanced progression with no pay-to-win approach.",
            "Content designed to progress by playing and enjoying the community.",
          ],
        },
      ],
      serverInfoColumns: [
        ["Max level 100.", "Custom leveling from 1 to 100.", "Custom teleporter for fast movement.", "Custom pets and mounts."],
        ["Mounts inspired by Dragon Ball Z and Star Wars.", "Special morphs for unique identity.", "More than 100,000 transmogrification items.", "Balanced content for casual and competitive players."],
        ["Custom raids with tier progression.", "Exclusive world bosses and rewards.", "Duel Zone, active battlegrounds and PvP areas.", "Phase events with new rewards and challenges."],
      ],
      whyCards: [
        { title: "Active community", body: "A server with committed players to help you, compete and progress." },
        { title: "Constant progression", body: "New phases, systems and content to challenge you year-round." },
        { title: "Full custom experience", body: "Content designed to deliver a unique experience." },
        { title: "Stable server", body: "Optimized infrastructure for the best gameplay experience." },
      ],
      visionCards: [
        {
          title: "Active community",
          body: "We want a stable and fun environment where everyone can progress, compete and cooperate.",
          tag: "Community",
        },
        {
          title: "Real progression",
          body: "The no pay-to-win approach lets you advance by playing, learning and participating.",
          tag: "Progress",
        },
        {
          title: "Total customization",
          body: "Massive transmogs, mounts, pets and morphs so you can create your own style.",
          tag: "Identity",
        },
      ],
    },
    pt: {
      heroTagline: "Servidor WoW · WotLK · 3.3.5a",
      heroTaglineSub: "Melhor servidor",
      create: "Criar conta",
      connect: "Como conectar",
      seeRules: "Consulte as regras do servidor em",
      terms: "termos e condições",
      features: "Principais características do servidor",
      featuresBody:
        "Blackout-WoW foi criado para oferecer uma experiência nova, estável e divertida, com sempre uma nova meta.",
      serverInfo: "Informações gerais do servidor",
      phases: "Fases e atualizações",
      vision: "Nossa visão",
      why: "Por que Blackout?",
      start: "Sua aventura começa hoje",
      startBody: "Crie sua conta e faça parte do reino BLACKOUT. O Lich King não espera.",
      signupNow: "Registrar agora",
      iHave: "Já tenho conta",
      downloadTitle: "Baixe o cliente oficial",
      downloadCta: "Baixar cliente",
      quickHighlights: [
        { label: "Nível máximo", value: "100", note: "Progressão custom" },
        { label: "Conteúdo", value: "100% custom", note: "PvE, PvP e sistemas" },
        { label: "Fases", value: "A cada 3 meses", note: "Atualizações ativas" },
        { label: "Modelo", value: "Sem pay to win", note: "Progresso real jogando" },
      ],
      contentBlocks: [
        {
          title: "Conteúdo 100% custom",
          points: [
            "Leveling custom do nível 1 ao 100 com progressão constante.",
            "Teleporter custom para mover rapidamente entre zonas importantes.",
            "Pets e montarias custom, com conteúdo de Cataclysm até The War Within.",
            "Morphs e montarias temáticas inspiradas em Dragon Ball Z e Star Wars.",
          ],
        },
        {
          title: "PvE custom",
          points: [
            "Raids custom com equipamentos progressivos para todo tipo de jogador.",
            "Tiers custom de T1 até T20 com metas claras de progressão.",
            "World Bosses exclusivos com recompensas especiais.",
            "Conteúdo pensado para jogadores novos, casuais e competitivos.",
          ],
        },
        {
          title: "PvP ativo",
          points: [
            "Duel Zone custom, battlegrounds ativos e zonas PvP.",
            "Combates casuais e competitivos com atividade diária.",
            "Progressão e recompensas para PvP e PvE.",
            "Sistema focado em jogo limpo e competição real.",
          ],
        },
        {
          title: "Sistemas especiais",
          points: [
            "Sistema avançado para mudança de forma de druida e melhorias de qualidade de vida.",
            "Loja integrada dentro do jogo para facilitar a experiência.",
            "Progressão equilibrada com foco sem pay to win.",
            "Conteúdo criado para evoluir jogando e curtindo a comunidade.",
          ],
        },
      ],
      serverInfoColumns: [
        ["Nível máximo 100.", "Leveling custom do nível 1 ao 100.", "Teleporter custom para facilitar movimento.", "Pets e montarias custom."],
        ["Montarias inspiradas em Dragon Ball Z e Star Wars.", "Morphs especiais para identidade única.", "Mais de 100.000 itens para transmog.", "Conteúdo equilibrado para casual e competitivo."],
        ["Raids custom com progressão por tiers.", "World Bosses exclusivos e recompensas especiais.", "Duel Zone, battlegrounds ativos e zonas PvP.", "Eventos por fase com novos desafios."],
      ],
      whyCards: [
        { title: "Comunidade ativa", body: "Servidor com jogadores comprometidos para ajudar, competir e evoluir." },
        { title: "Progressão constante", body: "Novas fases, sistemas e conteúdo para te desafiar o ano todo." },
        { title: "Experiência custom completa", body: "Conteúdo desenhado para entregar uma experiência diferente." },
        { title: "Servidor estável", body: "Infraestrutura otimizada para a melhor experiência possível." },
      ],
      visionCards: [
        {
          title: "Comunidade ativa",
          body: "Queremos um ambiente estável e divertido onde todos possam evoluir, competir e cooperar.",
          tag: "Comunidade",
        },
        {
          title: "Progresso real",
          body: "A abordagem sem pay to win permite evoluir jogando, aprendendo e participando.",
          tag: "Progresso",
        },
        {
          title: "Personalização total",
          body: "Transmog em massa, montarias, pets e morphs para criar seu próprio estilo.",
          tag: "Identidade",
        },
      ],
    },
  }[lang];
  const dragonModelSrc = "";
  const quickHighlights = tx.quickHighlights;
  const serverInfoColumns = tx.serverInfoColumns;
  const whyBlackoutCards = tx.whyCards;
  const visionCards = tx.visionCards;
  const contentBlocks = tx.contentBlocks;

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

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pt-10 pb-16 text-center md:pt-12 md:pb-20 lg:pt-14 lg:pb-24">
          <h1 className="sr-only">{SITE_TITLE}</h1>
          <div className="reveal-up flex w-full flex-col items-center">
            <div className="hero-logo-frame relative mx-auto -translate-y-1 overflow-hidden rounded-2xl bg-transparent px-4 pb-1 pt-2 sm:px-6 sm:pb-2 sm:pt-3 md:px-8">
              <div className="hero-logo-aura pointer-events-none absolute inset-6 rounded-full bg-radial-[at_50%_50%] from-amber-300/18 via-sky-300/8 to-transparent" />
              <div className="hero-logo-sheen pointer-events-none absolute inset-y-6 left-0 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-sky-300/15 to-transparent" />
              <Image
                src="/logo-transparent.png"
                alt="BLACKOUT WOW — Wrath of the Lich King"
                width={520}
                height={148}
                className="hero-logo-image relative mx-auto h-auto w-[min(92vw,480px)] max-w-full object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.65)] md:w-[520px]"
                priority
              />
            </div>

            <div className="mt-3 text-center sm:mt-4">
              <div className="inline-flex flex-col items-center gap-1 rounded-md border border-amber-600/35 bg-zinc-950/55 px-5 py-2 shadow-[inset_0_1px_0_rgba(251,191,36,0.1),0_10px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:gap-1.5 sm:px-6 sm:py-2.5">
                <NavHomeAuraText
                  variant="title"
                  text={tx.heroTagline}
                  className="font-display text-[11px] font-semibold uppercase tracking-[0.26em] sm:text-xs md:text-sm"
                />
                <NavHomeAuraText
                  variant="sub"
                  text={tx.heroTaglineSub}
                  className="font-display text-[9px] font-semibold uppercase tracking-[0.34em] sm:text-[10px] md:text-[11px]"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-7 sm:gap-4 md:mt-8">
              <Link
                href="/registro"
                className="metal-border rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-6 py-3 text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-400 sm:px-8 sm:text-base"
              >
                {tx.create}
              </Link>
              <Link
                href="/como-conectarme"
                className="metal-border rounded-md border border-sky-400/40 bg-sky-950/40 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-900/50 sm:px-8 sm:text-base"
              >
                {tx.connect}
              </Link>
            </div>

            <p className="mt-2.5 max-w-xl text-sm text-zinc-500 sm:mt-3">
              {tx.seeRules}{" "}
              <Link
                href="/terminos-y-condiciones"
                className="text-sky-300 hover:text-sky-200 hover:underline"
              >
                {tx.terms}
              </Link>
              .
            </p>
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
          {tx.features}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-zinc-400 md:text-base">
          {tx.featuresBody}
        </p>
        <div className="relative z-10 mt-12 grid gap-6 md:grid-cols-2">
          {contentBlocks.map((f, idx) => (
            <div
              key={f.title}
              className="home-card home-card-aura feature-card reveal-up metal-border rounded-xl border border-white/10 bg-zinc-950/70 p-6"
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

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickHighlights.map((item) => (
            <article
              key={item.label}
              className="home-card home-card-aura rounded-xl border border-white/10 bg-zinc-950/65 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {item.label}
              </p>
              <h3 className="font-display mt-2 text-2xl text-amber-300">
                {item.value}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="home-card home-card-aura rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-8">
          <h2 className="font-display text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
            {tx.serverInfo}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-zinc-400 md:text-base">
            Todo lo que necesitas saber de BLACKOUT WoW en un solo vistazo.
            Progresion custom, sistemas especiales y contenido activo.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {serverInfoColumns.map((column, idx) => (
              <article
                key={`server-info-${idx}`}
                className="rounded-xl border border-white/10 bg-black/30 p-5"
              >
                <ul className="space-y-2 text-sm leading-relaxed text-zinc-300">
                  {column.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="fases-actualizaciones"
        className="relative overflow-hidden pb-14 pt-6 md:pt-10"
      >
        <BackgroundLoopVideo
          startAtSec={1}
          className="pointer-events-none absolute inset-0 h-full min-h-128 w-full object-cover opacity-[0.28]"
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source
            src="https://video.wixstatic.com/video/5dd8a0_00a855e7ddb049518bd8983809fb9a23/720p/mp4/file.mp4"
            type="video/mp4"
          />
        </BackgroundLoopVideo>
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.14),transparent_55%),linear-gradient(to_top,rgba(2,6,23,0.92)_0%,transparent_45%),linear-gradient(to_bottom,rgba(5,5,8,0.75)_0%,transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="home-card home-card-aura reveal-up rounded-2xl border border-white/10 bg-zinc-950/72 p-5 shadow-2xl shadow-black/50 backdrop-blur-sm md:p-8">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-amber-300/85">
            Visual Demo
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-zinc-100 md:text-3xl">
            {tx.downloadTitle}
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
                  {tx.downloadCta}
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="home-card home-card-aura reveal-up relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-8">
          <div className="feature-fire-particles fire-embers pointer-events-none absolute -inset-x-8 -inset-y-10 z-0 opacity-42" />
          <div className="relative z-10">
            <h2 className="font-display text-2xl font-semibold text-zinc-100">
              {tx.phases}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              El servidor evoluciona por fases. Cada 3 meses llega contenido
              nuevo con mejoras importantes, nuevos retos y recompensas para
              mantener la experiencia activa para jugadores nuevos y veteranos.
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
                  className="home-card home-card-aura phase-card rounded-lg border border-white/10 bg-black/35 p-4"
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
        </div>
      </section>

      <section className="pointer-events-none relative mx-auto max-w-6xl px-4 pb-10">
        <Image
          src="https://static.wixstatic.com/media/5dd8a0_345e699c01dd473894066e4b14870640~mv2.png"
          alt="Emblema decorativo izquierdo"
          width={900}
          height={900}
          className="absolute -left-2 top-1/2 hidden h-auto w-[120px] -translate-y-1/2 opacity-35 md:block lg:w-[150px]"
          priority={false}
        />
        <Image
          src="https://static.wixstatic.com/media/5dd8a0_f4846f95bf2443d5ab7f02ae4e0f7b9a~mv2.png"
          alt="Emblema decorativo derecho"
          width={900}
          height={900}
          className="absolute -right-2 top-1/2 hidden h-auto w-[120px] -translate-y-1/2 opacity-35 md:block lg:w-[150px]"
          priority={false}
        />
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-14">
        <div className="feature-fire-particles fire-embers pointer-events-none absolute -inset-x-8 -inset-y-10 z-0 opacity-38" />
        <div className="relative z-10">
          <h2 className="font-display text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
            {tx.vision}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {visionCards.map((n, idx) => (
              <article
                key={n.title}
                className="home-card home-card-aura reveal-up rounded-xl border border-white/10 bg-zinc-950/65 p-5"
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="font-display text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
          {tx.why}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyBlackoutCards.map((card) => (
            <article
              key={card.title}
              className="home-card home-card-aura rounded-xl border border-white/10 bg-zinc-950/65 p-5"
            >
              <h3 className="font-display text-lg text-zinc-100">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="home-card reveal-up cta-fire-border rounded-2xl border border-white/10 bg-zinc-950/70 p-8 text-center">
            <div className="cta-fire-particles fire-embers pointer-events-none absolute -inset-x-10 -inset-y-12 opacity-75" />
            <h2 className="font-display text-3xl font-semibold text-zinc-50">
              {tx.start}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400">
              {tx.startBody}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/registro"
                className="rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-6 py-3 text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-400"
              >
                {tx.signupNow}
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/5"
              >
                {tx.iHave}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
