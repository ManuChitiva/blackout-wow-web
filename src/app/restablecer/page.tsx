"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiJson } from "@/lib/api";
import { SiteShell } from "@/components/SiteShell";

export default function ResetPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prefilledEmail = searchParams.get("email");
    if (prefilledEmail) setEmail(prefilledEmail);
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiJson<{ message: string }>("/api/v1/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, code, newPassword }),
      });
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl font-semibold text-zinc-50">{t("auth.reset.title")}</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {t("auth.reset.subtitle")}
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm text-zinc-400">{t("auth.reset.email")}</label>
            <input
              type="email"
              className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400">{t("auth.reset.otp")}</label>
            <input
              className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus={Boolean(email)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400">{t("auth.reset.password")}</label>
            <input
              type="password"
              className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            {loading ? t("auth.reset.saving") : t("auth.reset.submit")}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-500">
          <Link href="/recuperar" className="text-sky-300 hover:underline">
            {t("auth.reset.back")}
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
