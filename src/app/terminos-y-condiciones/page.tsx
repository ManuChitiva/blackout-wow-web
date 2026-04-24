import { SiteShell } from "@/components/SiteShell";

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/65 p-6 md:p-8">
          <h1 className="font-display text-3xl font-semibold text-zinc-100">Terminos y condiciones</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Al registrarte y usar BLACKOUT WoW aceptas las reglas del servidor, politicas de uso y condiciones de la
            tienda/canje. Las compras y canjes son de uso exclusivo dentro del ecosistema del reino.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            El equipo de BLACKOUT se reserva el derecho de suspender cuentas por incumplimiento de normas, fraude o
            abuso de sistemas de pago/canje. Si tienes dudas, contacta soporte desde tu cuenta.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
