"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

export function LogoutButton() {
  const { accessToken, logout } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  if (!accessToken) return null;

  return (
    <button
      type="button"
      className="account-logout"
      onClick={() => {
        logout();
        router.replace("/login");
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 5H5v14h4M10 12h10m-4-4 4 4-4 4" />
      </svg>
      {t("nav.logout")}
    </button>
  );
}
