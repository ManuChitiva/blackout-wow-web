"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";
import { apiJson } from "@/lib/api";

type RewardProduct = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  costPoints: number;
};

type RewardCatalogResponse = {
  products: RewardProduct[];
  pointsBalance: number;
};

type RedeemResponse = {
  message: string;
  pointsBalance: number;
};

function imageForReward(category: string) {
  const c = category.toLowerCase();
  if (c.includes("monturas")) return "/images/store/reward-mounts.svg";
  if (c.includes("servicios")) return "/images/store/reward-services.svg";
  return "/images/store/reward-general.svg";
}

export default function RewardShopPage() {
  const ITEMS_PER_PAGE = 6;
  const { accessToken, isAuthReady } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<RewardProduct[]>([]);
  const [pointsBalance, setPointsBalance] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isAuthReady) return;
    if (!accessToken) {
      router.replace("/login?next=/tienda/puntos");
      return;
    }
    (async () => {
      try {
        const data = await apiJson<RewardCatalogResponse>("/api/v1/rewards/products", {
          token: accessToken,
        });
        setProducts(data.products);
        setPointsBalance(data.pointsBalance);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      }
    })();
  }, [isAuthReady, accessToken, router]);

  const categories = useMemo(() => {
    const all = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ["Todas", ...all];
  }, [products]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      const byCategory = category === "Todas" || p.category === category;
      const bySearch =
        term.length === 0 ||
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        (p.description ?? "").toLowerCase().includes(term);
      return byCategory && bySearch;
    });
  }, [products, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  async function redeem(rewardProductId: number) {
    if (!accessToken) return;
    setBusyId(rewardProductId);
    setError(null);
    setMsg(null);
    try {
      const data = await apiJson<RedeemResponse>("/api/v1/rewards/redeem", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ rewardProductId }),
      });
      setPointsBalance(data.pointsBalance);
      setMsg(data.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo completar el canje.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 md:p-8">
          <h1 className="font-display text-3xl font-semibold text-zinc-50">Tienda de canje</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Usa tus puntos para desbloquear servicios y recompensas exclusivas del servidor.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-950/20 p-4">
          <p className="text-xs uppercase tracking-widest text-amber-300/80">Saldo disponible</p>
          <p className="mt-1 text-2xl font-bold text-amber-200">{pointsBalance} puntos</p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-[2fr,1fr]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, SKU o descripción"
            className="w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {msg && <p className="mt-6 text-emerald-400">{msg}</p>}
        {error && <p className="mt-6 text-red-400">{error}</p>}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pageItems.map((p) => {
            const canRedeem = pointsBalance >= p.costPoints;
            return (
              <div key={p.id} className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/70">
                <div className="relative h-44 w-full">
                  <Image src={imageForReward(p.category)} alt={p.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />
                  <p className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-xs uppercase tracking-wider text-zinc-100">
                    {p.category}
                  </p>
                </div>
                <div className="flex h-[250px] flex-col p-5">
                  <h2 className="font-display text-lg font-semibold text-sky-200">{p.name}</h2>
                  <p className="mt-2 flex-1 text-sm text-zinc-400">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-amber-300">{p.costPoints} puntos</p>
                    <button
                      type="button"
                      disabled={busyId === p.id || !canRedeem}
                      onClick={() => redeem(p.id)}
                      className="rounded bg-linear-to-r from-amber-600 to-orange-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
                    >
                      {busyId === p.id ? "Canjeando..." : canRedeem ? "Canjear" : "Sin puntos"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!error && filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-zinc-500">No hay recompensas para ese filtro.</p>
        )}
        {filtered.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded border border-white/15 px-3 py-1.5 text-sm text-zinc-200 disabled:opacity-50"
            >
              Anterior
            </button>
            <p className="text-sm text-zinc-400">
              Página {page} de {totalPages}
            </p>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded border border-white/15 px-3 py-1.5 text-sm text-zinc-200 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}

        <div className="mt-10">
          <Link href="/tienda" className="text-sky-300 hover:underline">
            Volver a tienda de compra
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
