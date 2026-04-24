"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";
import { apiJson } from "@/lib/api";

type Product = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  imageUrl: string | null;
  priceUsd: number;
  donationPoints: number;
};

type ProductListResponse = { products: Product[] };

function imageForProduct(category: string) {
  if (category.toLowerCase().includes("puntos")) return "/images/store/donation-points.svg";
  return "/images/store/donation-points.svg";
}

export default function ShopPage() {
  const ITEMS_PER_PAGE = 6;
  const { accessToken } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const r = await apiJson<ProductListResponse>("/api/v1/shop/products");
        setProducts(r.products);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      }
    })();
  }, []);

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

  async function buy(productId: number) {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    setBusyId(productId);
    setError(null);
    try {
      const r = await apiJson<{ approvalUrl: string; paypalOrderId: string }>("/api/v1/shop/orders", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ productId }),
      });
      if (typeof window !== "undefined" && r.paypalOrderId) {
        sessionStorage.setItem("blackout_pending_paypal", r.paypalOrderId);
      }
      if (typeof window !== "undefined") {
        window.open(r.approvalUrl, "_blank", "noopener,noreferrer");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 md:p-8">
          <h1 className="font-display text-3xl font-semibold text-zinc-50">Tienda de donación</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Elige tu paquete de puntos y accede a ventajas premium dentro del servidor.
          </p>
        </div>
        <p className="mt-3 text-sm text-zinc-400">
          ¿Ya tienes puntos?{" "}
          <Link href="/tienda/puntos" className="text-amber-300 hover:underline">
            Ir a la tienda de canje
          </Link>
          .
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-[2fr,1fr]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, SKU o descripción"
            className="w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-sky-500/60"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded border border-white/15 bg-black/50 px-3 py-2 text-zinc-100 outline-none focus:border-sky-500/60"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="mt-6 text-red-400">{error}</p>}
        {!error && filtered.length > 0 && (
          <p className="mt-4 text-sm text-zinc-500">
            Mostrando <span className="text-zinc-300">{filtered.length}</span> productos.
          </p>
        )}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pageItems.map((p) => (
            <div
              key={p.id}
              className="metal-border overflow-hidden rounded-lg border border-white/10 bg-zinc-950/70"
            >
              <div className="relative h-44 w-full">
                <Image src={p.imageUrl || imageForProduct(p.category)} alt={p.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />
                <p className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-xs uppercase tracking-wider text-zinc-100">
                  {p.category}
                </p>
              </div>
              <div className="flex h-[250px] flex-col p-5">
                <h2 className="font-display line-clamp-2 wrap-break-word text-lg font-semibold text-amber-300">{p.name}</h2>
                <p className="mt-2 flex-1 line-clamp-3 wrap-break-word text-sm text-zinc-400">{p.description}</p>
                <p className="mt-3 text-sm font-semibold text-amber-300">{p.donationPoints} puntos</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-bold text-sky-200">${p.priceUsd}</p>
                  <button
                    type="button"
                    disabled={busyId === p.id}
                    onClick={() => buy(p.id)}
                    className="rounded bg-linear-to-r from-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:from-sky-500 hover:to-cyan-400 disabled:opacity-50"
                  >
                    {busyId === p.id ? "Redirigiendo…" : "Comprar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!error && filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-zinc-500">No hay productos para ese filtro.</p>
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
        {!accessToken && (
          <p className="mt-10 text-center text-sm text-zinc-500">
            <Link href="/login" className="text-amber-400 hover:underline">
              Inicia sesión
            </Link>{" "}
            para comprar.
          </p>
        )}
      </div>
    </SiteShell>
  );
}
