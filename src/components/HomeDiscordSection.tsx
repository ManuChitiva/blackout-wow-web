import Link from "next/link";
import { DiscordWidget } from "@/components/DiscordWidget";
import { DISCORD_INVITE_URL, hasDiscordInvite } from "@/lib/site-config";

export type HomeDiscordCopy = {
  badge: string;
  title: string;
  body: string;
  perkOnline: string;
  perkCommunity: string;
  perkEvents: string;
  joinCta: string;
};

type HomeDiscordSectionProps = {
  copy: HomeDiscordCopy;
};

function DiscordIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function PerkPill({
  tone,
  label,
}: {
  tone: "amber" | "sky" | "emerald";
  label: string;
}) {
  const tones = {
    amber:
      "border-amber-500/25 bg-amber-500/10 text-amber-100 hover:border-amber-400/40",
    sky: "border-sky-500/25 bg-sky-500/10 text-sky-100 hover:border-sky-400/40",
    emerald:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-100 hover:border-emerald-400/40",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${tones[tone]}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}

export function HomeDiscordSection({ copy }: HomeDiscordSectionProps) {
  const inviteUrl = hasDiscordInvite ? DISCORD_INVITE_URL : null;

  return (
    <section
      id="discord"
      className="border-t border-white/10 bg-black/20"
      aria-labelledby="discord-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="home-card reveal-up cta-fire-border relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70">
          <div className="cta-fire-particles fire-embers pointer-events-none absolute -inset-x-10 -inset-y-12 opacity-75" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-0">
            <div className="p-6 md:p-8 lg:p-10">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/90">
                {copy.badge}
              </p>
              <h2
                id="discord-heading"
                className="font-display mt-3 text-2xl font-bold leading-tight text-zinc-50 md:text-3xl"
              >
                {copy.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                {copy.body}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <PerkPill tone="emerald" label={copy.perkOnline} />
                <PerkPill tone="sky" label={copy.perkCommunity} />
                <PerkPill tone="amber" label={copy.perkEvents} />
              </div>

              {inviteUrl ? (
                <Link
                  href={inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-md bg-[#5865F2] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(88,101,242,0.35)] transition-all hover:bg-[#4752C4] hover:shadow-[0_10px_32px_rgba(88,101,242,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2]/60"
                >
                  <DiscordIcon className="h-5 w-5" />
                  {copy.joinCta}
                </Link>
              ) : null}
            </div>

            <div className="border-t border-white/10 p-4 sm:p-6 lg:border-t-0 lg:border-l lg:p-8">
              <DiscordWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

