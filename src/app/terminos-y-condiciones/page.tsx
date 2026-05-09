import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SiteShell } from "@/components/SiteShell";
import { SITE_NAME } from "@/lib/seo";
import { defaultLng, isSupportedLanguage } from "@/i18n/settings";

export const metadata: Metadata = {
  title: "Terminos y condiciones",
  description:
    "Consulta las reglas oficiales de BLACKOUT WOW para comunidad, PvP, cuentas, comercio y uso del servidor.",
  alternates: {
    canonical: "/terminos-y-condiciones",
  },
  openGraph: {
    title: `Terminos y condiciones | ${SITE_NAME}`,
    description:
      "Normas y politicas del servidor BLACKOUT WOW para una experiencia justa y estable.",
    url: "/terminos-y-condiciones",
  },
};

export default async function TermsPage() {
  const cookieStore = await cookies();
  const rawLang = cookieStore.get("lang")?.value;
  const lang = isSupportedLanguage(rawLang) ? rawLang : defaultLng;
  const tx = {
    es: {
      title: "Reglas generales de Blackout-WoW",
      intro:
        "Para mantener una comunidad sana, divertida y justa, todos los jugadores deben respetar estas reglas. Cualquier incumplimiento puede terminar en sancion temporal, suspension o baneo permanente segun la gravedad del caso.",
      scope:
        "Estas normas aplican dentro del juego, canales globales, susurros, grupos, hermandades y Discord.",
      c1: "Comportamiento de la comunidad",
      c2: "Hacks, trampas y abuso de bugs",
      c3: "Cuenta, staff y comercio",
      c4: "Reglas de PvP",
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
      title: "General Blackout-WoW rules",
      intro:
        "To keep a healthy, fun and fair community, all players must follow these rules. Any violation may result in temporary sanctions, suspension or permanent ban depending on severity.",
      scope:
        "These rules apply in-game, global channels, whispers, groups, guilds and Discord.",
      c1: "Community behavior",
      c2: "Hacks, cheats and bug abuse",
      c3: "Account, staff and trading",
      c4: "PvP rules",
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
      title: "Regras gerais do Blackout-WoW",
      intro:
        "Para manter uma comunidade saudável, divertida e justa, todos os jogadores devem seguir estas regras. Qualquer infração pode resultar em sanções temporárias, suspensão ou banimento permanente.",
      scope:
        "Estas regras se aplicam no jogo, canais globais, whispers, grupos, guildas e Discord.",
      c1: "Comportamento da comunidade",
      c2: "Hacks, trapaças e abuso de bugs",
      c3: "Conta, staff e comércio",
      c4: "Regras de PvP",
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
  const communityRules = tx.communityRules;
  const fairPlayRules = tx.fairPlayRules;
  const accountRules = tx.accountRules;
  const pvpRules = tx.pvpRules;

  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/65 p-6 md:p-8">
          <h1 className="font-display text-3xl font-semibold text-zinc-100">{tx.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            {tx.intro}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {tx.scope}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-white/10 bg-black/30 p-5">
              <h2 className="font-display text-lg text-amber-300">{tx.c1}</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                {communityRules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-white/10 bg-black/30 p-5">
              <h2 className="font-display text-lg text-amber-300">{tx.c2}</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                {fairPlayRules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-white/10 bg-black/30 p-5">
              <h2 className="font-display text-lg text-amber-300">{tx.c3}</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                {accountRules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-white/10 bg-black/30 p-5">
              <h2 className="font-display text-lg text-amber-300">{tx.c4}</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                {pvpRules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/80" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 rounded-xl border border-sky-300/20 bg-sky-950/20 p-4">
            <p className="text-sm leading-relaxed text-zinc-300">
              {tx.end}
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
