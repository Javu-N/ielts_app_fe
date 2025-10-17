"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPlan, setPlan } from "@/utils/auth";
import { AppHeader } from "../components/AppHeader";

export default function PlansPage() {
    const router = useRouter();
    const [current, setCurrent] = useState<string>("");

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
        const p = getPlan() ?? "Free";
        setCurrent(p);
    }, [router]);

    function choose(plan: string) {
        setPlan(plan);
        setCurrent(plan);
    }

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold">Gói dịch vụ</h1>
                <p className="text-gray-400 mt-1">Chọn gói phù hợp nhu cầu của bạn.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <PlanCard
                        name="Free"
                        price="0 đ"
                        features={["Luyện tập cơ bản", "Một số đề mẫu", "Giới hạn tính năng nâng cao"]}
                        active={current === "Free"}
                        onChoose={() => choose("Free")}
                    />
                    <PlanCard
                        name="Premium"
                        price="199.000 đ/tháng"
                        features={["Full đề & thống kê", "Gợi ý nâng cao", "Không giới hạn tính năng"]}
                        active={current === "Premium"}
                        onChoose={() => choose("Premium")}
                    />
                </div>

                <div className="mt-6">
                    <button className="btn-primary" onClick={() => router.push("/dashboard")}>Quay lại Dashboard</button>
                </div>
            </div>
        </div>
    );
}

function PlanCard(props: { name: string; price: string; features: string[]; active: boolean; onChoose: () => void; }) {
    const { name, price, features, active, onChoose } = props;
    return (
        <div className="card p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <div className="text-gray-400">{price}</div>
                </div>
                {active && (
                    <span className="px-2 py-1 rounded text-sm" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)" }}>Đang dùng</span>
                )}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
                {features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                        <span>•</span>
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
            <button className="btn-primary mt-4" onClick={onChoose}>{active ? "Đã chọn" : "Chọn gói"}</button>
        </div>
    );
}


