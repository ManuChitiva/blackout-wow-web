import { SiteShell } from "@/components/SiteShell";

export default function TermsPage() {
  const communityRules = [
    "Prohibido insultar, acosar o discriminar a otros jugadores por cualquier motivo personal.",
    "Prohibido spam o flood en canales del juego, Discord o medios oficiales.",
    "Prohibido compartir informacion personal de otros jugadores.",
    "Prohibido molestar intencionalmente la experiencia de otros jugadores.",
    "Prohibido provocar bugs o afectar eventos donde otros jugadores ya participan.",
    "Se debe mantener respeto entre jugadores y miembros del staff.",
  ];
  const fairPlayRules = [
    "Prohibido usar bots, hacks, cheats o herramientas externas que alteren el juego.",
    "Prohibido explotar bugs, glitches, duplicar items o abusar de errores del servidor.",
    "Si encuentras un bug debes reportarlo al staff.",
    "Abusar errores del servidor puede terminar en sanciones graves o baneo permanente.",
  ];
  const accountRules = [
    "Prohibido publicidad de otros servidores en juego, Discord o canales oficiales.",
    "Prohibido suplantar al staff. Ningun miembro del staff pedira tu contrasena.",
    "Prohibido vender cuentas, items, oro o servicios por dinero real.",
    "Compartir cuenta es bajo tu responsabilidad; el staff no responde por perdidas.",
    "Las sanciones aplican incluso si la infraccion fue cometida por alguien con acceso compartido.",
  ];
  const pvpRules = [
    "Prohibido quedarse AFK intencionalmente en Battlegrounds o zonas PvP.",
    "Prohibido dejarse matar para farmear honor o recompensas.",
    "Prohibido wintrade, arreglar combates o manipular resultados.",
    "Prohibido abusar de colas para crear ventajas injustas.",
    "El PvP debe jugarse de forma limpia, activa y competitiva.",
  ];

  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/65 p-6 md:p-8">
          <h1 className="font-display text-3xl font-semibold text-zinc-100">Reglas generales de Blackout-WoW</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            Para mantener una comunidad sana, divertida y justa, todos los jugadores deben respetar estas reglas.
            Cualquier incumplimiento puede terminar en sancion temporal, suspension o baneo permanente segun la
            gravedad del caso.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Estas normas aplican dentro del juego, canales globales, susurros, grupos, hermandades y Discord.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-white/10 bg-black/30 p-5">
              <h2 className="font-display text-lg text-amber-300">Comportamiento de la comunidad</h2>
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
              <h2 className="font-display text-lg text-amber-300">Hacks, trampas y abuso de bugs</h2>
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
              <h2 className="font-display text-lg text-amber-300">Cuenta, staff y comercio</h2>
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
              <h2 className="font-display text-lg text-amber-300">Reglas de PvP</h2>
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
              El desconocimiento de las reglas no exime de sancion. Blackout-WoW se reserva el derecho de actualizar
              estas normas para proteger la estabilidad del servidor y la experiencia de la comunidad.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
