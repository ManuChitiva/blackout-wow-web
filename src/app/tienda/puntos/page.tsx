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

type CharacterOption = {
  id: number;
  name: string;
  level: number;
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
  const [characters, setCharacters] = useState<CharacterOption[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

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
        const chars = await apiJson<CharacterOption[]>("/api/v1/me/characters", {
          token: accessToken,
        });
        setProducts(data.products);
        setPointsBalance(data.pointsBalance);
        setCharacters(chars);
        setSelectedCharacterId(chars.length > 0 ? chars[0].id : null);
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
    if (!selectedCharacterId) {
      setError("Selecciona un personaje destino para el canje.");
      return;
    }
    setBusyId(rewardProductId);
    setError(null);
    setMsg(null);
    try {
      const data = await apiJson<RedeemResponse>("/api/v1/rewards/redeem", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ rewardProductId, characterId: selectedCharacterId }),
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
            Selecciona un personaje destino, busca la recompensa y canjea tus puntos en segundos.
          </p>
          <div className="mt-5 grid gap-3 text-xs text-zinc-300 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-amber-300">Paso 1:</span> Elige personaje
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-amber-300">Paso 2:</span> Filtra y busca recompensa
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-amber-300">Paso 3:</span> Canjea con tus puntos
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-amber-400/30 bg-amber-950/20 p-4">
            <p className="text-xs uppercase tracking-widest text-amber-300/80">Saldo disponible</p>
            <p className="mt-1 text-2xl font-bold text-amber-200">{pointsBalance} puntos</p>
            <p className="mt-1 text-sm text-zinc-400">Solo podrás canjear recompensas con saldo suficiente.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Personaje destino del canje</p>
            <div className="mt-2">
              <select
                value={selectedCharacterId ?? ""}
                onChange={(e) => setSelectedCharacterId(e.target.value ? Number(e.target.value) : null)}
                className="w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-amber-500/60"
              >
                {characters.length === 0 && <option value="">Sin personajes disponibles</option>}
                {characters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (Lvl {c.level})
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              El item o servicio se enviará al personaje seleccionado.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-zinc-950/60 p-4 md:grid-cols-[2fr,1fr]">
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
        {!error && (
          <p className="mt-4 text-sm text-zinc-500">
            Mostrando <span className="text-zinc-300">{filtered.length}</span> recompensas para{" "}
            <span className="text-zinc-300">{category}</span>.
          </p>
        )}

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
                  {!canRedeem && <p className="mt-2 text-xs text-red-300/80">Te faltan puntos para este canje.</p>}
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
