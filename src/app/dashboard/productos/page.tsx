"use client";
import {useInterfaceCopy} from "@/lib/use-interface-copy";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
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

type OrderTrace = {
  id: number;
  portalUserId: number;
  portalUsername: string | null;
  productId: number;
  productName: string | null;
  paypalOrderId: string | null;
  creditedPoints: number;
  status: string;
  createdAt: string;
  lastCheckedAt: string | null;
  checkAttempts: number;
};

type OrderTraceListResponse = {
  orders: OrderTrace[];
};

type RewardRedemptionTrace = {
  id: number;
  portalUserId: number;
  portalUsername: string | null;
  rewardProductId: number;
  rewardName: string | null;
  costPoints: number;
  deliveryType: string;
  status: string;
  deliveryAttempts: number;
  pointsDebited: boolean;
  lastError: string | null;
  createdAt: string;
  lastAttemptAt: string | null;
  deliveredAt: string | null;
};

type RewardRedemptionTraceListResponse = {
  redemptions: RewardRedemptionTrace[];
};

type AnalyticsOverview = {
  portalUsers: number;
  gameAccounts: number;
  onlineAccounts: number;
  totalCharacters: number;
  shopOrdersTotal: number;
  shopOrdersPaid: number;
  shopOrdersPending: number;
  shopOrdersFailed: number;
  redemptionsTotal: number;
  redemptionsCompleted: number;
  redemptionsPending: number;
  redemptionsFailed: number;
  totalWalletPoints: string;
};

function formatBigIntGrouped(value: string): string {
  const digits = value.replace(/[^\d-]/g, "");
  if (!digits) return "0";
  const negative = digits.startsWith("-");
  const abs = negative ? digits.slice(1) : digits;
  const grouped = abs.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${negative ? "-" : ""}${grouped}`;
}

function formatBigIntCompact(value: string): string {
  const digits = value.replace(/[^\d-]/g, "");
  if (!digits || digits === "-") return "0";
  const n = BigInt(digits);
  const zero = BigInt(0);
  const ten = BigInt(10);
  const abs = n < zero ? -n : n;
  const sign = n < zero ? "-" : "";
  const units = [
    { divisor: BigInt("1000000000000"), suffix: "T" },
    { divisor: BigInt("1000000000"), suffix: "B" },
    { divisor: BigInt("1000000"), suffix: "M" },
    { divisor: BigInt("1000"), suffix: "K" },
  ] as const;
  for (const unit of units) {
    if (abs >= unit.divisor) {
      const intPart = abs / unit.divisor;
      const decimalPart = (abs % unit.divisor) / (unit.divisor / ten);
      return `${sign}${intPart}.${decimalPart}${unit.suffix}`;
    }
  }
  return `${n}`;
}

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

type CatalogMode = "shop" | "rewards" | "orders" | "analytics";
type TraceViewMode = "orders" | "redemptions";
const REWARD_ADMIN_ENDPOINT = "/api/v1/admin/rewards/products";
const ORDER_TRACE_ENDPOINT = "/api/v1/admin/shop/orders";
const REDEMPTION_TRACE_ENDPOINT = "/api/v1/admin/rewards/redemptions";
const ANALYTICS_ENDPOINT = "/api/v1/admin/analytics/overview";
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
 const ui=useInterfaceCopy();
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : i18n.language?.startsWith("pt") ? "pt" : "es";
  const tx = {
    es: { title: "Administración del reino", subtitle: "Gestiona los productos, canjes y pedidos de tu comunidad." },
    en: { title: "Realm administration", subtitle: "Manage your community’s products, rewards and orders." },
    pt: { title: "Administração do reino", subtitle: "Gerencie os produtos, resgates e pedidos da sua comunidade." },
  }[lang];
  const { accessToken, isAuthReady, canManageDashboard } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [rewardProducts, setRewardProducts] = useState<RewardProduct[]>([]);
  const [orderTrace, setOrderTrace] = useState<OrderTrace[]>([]);
  const [redemptionTrace, setRedemptionTrace] = useState<RewardRedemptionTrace[]>(
    [],
  );
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingRewards, setLoadingRewards] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingRedemptions, setLoadingRedemptions] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingReward, setSavingReward] = useState(false);
  const [togglingShopId, setTogglingShopId] = useState<number | null>(null);
  const [togglingRewardId, setTogglingRewardId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingRewardId, setEditingRewardId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [rewardForm, setRewardForm] = useState<RewardForm>(emptyRewardForm);
  const [catalogMode, setCatalogMode] = useState<CatalogMode>("shop");
  const [traceViewMode, setTraceViewMode] = useState<TraceViewMode>("orders");
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");
  const [redemptionStatusFilter, setRedemptionStatusFilter] = useState("ALL");
  const [shopPage, setShopPage] = useState(1);
  const [rewardPage, setRewardPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [redemptionPage, setRedemptionPage] = useState(1);

  const loadProducts = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiJson<ProductListResponse>(
        "/api/v1/admin/shop/products",
        { token },
      );
      setProducts(data.products);
    } catch (e) {
      setError(e instanceof Error ? e.message : ui("No se pudo cargar productos."));
    } finally {
      setLoading(false);
    }
  }, [ui]);

  const loadRewardProducts = useCallback(async (token: string) => {
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
          : ui("No se pudo cargar productos de canje."),
      );
    } finally {
      setLoadingRewards(false);
    }
  }, [ui]);

  const loadOrderTrace = useCallback(async (token: string) => {
    setLoadingOrders(true);
    setError(null);
    try {
      const query =
        orderStatusFilter === "ALL"
          ? ORDER_TRACE_ENDPOINT
          : `${ORDER_TRACE_ENDPOINT}?status=${encodeURIComponent(orderStatusFilter)}`;
      const data = await apiJson<OrderTraceListResponse>(query, { token });
      setOrderTrace(data.orders);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : ui("No se pudo cargar la trazabilidad de pedidos."),
      );
    } finally {
      setLoadingOrders(false);
    }
  }, [orderStatusFilter, ui]);

  const loadRedemptionTrace = useCallback(async (token: string) => {
    setLoadingRedemptions(true);
    setError(null);
    try {
      const query =
        redemptionStatusFilter === "ALL"
          ? REDEMPTION_TRACE_ENDPOINT
          : `${REDEMPTION_TRACE_ENDPOINT}?status=${encodeURIComponent(redemptionStatusFilter)}`;
      const data = await apiJson<RewardRedemptionTraceListResponse>(query, {
        token,
      });
      setRedemptionTrace(data.redemptions);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : ui("No se pudo cargar la trazabilidad de canjes."),
      );
    } finally {
      setLoadingRedemptions(false);
    }
  }, [redemptionStatusFilter, ui]);

  const loadAnalytics = useCallback(async (token: string) => {
    setLoadingAnalytics(true);
    setError(null);
    try {
      const data = await apiJson<AnalyticsOverview>(ANALYTICS_ENDPOINT, { token });
      setAnalytics(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : ui("No se pudo cargar la analítica."),
      );
    } finally {
      setLoadingAnalytics(false);
    }
  }, [ui]);

  useEffect(() => {
    if (!isAuthReady) return;
    if (!accessToken) {
      router.replace("/login?next=/dashboard/productos");
      return;
    }
    if (!canManageDashboard) return;
    void Promise.all([
      loadProducts(accessToken),
      loadRewardProducts(accessToken),
      loadAnalytics(accessToken),
    ]);
  }, [isAuthReady, accessToken, router, canManageDashboard, loadProducts, loadRewardProducts, loadAnalytics]);

  const title = useMemo(
    () => (editingId ? `${ui("Editando producto")} #${editingId}` : ui("Crear producto")),
    [editingId, ui],
  );
  const isShopMode = catalogMode === "shop";
  const isOrdersMode = catalogMode === "orders";
  const isAnalyticsMode = catalogMode === "analytics";
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
  const totalOrderPages = Math.max(
    1,
    Math.ceil(orderTrace.length / DASHBOARD_ITEMS_PER_PAGE),
  );
  const pagedOrderTrace = orderTrace.slice(
    (orderPage - 1) * DASHBOARD_ITEMS_PER_PAGE,
    orderPage * DASHBOARD_ITEMS_PER_PAGE,
  );
  const totalRedemptionPages = Math.max(
    1,
    Math.ceil(redemptionTrace.length / DASHBOARD_ITEMS_PER_PAGE),
  );
  const pagedRedemptionTrace = redemptionTrace.slice(
    (redemptionPage - 1) * DASHBOARD_ITEMS_PER_PAGE,
    redemptionPage * DASHBOARD_ITEMS_PER_PAGE,
  );

  useEffect(() => {
    if (shopPage > totalShopPages) setShopPage(totalShopPages);
  }, [shopPage, totalShopPages]);

  useEffect(() => {
    if (rewardPage > totalRewardPages) setRewardPage(totalRewardPages);
  }, [rewardPage, totalRewardPages]);

  useEffect(() => {
    if (orderPage > totalOrderPages) setOrderPage(totalOrderPages);
  }, [orderPage, totalOrderPages]);

  useEffect(() => {
    if (redemptionPage > totalRedemptionPages)
      setRedemptionPage(totalRedemptionPages);
  }, [redemptionPage, totalRedemptionPages]);

  useEffect(() => {
    if (!accessToken || !isAuthReady || !canManageDashboard) return;
    void loadOrderTrace(accessToken);
  }, [accessToken, isAuthReady, canManageDashboard, loadOrderTrace]);

  useEffect(() => {
    if (!accessToken || !isAuthReady || !canManageDashboard) return;
    void loadRedemptionTrace(accessToken);
  }, [accessToken, isAuthReady, canManageDashboard, loadRedemptionTrace]);

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
      setError(ui("La imagen es obligatoria."));
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
        setMsg(ui("Producto actualizado."));
      } else {
        await apiJson("/api/v1/admin/shop/products", {
          method: "POST",
          token: accessToken,
          body: JSON.stringify(payload),
        });
        setMsg(ui("Producto creado."));
      }
      resetForm();
      await loadProducts(accessToken);
    } catch (e) {
      setError(e instanceof Error ? e.message : ui("No se pudo guardar."));
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
      setError(ui("La imagen es obligatoria."));
      setSavingReward(false);
      return;
    }

    if (!Number.isFinite(payload.costPoints) || payload.costPoints <= 0) {
      setError(ui("El costo en puntos debe ser mayor a 0."));
      setSavingReward(false);
      return;
    }

    if (
      isItem &&
      (!Number.isFinite(payload.itemEntry!) ||
        !Number.isFinite(payload.itemQuantity!) ||
        payload.itemQuantity! <= 0)
    ) {
      setError(ui("Para ITEM debes definir itemEntry e itemQuantity válidos."));
      setSavingReward(false);
      return;
    }

    if (!isItem && !payload.commandTemplate) {
      setError(ui("Para SERVICE debes definir commandTemplate."));
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
        setMsg(ui("Producto de canje actualizado."));
      } else {
        await apiJson(REWARD_ADMIN_ENDPOINT, {
          method: "POST",
          token: accessToken,
          body: JSON.stringify(payload),
        });
        setMsg(ui("Producto de canje creado."));
      }
      resetRewardForm();
      await loadRewardProducts(accessToken);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : ui("No se pudo guardar el producto de canje."),
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
        product.active ? ui("Producto deshabilitado.") : ui("Producto habilitado."),
      );
      await loadProducts(accessToken);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : ui("No se pudo actualizar estado del producto."),
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
      setMsg(product.active ? ui("Canje deshabilitado.") : ui("Canje habilitado."));
      await loadRewardProducts(accessToken);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : ui("No se pudo actualizar estado del canje."),
      );
    } finally {
      setTogglingRewardId(null);
    }
  }

  if (!isAuthReady || !accessToken) return <SiteShell><div className="portal-loading" role="status">{ui("Cargando…")}</div></SiteShell>;
  if (!canManageDashboard) return <SiteShell><section className="lore-hero"><span className="lore-kicker">BLACKOUT</span><h1>{ui("Acceso restringido")}</h1><p>{ui("Esta sección está disponible para el equipo de administración.")}</p><a className="lore-button" href="/cuenta">{ui("Volver a mi cuenta")}</a></section></SiteShell>;
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-display text-3xl font-semibold text-zinc-50">
          {tx.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {tx.subtitle}
        </p>

        <section className="mt-8 rounded-xl border border-white/10 bg-zinc-950/60 p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-400">{ui("Elige el tipo de catálogo que quieres administrar.")}{" "}</p>
            <div className="inline-flex flex-wrap rounded-lg border border-white/10 bg-black/40 p-1">
              <button
                type="button"
                onClick={() => setCatalogMode("shop")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  isShopMode
                    ? "bg-amber-500/20 text-amber-200"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >{ui("Tienda compra (")}{products.length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogMode("rewards")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  catalogMode === "rewards"
                    ? "bg-sky-500/20 text-sky-200"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >{ui("Tienda canje (")}{rewardProducts.length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogMode("orders")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  isOrdersMode
                    ? "bg-emerald-500/20 text-emerald-200"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >{ui("Trazabilidad (")}{orderTrace.length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogMode("analytics")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  isAnalyticsMode
                    ? "bg-fuchsia-500/20 text-fuchsia-200"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >{ui("Analítica")}{" "}</button>
            </div>
          </div>
          {msg && <p className="mt-3 text-sm text-emerald-400">{msg}</p>}
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)]">
          <section className="rounded-xl border border-white/10 bg-zinc-950/60 p-5">
            {isShopMode ? (
              <>
                <h2 className="font-display text-xl text-zinc-100">{title}</h2>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <label className="admin-field"><span>{"SKU"}</span><input
                    value={form.sku}
                    onChange={(e) => setField("sku", e.target.value)}
                    placeholder="SKU"
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <label className="admin-field"><span>{ui("Nombre")}</span><input
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder={ui("Nombre")}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <label className="admin-field"><span>{ui("Categoría")}</span><input
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                    placeholder={ui("Categoría")}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <label className="admin-field"><span>{ui("URL de imagen")}</span><input
                    value={form.imageUrl}
                    onChange={(e) => setField("imageUrl", e.target.value)}
                    placeholder={ui("URL de imagen")}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <label className="admin-field"><span>{ui("Descripción")}</span><textarea
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder={ui("Descripción")}
                    className="h-24 w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  /></label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="admin-field"><span>{ui("Precio USD")}</span><input
                      type="number"
                      step="0.01"
                      value={form.priceUsd}
                      onChange={(e) => setField("priceUsd", e.target.value)}
                      placeholder={ui("Precio USD")}
                      className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                      required
                    /></label>
                    <label className="admin-field"><span>{ui("Puntos")}</span><input
                      type="number"
                      value={form.donationPoints}
                      onChange={(e) =>
                        setField("donationPoints", e.target.value)
                      }
                      placeholder={ui("Puntos")}
                      className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                      required
                    /></label>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setField("active", e.target.checked)}
                    />{ui("Activo")}{" "}</label>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded bg-linear-to-r from-amber-600 to-orange-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
                    >
                      {saving
                        ? ui("Guardando...")
                        : editingId
                          ? ui("Actualizar")
                          : ui("Crear")}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="rounded border border-white/20 px-4 py-2 text-sm text-zinc-200"
                      >{ui("Cancelar")}{" "}</button>
                    )}
                  </div>
                </form>
              </>
            ) : catalogMode === "rewards" ? (
              <>
                <h2 className="font-display text-xl text-zinc-100">{ui("Catálogo de canje")}{" "}</h2>
                <p className="mt-2 text-xs text-zinc-500">{ui("Estos productos se leen desde")}{" "}
                  <code>/api/v1/rewards/products</code>.
                </p>
                <form onSubmit={onRewardSubmit} className="mt-4 space-y-3">
                  <label className="admin-field"><span>{"SKU"}</span><input
                    value={rewardForm.sku}
                    onChange={(e) => setRewardField("sku", e.target.value)}
                    placeholder="SKU"
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <label className="admin-field"><span>{ui("Nombre")}</span><input
                    value={rewardForm.name}
                    onChange={(e) => setRewardField("name", e.target.value)}
                    placeholder={ui("Nombre")}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <label className="admin-field"><span>{ui("Categoría (General, Monturas, Servicios...)")}</span><input
                    value={rewardForm.category}
                    onChange={(e) => setRewardField("category", e.target.value)}
                    placeholder={ui("Categoría (General, Monturas, Servicios...)")}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <label className="admin-field"><span>{ui("URL de imagen")}</span><input
                    value={rewardForm.imageUrl}
                    onChange={(e) => setRewardField("imageUrl", e.target.value)}
                    placeholder={ui("URL de imagen")}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <select
                    aria-label={ui("Tipo de entrega")}
                    value={rewardForm.deliveryType}
                    onChange={(e) =>
                      setRewardField(
                        "deliveryType",
                        e.target.value as "SERVICE" | "ITEM",
                      )
                    }
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  >
                    <option value="SERVICE">{ui("SERVICE (usa commandTemplate)")}{" "}</option>
                    <option value="ITEM">{ui("ITEM (usa itemEntry/itemQuantity)")}{" "}</option>
                  </select>
                  <label className="admin-field"><span>{ui("Descripción")}</span><textarea
                    value={rewardForm.description}
                    onChange={(e) =>
                      setRewardField("description", e.target.value)
                    }
                    placeholder={ui("Descripción")}
                    className="h-24 w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  /></label>
                  {rewardForm.deliveryType === "SERVICE" ? (
                    <label className="admin-field"><span>{ui("Command template (usa {character_name})")}</span><input
                      value={rewardForm.commandTemplate}
                      onChange={(e) =>
                        setRewardField("commandTemplate", e.target.value)
                      }
                      placeholder={ui("Command template (usa {character_name})")}
                      className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                      required
                    /></label>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <label className="admin-field"><span>{ui("Item Entry")}</span><input
                        type="number"
                        min="1"
                        value={rewardForm.itemEntry}
                        onChange={(e) =>
                          setRewardField("itemEntry", e.target.value)
                        }
                        placeholder={ui("Item Entry")}
                        className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                        required
                      /></label>
                      <label className="admin-field"><span>{ui("Item Quantity")}</span><input
                        type="number"
                        min="1"
                        value={rewardForm.itemQuantity}
                        onChange={(e) =>
                          setRewardField("itemQuantity", e.target.value)
                        }
                        placeholder={ui("Item Quantity")}
                        className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                        required
                      /></label>
                    </div>
                  )}
                  <label className="admin-field"><span>{ui("Costo en puntos")}</span><input
                    type="number"
                    min="1"
                    value={rewardForm.costPoints}
                    onChange={(e) =>
                      setRewardField("costPoints", e.target.value)
                    }
                    placeholder={ui("Costo en puntos")}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                    required
                  /></label>
                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={rewardForm.active}
                      onChange={(e) =>
                        setRewardField("active", e.target.checked)
                      }
                    />{ui("Activo")}{" "}</label>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={savingReward}
                      className="rounded bg-linear-to-r from-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
                    >
                      {savingReward
                        ? ui("Guardando...")
                        : editingRewardId
                          ? ui("Actualizar canje")
                          : ui("Crear canje")}
                    </button>
                    {editingRewardId && (
                      <button
                        type="button"
                        onClick={resetRewardForm}
                        className="rounded border border-white/20 px-4 py-2 text-sm text-zinc-200"
                      >{ui("Cancelar")}{" "}</button>
                    )}
                  </div>
                </form>
              </>
            ) : catalogMode === "orders" ? (
              <>
                <h2 className="font-display text-xl text-zinc-100">{ui("Trazabilidad de pedidos")}{" "}</h2>
                <p className="mt-2 text-xs text-zinc-500">{ui("Revisa qué orden se envió, en qué estado quedó y si los puntos fueron entregados correctamente.")}{" "}</p>
                <div className="mt-4 space-y-3">
                  <div className="inline-flex rounded-lg border border-white/10 bg-black/40 p-1">
                    <button
                      type="button"
                      onClick={() => setTraceViewMode("orders")}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                        traceViewMode === "orders"
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                      }`}
                    >{ui("Compras")}{" "}</button>
                    <button
                      type="button"
                      onClick={() => setTraceViewMode("redemptions")}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                        traceViewMode === "redemptions"
                          ? "bg-sky-500/20 text-sky-200"
                          : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                      }`}
                    >{ui("Canjes")}{" "}</button>
                  </div>
                  {traceViewMode === "orders" ? (
                    <>
                  <label htmlFor="order-state" className="block text-sm text-zinc-400">{ui("Filtrar por estado")}{" "}</label>
                  <select
                    id="order-state"
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  >
                    <option value="ALL">{ui("Todos")}</option>
                    <option value="PENDING_PAYPAL">{ui("Pendiente PayPal")}</option>
                    <option value="PAID">{ui("Pagado / Entregado")}</option>
                    <option value="FAILED">{ui("Fallido")}</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => accessToken && void loadOrderTrace(accessToken)}
                    className="rounded border border-emerald-400/40 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
                  >{ui("Actualizar trazabilidad")}{" "}</button>
                    </>
                  ) : (
                    <>
                  <label htmlFor="redemption-state" className="block pt-2 text-sm text-zinc-400">{ui("Estado de canjes")}{" "}</label>
                  <select
                    id="redemption-state"
                    value={redemptionStatusFilter}
                    onChange={(e) => setRedemptionStatusFilter(e.target.value)}
                    className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100"
                  >
                    <option value="ALL">{ui("Todos")}</option>
                    <option value="PENDING_DELIVERY">{ui("Pendiente entrega")}</option>
                    <option value="DELIVERY_FAILED">{ui("Entrega fallida")}</option>
                    <option value="DELIVERED">{ui("Entregado")}</option>
                    <option value="POINTS_DEBIT_FAILED">{ui("Falló débito")}</option>
                    <option value="COMPLETED">{ui("Completado")}</option>
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      accessToken && void loadRedemptionTrace(accessToken)
                    }
                    className="rounded border border-sky-400/40 px-4 py-2 text-sm text-sky-300 hover:bg-sky-500/10"
                  >{ui("Actualizar canjes")}{" "}</button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display text-xl text-zinc-100">{ui("Analítica general")}{" "}</h2>
                <p className="mt-2 text-xs text-zinc-500">{ui("Resumen global del servidor y la economía del portal.")}{" "}</p>
                <button
                  type="button"
                  onClick={() => accessToken && void loadAnalytics(accessToken)}
                  className="mt-4 rounded border border-fuchsia-400/40 px-4 py-2 text-sm text-fuchsia-200 hover:bg-fuchsia-500/10"
                >{ui("Actualizar analítica")}{" "}</button>
              </>
            )}
          </section>

          <section className="rounded-xl border border-white/10 bg-zinc-950/60 p-5">
            <h2 className="font-display text-xl text-zinc-100">
              {isShopMode
                ? ui("Productos existentes")
                : catalogMode === "rewards"
                  ? ui("Canjes existentes")
                  : catalogMode === "orders"
                    ? traceViewMode === "orders"
                      ? ui("Órdenes y estado de entrega")
                      : ui("Canjes y débito de puntos")
                    : ui("Analítica y KPIs")}
            </h2>
            {isShopMode ? (
              loading ? (
                <p className="mt-4 text-zinc-400">{ui("Cargando...")}</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-zinc-500">
                      <tr>
                        <th className="pb-2 pr-4">SKU</th>
                        <th className="pb-2 pr-4">{ui("Nombre")}</th>
                        <th className="pb-2 pr-4">{ui("Categoría")}</th>
                        <th className="pb-2 pr-4">{ui("Estado")}</th>
                        <th className="pb-2 pr-4">USD</th>
                        <th className="pb-2 pr-4">{ui("Puntos")}</th>
                        <th className="pb-2">{ui("Acción")}</th>
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
                            {p.active ? ui("Activo") : ui("Inactivo")}
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
                            >{ui("Editar")}{" "}</button>
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
                                  ? ui("Desactivar")
                                  : ui("Activar")}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {products.length === 0 && (
                    <p className="pt-4 text-sm text-zinc-500">{ui("No hay productos creados.")}{" "}</p>
                  )}
                  {products.length > DASHBOARD_ITEMS_PER_PAGE && (
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        disabled={shopPage === 1}
                        onClick={() => setShopPage((p) => Math.max(1, p - 1))}
                        className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                      >{ui("Anterior")}{" "}</button>
                      <p className="text-xs text-zinc-400">{ui("Página")}{" "}{shopPage}{" "}{ui("de")}{" "}{totalShopPages}
                      </p>
                      <button
                        type="button"
                        disabled={shopPage === totalShopPages}
                        onClick={() =>
                          setShopPage((p) => Math.min(totalShopPages, p + 1))
                        }
                        className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                      >{ui("Siguiente")}{" "}</button>
                    </div>
                  )}
                </div>
              )
            ) : catalogMode === "rewards" ? loadingRewards ? (
              <p className="mt-4 text-zinc-400">{ui("Cargando...")}</p>
            ) : (
              <div className="mt-4 space-y-8">
                <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="pb-2 pr-4">SKU</th>
                      <th className="pb-2 pr-4">{ui("Nombre")}</th>
                      <th className="pb-2 pr-4">{ui("Categoría")}</th>
                      <th className="pb-2 pr-4">{ui("Estado")}</th>
                      <th className="pb-2 pr-4">{ui("Costo")}</th>
                      <th className="pb-2">{ui("Acción")}</th>
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
                          {p.active ? ui("Activo") : ui("Inactivo")}
                        </td>
                        <td className="py-3 pr-4 text-amber-300">
                          {p.costPoints} pts
                        </td>
                        <td className="py-3 space-x-2">
                          <button
                            type="button"
                            onClick={() => startRewardEdit(p)}
                            className="rounded border border-sky-400/40 px-3 py-1 text-xs text-sky-300"
                          >{ui("Editar")}{" "}</button>
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
                                ? ui("Desactivar")
                                : ui("Activar")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rewardProducts.length === 0 && (
                  <p className="pt-4 text-sm text-zinc-500">{ui("No hay productos de canje creados.")}{" "}</p>
                )}
                {rewardProducts.length > DASHBOARD_ITEMS_PER_PAGE && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled={rewardPage === 1}
                      onClick={() => setRewardPage((p) => Math.max(1, p - 1))}
                      className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                    >{ui("Anterior")}{" "}</button>
                    <p className="text-xs text-zinc-400">{ui("Página")}{" "}{rewardPage}{" "}{ui("de")}{" "}{totalRewardPages}
                    </p>
                    <button
                      type="button"
                      disabled={rewardPage === totalRewardPages}
                      onClick={() =>
                        setRewardPage((p) => Math.min(totalRewardPages, p + 1))
                      }
                      className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                    >{ui("Siguiente")}{" "}</button>
                  </div>
                )}
              </div>
              </div>
            ) : catalogMode === "orders" ? loadingOrders ? (
              <p className="mt-4 text-zinc-400">{ui("Cargando...")}</p>
            ) : (
              <div className="mt-4 space-y-8">
                {traceViewMode === "orders" ? (
                <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="pb-2 pr-4">{ui("Orden")}</th>
                      <th className="pb-2 pr-4">{ui("Usuario")}</th>
                      <th className="pb-2 pr-4">{ui("Producto")}</th>
                      <th className="pb-2 pr-4">PayPal</th>
                      <th className="pb-2 pr-4">{ui("Estado")}</th>
                      <th className="pb-2 pr-4">{ui("Puntos")}</th>
                      <th className="pb-2 pr-4">{ui("Intentos")}</th>
                      <th className="pb-2">{ui("Último check")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedOrderTrace.map((o) => (
                      <tr
                        key={o.id}
                        className="border-t border-white/5 text-zinc-300"
                      >
                        <td className="py-3 pr-4 font-mono text-xs">#{o.id}</td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-col">
                            <span>{o.portalUsername ?? ui("Sin username")}</span>
                            <span className="text-xs text-zinc-500">ID #{o.portalUserId}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          {o.productName ?? `${ui("Producto")} #${o.productId}`}
                        </td>
                        <td className="py-3 pr-4 font-mono text-xs">
                          {o.paypalOrderId ?? "-"}
                        </td>
                        <td
                          className={`py-3 pr-4 text-xs ${
                            o.status === "PAID"
                              ? "text-emerald-300"
                              : o.status === "FAILED"
                                ? "text-red-300"
                                : "text-amber-300"
                          }`}
                        >
                          {o.status}
                        </td>
                        <td className="py-3 pr-4">{o.creditedPoints}</td>
                        <td className="py-3 pr-4">{o.checkAttempts}</td>
                        <td className="py-3 text-xs text-zinc-400">
                          {o.lastCheckedAt
                            ? new Date(o.lastCheckedAt).toLocaleString(lang)
                            : ui("Sin revisar")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orderTrace.length === 0 && (
                  <p className="pt-4 text-sm text-zinc-500">{ui("No hay órdenes para el filtro seleccionado.")}{" "}</p>
                )}
                {orderTrace.length > DASHBOARD_ITEMS_PER_PAGE && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled={orderPage === 1}
                      onClick={() => setOrderPage((p) => Math.max(1, p - 1))}
                      className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                    >{ui("Anterior")}{" "}</button>
                    <p className="text-xs text-zinc-400">{ui("Página")}{" "}{orderPage}{" "}{ui("de")}{" "}{totalOrderPages}
                    </p>
                    <button
                      type="button"
                      disabled={orderPage === totalOrderPages}
                      onClick={() =>
                        setOrderPage((p) => Math.min(totalOrderPages, p + 1))
                      }
                      className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                    >{ui("Siguiente")}{" "}</button>
                  </div>
                )}
                </div>
                ) : null}

                {traceViewMode === "redemptions" ? (
                <div>
                  <h3 className="font-display text-lg text-zinc-100">{ui("Canjes de puntos")}{" "}</h3>
                  {loadingRedemptions ? (
                    <p className="mt-3 text-zinc-400">{ui("Cargando...")}</p>
                  ) : (
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="text-zinc-500">
                          <tr>
                            <th className="pb-2 pr-4">{ui("Canje")}</th>
                            <th className="pb-2 pr-4">{ui("Usuario")}</th>
                            <th className="pb-2 pr-4">{ui("Recompensa")}</th>
                            <th className="pb-2 pr-4">{ui("Estado")}</th>
                            <th className="pb-2 pr-4">{ui("Puntos")}</th>
                            <th className="pb-2 pr-4">{ui("Débito")}</th>
                            <th className="pb-2 pr-4">{ui("Intentos")}</th>
                            <th className="pb-2 pr-4">Error</th>
                            <th className="pb-2">{ui("Último intento")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pagedRedemptionTrace.map((r) => (
                            <tr
                              key={r.id}
                              className="border-t border-white/5 text-zinc-300"
                            >
                              <td className="py-3 pr-4 font-mono text-xs">
                                #{r.id}
                              </td>
                              <td className="py-3 pr-4">
                                <div className="flex flex-col">
                                  <span>{r.portalUsername ?? ui("Sin username")}</span>
                                  <span className="text-xs text-zinc-500">ID #{r.portalUserId}</span>
                                </div>
                              </td>
                              <td className="py-3 pr-4">
                                {r.rewardName ?? `${ui("Recompensa")} #${r.rewardProductId}`}
                              </td>
                              <td
                                className={`py-3 pr-4 text-xs ${
                                  r.status === "COMPLETED"
                                    ? "text-emerald-300"
                                    : r.status.includes("FAILED")
                                      ? "text-red-300"
                                      : "text-amber-300"
                                }`}
                              >
                                {r.status}
                              </td>
                              <td className="py-3 pr-4">{r.costPoints}</td>
                              <td
                                className={`py-3 pr-4 text-xs ${
                                  r.pointsDebited
                                    ? "text-emerald-300"
                                    : "text-red-300"
                                }`}
                              >
                                {r.pointsDebited ? ui("Descontado") : ui("Pendiente")}
                              </td>
                              <td className="py-3 pr-4">{r.deliveryAttempts}</td>
                              <td
                                className="max-w-[220px] truncate py-3 pr-4 text-xs text-zinc-400"
                                title={r.lastError ?? ""}
                              >
                                {r.lastError ?? "-"}
                              </td>
                              <td className="py-3 text-xs text-zinc-400">
                                {r.lastAttemptAt
                                  ? new Date(r.lastAttemptAt).toLocaleString(lang)
                                  : ui("Sin intento")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {redemptionTrace.length === 0 && (
                        <p className="pt-4 text-sm text-zinc-500">{ui("No hay canjes para el filtro seleccionado.")}{" "}</p>
                      )}
                      {redemptionTrace.length > DASHBOARD_ITEMS_PER_PAGE && (
                        <div className="mt-4 flex items-center justify-center gap-3">
                          <button
                            type="button"
                            disabled={redemptionPage === 1}
                            onClick={() =>
                              setRedemptionPage((p) => Math.max(1, p - 1))
                            }
                            className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                          >{ui("Anterior")}{" "}</button>
                          <p className="text-xs text-zinc-400">{ui("Página")}{" "}{redemptionPage}{" "}{ui("de")}{" "}{totalRedemptionPages}
                          </p>
                          <button
                            type="button"
                            disabled={redemptionPage === totalRedemptionPages}
                            onClick={() =>
                              setRedemptionPage((p) =>
                                Math.min(totalRedemptionPages, p + 1),
                              )
                            }
                            className="rounded border border-white/15 px-3 py-1.5 text-xs text-zinc-200 disabled:opacity-50"
                          >{ui("Siguiente")}{" "}</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                ) : null}
              </div>
            ) : loadingAnalytics ? (
              <p className="mt-4 text-zinc-400">{ui("Cargando...")}</p>
            ) : analytics ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">{ui("Cuentas del portal")}</p>
                  <p className="mt-2 text-2xl font-bold text-zinc-100">{analytics.portalUsers}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">{ui("Cuentas de juego")}</p>
                  <p className="mt-2 text-2xl font-bold text-zinc-100">{analytics.gameAccounts}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">{ui("Cuentas online")}</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-300">{analytics.onlineAccounts}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">{ui("Personajes totales")}</p>
                  <p className="mt-2 text-2xl font-bold text-sky-200">{analytics.totalCharacters}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">{ui("Órdenes pagadas")}</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-300">{analytics.shopOrdersPaid}</p>
                  <p className="mt-1 text-xs text-zinc-500">{ui("Totales:")}{" "}{analytics.shopOrdersTotal}{ui("· Pendientes:")}{" "}{analytics.shopOrdersPending}{ui("· Fallidas:")}{" "}{analytics.shopOrdersFailed}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">{ui("Canjes completados")}</p>
                  <p className="mt-2 text-2xl font-bold text-amber-300">{analytics.redemptionsCompleted}</p>
                  <p className="mt-1 text-xs text-zinc-500">{ui("Totales:")}{" "}{analytics.redemptionsTotal}{ui("· Pendientes:")}{" "}{analytics.redemptionsPending}{ui("· Fallidos:")}{" "}{analytics.redemptionsFailed}
                  </p>
                </div>
                <div className="rounded-lg border border-fuchsia-400/25 bg-fuchsia-950/20 p-4 sm:col-span-2 lg:col-span-3">
                  <p className="text-xs uppercase tracking-wider text-fuchsia-200/80">{ui("Saldo global en wallets")}</p>
                  <p className="mt-2 text-3xl font-bold text-fuchsia-100">
                    {formatBigIntGrouped(analytics.totalWalletPoints)} pts
                  </p>
                  <p className="mt-1 text-xs text-fuchsia-200/80">{ui("Vista compacta:")}{" "}{formatBigIntCompact(analytics.totalWalletPoints)} pts
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-zinc-400">{ui("No hay datos de analítica disponibles.")}</p>
            )}
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
