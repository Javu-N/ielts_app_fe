"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "../components/AppHeader";
import { setDisplayName, setTargetBand, setCurrentLevel, setPlan } from "@/utils/auth";

export default function OnboardingPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [target, setTarget] = useState("6.5");
    const [level, setLevel] = useState("Intermediate");
    const [plan, setPlanName] = useState("Free");

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    function start() {
        if (name.trim()) setDisplayName(name.trim());
        setTargetBand(target);
        setCurrentLevel(level);
        setPlan(plan);
        router.replace("/dashboard");
    }

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-semibold">Bắt đầu nhanh</h1>
                <p className="text-gray-400 mt-1">Thiết lập mục tiêu và thông tin cơ bản.</p>

                <div className="card p-6 mt-6 space-y-4">
                    <div>
                        <label className="label" htmlFor="name">Tên hiển thị</label>
                        <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên của bạn" />
                    </div>
                    <div>
                        <label className="label" htmlFor="target">Mục tiêu IELTS</label>
                        <select id="target" className="input" value={target} onChange={(e) => setTarget(e.target.value)}>
                            {["5.5", "6.0", "6.5", "7.0", "7.5", "8.0"].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label" htmlFor="level">Cấp độ hiện tại</label>
                        <select id="level" className="input" value={level} onChange={(e) => setLevel(e.target.value)}>
                            {(["Beginner", "Intermediate", "Advanced"]) as const}.map
                        </select>
                    </div>
                    <div>
                        <label className="label" htmlFor="plan">Gói sử dụng</label>
                        <select id="plan" className="input" value={plan} onChange={(e) => setPlanName(e.target.value)}>
                            <option value="Free">Free</option>
                            <option value="Premium">Premium</option>
                        </select>
                    </div>
                    <button className="btn-primary" onClick={start}>Bắt đầu</button>
                </div>
            </div>
        </div>
    );
}


