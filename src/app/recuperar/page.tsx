"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiJson } from "@/lib/api";
import { SiteShell } from "@/components/SiteShell";

export default function ForgotPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    setLoading(true);
    try {
      const r = await apiJson<{ message: string }>("/api/v1/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMsg(r.message);
      setRedirecting(true);
      const target = `/restablecer?email=${encodeURIComponent(email.trim())}`;
      window.setTimeout(() => {
        router.push(target);
      }, 1100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl font-semibold text-zinc-50">Recuperar contraseña</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Te enviaremos un código OTP al correo asociado a tu cuenta del portal.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm text-zinc-400">Correo</label>
            <input
              type="email"
              className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-sky-500/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {msg && (
            <p className="text-sm text-sky-300">
              {msg} {redirecting ? "Te estamos llevando para ingresar el código..." : ""}
            </p>
          )}
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || redirecting}
            className="w-full rounded border border-sky-500/50 bg-sky-950/50 py-2.5 font-semibold text-sky-100 hover:bg-sky-900/60 disabled:opacity-60"
          >
            {loading ? "Enviando…" : redirecting ? "Redirigiendo..." : "Enviar código"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link href="/restablecer" className="text-amber-400 hover:underline">
            Ya tengo un código
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
