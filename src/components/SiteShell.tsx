import { SiteHeader } from "@/components/SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/10 bg-black/40 py-8 text-center text-xs text-zinc-500">
        <p>
          World of Warcraft es marca registrada de Blizzard Entertainment. Este sitio es un proyecto de
          fans / servidor privado sin afiliación oficial.
        </p>
        <p className="mt-2">BLACKOUT WOW — un solo reino WotLK · AzerothCore</p>
      </footer>
    </div>
  );
}
