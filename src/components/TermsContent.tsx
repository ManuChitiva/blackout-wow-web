"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/SiteShell";
import { defaultLng, isSupportedLanguage } from "@/i18n/settings";
import { rulesCopy } from "@/lib/rules-copy";



export default function TermsContent() {
  const { i18n, t } = useTranslation();
  const lang = isSupportedLanguage(i18n.language) ? i18n.language : defaultLng;
  const tx = rulesCopy[lang];

  return (
    <SiteShell>
      <section className="section-fire-aura relative min-h-72 overflow-hidden border-b border-white/10">

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
              className="wc-button wc-button-ghost"
            >
              {tx.ctaHome}
            </Link>
            <Link
              href="/como-conectarme"
              className="wc-button"
            >
              {tx.ctaConnect}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-14 md:py-16">
        <div className="feature-fire-particles fire-embers pointer-events-none absolute -inset-x-8 -inset-y-12 z-0 opacity-45" />

        <div className="relative z-10">
          <h2 className="font-display text-center text-2xl font-semibold text-zinc-100 md:text-3xl">
            {tx.rulesHeading}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tx.sections.map((block, idx) => (
              <article
                key={block.id}
                id={block.id}
                className="home-card home-card-aura feature-card reveal-up metal-border relative scroll-mt-28 rounded-xl border border-white/10 bg-zinc-950/70 p-6 md:p-7"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <div className="flex gap-4">
                  <span
                    className="font-display shrink-0 text-3xl font-bold tabular-nums leading-none text-amber-500/25 md:text-4xl"
                    aria-hidden
                  >
                    {String(idx + 1).padStart(2, "0")}
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
            <article className="metal-border relative rounded-xl border border-amber-500/40 bg-amber-950/25 p-6 md:p-7" id="sanciones">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-amber-200/70">BLACKOUT</p>
              <h3 className="font-display mt-3 text-xl font-semibold text-amber-300">{tx.sanctionsTitle}</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">{tx.sanctionsIntro}</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-200">
                {tx.sanctions.map(rule => <li key={rule} className="flex gap-2.5"><span aria-hidden="true" className="text-amber-400">—</span><span>{rule}</span></li>)}
              </ul>
            </article>
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
      <section id="propiedad-intelectual" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-16 md:pb-20" aria-labelledby="legal-title">
        <div className="border-t border-amber-200/20 pt-8">
          <h2 id="legal-title" className="font-display text-xl font-semibold text-amber-200">{t('footer.legalTitle')}</h2>
          <div className="mt-5 max-w-4xl space-y-3 text-sm leading-relaxed text-zinc-300">
            <p>{t('footer.copyright',{year:new Date().getUTCFullYear()})}</p>
            <p>{t('footer.independence')}</p>
            <p>{t('footer.trademarks')}</p>
            <p>{t('footer.thirdParty')}</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
