import { publicEnv } from "@/config/public-env";

const API_BASE = publicEnv.apiUrl;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly endpoint: string,
    public readonly detail?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type TokenBundle = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresInSeconds: number;
};

export async function apiJson<T>(
  path: string,
  init?: RequestInit & { token?: string | null }
): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (init?.token) {
    headers.set("Authorization", `Bearer ${init.token}`);
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });
  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  if (!res.ok) {
    const payload = (data && typeof data === "object" ? data : null) as
      | { error?: unknown; message?: unknown; detail?: unknown }
      | null;

    const msg =
      typeof payload?.error === "string"
        ? payload.error
        : typeof payload?.message === "string"
          ? payload.message
          : typeof data === "string"
            ? data
            : res.statusText;

    const detail =
      typeof payload?.detail === "string"
        ? payload.detail
        : undefined;

    throw new ApiError(msg || "Error de API", res.status, path, detail);
  }
  return data as T;
}

export { API_BASE };
