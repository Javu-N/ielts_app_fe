"use client";

import { useEffect } from "react";
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
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold">Xin chào!</h1>
            <p className="text-gray-400 mt-1">Chào mừng bạn quay lại luyện IELTS.</p>

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
                <h2 className="text-lg font-medium">Bài gần đây</h2>
                <div className="mt-3 card p-4 text-sm text-gray-400">
                    Chưa có bài làm. Hãy bắt đầu một bài mới!
                </div>
            </section>
        </div>
    );
}


