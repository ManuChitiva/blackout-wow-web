"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginParticlesCanvas } from "@/components/LoginParticlesCanvas";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

const LOGIN_BG_VIDEO =
  "https://video.wixstatic.com/video/5dd8a0_8f4b4a4ca3384ba19443b397721c7282/720p/mp4/file.mp4";

function LoginPageContent() {
  const { t } = useTranslation();
  const { login, accessToken, isAuthReady } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      if (err instanceof ApiError) {
        const rawMessage = `${err.message} ${err.detail ?? ""}`.toLowerCase();
        const looksLikeInvalidCredentials =
          rawMessage.includes("bad credentials") ||
          rawMessage.includes("credenciales inválidas") ||
          rawMessage.includes("credenciales invalidas");

        const friendlyMessage =
          err.status === 401 || looksLikeInvalidCredentials
            ? "No pudimos iniciar sesión con esos datos. Revisa tu usuario y contraseña."
            : err.status === 429
              ? "Has hecho varios intentos. Espera un momento y vuelve a intentarlo."
              : err.status >= 500
                ? "Nuestros servidores están ocupados en este momento. Intenta de nuevo en unos minutos."
                : "No pudimos iniciar sesión por ahora. Intenta nuevamente.";
        setError(friendlyMessage);
      } else {
        setError("No pudimos iniciar sesión por ahora. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
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
          <h1 className="font-display text-3xl font-semibold text-zinc-50">{t("auth.login.title")}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            {t("auth.login.noAccount")}{" "}
            <Link href="/registro" className="text-amber-400 hover:underline">
              {t("auth.login.signup")}
            </Link>
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm text-zinc-400">{t("auth.login.username")}</label>
              <input
                className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400">{t("auth.login.password")}</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded border border-white/15 bg-black/50 px-3 py-2 pr-11 text-zinc-100 outline-none focus:border-amber-500/60"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? t("auth.login.hidePassword") : t("auth.login.showPassword")}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-200"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-linear-to-r from-amber-600 to-orange-500 py-2.5 font-semibold text-black disabled:opacity-60"
            >
              {loading ? t("auth.login.loading") : t("auth.login.submit")}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-zinc-500">
            <Link href="/recuperar" className="text-sky-300 hover:underline">
              {t("auth.login.forgotPassword")}
            </Link>
          </p>
        </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="mx-auto max-w-md px-4 py-16 text-sm text-zinc-400">Loading...</div>}>
        <LoginPageContent />
      </Suspense>
    </SiteShell>
  );
}
