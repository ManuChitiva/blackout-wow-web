"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { useAuth } from "@/context/AuthContext";
import { apiJson } from "@/lib/api";

type Product = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  priceUsd: number;
  donationPoints: number;
};

type ProductListResponse = {
  products: Product[];
};

type ProductForm = {
  sku: string;
  name: string;
  description: string;
  category: string;
  priceUsd: string;
  donationPoints: string;
  active: boolean;
};

const emptyForm: ProductForm = {
  sku: "",
  name: "",
  description: "",
  category: "Puntos",
  priceUsd: "4.99",
  donationPoints: "500",
  active: true,
};

export default function DashboardProductsPage() {
  const { accessToken, isAuthReady } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  useEffect(() => {
    if (!isAuthReady) return;
    if (!accessToken) {
      router.replace("/login?next=/dashboard/productos");
      return;
    }
    void loadProducts(accessToken);
  }, [isAuthReady, accessToken, router]);

  const title = useMemo(
    () => (editingId ? `Editando producto #${editingId}` : "Crear producto"),
    [editingId]
  );

  async function loadProducts(token: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await apiJson<ProductListResponse>("/api/v1/admin/shop/products", { token });
      setProducts(data.products);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar productos.");
    } finally {
      setLoading(false);
    }
  }

  function setField<K extends keyof ProductForm>(field: K, value: ProductForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      sku: p.sku,
      name: p.name,
      description: p.description ?? "",
      category: p.category,
      priceUsd: String(p.priceUsd),
      donationPoints: String(p.donationPoints),
      active: true,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accessToken) return;
    setSaving(true);
    setError(null);
    setMsg(null);
    const payload = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      description: form.description.trim() || null,
      category: form.category.trim(),
      priceUsd: Number(form.priceUsd),
      donationPoints: Number(form.donationPoints),
      active: form.active,
    };

    try {
      if (editingId) {
        await apiJson(`/api/v1/admin/shop/products/${editingId}`, {
          method: "PUT",
          token: accessToken,
          body: JSON.stringify(payload),
        });
        setMsg("Producto actualizado.");
      } else {
        await apiJson("/api/v1/admin/shop/products", {
          method: "POST",
          token: accessToken,
          body: JSON.stringify(payload),
        });
        setMsg("Producto creado.");
      }
      resetForm();
      await loadProducts(accessToken);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-display text-3xl font-semibold text-zinc-50">Dashboard de productos</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Gestiona catálogo de tienda: crear, editar y configurar productos de donación.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr,1.9fr]">
          <section className="rounded-xl border border-white/10 bg-zinc-950/60 p-5">
            <h2 className="font-display text-xl text-zinc-100">{title}</h2>
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input
                value={form.sku}
                onChange={(e) => setField("sku", e.target.value)}
                placeholder="SKU"
                className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                required
              />
              <input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Nombre"
                className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                required
              />
              <input
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                placeholder="Categoría"
                className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                required
              />
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Descripción"
                className="h-24 w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={form.priceUsd}
                  onChange={(e) => setField("priceUsd", e.target.value)}
                  placeholder="Precio USD"
                  className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  required
                />
                <input
                  type="number"
                  value={form.donationPoints}
                  onChange={(e) => setField("donationPoints", e.target.value)}
                  placeholder="Puntos"
                  className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  required
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setField("active", e.target.checked)}
                />
                Activo
              </label>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded bg-linear-to-r from-amber-600 to-orange-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
                >
                  {saving ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded border border-white/20 px-4 py-2 text-sm text-zinc-200"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="rounded-xl border border-white/10 bg-zinc-950/60 p-5">
            <h2 className="font-display text-xl text-zinc-100">Productos existentes</h2>
            {loading && <p className="mt-4 text-zinc-400">Cargando...</p>}
            {!loading && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="pb-2 pr-4">SKU</th>
                      <th className="pb-2 pr-4">Nombre</th>
                      <th className="pb-2 pr-4">Categoría</th>
                      <th className="pb-2 pr-4">USD</th>
                      <th className="pb-2 pr-4">Puntos</th>
                      <th className="pb-2">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-t border-white/5 text-zinc-300">
                        <td className="py-3 pr-4 font-mono text-xs">{p.sku}</td>
                        <td className="py-3 pr-4">{p.name}</td>
                        <td className="py-3 pr-4">{p.category}</td>
                        <td className="py-3 pr-4">${p.priceUsd}</td>
                        <td className="py-3 pr-4 text-amber-300">{p.donationPoints}</td>
                        <td className="py-3">
                          <button
                            type="button"
                            onClick={() => startEdit(p)}
                            className="rounded border border-sky-400/40 px-3 py-1 text-xs text-sky-300"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {msg && <p className="mt-4 text-emerald-400">{msg}</p>}
            {error && <p className="mt-4 text-red-400">{error}</p>}
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
