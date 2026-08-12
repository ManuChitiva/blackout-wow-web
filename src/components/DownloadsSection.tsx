export type DownloadMirrorProvider = "mega" | "mediafire" | "gdrive";

export type DownloadMirror = {
  provider: DownloadMirrorProvider;
  href: string;
  label?: string;
};

export type DownloadGroup = {
  id: string;
  title: string;
  desc: string;
  mirrors: DownloadMirror[];
};

export type DownloadsCopy = {
  badge: string;
  title: string;
  intro: string;
  tip: string;
  groups: DownloadGroup[];
};

const PROVIDER_META: Record<DownloadMirrorProvider, { name: string }> = {
  mega: { name: "MEGA" },
  mediafire: { name: "MediaFire" },
  gdrive: { name: "Google Drive" },
};

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function DownloadsSection({ copy }: { copy: DownloadsCopy }) {
  return (
    <section id="descargas" className="mx-auto max-w-6xl px-4 pb-14">
      <div className="mb-6 flex flex-col gap-2">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-sky-200/80">
          {copy.badge}
        </p>
        <h2 className="font-display text-2xl font-semibold text-zinc-100 md:text-3xl">
          {copy.title}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
          {copy.intro}
        </p>
        <p className="text-xs text-zinc-400">{copy.tip}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {copy.groups.map((group) => (
          <article
            key={group.id}
            className="home-card flex flex-col rounded-2xl border border-white/10 bg-zinc-950/65 p-6 transition-colors hover:border-amber-500/30"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/15 text-amber-300">
                <DownloadIcon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg leading-tight text-zinc-100">
                {group.title}
              </h3>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-zinc-300">
              {group.desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.mirrors.map((mirror) => {
                const meta = PROVIDER_META[mirror.provider];
                return (
                  <a
                    key={mirror.href}
                    href={mirror.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-4 py-2 text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-400"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    {mirror.label ?? meta.name}
                  </a>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}