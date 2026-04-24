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
  imageUrl: string | null;
  priceUsd: number;
  donationPoints: number;
  active: boolean;
};

type ProductListResponse = {
  products: Product[];
};

type RewardProduct = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  imageUrl: string | null;
  deliveryType: string;
  commandTemplate: string | null;
  itemEntry: number | null;
  itemQuantity: number | null;
  costPoints: number;
  active: boolean;
};

type RewardProductListResponse = {
  products: RewardProduct[];
};

type ProductForm = {
  sku: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  priceUsd: string;
  donationPoints: string;
  active: boolean;
};

type RewardForm = {
  sku: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  deliveryType: "SERVICE" | "ITEM";
  commandTemplate: string;
  itemEntry: string;
  itemQuantity: string;
  costPoints: string;
  active: boolean;
};

type CatalogMode = "shop" | "rewards";
const REWARD_ADMIN_ENDPOINT = "/api/v1/admin/rewards/products";
const DASHBOARD_ITEMS_PER_PAGE = 5;

const emptyForm: ProductForm = {
  sku: "",
  name: "",
  description: "",
  category: "Puntos",
  imageUrl: "",
  priceUsd: "4.99",
  donationPoints: "500",
  active: true,
};

const emptyRewardForm: RewardForm = {
  sku: "",
  name: "",
  description: "",
  category: "General",
  imageUrl: "",
  deliveryType: "SERVICE",
  commandTemplate: ".character levelup {character_name} 1",
  itemEntry: "",
  itemQuantity: "1",
  costPoints: "500",
  active: true,
};

export default function DashboardProductsPage() {
  const { accessToken, isAuthReady } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [rewardProducts, setRewardProducts] = useState<RewardProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingRewards, setLoadingRewards] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingReward, setSavingReward] = useState(false);
  const [togglingShopId, setTogglingShopId] = useState<number | null>(null);
  const [togglingRewardId, setTogglingRewardId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingRewardId, setEditingRewardId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [rewardForm, setRewardForm] = useState<RewardForm>(emptyRewardForm);
  const [catalogMode, setCatalogMode] = useState<CatalogMode>("shop");
  const [shopPage, setShopPage] = useState(1);
  const [rewardPage, setRewardPage] = useState(1);

  useEffect(() => {
    if (!isAuthReady) return;
    if (!accessToken) {
      router.replace("/login?next=/dashboard/productos");
      return;
    }
    void Promise.all([
      loadProducts(accessToken),
      loadRewardProducts(accessToken),
    ]);
  }, [isAuthReady, accessToken, router]);

  const title = useMemo(
    () => (editingId ? `Editando producto #${editingId}` : "Crear producto"),
    [editingId],
  );
  const isShopMode = catalogMode === "shop";
  const totalShopPages = Math.max(
    1,
    Math.ceil(products.length / DASHBOARD_ITEMS_PER_PAGE),
  );
  const totalRewardPages = Math.max(
    1,
    Math.ceil(rewardProducts.length / DASHBOARD_ITEMS_PER_PAGE),
  );
  const pagedProducts = products.slice(
    (shopPage - 1) * DASHBOARD_ITEMS_PER_PAGE,
    shopPage * DASHBOARD_ITEMS_PER_PAGE,
  );
  const pagedRewardProducts = rewardProducts.slice(
    (rewardPage - 1) * DASHBOARD_ITEMS_PER_PAGE,
    rewardPage * DASHBOARD_ITEMS_PER_PAGE,
  );

  useEffect(() => {
    if (shopPage > totalShopPages) setShopPage(totalShopPages);
  }, [shopPage, totalShopPages]);

  useEffect(() => {
    if (rewardPage > totalRewardPages) setRewardPage(totalRewardPages);
  }, [rewardPage, totalRewardPages]);

  async function loadProducts(token: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await apiJson<ProductListResponse>(
        "/api/v1/admin/shop/products",
        { token },
      );
      setProducts(data.products);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar productos.");
    } finally {
      setLoading(false);
    }
  }

  async function loadRewardProducts(token: string) {
    setLoadingRewards(true);
    setError(null);
    try {
      const data = await apiJson<RewardProductListResponse>(
        REWARD_ADMIN_ENDPOINT,
        { token },
      );
      setRewardProducts(data.products);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "No se pudo cargar productos de canje.",
      );
    } finally {
      setLoadingRewards(false);
    }
  }

  function setField<K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function setRewardField<K extends keyof RewardForm>(
    field: K,
    value: RewardForm[K],
  ) {
    setRewardForm((prev) => ({ ...prev, [field]: value }));
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      sku: p.sku,
      name: p.name,
      description: p.description ?? "",
      category: p.category,
      imageUrl: p.imageUrl ?? "",
      priceUsd: String(p.priceUsd),
      donationPoints: String(p.donationPoints),
      active: true,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function startRewardEdit(p: RewardProduct) {
    setEditingRewardId(p.id);
    const isItem = p.deliveryType === "ITEM";
    setRewardForm({
      sku: p.sku,
      name: p.name,
      description: p.description ?? "",
      category: p.category,
      imageUrl: p.imageUrl ?? "",
      deliveryType: isItem ? "ITEM" : "SERVICE",
      commandTemplate: isItem ? "" : (p.commandTemplate ?? ""),
      itemEntry: isItem && p.itemEntry != null ? String(p.itemEntry) : "",
      itemQuantity:
        isItem && p.itemQuantity != null ? String(p.itemQuantity) : "1",
      costPoints: String(p.costPoints),
      active: p.active,
    });
  }

  function resetRewardForm() {
    setEditingRewardId(null);
    setRewardForm(emptyRewardForm);
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
      imageUrl: form.imageUrl.trim(),
      priceUsd: Number(form.priceUsd),
      donationPoints: Number(form.donationPoints),
      active: form.active,
    };

    if (!payload.imageUrl) {
      setError("La imagen es obligatoria.");
      setSaving(false);
      return;
    }

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

  async function onRewardSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accessToken) return;
    setSavingReward(true);
    setError(null);
    setMsg(null);
    const isItem = rewardForm.deliveryType === "ITEM";
    const payload = {
      sku: rewardForm.sku.trim(),
      name: rewardForm.name.trim(),
      description: rewardForm.description.trim() || null,
      category: rewardForm.category.trim(),
      imageUrl: rewardForm.imageUrl.trim(),
      deliveryType: rewardForm.deliveryType,
      commandTemplate: isItem ? null : rewardForm.commandTemplate.trim(),
      itemEntry: isItem ? Number(rewardForm.itemEntry) : null,
      itemQuantity: isItem ? Number(rewardForm.itemQuantity) : null,
      costPoints: Number(rewardForm.costPoints),
      active: rewardForm.active,
    };

    if (!payload.imageUrl) {
      setError("La imagen es obligatoria.");
      setSavingReward(false);
      return;
    }

    if (!Number.isFinite(payload.costPoints) || payload.costPoints <= 0) {
      setError("El costo en puntos debe ser mayor a 0.");
      setSavingReward(false);
      return;
    }

    if (
      isItem &&
      (!Number.isFinite(payload.itemEntry!) ||
        !Number.isFinite(payload.itemQuantity!) ||
        payload.itemQuantity! <= 0)
    ) {
      setError("Para ITEM debes definir itemEntry e itemQuantity válidos.");
      setSavingReward(false);
      return;
    }

    if (!isItem && !payload.commandTemplate) {
      setError("Para SERVICE debes definir commandTemplate.");
      setSavingReward(false);
      return;
    }

    try {
      if (editingRewardId) {
        await apiJson(`${REWARD_ADMIN_ENDPOINT}/${editingRewardId}`, {
          method: "PUT",
          token: accessToken,
          body: JSON.stringify(payload),
        });
        setMsg("Producto de canje actualizado.");
      } else {
        await apiJson(REWARD_ADMIN_ENDPOINT, {
          method: "POST",
          token: accessToken,
          body: JSON.stringify(payload),
        });
        setMsg("Producto de canje creado.");
      }
      resetRewardForm();
      await loadRewardProducts(accessToken);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "No se pudo guardar el producto de canje.",
      );
    } finally {
      setSavingReward(false);
    }
  }

  async function toggleShopActive(product: Product) {
    if (!accessToken) return;
    setTogglingShopId(product.id);
    setError(null);
    setMsg(null);
    try {
      await apiJson(`/api/v1/admin/shop/products/${product.id}/active`, {
        method: "PATCH",
        token: accessToken,
        body: JSON.stringify({ active: !product.active }),
      });
      setMsg(
        product.active ? "Producto deshabilitado." : "Producto habilitado.",
      );
      await loadProducts(accessToken);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "No se pudo actualizar estado del producto.",
      );
    } finally {
      setTogglingShopId(null);
    }
  }

  async function toggleRewardActive(product: RewardProduct) {
    if (!accessToken) return;
    setTogglingRewardId(product.id);
    setError(null);
    setMsg(null);
    try {
      await apiJson(`${REWARD_ADMIN_ENDPOINT}/${product.id}/active`, {
        method: "PATCH",
        token: accessToken,
        body: JSON.stringify({ active: !product.active }),
      });
      setMsg(product.active ? "Canje deshabilitado." : "Canje habilitado.");
      await loadRewardProducts(accessToken);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "No se pudo actualizar estado del canje.",
      );
    } finally {
      setTogglingRewardId(null);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-display text-3xl font-semibold text-zinc-50">
          Dashboard de productos
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Gestiona catálogo de tienda: crear, editar y configurar productos de
          donación.
        </p>

        <section className="mt-8 rounded-xl border border-white/10 bg-zinc-950/60 p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-400">
              Elige el tipo de catálogo que quieres administrar.
            </p>
            <div className="inline-flex rounded-lg border border-white/10 bg-black/40 p-1">
              <button
                type="button"
                onClick={() => setCatalogMode("shop")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  isShopMode
                    ? "bg-amber-500/20 text-amber-200"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                Tienda compra ({products.length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogMode("rewards")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  !isShopMode
                    ? "bg-sky-500/20 text-sky-200"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                Tienda canje ({rewardProducts.length})
              </button>
            </div>
          </div>
          {msg && <p className="mt-3 text-sm text-emerald-400">{msg}</p>}
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr,1.9fr]">
          <section className="rounded-xl border border-white/10 bg-zinc-950/60 p-5">
            {isShopMode ? (
              <>
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
                  <input
                    value={form.imageUrl}
                    onChange={(e) => setField("imageUrl", e.target.value)}
                    placeholder="URL de imagen"
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
                      onChange={(e) =>
                        setField("donationPoints", e.target.value)
                      }
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
                      {saving
                        ? "Guardando..."
                        : editingId
                          ? "Actualizar"
                          : "Crear"}
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
              </>
            ) : (
              <>
                <h2 className="font-display text-xl text-zinc-100">
                  Catálogo de canje
                </h2>
                <p className="mt-2 text-xs text-zinc-500">
                  Estos productos se leen desde{" "}
                  <code>/api/v1/rewards/products</code>.
                </p>
                <form onSubmit={onRewardSubmit} className="mt-4 space-y-3">
                  <input
                    value={rewardForm.sku}
                    onChange={(e) => setRewardField("sku", e.target.value)}
                    placeholder="SKU"
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  />
                  <input
                    value={rewardForm.name}
                    onChange={(e) => setRewardField("name", e.target.value)}
                    placeholder="Nombre"
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  />
                  <input
                    value={rewardForm.category}
                    onChange={(e) => setRewardField("category", e.target.value)}
                    placeholder="Categoría (General, Monturas, Servicios...)"
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  />
                  <input
                    value={rewardForm.imageUrl}
                    onChange={(e) => setRewardField("imageUrl", e.target.value)}
                    placeholder="URL de imagen"
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  />
                  <select
                    value={rewardForm.deliveryType}
                    onChange={(e) =>
                      setRewardField(
                        "deliveryType",
                        e.target.value as "SERVICE" | "ITEM",
                      )
                    }
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  >
                    <option value="SERVICE">
                      SERVICE (usa commandTemplate)
                    </option>
                    <option value="ITEM">
                      ITEM (usa itemEntry/itemQuantity)
                    </option>
                  </select>
                  <textarea
                    value={rewardForm.description}
                    onChange={(e) =>
                      setRewardField("description", e.target.value)
                    }
                    placeholder="Descripción"
                    className="h-24 w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  />
                  {rewardForm.deliveryType === "SERVICE" ? (
                    <input
                      value={rewardForm.commandTemplate}
                      onChange={(e) =>
                        setRewardField("commandTemplate", e.target.value)
                      }
                      placeholder="Command template (usa {character_name})"
                      className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                      required
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        min="1"
                        value={rewardForm.itemEntry}
                        onChange={(e) =>
                          setRewardField("itemEntry", e.target.value)
                        }
                        placeholder="Item Entry"
                        className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                        required
                      />
                      <input
                        type="number"
                        min="1"
                        value={rewardForm.itemQuantity}
                        onChange={(e) =>
                          setRewardField("itemQuantity", e.target.value)
                        }
                        placeholder="Item Quantity"
                        className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                        required
                      />
                    </div>
                  )}
                  <input
                    type="number"
                    min="1"
                    value={rewardForm.costPoints}
                    onChange={(e) =>
                      setRewardField("costPoints", e.target.value)
                    }
                    placeholder="Costo en puntos"
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  />
                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={rewardForm.active}
                      onChange={(e) =>
                        setRewardField("active", e.target.checked)
                      }
                    />
                    Activo
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={savingReward}
                      className="rounded bg-linear-to-r from-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
                    >
                      {savingReward
                        ? "Guardando..."
                        : editingRewardId
                          ? "Actualizar canje"
                          : "Crear canje"}
                    </button>
                    {editingRewardId && (
                      <button
                        type="button"
                        onClick={resetRewardForm}
                        className="rounded border border-white/20 px-4 py-2 text-sm text-zinc-200"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </section>

          <section className="rounded-xl border border-white/10 bg-zinc-950/60 p-5">
            <h2 className="font-display text-xl text-zinc-100">
              {isShopMode ? "Productos existentes" : "Canjes existentes"}
            </h2>
            {isShopMode ? (
              loading ? (
                <p className="mt-4 text-zinc-400">Cargando...</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-zinc-500">
                      <tr>
                        <th className="pb-2 pr-4">SKU</th>
                        <th className="pb-2 pr-4">Nombre</th>
                        <th className="pb-2 pr-4">Categoría</th>
                        <th className="pb-2 pr-4">Estado</th>
                        <th className="pb-2 pr-4">USD</th>
                        <th className="pb-2 pr-4">Puntos</th>
                        <th className="pb-2">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedProducts.map((p) => (
                        <tr
                          key={p.id}
                          className="border-t border-white/5 text-zinc-300"
                        >
                          <td className="py-3 pr-4 font-mono text-xs">
                            {p.sku}
                          </td>
                          <td className="py-3 pr-4">{p.name}</td>
                          <td className="py-3 pr-4">{p.category}</td>
                          <td
                            className={`py-3 pr-4 text-xs ${p.active ? "text-emerald-300" : "text-zinc-500"}`}
                          >
                            {p.active ? "Activo" : "Inactivo"}
                          </td>
                          <td className="py-3 pr-4">${p.priceUsd}</td>
                          <td className="py-3 pr-4 text-amber-300">
                            {p.donationPoints}
                          </td>
                          <td className="py-3 space-x-2">
                            <button
                              type="button"
                              onClick={() => startEdit(p)}
                              className="rounded border border-sky-400/40 px-3 py-1 text-xs text-sky-300"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              disabled={togglingShopId === p.id}
                              onClick={() => toggleShopActive(p)}
                              className={`rounded border px-3 py-1 text-xs ${
                                p.active
                                  ? "border-red-400/40 text-red-300"
                                  : "border-emerald-400/40 text-emerald-300"
                              } disabled:opacity-50`}
                            >
                              {togglingShopId === p.id
                                ? "..."
                                : p.active
                                  ? "Desactivar"
                                  : "Activar"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {products.length === 0 && (
                    <p className="pt-4 text-sm text-zinc-500">
                      No hay productos creados.
                    </p>
                  )}
                  {products.length > DASHBOARD_ITEMS_PER_PAGE && (
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        disabled={shopPage === 1}
                        onClick={() => setShopPage((p) => Math.max(1, p - 1))}
                        className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                      >
                        Anterior
                      </button>
                      <p className="text-xs text-zinc-400">
                        Página {shopPage} de {totalShopPages}
                      </p>
                      <button
                        type="button"
                        disabled={shopPage === totalShopPages}
                        onClick={() =>
                          setShopPage((p) => Math.min(totalShopPages, p + 1))
                        }
                        className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                      >
                        Siguiente
                      </button>
                    </div>
                  )}
                </div>
              )
            ) : loadingRewards ? (
              <p className="mt-4 text-zinc-400">Cargando...</p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="pb-2 pr-4">SKU</th>
                      <th className="pb-2 pr-4">Nombre</th>
                      <th className="pb-2 pr-4">Categoría</th>
                      <th className="pb-2 pr-4">Estado</th>
                      <th className="pb-2 pr-4">Costo</th>
                      <th className="pb-2">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedRewardProducts.map((p) => (
                      <tr
                        key={p.id}
                        className="border-t border-white/5 text-zinc-300"
                      >
                        <td className="py-3 pr-4 font-mono text-xs">{p.sku}</td>
                        <td className="py-3 pr-4">{p.name}</td>
                        <td className="py-3 pr-4">{p.category}</td>
                        <td
                          className={`py-3 pr-4 text-xs ${p.active ? "text-emerald-300" : "text-zinc-500"}`}
                        >
                          {p.active ? "Activo" : "Inactivo"}
                        </td>
                        <td className="py-3 pr-4 text-amber-300">
                          {p.costPoints} pts
                        </td>
                        <td className="py-3 space-x-2">
                          <button
                            type="button"
                            onClick={() => startRewardEdit(p)}
                            className="rounded border border-sky-400/40 px-3 py-1 text-xs text-sky-300"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            disabled={togglingRewardId === p.id}
                            onClick={() => toggleRewardActive(p)}
                            className={`rounded border px-3 py-1 text-xs ${
                              p.active
                                ? "border-red-400/40 text-red-300"
                                : "border-emerald-400/40 text-emerald-300"
                            } disabled:opacity-50`}
                          >
                            {togglingRewardId === p.id
                              ? "..."
                              : p.active
                                ? "Desactivar"
                                : "Activar"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rewardProducts.length === 0 && (
                  <p className="pt-4 text-sm text-zinc-500">
                    No hay productos de canje creados.
                  </p>
                )}
                {rewardProducts.length > DASHBOARD_ITEMS_PER_PAGE && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled={rewardPage === 1}
                      onClick={() => setRewardPage((p) => Math.max(1, p - 1))}
                      className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                    >
                      Anterior
                    </button>
                    <p className="text-xs text-zinc-400">
                      Página {rewardPage} de {totalRewardPages}
                    </p>
                    <button
                      type="button"
                      disabled={rewardPage === totalRewardPages}
                      onClick={() =>
                        setRewardPage((p) => Math.min(totalRewardPages, p + 1))
                      }
                      className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
