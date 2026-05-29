import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { SiteShell } from "@/components/SiteShell";
import { NavHomeAuraText } from "@/components/NavHomeAuraText";
import { BackgroundLoopVideo } from "@/components/BackgroundLoopVideo";
import { HomeDiscordSection } from "@/components/HomeDiscordSection";
import { buildPageMetadata, SITE_TITLE } from "@/lib/seo";
import { DISCORD_INVITE_URL, hasDiscordInvite } from "@/lib/site-config";
import { defaultLng, isSupportedLanguage } from "@/i18n/settings";

export const metadata = buildPageMetadata({
  title: "Servidor WoW custom WotLK 3.3.5a",
  description:
    "BLACKOUT WOW: servidor WotLK con progresión 1-100, raids y PvP custom, fases de contenido, tienda de puntos y comunidad activa. Entra y comienza tu aventura.",
  pathname: "/",
  keywords: [
    "servidor WoW Latinoamérica",
    "Blackout WoW WotLK",
    "WoW custom 3.3.5",
  ],
});

export default async function HomePage() {
  const cookieStore = await cookies();
  const rawLang = cookieStore.get("lang")?.value;
  const lang = isSupportedLanguage(rawLang) ? rawLang : defaultLng;
  const tx = {
    es: {
      heroTagline: "Wrath of the Lich King · 3.3.5a",
      heroTaglineSub: "Servidor custom PvE / PvP",
      heroIntro:
        "Servidor custom con nivel 100, progresión única, contenido exclusivo, sistemas propios y una comunidad activa.",
      heroIntroLong:
        "Vive una experiencia renovada en Wrath of the Lich King 3.3.5a con progresión custom, PvP balanceado, transmog masivo, monturas, razas custom, World Bosses, eventos y actualizaciones constantes.",
      create: "Crear cuenta",
      connect: "Como conectarme",
      seeRules: "Consulta las reglas del servidor en",
      terms: "terminos y condiciones",
      features: "Características principales del servidor",
      featuresSubtitle: "Una experiencia custom completa",
      featuresBody:
        "Blackout WoW está diseñado para ofrecer una experiencia fresca, estable y divertida, donde siempre tendrás una nueva meta por cumplir.",
      serverInfo: "Información general del servidor",
      serverInfoIntro:
        "Blackout WoW es un servidor custom basado en Wrath of the Lich King 3.3.5a, con nivel máximo 100, progresión por tiers, contenido PvE y PvP, sistemas exclusivos y modelo no pay to win.",
      phases: "Fases y actualizaciones",
      phasesIntro:
        "Blackout WoW avanzará por fases, agregando nuevas raids, mapas, sistemas, recompensas, World Bosses y mejoras para mantener el servidor activo.",
      phasesList: [
        { phase: "Fase 1", name: "Lanzamiento", status: "Activa" as const },
        { phase: "Fase 2", name: "Expansión de contenido", status: "Proxima" as const },
        { phase: "Fase 3", name: "Nuevos retos", status: "Programada" as const },
        { phase: "Fase 4", name: "Actualización mayor", status: "Programada" as const },
      ],
      phaseStatusActive: "Activa",
      phaseStatusNext: "Próxima",
      phaseStatusPlanned: "Programada",
      vision: "Nuestra visión",
      why: "¿Por qué Blackout?",
      discordBadge: "Comunidad",
      discordTitle: "Únete a nuestra comunidad",
      discordBody:
        "Forma parte del Discord oficial de Blackout WoW. Recibe anuncios, soporte, noticias, eventos, sorteos y encuentra jugadores para PvE, PvP y hermandades.",
      discordPerkOnline: "Anuncios oficiales",
      discordPerkCommunity: "Soporte del Staff",
      discordPerkEvents: "Eventos y sorteos",
      discordJoin: "Entrar al Discord",
      start: "Tu aventura empieza hoy",
      startBody:
        "Crea tu cuenta y forma parte de Blackout WoW. Progresa, compite, personaliza tu personaje y vive una experiencia custom diferente dentro de Wrath of the Lich King.",
      signupNow: "Registrarme ahora",
      iHave: "Ya tengo cuenta",
      downloadTitle: "Descarga el cliente oficial",
      downloadBody:
        "Instala Blackout WoW 3.3.5a en pocos minutos. Descarga el cliente completo, crea tu cuenta y entra al reino con la configuración recomendada para una experiencia estable desde el primer login.",
      downloadNote:
        "Si la descarga no inicia, revisa el bloqueador del navegador o intenta usar otro mirror disponible.",
      downloadCta: "Descargar cliente",
      quickHighlights: [
        { label: "Nivel máximo", value: "100", note: "Progresión custom" },
        { label: "Progresión", value: "Por tiers", note: "Raids custom" },
        { label: "Contenido", value: "PvE / PvP", note: "Sistemas custom" },
        { label: "Modelo", value: "No pay to win", note: "Progreso real jugando" },
        { label: "Actualizaciones", value: "Por fases", note: "Contenido en evolución" },
        { label: "Comunidad", value: "Discord activo", note: "Soporte del Staff" },
      ],
      contentBlocks: [
        {
          title: "PvE Custom",
          points: [
            "Raids custom, World Bosses y progresión por tiers.",
            "Misiones especiales, armas legendarias y llaves de contenido.",
            "Tiers del 1 al 16 en modo solo y del 17 al 25 para grupos.",
            "Daily Quests, Custom Quests y nuevas raids con mapas adaptados.",
          ],
        },
        {
          title: "PvP Activo",
          points: [
            "Arenas 1v1, 2v2, 3v3 y 5v5 con Battlegrounds activos.",
            "Duel Zone personalizada y recompensas PvP especiales.",
            "Balance para evitar clases rotas y crossfaction en PvP.",
            "Sistema competitivo, justo y con actividad diaria.",
          ],
        },
        {
          title: "Contenido Custom",
          points: [
            "Transmog masivo con más de 100.000 ítems.",
            "Más de 500 monturas, pets, morphs, visuales, alas y auras custom.",
            "Más de 16 razas custom con todas las clases disponibles.",
            "Sets custom y nuevos displays para anillos, collares y trinkets.",
          ],
        },
        {
          title: "Sistemas Exclusivos",
          points: [
            "Pasivas custom, teleporter y Custom Mall integrado.",
            "Profesiones instantáneas, buffs custom y comandos útiles.",
            "Nueva interfaz, login custom y pantallas de carga propias.",
            "Modelo no pay to win con progresión balanceada.",
          ],
        },
      ],
      serverInfoColumns: [
        [
          "Nivel máximo 100.",
          "Cliente Wrath of the Lich King 3.3.5a.",
          "Progresión custom por tiers.",
          "Contenido PvE y PvP activo.",
        ],
        [
          "Sistemas exclusivos del servidor.",
          "Modelo no pay to win.",
          "Actualizaciones por fases.",
          "Más de 30 World Bosses custom.",
        ],
        [
          "Transmog masivo y personalización visual.",
          "Monturas, morphs, razas y sets custom.",
          "Tienda organizada por categorías.",
          "Comunidad activa con Discord y soporte del Staff.",
        ],
      ],
      whyCards: [
        {
          title: "Comunidad activa",
          body: "Discord oficial con anuncios, soporte del Staff, eventos y jugadores para PvE, PvP y hermandades.",
        },
        {
          title: "Progresión constante",
          body: "Raids custom por tiers, World Bosses, fases de contenido y actualizaciones regulares.",
        },
        {
          title: "Experiencia custom completa",
          body: "PvE, PvP balanceado, transmog masivo, monturas, razas custom y sistemas exclusivos.",
        },
        {
          title: "No pay to win",
          body: "Progresa jugando con un modelo balanceado. La tienda ofrece contenido especial sin romper el servidor.",
        },
      ],
      visionCards: [
        {
          title: "PvE por tiers",
          body: "Progresión clara desde contenido inicial hasta desafíos avanzados con raids, llaves y armas legendarias.",
          tag: "PvE",
        },
        {
          title: "PvP balanceado",
          body: "Arenas, Battlegrounds, Duel Zone y recompensas competitivas con sistemas de balance activos.",
          tag: "PvP",
        },
        {
          title: "Personalización total",
          body: "Transmog masivo, monturas, morphs, visuales, alas, auras y razas custom para tu identidad única.",
          tag: "Identidad",
        },
      ],
    },
    en: {
      heroTagline: "Wrath of the Lich King · 3.3.5a",
      heroTaglineSub: "Custom PvE / PvP realm",
      heroIntro:
        "Custom realm with level 100, unique progression, exclusive content, proprietary systems and an active community.",
      heroIntroLong:
        "Experience a refreshed Wrath of the Lich King 3.3.5a with custom progression, balanced PvP, massive transmog, mounts, custom races, world bosses, events and constant updates.",
      create: "Create account",
      connect: "How to connect",
      seeRules: "Check the server rules at",
      terms: "terms and conditions",
      features: "Main server features",
      featuresSubtitle: "A complete custom experience",
      featuresBody:
        "Blackout WoW is designed to deliver a fresh, stable and fun experience where you will always have a new goal to achieve.",
      serverInfo: "General server information",
      serverInfoIntro:
        "Blackout WoW is a custom Wrath of the Lich King 3.3.5a realm with max level 100, tier progression, PvE and PvP content, exclusive systems and a no pay-to-win model.",
      phases: "Phases and updates",
      phasesIntro:
        "Blackout WoW will grow in phases, adding new raids, maps, systems, rewards, world bosses and improvements to keep the realm active.",
      phasesList: [
        { phase: "Phase 1", name: "Launch", status: "Activa" as const },
        { phase: "Phase 2", name: "Content expansion", status: "Proxima" as const },
        { phase: "Phase 3", name: "New challenges", status: "Programada" as const },
        { phase: "Phase 4", name: "Major update", status: "Programada" as const },
      ],
      phaseStatusActive: "Active",
      phaseStatusNext: "Upcoming",
      phaseStatusPlanned: "Planned",
      vision: "Our vision",
      why: "Why Blackout?",
      discordBadge: "Community",
      discordTitle: "Join our community",
      discordBody:
        "Join the official Blackout WoW Discord for announcements, support, news, events, giveaways and to find players for PvE, PvP and guilds.",
      discordPerkOnline: "Official announcements",
      discordPerkCommunity: "Staff support",
      discordPerkEvents: "Events and giveaways",
      discordJoin: "Join Discord",
      start: "Your adventure starts today",
      startBody:
        "Create your account and join Blackout WoW. Progress, compete, customize your character and enjoy a different custom experience in Wrath of the Lich King.",
      signupNow: "Sign up now",
      iHave: "I already have an account",
      downloadTitle: "Download the official client",
      downloadBody:
        "Install Blackout WoW 3.3.5a in minutes. Download the full client, create your account and enter the realm with the recommended setup for a stable experience from your first login.",
      downloadNote:
        "If the download does not start, check your browser blocker or try another available mirror.",
      downloadCta: "Download client",
      quickHighlights: [
        { label: "Max level", value: "100", note: "Custom progression" },
        { label: "Progression", value: "By tiers", note: "Custom raids" },
        { label: "Content", value: "PvE / PvP", note: "Custom systems" },
        { label: "Model", value: "No pay to win", note: "Real progress by playing" },
        { label: "Updates", value: "By phases", note: "Evolving content" },
        { label: "Community", value: "Active Discord", note: "Staff support" },
      ],
      contentBlocks: [
        {
          title: "Custom PvE",
          points: [
            "Custom raids, world bosses and tier progression.",
            "Special quests, legendary weapons and content keys.",
            "Tiers 1–16 solo and 17–25 for groups of five.",
            "Daily quests, custom quests and new raids with adapted maps.",
          ],
        },
        {
          title: "Active PvP",
          points: [
            "1v1, 2v2, 3v3 and 5v5 arenas with active battlegrounds.",
            "Custom duel zone and special PvP rewards.",
            "Balance to avoid broken classes and crossfaction PvP.",
            "Fair, competitive gameplay with daily activity.",
          ],
        },
        {
          title: "Custom content",
          points: [
            "Massive transmog with 100,000+ items.",
            "500+ custom mounts, pets, morphs, visuals, wings and auras.",
            "16+ custom races with all classes available.",
            "Custom sets and new displays for rings, necks and trinkets.",
          ],
        },
        {
          title: "Exclusive systems",
          points: [
            "Custom passives, teleporter and integrated Custom Mall.",
            "Instant professions, custom buffs and useful commands.",
            "New UI, custom login and loading screens.",
            "No pay-to-win model with balanced progression.",
          ],
        },
      ],
      serverInfoColumns: [
        ["Max level 100.", "Wrath of the Lich King 3.3.5a client.", "Custom tier progression.", "Active PvE and PvP content."],
        ["Exclusive server systems.", "No pay-to-win model.", "Phase-based updates.", "30+ custom world bosses."],
        ["Massive transmog and visual customization.", "Custom mounts, morphs, races and sets.", "Store organized by categories.", "Active community with Discord and staff support."],
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
      heroTagline: "Wrath of the Lich King · 3.3.5a",
      heroTaglineSub: "Servidor custom PvE / PvP",
      heroIntro:
        "Servidor custom com nível 100, progressão única, conteúdo exclusivo, sistemas próprios e comunidade ativa.",
      heroIntroLong:
        "Viva uma experiência renovada em Wrath of the Lich King 3.3.5a com progressão custom, PvP balanceado, transmog em massa, montarias, raças custom, World Bosses, eventos e atualizações constantes.",
      create: "Criar conta",
      connect: "Como conectar",
      seeRules: "Consulte as regras do servidor em",
      terms: "termos e condições",
      features: "Principais características do servidor",
      featuresSubtitle: "Uma experiência custom completa",
      featuresBody:
        "Blackout WoW foi criado para oferecer uma experiência nova, estável e divertida, com sempre uma nova meta para cumprir.",
      serverInfo: "Informações gerais do servidor",
      serverInfoIntro:
        "Blackout WoW é um servidor custom baseado em Wrath of the Lich King 3.3.5a, com nível máximo 100, progressão por tiers, conteúdo PvE e PvP, sistemas exclusivos e modelo sem pay to win.",
      phases: "Fases e atualizações",
      phasesIntro:
        "Blackout WoW avançará por fases, adicionando novas raids, mapas, sistemas, recompensas, World Bosses e melhorias para manter o servidor ativo.",
      phasesList: [
        { phase: "Fase 1", name: "Lançamento", status: "Activa" as const },
        { phase: "Fase 2", name: "Expansão de conteúdo", status: "Proxima" as const },
        { phase: "Fase 3", name: "Novos desafios", status: "Programada" as const },
        { phase: "Fase 4", name: "Atualização maior", status: "Programada" as const },
      ],
      phaseStatusActive: "Ativa",
      phaseStatusNext: "Próxima",
      phaseStatusPlanned: "Programada",
      vision: "Nossa visão",
      why: "Por que Blackout?",
      discordBadge: "Comunidade",
      discordTitle: "Junte-se à nossa comunidade",
      discordBody:
        "Faça parte do Discord oficial do Blackout WoW. Receba anúncios, suporte, notícias, eventos, sorteios e encontre jogadores para PvE, PvP e guildas.",
      discordPerkOnline: "Anúncios oficiais",
      discordPerkCommunity: "Suporte da equipe",
      discordPerkEvents: "Eventos e sorteios",
      discordJoin: "Entrar no Discord",
      start: "Sua aventura começa hoje",
      startBody:
        "Crie sua conta e faça parte do Blackout WoW. Progrida, compita, personalize seu personagem e viva uma experiência custom diferente em Wrath of the Lich King.",
      signupNow: "Registrar agora",
      iHave: "Já tenho conta",
      downloadTitle: "Baixe o cliente oficial",
      downloadBody:
        "Instale o Blackout WoW 3.3.5a em poucos minutos. Baixe o cliente completo, crie sua conta e entre no reino com a configuração recomendada para uma experiência estável desde o primeiro login.",
      downloadNote:
        "Se o download não iniciar, verifique o bloqueador do navegador ou tente outro mirror disponível.",
      downloadCta: "Baixar cliente",
      quickHighlights: [
        { label: "Nível máximo", value: "100", note: "Progressão custom" },
        { label: "Progressão", value: "Por tiers", note: "Raids custom" },
        { label: "Conteúdo", value: "PvE / PvP", note: "Sistemas custom" },
        { label: "Modelo", value: "Sem pay to win", note: "Progresso real jogando" },
        { label: "Atualizações", value: "Por fases", note: "Conteúdo em evolução" },
        { label: "Comunidade", value: "Discord ativo", note: "Suporte da equipe" },
      ],
      contentBlocks: [
        {
          title: "PvE Custom",
          points: [
            "Raids custom, World Bosses e progressão por tiers.",
            "Missões especiais, armas lendárias e chaves de conteúdo.",
            "Tiers 1 a 16 no modo solo e 17 a 25 para grupos.",
            "Daily Quests, Custom Quests e novas raids com mapas adaptados.",
          ],
        },
        {
          title: "PvP Ativo",
          points: [
            "Arenas 1v1, 2v2, 3v3 e 5v5 com battlegrounds ativos.",
            "Duel Zone personalizada e recompensas PvP especiais.",
            "Balanceamento para evitar classes quebradas e crossfaction no PvP.",
            "Jogo competitivo, justo e com atividade diária.",
          ],
        },
        {
          title: "Conteúdo Custom",
          points: [
            "Transmog em massa com mais de 100.000 itens.",
            "Mais de 500 montarias, pets, morphs, visuais, asas e auras custom.",
            "Mais de 16 raças custom com todas as classes disponíveis.",
            "Sets custom e novos displays para anéis, colares e trinkets.",
          ],
        },
        {
          title: "Sistemas Exclusivos",
          points: [
            "Passivas custom, teleporter e Custom Mall integrado.",
            "Profissões instantâneas, buffs custom e comandos úteis.",
            "Nova interface, login custom e telas de carregamento próprias.",
            "Modelo sem pay to win com progressão equilibrada.",
          ],
        },
      ],
      serverInfoColumns: [
        ["Nível máximo 100.", "Cliente Wrath of the Lich King 3.3.5a.", "Progressão custom por tiers.", "Conteúdo PvE e PvP ativo."],
        ["Sistemas exclusivos do servidor.", "Modelo sem pay to win.", "Atualizações por fases.", "Mais de 30 World Bosses custom."],
        ["Transmog em massa e personalização visual.", "Montarias, morphs, raças e sets custom.", "Loja organizada por categorias.", "Comunidade ativa com Discord e suporte da equipe."],
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
  const phasesList = tx.phasesList;

  const phaseStatusLabel = (status: "Activa" | "Proxima" | "Programada") => {
    if (status === "Activa") return tx.phaseStatusActive;
    if (status === "Proxima") return tx.phaseStatusNext;
    return tx.phaseStatusPlanned;
  };

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

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-200 sm:mt-6">
              {tx.heroIntro}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {tx.heroIntroLong}
            </p>

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
              {hasDiscordInvite ? (
                <Link
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-[#5865F2]/50 bg-[#5865F2]/15 px-6 py-3 text-sm font-semibold text-[#e0e4ff] hover:bg-[#5865F2]/25 sm:px-8 sm:text-base"
                >
                  {tx.discordJoin}
                </Link>
              ) : null}
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

      <HomeDiscordSection
        copy={{
          badge: tx.discordBadge,
          title: tx.discordTitle,
          body: tx.discordBody,
          perkOnline: tx.discordPerkOnline,
          perkCommunity: tx.discordPerkCommunity,
          perkEvents: tx.discordPerkEvents,
          joinCta: tx.discordJoin,
        }}
      />

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
        <p className="font-display text-center text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/85">
          {tx.featuresSubtitle}
        </p>
        <h2 className="font-display mt-3 text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            {tx.serverInfoIntro}
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
            {tx.downloadBody}
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
              <p className="mt-2 text-xs text-zinc-400/90">{tx.downloadNote}</p>
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
              {tx.phasesIntro}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {phasesList.map((p) => (
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
                    {phaseStatusLabel(p.status)}
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
