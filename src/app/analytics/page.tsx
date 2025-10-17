"use client";

import { useEffect, useMemo } from "react";
import { AppHeader } from "../components/AppHeader";
import { useRouter } from "next/navigation";

type Attempt = {
    id: string;
    date: string; // ISO
    overall: number;
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
};

const MOCK_ATTEMPTS: Attempt[] = [
    { id: "a1", date: "2025-10-01", overall: 6.0, listening: 6.5, reading: 6.0, writing: 5.5, speaking: 6.0 },
    { id: "a2", date: "2025-10-05", overall: 6.5, listening: 7.0, reading: 6.5, writing: 6.0, speaking: 6.5 },
    { id: "a3", date: "2025-10-10", overall: 6.5, listening: 7.0, reading: 6.5, writing: 6.0, speaking: 6.5 },
    { id: "a4", date: "2025-10-15", overall: 7.0, listening: 7.5, reading: 7.0, writing: 6.5, speaking: 7.0 },
];

export default function AnalyticsPage() {
    const router = useRouter();

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    const dates = useMemo(() => MOCK_ATTEMPTS.map(a => a.date), []);
    const overall = useMemo(() => MOCK_ATTEMPTS.map(a => a.overall), []);
    const listening = useMemo(() => MOCK_ATTEMPTS.map(a => a.listening), []);
    const reading = useMemo(() => MOCK_ATTEMPTS.map(a => a.reading), []);
    const writing = useMemo(() => MOCK_ATTEMPTS.map(a => a.writing), []);
    const speaking = useMemo(() => MOCK_ATTEMPTS.map(a => a.speaking), []);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold">Phân tích tiến trình</h1>
                <p className="text-gray-400 mt-1">Tiến độ học và điểm số theo thời gian (mẫu).</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                    <LineCard title="Overall Band" labels={dates} series={overall} color="var(--brand)" />
                    <LineCard title="Listening" labels={dates} series={listening} color="rgba(99,102,241,0.8)" />
                    <LineCard title="Reading" labels={dates} series={reading} color="rgba(56,189,248,0.8)" />
                    <LineCard title="Writing" labels={dates} series={writing} color="rgba(250,204,21,0.8)" />
                    <LineCard title="Speaking" labels={dates} series={speaking} color="rgba(34,197,94,0.8)" />
                </div>

                <div className="card p-6 mt-6 overflow-x-auto">
                    <h2 className="text-lg font-medium">Lịch sử bài làm</h2>
                    <table className="w-full text-sm mt-3">
                        <thead className="text-left text-gray-400">
                            <tr>
                                <th className="py-2">Ngày</th>
                                <th className="py-2">Overall</th>
                                <th className="py-2">L</th>
                                <th className="py-2">R</th>
                                <th className="py-2">W</th>
                                <th className="py-2">S</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_ATTEMPTS.map((a) => (
                                <tr key={a.id} className="border-t border-[color:var(--card-border)]">
                                    <td className="py-2">{a.date}</td>
                                    <td className="py-2">{a.overall}</td>
                                    <td className="py-2">{a.listening}</td>
                                    <td className="py-2">{a.reading}</td>
                                    <td className="py-2">{a.writing}</td>
                                    <td className="py-2">{a.speaking}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function LineCard({ title, labels, series, color }: { title: string; labels: string[]; series: number[]; color: string; }) {
    // Lightweight inline SVG line chart so we don't add deps
    const w = 500; const h = 160; const pad = 28;
    const min = Math.min(...series, 0);
    const max = Math.max(...series, 9);
    const sx = (i: number) => pad + (i * (w - 2 * pad)) / Math.max(1, series.length - 1);
    const sy = (v: number) => h - pad - ((v - min) * (h - 2 * pad)) / Math.max(1, max - min);
    const d = series.map((v, i) => `${i === 0 ? "M" : "L"}${sx(i)},${sy(v)}`).join(" ");
    const gridY = Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4);
    return (
        <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{title}</h3>
                <div className="text-xs text-gray-400">{labels[0]} → {labels[labels.length - 1]}</div>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
                {/* grid */}
                {gridY.map((gy, i) => (
                    <line key={i} x1={pad} y1={sy(gy)} x2={w - pad} y2={sy(gy)} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                ))}
                {/* axis */}
                <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                {/* line */}
                <path d={d} fill="none" stroke={color} strokeWidth="2.5" />
                {/* points */}
                {series.map((v, i) => (
                    <circle key={i} cx={sx(i)} cy={sy(v)} r="3" fill={color} />
                ))}
            </svg>
        </div>
    );
}


