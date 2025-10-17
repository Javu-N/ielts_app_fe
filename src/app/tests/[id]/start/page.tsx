"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type Mode = "Practice" | "Mock";

export default function TestStartPage() {
    const router = useRouter();
    const params = useParams();
    const search = useSearchParams();
    const testId = useMemo(() => String(params?.id ?? ""), [params]);

    const [mode, setMode] = useState<Mode>((search.get("mode") as Mode) || "Practice");
    const [time, setTime] = useState<number>(Number(search.get("time")) || 90);
    const [showAnswers, setShowAnswers] = useState<boolean>((search.get("showAnswers") ?? "true") === "true");

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const q = new URLSearchParams({ mode, time: String(time), showAnswers: String(showAnswers) });
        router.push(`/tests/${testId}/listening?${q.toString()}`);
    }

    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold">Cấu hình bài thi</h1>
            <p className="text-gray-400 mt-1">Thiết lập chế độ và thời gian trước khi bắt đầu.</p>

            <form onSubmit={onSubmit} className="card p-6 mt-6 space-y-4">
                <div>
                    <label className="label" htmlFor="mode">Chế độ</label>
                    <select id="mode" className="input" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
                        <option value="Practice">Practice</option>
                        <option value="Mock">Mock</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        Practice: linh hoạt, có thể xem đáp án. Mock: nghiêm ngặt, khóa xem đáp án và thời gian.
                    </p>
                </div>

                <div>
                    <label className="label" htmlFor="time">Thời gian (phút)</label>
                    <input
                        id="time"
                        type="number"
                        min={30}
                        max={180}
                        className="input"
                        value={time}
                        onChange={(e) => setTime(Number(e.target.value))}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input id="show" type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} />
                    <label htmlFor="show">Cho phép hiển thị đáp án sau mỗi phần</label>
                </div>

                <div className="pt-2 flex items-center gap-2">
                    <button type="submit" className="btn-primary">Bắt đầu Listening</button>
                    <a href="/tests" className="btn-outline">Quay lại danh mục</a>
                </div>
            </form>
        </div>
    );
}


