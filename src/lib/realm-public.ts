export type RealmStatusPayload = {
  playersOnline: number | null;
  realmStatus: string;
  checkedAt?: string;
};

/**
 * Estado público del reino desde blackout-wow-api (`GET /api/v1/public/realm`).
 */
export async function fetchRealmStatus(
  apiBase: string,
): Promise<RealmStatusPayload | null> {
  const base = apiBase.replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/api/v1/public/realm`, {
      next: { revalidate: 15 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as RealmStatusPayload;
  } catch {
    return null;
  }
}
