"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "../components/AppHeader";
import { EmptyState } from "../components/Feedback";

const MOCK_HISTORY = [
    { id: "a4", date: "2025-10-15", test: "Cambridge 17 - Test 2", overall: 7.0, status: "Completed" },
    { id: "a3", date: "2025-10-10", test: "Cambridge 16 - Test 1", overall: 6.5, status: "Completed" },
    { id: "aX", date: "2025-10-16", test: "Mock Pack - A1", overall: null, status: "In progress" },
];

export default function HistoryPage() {
    const router = useRouter();

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold">Lịch sử làm bài</h1>
                <p className="text-gray-400 mt-1">Xem lại các bài đã làm và resume bài đang dở.</p>

                {MOCK_HISTORY.length === 0 ? (
                    <div className="mt-6"><EmptyState title="Chưa có bài nào." action={<a className="btn-primary" href="/tests">Bắt đầu bài mới</a>} /></div>
                ) : (
                    <div className="card p-4 mt-6 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-left text-gray-400">
                                <tr>
                                    <th className="py-2">Ngày</th>
                                    <th className="py-2">Đề</th>
                                    <th className="py-2">Overall</th>
                                    <th className="py-2">Trạng thái</th>
                                    <th className="py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_HISTORY.map((h) => (
                                    <tr key={h.id} className="border-t border-[color:var(--card-border)]">
                                        <td className="py-2">{h.date}</td>
                                        <td className="py-2">{h.test}</td>
                                        <td className="py-2">{h.overall ?? "—"}</td>
                                        <td className="py-2">{h.status}</td>
                                        <td className="py-2 text-right">
                                            {h.status === "In progress" ? (
                                                <button className="btn-primary" onClick={() => alert("Resume (mock)")}>Resume</button>
                                            ) : (
                                                <a className="btn-outline" href={`/results/${h.id}`}>Xem kết quả</a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}


