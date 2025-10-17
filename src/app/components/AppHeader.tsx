"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AppHeader() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [plan, setPlan] = useState<string>("");

    useEffect(() => {
        const n = (typeof window !== "undefined" && localStorage.getItem("display_name")) || "";
        const p = (typeof window !== "undefined" && localStorage.getItem("plan_name")) || "Free";
        setName(n);
        setPlan(p);
    }, []);

    return (
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-[color:var(--card-border)]">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <a href="/dashboard" className="font-semibold">IELTS Practice</a>
                <nav className="hidden sm:flex items-center gap-4 text-sm">
                    <a className="hover:underline" href="/dashboard">Dashboard</a>
                    <a className="hover:underline" href="/tests">Tests</a>
                    <a className="hover:underline" href="/analytics">Analytics</a>
                    <a className="hover:underline" href="/plans">Plans</a>
                </nav>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)" }}>{plan}</span>
                    <a className="btn-outline" href="/profile">{name || "Profile"}</a>
                </div>
            </div>
        </header>
    );
}


