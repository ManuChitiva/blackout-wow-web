import { DISCORD_WIDGET_URL, hasDiscordWidget } from "@/lib/site-config";

type DiscordWidgetProps = {
  className?: string;
};

/**
 * Embed oficial de Discord (mismo enfoque que wow-libre-cms), con estética BLACKOUT.
 */
export function DiscordWidget({ className = "" }: DiscordWidgetProps) {
  if (!hasDiscordWidget) {
    return (
      <div
        className={`relative flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-white/15 bg-zinc-950/50 p-8 text-center ${className}`}
      >
        <p className="max-w-xs text-sm text-zinc-500">
          Configura{" "}
          <code className="text-zinc-400">NEXT_PUBLIC_DISCORD_WIDGET_URL</code>{" "}
          para mostrar el widget en vivo.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative flex justify-center ${className}`}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[420px] w-full max-w-[560px] sm:h-[500px]">
          <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 animate-pulse bg-linear-to-b from-transparent via-amber-500/25 to-transparent blur-sm" />
          <div
            className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 146, 60, 0.14) 0%, rgba(56, 189, 248, 0.08) 35%, transparent 70%)",
            }}
          />
          <div
            className="absolute left-1/4 top-1/4 h-2 w-2 animate-pulse rounded-full bg-amber-400/35 blur-sm"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute right-1/4 top-3/4 h-2 w-2 animate-pulse rounded-full bg-sky-400/35 blur-sm"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[550px]">
        <div className="pointer-events-none absolute -inset-3 rounded-2xl border border-white/10 bg-zinc-950/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md" />
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-linear-to-br from-amber-500/10 via-transparent to-sky-500/10" />
        <iframe
          src={DISCORD_WIDGET_URL}
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          title="Discord"
          className="relative h-[380px] w-full rounded-xl border border-white/10 bg-zinc-950/50 shadow-[0_20px_48px_rgba(0,0,0,0.5)] sm:h-[480px]"
          loading="lazy"
        />
      </div>
    </div>
  );
}
