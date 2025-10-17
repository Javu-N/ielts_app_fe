"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) {
            router.replace("/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-5xl mx-auto">
                <HeaderGreeting />

                <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: "Overall Band (ước tính)", value: "—" },
                        { title: "Bài đã làm", value: "0" },
                        { title: "Thời gian học tuần này", value: "0h" },
                        { title: "Chuỗi ngày học", value: "0" },
                    ].map((card) => (
                        <div key={card.title} className="card p-4">
                            <div className="text-sm text-gray-500">{card.title}</div>
                            <div className="text-2xl font-medium mt-2">{card.value}</div>
                        </div>
                    ))}
                </section>

                <section className="mt-8">
                    <h2 className="text-lg font-medium">Lối tắt kỹ năng</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                        {[
                            { name: "Listening", href: "/practice/listening" },
                            { name: "Reading", href: "/practice/reading" },
                            { name: "Writing", href: "/practice/writing" },
                            { name: "Speaking", href: "/practice/speaking" },
                        ].map((s) => (
                            <a key={s.name} href={s.href} className="card p-4 text-center hover:bg-white/10">
                                {s.name}
                            </a>
                        ))}
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-lg font-medium">Phân tích</h2>
                    <div className="mt-3 card p-4 flex items-center justify-between">
                        <div className="text-sm text-gray-400">Xem tiến trình học và điểm số theo thời gian</div>
                        <a className="btn-outline" href="/analytics">Mở Analytics</a>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-lg font-medium">Tài khoản</h2>
                    <div className="mt-3 card p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">Quản lý thông tin cá nhân và bảo mật</div>
                            <a className="btn-primary" href="/profile">Mở Profile</a>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">Gói dịch vụ và thanh toán</div>
                            <a className="btn-outline" href="/plans">Chọn gói</a>
                        </div>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-lg font-medium">Bài gần đây</h2>
                    <div className="mt-3 card p-4 text-sm text-gray-400">
                        Chưa có bài làm. Hãy bắt đầu một bài mới!
                    </div>
                </section>
            </div>
        </div>
    );
}

function HeaderGreeting() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [badges, setBadges] = useState<{ target: string; level: string; plan: string }>({ target: "", level: "", plan: "" });
    useEffect(() => {
        const n = (typeof window !== "undefined" && localStorage.getItem("display_name")) || "";
        const target = (typeof window !== "undefined" && localStorage.getItem("target_band")) || "";
        const lvl = (typeof window !== "undefined" && localStorage.getItem("current_level")) || "";
        const plan = (typeof window !== "undefined" && localStorage.getItem("plan_name")) || "Free";
        setName(n);
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        try {
            if (token) {
                const payload = JSON.parse(atob(token.split(".")[1] || ""));
                setEmail(String(payload.sub || ""));
            }
        } catch { }
        setBadges({ target, level: lvl, plan });
    }, []);
    const initials = (name || email || "U").split(/\s+/).filter(Boolean).map(s => s[0]).slice(0, 2).join("").toUpperCase();
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Xin chào{name ? `, ${name}` : "!"}</h1>
                <p className="text-gray-400 mt-1">Chào mừng bạn quay lại luyện IELTS.</p>
                {(badges.target || badges.level || badges.plan) && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                        {badges.plan && (
                            <span className="px-2 py-1 rounded" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)" }}>Plan: {badges.plan}</span>
                        )}
                        {badges.target && (
                            <span className="px-2 py-1 rounded" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)" }}>Target: {badges.target}</span>
                        )}
                        {badges.level && (
                            <span className="px-2 py-1 rounded" style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.35)" }}>Level: {badges.level}</span>
                        )}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.35)" }}>
                    <span className="font-semibold text-sm">{initials}</span>
                </div>
                <a className="btn-outline" href="/profile">Profile</a>
            </div>
        </div>
    );
}


