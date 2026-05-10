"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavHomeAuraText } from "@/components/NavHomeAuraText";

function pathnameMatchesNavHref(
  pathname: string,
  hrefKey: string,
  options?: { exact?: boolean },
) {
  const exact = options?.exact ?? false;
  const cleanHref = hrefKey.split("#")[0] || "/";
  if (exact) return pathname === cleanHref;
  return (
    pathname === cleanHref ||
    (cleanHref !== "/" && pathname.startsWith(`${cleanHref}/`))
  );
}

export function SiteHeader() {
  const { accessToken, canManageDashboard, logout } = useAuth();
  const { t } = useTranslation();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navAriaCurrent = (
    hrefKey: string,
    options?: { exact?: boolean },
  ): "page" | undefined =>
    pathnameMatchesNavHref(pathname, hrefKey, options) ? "page" : undefined;

  const getNavItemClass = (hrefKey: string, options?: { exact?: boolean }) => {
    const isActive = pathnameMatchesNavHref(pathname, hrefKey, options);

    const base =
      "rounded-md border px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] border-transparent bg-transparent text-zinc-300/90 outline-none transition-[border-color,background-color,color,box-shadow,transform] duration-200 hover:border-amber-400/55 hover:bg-amber-500/14 hover:text-amber-50 hover:shadow-[0_0_20px_-4px_rgba(251,191,36,0.55),0_0_42px_-10px_rgba(249,115,22,0.22)] hover:ring-1 hover:ring-amber-400/30 focus-visible:border-amber-400/55 focus-visible:ring-2 focus-visible:ring-amber-400/35";

    const active =
      "border-amber-400/65 bg-linear-to-br from-amber-500/28 via-amber-600/14 to-orange-950/35 !text-amber-50 shadow-[0_0_22px_-4px_rgba(251,191,36,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] hover:!border-amber-300/75 hover:!bg-amber-500/26 hover:!text-amber-50 hover:!shadow-[0_0_28px_-4px_rgba(251,191,36,0.65),inset_0_1px_0_rgba(255,255,255,0.14)]";

    return `${base} ${isActive ? active : ""}`.trim();
  };

  const getMobileNavItemClass = (
    hrefKey: string,
    options?: { exact?: boolean },
  ) => {
    const isActive = pathnameMatchesNavHref(pathname, hrefKey, options);

    const base =
      "block rounded-lg border border-white/10 bg-zinc-950/45 px-3 py-2.5 text-sm font-medium text-zinc-200 outline-none transition-[border-color,background-color,color,box-shadow,transform] duration-200 hover:border-amber-400/60 hover:bg-amber-500/16 hover:text-amber-50 hover:shadow-[0_0_28px_-6px_rgba(251,191,36,0.55),0_0_52px_-12px_rgba(249,115,22,0.18)] hover:-translate-y-px hover:ring-2 hover:ring-amber-400/25 focus-visible:border-amber-400/65 focus-visible:ring-2 focus-visible:ring-amber-400/35";

    const active =
      "border-amber-400/75 bg-linear-to-br from-amber-500/26 via-amber-600/14 to-orange-950/40 text-amber-50 shadow-[0_0_26px_-5px_rgba(251,191,36,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] ring-2 ring-amber-400/35 hover:!shadow-[0_0_34px_-5px_rgba(251,191,36,0.68),inset_0_1px_0_rgba(255,255,255,0.14)] hover:!brightness-105";

    return `${base} ${isActive ? active : ""}`.trim();
  };

  return (
    <header className="navbar-aura sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-2.5 md:gap-3">
        <Link
          href="/"
          aria-label={t("nav.homeAria")}
          title={t("nav.homeAria")}
          className="group shrink-0 rounded-md border border-white/10 bg-zinc-950/50 px-2.5 py-1.5 transition-all hover:border-amber-400/40 hover:bg-zinc-900/70"
          onClick={() => setMobileOpen(false)}
        >
          <span className="font-display text-sm font-semibold tracking-[0.12em] sm:text-[0.95rem] leading-none">
            <NavHomeAuraText variant="title" text={t("nav.home")} />
          </span>
        </Link>

        <span className="min-w-0 flex-1 md:hidden" aria-hidden />

        <nav className="hidden min-w-0 flex-1 items-center justify-start gap-1 border-y border-white/10 px-2 py-1 md:flex">
          <Link
            aria-current={navAriaCurrent("/")}
            className={getNavItemClass("/")}
            href="/#features"
          >
            {t("nav.server")}
          </Link>
          <Link
            aria-current={navAriaCurrent("/como-conectarme")}
            className={getNavItemClass("/como-conectarme")}
            href="/como-conectarme"
          >
            {t("nav.connect")}
          </Link>
          <Link
            aria-current={navAriaCurrent("/terminos-y-condiciones")}
            className={getNavItemClass("/terminos-y-condiciones")}
            href="/terminos-y-condiciones"
          >
            {t("nav.rules")}
          </Link>
          {accessToken ? (
            <>
              <Link
                aria-current={navAriaCurrent("/tienda", { exact: true })}
                className={getNavItemClass("/tienda", { exact: true })}
                href="/tienda"
              >
                {t("nav.store")}
              </Link>
              <Link
                aria-current={navAriaCurrent("/tienda/puntos")}
                className={getNavItemClass("/tienda/puntos")}
                href="/tienda/puntos"
              >
                {t("nav.redeem")}
              </Link>
              {canManageDashboard && (
                <Link
                  aria-current={navAriaCurrent("/dashboard/productos")}
                  className={getNavItemClass("/dashboard/productos")}
                  href="/dashboard/productos"
                >
                  {t("nav.dashboard")}
                </Link>
              )}
              <Link
                aria-current={navAriaCurrent("/cuenta")}
                className={getNavItemClass("/cuenta")}
                href="/cuenta"
              >
                {t("nav.account")}
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="ml-1 rounded-md border border-red-300/35 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-red-200 outline-none transition-[border-color,background-color,box-shadow] duration-200 hover:border-red-200/65 hover:bg-red-900/25 hover:text-red-50 hover:shadow-[0_0_18px_-4px_rgba(248,113,113,0.45)] focus-visible:ring-2 focus-visible:ring-red-400/35"
              >
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                aria-current={navAriaCurrent("/registro")}
                className={getNavItemClass("/registro")}
                href="/registro"
              >
                {t("nav.register")}
              </Link>
              <Link
                aria-current={navAriaCurrent("/login")}
                className={getNavItemClass("/login")}
                href="/login"
              >
                {t("nav.login")}
              </Link>
            </>
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={t("nav.openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center rounded-md border border-white/15 bg-zinc-950/60 px-3 py-2 text-zinc-100 transition-all hover:bg-zinc-900/70 md:hidden"
          >
            {t("nav.menu")}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-black/80 px-4 pb-4 pt-3 md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
            <Link
              aria-current={navAriaCurrent("/")}
              className={getMobileNavItemClass("/")}
              href="/#features"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.server")}
            </Link>
            <Link
              aria-current={navAriaCurrent("/como-conectarme")}
              className={getMobileNavItemClass("/como-conectarme")}
              href="/como-conectarme"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.connect")}
            </Link>
            <Link
              aria-current={navAriaCurrent("/terminos-y-condiciones")}
              className={getMobileNavItemClass("/terminos-y-condiciones")}
              href="/terminos-y-condiciones"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.rules")}
            </Link>
            {accessToken ? (
              <>
                <Link
                  aria-current={navAriaCurrent("/tienda", { exact: true })}
                  className={getMobileNavItemClass("/tienda", { exact: true })}
                  href="/tienda"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.store")}
                </Link>
                <Link
                  aria-current={navAriaCurrent("/tienda/puntos")}
                  className={getMobileNavItemClass("/tienda/puntos")}
                  href="/tienda/puntos"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.redeem")}
                </Link>
                {canManageDashboard && (
                  <Link
                    aria-current={navAriaCurrent("/dashboard/productos")}
                    className={getMobileNavItemClass("/dashboard/productos")}
                    href="/dashboard/productos"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("nav.dashboard")}
                  </Link>
                )}
                <Link
                  aria-current={navAriaCurrent("/cuenta")}
                  className={getMobileNavItemClass("/cuenta")}
                  href="/cuenta"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.account")}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-md border border-red-300/30 bg-red-950/20 px-3 py-2 text-left text-sm font-medium text-red-100 outline-none transition-[border-color,background-color,box-shadow] duration-200 hover:border-red-200/55 hover:bg-red-900/30 hover:shadow-[0_0_16px_-6px_rgba(248,113,113,0.35)] focus-visible:ring-2 focus-visible:ring-red-400/30"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  aria-current={navAriaCurrent("/registro")}
                  className={getMobileNavItemClass("/registro")}
                  href="/registro"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.register")}
                </Link>
                <Link
                  aria-current={navAriaCurrent("/login")}
                  className={getMobileNavItemClass("/login")}
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.login")}
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
