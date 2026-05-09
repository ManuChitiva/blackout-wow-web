"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

/** Circular logo mark linking to home; matches hero branding for auth pages. */
export function AuthHeroLogoLink() {
  const { t } = useTranslation();

  return (
    <Link
      href="/"
      aria-label={t("nav.homeAria")}
      className="group relative mx-auto mb-5 flex h-[5.75rem] w-[5.75rem] shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-400/30 bg-zinc-950/90 shadow-[0_14px_44px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] ring-2 ring-amber-500/12 transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-amber-400/48 hover:shadow-[0_18px_50px_rgba(0,0,0,0.6),0_0_32px_-8px_rgba(251,191,36,0.22)] hover:ring-amber-400/22 lg:mx-0"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_38%,rgba(251,191,36,0.18),transparent_58%)]" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_72%_62%,rgba(56,189,248,0.08),transparent_50%)]" />
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
      <Image
        src="/logo-transparent.png"
        alt=""
        width={200}
        height={200}
        className="relative z-[1] h-[72%] w-[72%] object-contain drop-shadow-[0_6px_28px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-[1.03]"
        priority
      />
    </Link>
  );
}
