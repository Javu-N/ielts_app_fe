export type DecodedJwt = {
    sub?: string;
    iat?: number;
    exp?: number;
    [key: string]: unknown;
};

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
}

export function logout(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
}

export function parseJwt(token: string | null): DecodedJwt | null {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    try {
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const json = typeof window !== "undefined" ? atob(base64) : Buffer.from(base64, "base64").toString("utf-8");
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export type CurrentUser = {
    email?: string;
    token?: string;
    exp?: number;
};

export function getCurrentUser(): CurrentUser | null {
    const token = getToken();
    const decoded = parseJwt(token);
    if (!decoded) return null;
    const email = typeof decoded.sub === "string" ? decoded.sub : undefined;
    const exp = typeof decoded.exp === "number" ? decoded.exp : undefined;
    return { email, token: token ?? undefined, exp };
}

const DISPLAY_NAME_KEY = "display_name";
const TARGET_BAND_KEY = "target_band"; // e.g., 6.5, 7.0, 8.0
const CURRENT_LEVEL_KEY = "current_level"; // e.g., Beginner/Intermediate/Advanced
const PLAN_KEY = "plan_name"; // Free | Premium

export function getDisplayName(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(DISPLAY_NAME_KEY);
}

export function setDisplayName(name: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(DISPLAY_NAME_KEY, name);
}

export function getInitials(name: string | null | undefined, fallback?: string): string {
    const n = (name ?? "").trim();
    if (!n) return (fallback ?? "?").slice(0, 2).toUpperCase();
    const parts = n.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return (first + last || first).toUpperCase();
}

export function getTargetBand(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TARGET_BAND_KEY);
}

export function setTargetBand(band: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TARGET_BAND_KEY, band);
}

export function getCurrentLevel(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(CURRENT_LEVEL_KEY);
}

export function setCurrentLevel(level: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(CURRENT_LEVEL_KEY, level);
}

export function getPlan(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(PLAN_KEY);
}

export function setPlan(plan: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(PLAN_KEY, plan);
}


