"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppHeader } from "../../../components/AppHeader";

const MOCK_ANSWERS = [
    { n: 1, your: "migration", correct: "migration" },
    { n: 2, your: "Road works", correct: "Weather" },
    { n: 3, your: "9am", correct: "9am" },
];

export default function ReviewPage() {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold">Review câu trả lời • Test {String(params?.id)}</h1>
                <p className="text-gray-400 mt-1">Xem lại đáp án (mock).</p>

                <div className="card p-4 mt-6">
                    <table className="w-full text-sm">
                        <thead className="text-left text-gray-400">
                            <tr>
                                <th className="py-2">#</th>
                                <th className="py-2">Của bạn</th>
                                <th className="py-2">Đáp án đúng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_ANSWERS.map((a) => (
                                <tr key={a.n} className="border-t border-[color:var(--card-border)]">
                                    <td className="py-2">{a.n}</td>
                                    <td className="py-2" style={{ color: a.your === a.correct ? "#22c55e" : "#f87171" }}>{a.your}</td>
                                    <td className="py-2">{a.correct}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex items-center gap-2">
                    <a className="btn-outline" href={`/tests/${String(params?.id)}/listening`}>Quay lại bài</a>
                </div>
            </div>
        </div>
    );
}


