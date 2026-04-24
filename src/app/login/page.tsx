"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginParticlesCanvas } from "@/components/LoginParticlesCanvas";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";

const LOGIN_BG_VIDEO =
  "https://video.wixstatic.com/video/5dd8a0_8f4b4a4ca3384ba19443b397721c7282/720p/mp4/file.mp4";

export default function LoginPage() {
  const { login, accessToken, isAuthReady } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthReady || !accessToken) return;
    const next = searchParams.get("next");
    router.replace(next && next.startsWith("/") ? next : "/cuenta");
  }, [isAuthReady, accessToken, searchParams, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      const next = searchParams.get("next");
      router.push(next && next.startsWith("/") ? next : "/cuenta");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteShell>
      <div className="relative isolate min-h-[min(780px,calc(100dvh-220px))] overflow-hidden bg-black">
        <video
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src={LOGIN_BG_VIDEO} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/75 via-black/60 to-black/82" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(251,191,36,0.08),transparent_55%)]" />
        <LoginParticlesCanvas />
        <div className="relative z-10 mx-auto max-w-md px-4 py-16">
          <h1 className="font-display text-3xl font-semibold text-zinc-50">Entrar</h1>
          <p className="mt-2 text-sm text-zinc-500">
            ¿Sin cuenta?{" "}
            <Link href="/registro" className="text-amber-400 hover:underline">
              Regístrate
            </Link>
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm text-zinc-400">Usuario de juego</label>
              <input
                className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400">Contraseña</label>
              <input
                type="password"
                className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-linear-to-r from-amber-600 to-orange-500 py-2.5 font-semibold text-black disabled:opacity-60"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-zinc-500">
            <Link href="/recuperar" className="text-sky-300 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
