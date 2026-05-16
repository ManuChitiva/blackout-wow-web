import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { SiteShell } from "@/components/SiteShell";
import { BackgroundLoopVideo } from "@/components/BackgroundLoopVideo";
import { buildPageMetadata } from "@/lib/seo";
import { defaultLng, isSupportedLanguage } from "@/i18n/settings";

export const metadata = buildPageMetadata({
  title: "Términos y condiciones",
  description:
    "Reglas del servidor BLACKOUT WOW: comunidad, juego limpio, cuentas, comercio y PvP. Consulta la normativa oficial antes de jugar.",
  pathname: "/terminos-y-condiciones",
  keywords: [
    "reglas servidor WoW",
    "normativa private server",
    "términos Blackout WoW",
  ],
});

export default async function TermsPage() {
  const cookieStore = await cookies();
  const rawLang = cookieStore.get("lang")?.value;
  const lang = isSupportedLanguage(rawLang) ? rawLang : defaultLng;
  const tx = {
    es: {
      badge: "Normativa oficial",
      title: "Reglas generales de Blackout-WoW",
      intro:
        "Para mantener una comunidad sana, divertida y justa, todos los jugadores deben respetar estas reglas. Cualquier incumplimiento puede terminar en sancion temporal, suspension o baneo permanente segun la gravedad del caso.",
      scope:
        "Estas normas aplican dentro del juego, canales globales, susurros, grupos, hermandades y Discord.",
      scopeLabel: "Alcance",
      ctaHome: "Volver al inicio",
      ctaConnect: "Como conectarme",
      rulesHeading: "Normas por categoria",
      c1: "Comportamiento de la comunidad",
      c2: "Hacks, trampas y abuso de bugs",
      c3: "Cuenta, staff y comercio",
      c4: "Reglas de PvP",
      disclaimer: "Importante",
      end: "El desconocimiento de las reglas no exime de sancion. Blackout-WoW se reserva el derecho de actualizar estas normas para proteger la estabilidad del servidor y la experiencia de la comunidad.",
      communityRules: [
        "Prohibido insultar, acosar o discriminar a otros jugadores por cualquier motivo personal.",
        "Prohibido spam o flood en canales del juego, Discord o medios oficiales.",
        "Prohibido compartir informacion personal de otros jugadores.",
        "Prohibido molestar intencionalmente la experiencia de otros jugadores.",
        "Prohibido provocar bugs o afectar eventos donde otros jugadores ya participan.",
        "Se debe mantener respeto entre jugadores y miembros del staff.",
      ],
      fairPlayRules: [
        "Prohibido usar bots, hacks, cheats o herramientas externas que alteren el juego.",
        "Prohibido explotar bugs, glitches, duplicar items o abusar de errores del servidor.",
        "Si encuentras un bug debes reportarlo al staff.",
        "Abusar errores del servidor puede terminar en sanciones graves o baneo permanente.",
      ],
      accountRules: [
        "Prohibido publicidad de otros servidores en juego, Discord o canales oficiales.",
        "Prohibido suplantar al staff. Ningun miembro del staff pedira tu contrasena.",
        "Prohibido vender cuentas, items, oro o servicios por dinero real.",
        "Compartir cuenta es bajo tu responsabilidad; el staff no responde por perdidas.",
        "Las sanciones aplican incluso si la infraccion fue cometida por alguien con acceso compartido.",
      ],
      pvpRules: [
        "Prohibido quedarse AFK intencionalmente en Battlegrounds o zonas PvP.",
        "Prohibido dejarse matar para farmear honor o recompensas.",
        "Prohibido wintrade, arreglar combates o manipular resultados.",
        "Prohibido abusar de colas para crear ventajas injustas.",
        "El PvP debe jugarse de forma limpia, activa y competitiva.",
      ],
    },
    en: {
      badge: "Official policy",
      title: "General Blackout-WoW rules",
      intro:
        "To keep a healthy, fun and fair community, all players must follow these rules. Any violation may result in temporary sanctions, suspension or permanent ban depending on severity.",
      scope:
        "These rules apply in-game, global channels, whispers, groups, guilds and Discord.",
      scopeLabel: "Scope",
      ctaHome: "Back to home",
      ctaConnect: "How to connect",
      rulesHeading: "Rules by category",
      c1: "Community behavior",
      c2: "Hacks, cheats and bug abuse",
      c3: "Account, staff and trading",
      c4: "PvP rules",
      disclaimer: "Important",
      end: "Not knowing the rules does not exempt sanctions. Blackout-WoW may update these rules to protect server stability and community experience.",
      communityRules: [
        "Insulting, harassment or discrimination of other players is prohibited.",
        "Spam or flood in game channels, Discord or official media is prohibited.",
        "Sharing personal information of other players is prohibited.",
        "Intentionally disrupting other players' experience is prohibited.",
        "Triggering bugs or disrupting events where others already participate is prohibited.",
        "Respect between players and staff members is mandatory.",
      ],
      fairPlayRules: [
        "Using bots, hacks, cheats or external tools that alter gameplay is prohibited.",
        "Exploiting bugs, glitches, duplicating items or abusing server errors is prohibited.",
        "If you find a bug, report it to staff.",
        "Abusing server errors may result in severe sanctions or permanent ban.",
      ],
      accountRules: [
        "Advertising other servers in-game, Discord or official channels is prohibited.",
        "Impersonating staff is prohibited. Staff will never ask for your password.",
        "Selling accounts, items, gold or services for real money is prohibited.",
        "Account sharing is your responsibility; staff is not liable for losses.",
        "Sanctions apply even if the violation was committed by someone with shared access.",
      ],
      pvpRules: [
        "Intentionally staying AFK in battlegrounds or PvP zones is prohibited.",
        "Intentionally dying to farm honor or rewards is prohibited.",
        "Wintrading, fixed fights or manipulated results are prohibited.",
        "Abusing queue behavior to create unfair advantages is prohibited.",
        "PvP must be played fairly, actively and competitively.",
      ],
    },
    pt: {
      badge: "Normativa oficial",
      title: "Regras gerais do Blackout-WoW",
      intro:
        "Para manter uma comunidade saudável, divertida e justa, todos os jogadores devem seguir estas regras. Qualquer infração pode resultar em sanções temporárias, suspensão ou banimento permanente.",
      scope:
        "Estas regras se aplicam no jogo, canais globais, whispers, grupos, guildas e Discord.",
      scopeLabel: "Escopo",
      ctaHome: "Voltar ao início",
      ctaConnect: "Como conectar",
      rulesHeading: "Regras por categoria",
      c1: "Comportamento da comunidade",
      c2: "Hacks, trapaças e abuso de bugs",
      c3: "Conta, staff e comércio",
      c4: "Regras de PvP",
      disclaimer: "Importante",
      end: "O desconhecimento das regras não isenta punição. Blackout-WoW pode atualizar estas normas para proteger a estabilidade do servidor e a experiência da comunidade.",
      communityRules: [
        "É proibido insultar, assediar ou discriminar outros jogadores.",
        "É proibido spam/flood nos canais do jogo, Discord ou meios oficiais.",
        "É proibido compartilhar informações pessoais de outros jogadores.",
        "É proibido atrapalhar intencionalmente a experiência de outros jogadores.",
        "É proibido provocar bugs ou afetar eventos onde outros já participam.",
        "Respeito entre jogadores e equipe é obrigatório.",
      ],
      fairPlayRules: [
        "É proibido usar bots, hacks, cheats ou ferramentas externas.",
        "É proibido explorar bugs, glitches, duplicar itens ou abusar de erros do servidor.",
        "Se encontrar um bug, reporte ao staff.",
        "Abusar de erros do servidor pode gerar punições graves ou banimento permanente.",
      ],
      accountRules: [
        "É proibida propaganda de outros servidores no jogo, Discord ou canais oficiais.",
        "É proibido se passar por staff. Nenhum membro pedirá sua senha.",
        "É proibido vender contas, itens, ouro ou serviços por dinheiro real.",
        "Compartilhar conta é sua responsabilidade; o staff não responde por perdas.",
        "As punições se aplicam mesmo se a infração foi por alguém com acesso compartilhado.",
      ],
      pvpRules: [
        "É proibido ficar AFK de forma intencional em Battlegrounds ou zonas PvP.",
        "É proibido se deixar morrer para farmar honra ou recompensas.",
        "É proibido wintrade, lutas combinadas ou manipular resultados.",
        "É proibido abusar de filas para criar vantagens injustas.",
        "O PvP deve ser jogado de forma limpa, ativa e competitiva.",
      ],
    },
  }[lang];

  const ruleSections: { n: string; title: string; rules: string[] }[] = [
    { n: "01", title: tx.c1, rules: tx.communityRules },
    { n: "02", title: tx.c2, rules: tx.fairPlayRules },
    { n: "03", title: tx.c3, rules: tx.accountRules },
    { n: "04", title: tx.c4, rules: tx.pvpRules },
  ];

  return (
    <SiteShell>
      <section className="section-fire-aura relative min-h-72 overflow-hidden border-b border-white/10">
        <BackgroundLoopVideo
          startAtSec={1}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.26]"
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
        <div className="pointer-events-none absolute inset-0 bg-black/52" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.17),transparent_42%),radial-gradient(circle_at_82%_58%,rgba(56,189,248,0.12),transparent_38%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.08),transparent_48%),linear-gradient(to_top,rgba(2,6,23,0.72)_0%,transparent_50%),linear-gradient(to_bottom,rgba(5,5,8,0.55)_0%,transparent_42%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-sky-200/85">
            {tx.badge}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-3xl font-bold leading-tight text-zinc-50 md:text-5xl">
            {tx.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-200 md:text-lg">
            {tx.intro}
          </p>
          <div className="mt-6 max-w-3xl rounded-xl border border-white/10 bg-black/35 p-4 backdrop-blur-[2px] md:p-5">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/90">
              {tx.scopeLabel}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300 md:text-base">
              {tx.scope}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="metal-border rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-6 py-3 text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-400"
            >
              {tx.ctaHome}
            </Link>
            <Link
              href="/como-conectarme"
              className="rounded-md border border-sky-400/45 bg-sky-950/35 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-900/45"
            >
              {tx.ctaConnect}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-14 md:py-16">
        <Image
          src="https://static.wixstatic.com/media/5dd8a0_9222be68baa94d82b57cdd840b2ec278~mv2.png"
          alt=""
          width={1500}
          height={1800}
          className="hero-sword pointer-events-none absolute -right-12 bottom-0 z-0 hidden h-auto w-[200px] rotate-6 opacity-[0.22] lg:block xl:w-[280px]"
          priority={false}
        />
        <div className="feature-fire-particles fire-embers pointer-events-none absolute -inset-x-8 -inset-y-12 z-0 opacity-45" />

        <div className="relative z-10">
          <h2 className="font-display text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
            {tx.rulesHeading}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {ruleSections.map((block, idx) => (
              <article
                key={block.n}
                className="home-card home-card-aura feature-card reveal-up metal-border relative rounded-xl border border-white/10 bg-zinc-950/70 p-6 md:p-7"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <div className="flex gap-4">
                  <span
                    className="font-display shrink-0 text-3xl font-bold tabular-nums leading-none text-amber-500/25 md:text-4xl"
                    aria-hidden
                  >
                    {block.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-semibold text-amber-300 md:text-xl">
                      {block.title}
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-300">
                      {block.rules.map((rule) => (
                        <li key={rule} className="flex gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/85" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="metal-border relative overflow-hidden rounded-2xl border border-sky-400/30 bg-linear-to-br from-sky-950/50 via-zinc-950/75 to-orange-950/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-9">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
          <p className="font-display relative text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/90">
            {tx.disclaimer}
          </p>
          <p className="relative mt-4 text-sm leading-relaxed text-zinc-200 md:text-base">
            {tx.end}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
