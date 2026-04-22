"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";
import { apiJson } from "@/lib/api";

function ReturnInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { accessToken } = useAuth();
  const [status, setStatus] = useState<"working" | "ok" | "err">("working");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const token =
      searchParams.get("token") ??
      (typeof window !== "undefined" ? sessionStorage.getItem("blackout_pending_paypal") : null);
    if (token && typeof window !== "undefined") {
      sessionStorage.removeItem("blackout_pending_paypal");
    }
    if (!token) {
      setStatus("err");
      setMsg("Falta el identificador de pedido de PayPal.");
      return;
    }
    if (!accessToken) {
      router.replace("/login?next=/tienda/return");
      return;
    }
    (async () => {
      try {
        await apiJson("/api/v1/shop/orders/capture", {
          method: "POST",
          token: accessToken,
          body: JSON.stringify({ paypalOrderId: token }),
        });
        setStatus("ok");
      } catch (e) {
        setStatus("err");
        setMsg(e instanceof Error ? e.message : "Error al capturar el pago");
      }
    })();
  }, [searchParams, accessToken, router]);

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      {status === "working" && <p className="text-zinc-300">Confirmando pago con PayPal…</p>}
      {status === "ok" && (
        <>
          <p className="text-lg text-emerald-400">¡Pago registrado correctamente!</p>
          <p className="mt-4 text-sm text-zinc-500">
            En producción puedes acreditar monedas vía SOAP o base de datos desde el backend.
          </p>
          <Link href="/cuenta" className="mt-8 inline-block text-amber-400 hover:underline">
            Volver a mi cuenta
          </Link>
        </>
      )}
      {status === "err" && (
        <>
          <p className="text-red-400">{msg ?? "No se pudo completar la captura."}</p>
          <Link href="/tienda" className="mt-8 inline-block text-sky-300 hover:underline">
            Volver a la tienda
          </Link>
        </>
      )}
    </div>
  );
}

export default function ShopReturnPage() {
  return (
    <SiteShell>
      <Suspense fallback={<p className="py-20 text-center text-zinc-400">Cargando…</p>}>
        <ReturnInner />
      </Suspense>
    </SiteShell>
  );
}
