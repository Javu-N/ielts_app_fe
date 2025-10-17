"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppHeader } from "../../components/AppHeader";

const MOCK_RESULT = {
    overall: 7.0,
    skills: { listening: 7.5, reading: 7.0, writing: 6.5, speaking: 7.0 },
    sections: [
        { name: "Listening", correct: 32, total: 40 },
        { name: "Reading", correct: 30, total: 40 },
    ],
};

export default function ResultDetailPage() {
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold">Kết quả bài {String(params?.attemptId)}</h1>
                <p className="text-gray-400 mt-1">Chi tiết điểm và phân tích.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="card p-4">
                        <div className="text-sm text-gray-400">Overall</div>
                        <div className="text-3xl font-semibold mt-2">{MOCK_RESULT.overall}</div>
                    </div>
                    {Object.entries(MOCK_RESULT.skills).map(([k, v]) => (
                        <div key={k} className="card p-4">
                            <div className="text-sm text-gray-400">{k[0].toUpperCase() + k.slice(1)}</div>
                            <div className="text-2xl font-medium mt-2">{v as number}</div>
                        </div>
                    ))}
                </div>

                <div className="card p-4 mt-6">
                    <h2 className="text-lg font-medium">Phân tích theo phần</h2>
                    <ul className="mt-3 space-y-2 text-sm">
                        {MOCK_RESULT.sections.map((s) => (
                            <li key={s.name} className="flex items-center justify-between">
                                <span>{s.name}</span>
                                <span>{s.correct}/{s.total} đúng</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 flex items-center gap-2">
                    <a className="btn-outline" href="/history">Quay lại lịch sử</a>
                    <button className="btn-primary" onClick={() => alert("Export PDF (mock)")}>Xuất PDF</button>
                </div>
            </div>
        </div>
    );
}


