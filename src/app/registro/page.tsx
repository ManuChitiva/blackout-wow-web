"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(username, password, email);
      setShowWelcomeModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16">
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
            <input
              type="password"
              className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-linear-to-r from-amber-600 to-orange-500 py-2.5 font-semibold text-black disabled:opacity-60"
          >
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
