"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { publicEnv } from "@/config/public-env";
import { LoginParticlesCanvas } from "@/components/LoginParticlesCanvas";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";

const REGISTER_BG_VIDEO =
  "https://video.wixstatic.com/video/5dd8a0_55ab45ac60f043378dcd8805dcfc892a/720p/mp4/file.mp4";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const recaptchaSiteKey = publicEnv.recaptchaSiteKey;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const isUsernameValid = username.trim().length >= 3;
  const isEmailValid = email.trim().length > 0;
  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const isRecaptchaValid = recaptchaSiteKey ? Boolean(recaptchaToken) : true;
  const canSubmit =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    doPasswordsMatch &&
    isRecaptchaValid &&
    !loading;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!doPasswordsMatch) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (recaptchaSiteKey && !recaptchaToken) {
      setError("Completa el reCAPTCHA antes de continuar.");
      return;
    }
    setLoading(true);
    try {
      await register(username, password, email, recaptchaToken ?? undefined);
      setShowWelcomeModal(true);
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
          <source src={REGISTER_BG_VIDEO} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/75 via-black/60 to-black/82" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(251,191,36,0.08),transparent_55%)]" />
        <LoginParticlesCanvas />
        <div className="relative z-10 mx-auto max-w-md px-4 py-16">
          <h1 className="font-display text-3xl font-semibold text-zinc-50">Registro</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Tu usuario y contraseña son los mismos que usarás en el cliente 3.3.5a.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm text-zinc-400">Usuario</label>
              <input
                className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
                maxLength={32}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400">Correo</label>
              <input
                type="email"
                className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400">Contraseña</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded border border-white/15 bg-black/50 px-3 py-2 pr-11 text-zinc-100 outline-none focus:border-amber-500/60"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-200"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-400">Confirmar contraseña</label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full rounded border border-white/15 bg-black/50 px-3 py-2 pr-11 text-zinc-100 outline-none focus:border-amber-500/60"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-200"
                >
                  {showConfirmPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            {confirmPassword.length > 0 && !doPasswordsMatch ? (
              <p className="text-sm text-red-400">Las contraseñas no coinciden.</p>
            ) : null}
            {recaptchaSiteKey ? (
              <div className="pt-1">
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  theme="dark"
                  onChange={(token: string | null) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                  onErrored={() => setRecaptchaToken(null)}
                />
              </div>
            ) : (
              <p className="text-xs text-amber-300/90">
                Configura `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` para activar el checkbox de seguridad.
              </p>
            )}
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={!canSubmit}
              className="group relative w-full overflow-hidden rounded bg-linear-to-r from-amber-600 to-orange-500 py-2.5 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(251,146,60,0.35)] hover:brightness-110 active:translate-y-0 active:brightness-100 disabled:cursor-not-allowed disabled:border disabled:border-zinc-600/70 disabled:bg-zinc-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-300 disabled:opacity-100 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:brightness-100"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/20 opacity-0 blur-[1px] transition-all duration-500 group-hover:left-[115%] group-hover:opacity-100 group-disabled:opacity-0" />
              {loading ? "Creando cuenta…" : "Crear cuenta en el reino"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-zinc-500">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-amber-400 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-amber-400/40 bg-zinc-950 p-7 shadow-2xl shadow-black/60">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/85">Blackout WoW</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-zinc-50">
              Bienvenido al servidor, aventurero.
            </h2>
            <p className="mt-4 text-sm text-zinc-300">
              Tu cuenta fue creada correctamente. Ya puedes iniciar sesión con tus datos y comenzar tu viaje por
              Northrend.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push("/login?registered=1")}
                className="rounded bg-linear-to-r from-amber-600 to-orange-500 px-5 py-2.5 text-sm font-semibold text-black"
              >
                Ir a iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => setShowWelcomeModal(false)}
                className="rounded border border-white/20 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
