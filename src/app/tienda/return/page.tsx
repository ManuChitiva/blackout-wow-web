"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";
import { apiJson } from "@/lib/api";

function ReturnInner() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : i18n.language?.startsWith("pt") ? "pt" : "es";
  const tx = {
    es: { loading: "Confirmando pago con PayPal…", ok: "¡Pago registrado correctamente!", refresh: "Refrescar estado", myAccount: "Ver mi cuenta", backStore: "Volver a tienda", retry: "Reintentar", loadingPage: "Cargando…" },
    en: { loading: "Confirming PayPal payment…", ok: "Payment registered successfully!", refresh: "Refresh status", myAccount: "View my account", backStore: "Back to store", retry: "Retry", loadingPage: "Loading…" },
    pt: { loading: "Confirmando pagamento do PayPal…", ok: "Pagamento registrado com sucesso!", refresh: "Atualizar status", myAccount: "Ver minha conta", backStore: "Voltar à loja", retry: "Tentar novamente", loadingPage: "Carregando…" },
  }[lang];
  const searchParams = useSearchParams();
  const router = useRouter();
  const { accessToken } = useAuth();
  const [status, setStatus] = useState<"working" | "ok" | "err">("working");
  const [msg, setMsg] = useState<string | null>(null);
  const [paypalToken, setPaypalToken] = useState<string | null>(null);
  const [purchaseSummary, setPurchaseSummary] = useState<{
    productName: string;
    donationPoints: number;
    status: string;
    createdAt: string;
  } | null>(null);

  const confirmPayment = useCallback(
    async (token: string) => {
      if (!accessToken) {
        router.replace(`/login?next=${encodeURIComponent(`/tienda/return?token=${token}`)}`);
        return;
      }
      setStatus("working");
      setMsg(null);
      try {
        await apiJson("/api/v1/shop/orders/capture", {
          method: "POST",
          token: accessToken,
          body: JSON.stringify({ paypalOrderId: token }),
        });

        const account = await apiJson<{
          recentOrders: Array<{
            productName: string;
            donationPoints: number;
            status: string;
            paypalOrderId: string | null;
            createdAt: string;
          }>;
        }>("/api/v1/me/game-account", {
          token: accessToken,
        });
        const matched = account.recentOrders.find((o) => o.paypalOrderId === token) ?? null;
        if (matched) {
          setPurchaseSummary({
            productName: matched.productName,
            donationPoints: matched.donationPoints,
            status: matched.status,
            createdAt: matched.createdAt,
          });
        } else {
          setPurchaseSummary(null);
        }
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("blackout_pending_paypal");
        }
        setStatus("ok");
      } catch (e) {
        setStatus("err");
        setMsg(e instanceof Error ? e.message : "Error al capturar el pago");
      }
    },
    [accessToken, router]
  );

  useEffect(() => {
    const token =
      searchParams.get("token") ??
      (typeof window !== "undefined" ? sessionStorage.getItem("blackout_pending_paypal") : null);
    setPaypalToken(token);
    if (!token) {
      setStatus("err");
      setMsg("Falta el identificador de pedido de PayPal.");
      return;
    }
    void confirmPayment(token);
  }, [searchParams, confirmPayment]);

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 text-center md:p-8">
        {status === "working" && <p className="text-zinc-300">{tx.loading}</p>}
      {status === "ok" && (
        <>
          <p className="text-lg text-emerald-400">{tx.ok}</p>
          <p className="mt-2 text-sm text-zinc-400">Gracias por tu compra y por apoyar la comunidad BLACKOUT WoW.</p>
          {purchaseSummary ? (
            <div className="mx-auto mt-6 max-w-md rounded-lg border border-emerald-400/30 bg-emerald-950/20 px-4 py-3 text-left">
              <p className="text-xs uppercase tracking-wider text-emerald-300/80">Resumen de compra</p>
              <p className="mt-2 text-sm text-zinc-200">{purchaseSummary.productName}</p>
              <p className="mt-1 text-sm text-amber-300">+{purchaseSummary.donationPoints} puntos</p>
              <p className="mt-1 text-xs text-zinc-400">
                Estado: <span className="text-zinc-200">{purchaseSummary.status}</span>
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-zinc-500">Tu compra fue confirmada. El detalle estará en tu cuenta.</p>
          )}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => (paypalToken ? void confirmPayment(paypalToken) : window.location.reload())}
              className="rounded border border-white/20 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5"
            >
              {tx.refresh}
            </button>
            <Link href="/cuenta" className="text-amber-400 hover:underline">
              {tx.myAccount}
            </Link>
            <Link href="/tienda" className="text-sky-300 hover:underline">
              {tx.backStore}
            </Link>
          </div>
        </>
      )}
      {status === "err" && (
        <>
          <div className="mx-auto max-w-md rounded-lg border border-red-400/30 bg-red-950/20 px-4 py-3 text-left">
            <p className="text-sm text-red-300">No se pudo completar la captura.</p>
            <p className="mt-2 wrap-break-word text-xs leading-relaxed text-red-200/90">
              {msg ?? "Error desconocido."}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              disabled={!paypalToken}
              onClick={() => paypalToken && void confirmPayment(paypalToken)}
              className="rounded bg-linear-to-r from-amber-600 to-orange-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              {tx.retry}
            </button>
            <Link href="/tienda" className="text-sky-300 hover:underline">
              {tx.backStore}
            </Link>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default function ShopReturnPage() {
  return (
    <SiteShell>
      <Suspense fallback={<p className="py-20 text-center text-zinc-400">Loading…</p>}>
        <ReturnInner />
      </Suspense>
    </SiteShell>
  );
}
