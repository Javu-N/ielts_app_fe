"use client";

import { AppHeader } from "../components/AppHeader";

export default function DevPanelPage() {
    function resetAll() {
        localStorage.clear();
        alert("Đã reset localStorage (mock)");
    }
    function seed() {
        localStorage.setItem("display_name", "Khoa");
        localStorage.setItem("target_band", "7.0");
        localStorage.setItem("current_level", "Intermediate");
        localStorage.setItem("plan_name", "Premium");
        alert("Đã seed dữ liệu (mock)");
    }
    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold">Dev Panel (Mock)</h1>
                <p className="text-gray-400 mt-1">Các tiện ích hỗ trợ demo.</p>
                <div className="card p-6 mt-6 space-y-3">
                    <button className="btn-outline" onClick={seed}>Seed dữ liệu</button>
                    <button className="btn-primary" onClick={resetAll}>Reset localStorage</button>
                </div>
            </div>
        </div>
    );
}


