"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";
import { apiJson } from "@/lib/api";

type GameAccountSummary = {
  username: string;
  email: string;
  accountId: number;
  portalRole: string;
  online: boolean;
  joinDate: string | null;
  lastLogin: string | null;
  characterCount: number;
  donationPointsBalance: number;
  recentOrders: {
    orderId: number;
    productName: string;
    donationPoints: number;
    status: string;
    paypalOrderId: string | null;
    createdAt: string;
  }[];
};

export default function AccountPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : i18n.language?.startsWith("pt") ? "pt" : "es";
  const tx = {
    es: { title: "Panel del Aventurero", loadingSession: "Cargando sesión…", redirecting: "Redirigiendo al login…", changePassword: "Cambiar clave", saving: "Guardando…", store: "Ir a la tienda", redeem: "Canjear puntos", recover: "Recuperar acceso por correo" },
    en: { title: "Adventurer Panel", loadingSession: "Loading session…", redirecting: "Redirecting to login…", changePassword: "Change password", saving: "Saving…", store: "Go to store", redeem: "Redeem points", recover: "Recover access by email" },
    pt: { title: "Painel do Aventureiro", loadingSession: "Carregando sessão…", redirecting: "Redirecionando para login…", changePassword: "Alterar senha", saving: "Salvando…", store: "Ir para loja", redeem: "Resgatar pontos", recover: "Recuperar acesso por e-mail" },
  }[lang];
  const ORDERS_PER_PAGE = 5;
  const { accessToken, isAuthReady } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<GameAccountSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [savingPassword, setSavingPassword] = useState(false);
  const [ordersPage, setOrdersPage] = useState(1);

  const totalOrderPages = useMemo(() => {
    if (!data?.recentOrders?.length) return 1;
    return Math.max(1, Math.ceil(data.recentOrders.length / ORDERS_PER_PAGE));
  }, [data]);

  const pagedOrders = useMemo(() => {
    if (!data?.recentOrders?.length) return [];
    const start = (ordersPage - 1) * ORDERS_PER_PAGE;
    return data.recentOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [data, ordersPage]);

  useEffect(() => {
    if (ordersPage > totalOrderPages) {
      setOrdersPage(totalOrderPages);
    }
  }, [ordersPage, totalOrderPages]);

  useEffect(() => {
    if (!isAuthReady) return;
    if (!accessToken) {
      router.replace("/login");
      return;
    }
    (async () => {
      try {
        const r = await apiJson<GameAccountSummary>("/api/v1/me/game-account", {
          token: accessToken,
        });
        setData(r);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      }
    })();
  }, [isAuthReady, accessToken, router]);

  async function onChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg(null);
    setPasswordError(null);
    if (!accessToken) {
      setPasswordError("Tu sesión no está lista. Inicia sesión nuevamente.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("La nueva clave debe tener al menos 8 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("La confirmación no coincide con la nueva clave.");
      return;
    }

    setSavingPassword(true);
    try {
      const result = await apiJson<{ message?: string }>("/api/v1/auth/change-password", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setPasswordMsg(result.message ?? "Tu clave se actualizó correctamente.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      setPasswordError(e instanceof Error ? e.message : "No se pudo actualizar la clave.");
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 md:p-8">
          <h1 className="font-display text-3xl font-semibold text-zinc-50 md:text-4xl">{tx.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Gestiona tu cuenta, revisa tu actividad reciente y mantén tu acceso seguro para seguir en Northrend.
          </p>
        </div>

        {!isAuthReady && <p className="mt-8 text-zinc-400">{tx.loadingSession}</p>}
        {isAuthReady && !accessToken && <p className="mt-8 text-zinc-400">{tx.redirecting}</p>}
        {error && <p className="mt-8 text-red-400">{error}</p>}
        {data && (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500">Usuario</p>
                <p className="mt-2 text-lg font-semibold text-amber-200">{data.username}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500">Estado</p>
                <p className={data.online ? "mt-2 text-lg font-semibold text-emerald-400" : "mt-2 text-lg font-semibold text-zinc-300"}>
                  {data.online ? "En juego" : "Desconectado"}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500">Personajes</p>
                <p className="mt-2 text-lg font-semibold text-sky-200">{data.characterCount}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500">ID de cuenta</p>
                <p className="mt-2 font-mono text-lg text-zinc-200">#{data.accountId}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-950/20 p-4">
              <p className="text-xs uppercase tracking-widest text-amber-300/80">Saldo de donación</p>
              <p className="mt-2 text-2xl font-bold text-amber-200">{data.donationPointsBalance} puntos</p>
              <p className="mt-1 text-sm text-zinc-400">Disponible para usar en la tienda del servidor.</p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section className="rounded-xl border border-white/10 bg-zinc-950/60 p-6">
                <h2 className="font-display text-xl font-semibold text-zinc-100">Información de cuenta</h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-2">
                    <dt className="text-zinc-500">Correo</dt>
                    <dd className="text-right text-zinc-200">{data.email}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-2">
                    <dt className="text-zinc-500">Creada</dt>
                    <dd className="text-zinc-300">{data.joinDate ?? "—"}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-zinc-500">Último acceso</dt>
                    <dd className="text-zinc-300">{data.lastLogin ?? "—"}</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-xl border border-white/10 bg-zinc-950/60 p-6">
                <h2 className="font-display text-xl font-semibold text-zinc-100">Seguridad</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Cambia tu clave periódicamente para proteger tu cuenta del servidor.
                </p>
                <form onSubmit={onChangePassword} className="mt-5 space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-400">Clave actual</label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400">Nueva clave</label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      minLength={8}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400">Confirmar nueva clave</label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength={8}
                      required
                    />
                  </div>
                  {passwordMsg && <p className="text-sm text-emerald-400">{passwordMsg}</p>}
                  {passwordError && <p className="text-sm text-red-400">{passwordError}</p>}
                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="w-full rounded bg-linear-to-r from-amber-600 to-orange-500 py-2.5 text-sm font-semibold text-black disabled:opacity-60"
                  >
                    {savingPassword ? tx.saving : tx.changePassword}
                  </button>
                </form>
              </section>
            </div>

            <section className="mt-6 rounded-xl border border-white/10 bg-zinc-950/60 p-6">
              <h2 className="font-display text-xl font-semibold text-zinc-100">Historial de compras</h2>
              <p className="mt-2 text-sm text-zinc-400">Últimas transacciones de tu cuenta en la tienda.</p>
              {data.recentOrders.length === 0 ? (
                <p className="mt-4 text-sm text-zinc-500">Aún no tienes compras registradas.</p>
              ) : (
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-zinc-500">
                      <tr>
                        <th className="pb-2 pr-4 font-medium">Producto</th>
                        <th className="pb-2 pr-4 font-medium">Puntos</th>
                        <th className="pb-2 pr-4 font-medium">Estado</th>
                        <th className="pb-2 pr-4 font-medium">Fecha</th>
                        <th className="pb-2 font-medium">Orden PayPal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedOrders.map((order) => (
                        <tr key={order.orderId} className="border-t border-white/5 text-zinc-300">
                          <td className="py-3 pr-4">{order.productName}</td>
                          <td className="py-3 pr-4 text-amber-300">{order.donationPoints}</td>
                          <td className="py-3 pr-4">
                            <span
                              className={
                                order.status === "PAID"
                                  ? "text-emerald-400"
                                  : order.status === "FAILED"
                                    ? "text-red-400"
                                    : "text-zinc-400"
                              }
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 pr-4">{new Date(order.createdAt).toLocaleString("es-CL")}</td>
                          <td className="py-3 font-mono text-xs text-zinc-400">{order.paypalOrderId ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.recentOrders.length > ORDERS_PER_PAGE && (
                    <div className="mt-5 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        disabled={ordersPage === 1}
                        onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                        className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                      >
                        Anterior
                      </button>
                      <span className="text-xs text-zinc-400">
                        Página {ordersPage} de {totalOrderPages}
                      </span>
                      <button
                        type="button"
                        disabled={ordersPage === totalOrderPages}
                        onClick={() => setOrdersPage((p) => Math.min(totalOrderPages, p + 1))}
                        className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                      >
                        Siguiente
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          </>
        )}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/tienda"
            className="rounded-md border border-sky-400/40 bg-sky-950/40 px-4 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-900/50"
          >
            {tx.store}
          </Link>
          <Link
            href="/tienda/puntos"
            className="rounded-md border border-amber-400/40 bg-amber-950/30 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-900/40"
          >
            {tx.redeem}
          </Link>
          <Link
            href="/recuperar"
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5"
          >
            {tx.recover}
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
