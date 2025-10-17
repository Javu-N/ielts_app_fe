"use client";

import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { useRouter } from "next/navigation";

type TestItem = {
    id: string;
    title: string;
    type: "Academic" | "General";
    skills: Array<"Listening" | "Reading" | "Writing" | "Speaking">;
    level: "Easy" | "Medium" | "Hard";
    attempts: number;
    bestBand?: number;
};

const MOCK_TESTS: TestItem[] = [
    { id: "t1", title: "Cambridge 16 - Test 1", type: "Academic", skills: ["Listening", "Reading", "Writing", "Speaking"], level: "Medium", attempts: 3, bestBand: 7.0 },
    { id: "t2", title: "Cambridge 17 - Test 2", type: "Academic", skills: ["Listening", "Reading"], level: "Hard", attempts: 1, bestBand: 6.5 },
    { id: "t3", title: "General Collection - 05", type: "General", skills: ["Reading", "Writing"], level: "Easy", attempts: 0 },
    { id: "t4", title: "Mock Pack - A1", type: "General", skills: ["Listening", "Speaking"], level: "Medium", attempts: 2, bestBand: 6.0 },
];

export default function TestsPage() {
    const router = useRouter();
    const [type, setType] = useState<"All" | "Academic" | "General">("All");
    const [skill, setSkill] = useState<"All" | "Listening" | "Reading" | "Writing" | "Speaking">("All");
    const [level, setLevel] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    const filtered = useMemo(() => {
        return MOCK_TESTS.filter((t) =>
            (type === "All" || t.type === type) &&
            (skill === "All" || t.skills.includes(skill)) &&
            (level === "All" || t.level === level) &&
            (query.trim() === "" || t.title.toLowerCase().includes(query.toLowerCase()))
        );
    }, [type, skill, level, query]);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold">Danh mục đề thi</h1>
                <p className="text-gray-400 mt-1">Lọc theo hệ Academic/General, kỹ năng và mức độ.</p>

                <div className="card p-4 mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                        <label className="label" htmlFor="type">Hệ</label>
                        <select id="type" className="input" value={type} onChange={(e) => setType(e.target.value as any)}>
                            <option value="All">All</option>
                            <option value="Academic">Academic</option>
                            <option value="General">General</option>
                        </select>
                    </div>
                    <div>
                        <label className="label" htmlFor="skill">Kỹ năng</label>
                        <select id="skill" className="input" value={skill} onChange={(e) => setSkill(e.target.value as any)}>
                            <option value="All">All</option>
                            <option value="Listening">Listening</option>
                            <option value="Reading">Reading</option>
                            <option value="Writing">Writing</option>
                            <option value="Speaking">Speaking</option>
                        </select>
                    </div>
                    <div>
                        <label className="label" htmlFor="level">Mức độ</label>
                        <select id="level" className="input" value={level} onChange={(e) => setLevel(e.target.value as any)}>
                            <option value="All">All</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label className="label" htmlFor="q">Tìm kiếm</label>
                        <input id="q" className="input" placeholder="Cambridge..." value={query} onChange={(e) => setQuery(e.target.value)} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {filtered.map((t) => (
                        <div key={t.id} className="card p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <div className="text-sm text-gray-400">{t.type} • {t.level}</div>
                                    <h3 className="text-lg font-medium mt-1">{t.title}</h3>
                                </div>
                                {typeof t.bestBand === "number" ? (
                                    <div className="px-2 py-1 text-sm rounded-md" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)" }}>
                                        Best {t.bestBand}
                                    </div>
                                ) : null}
                            </div>
                            <div className="mt-3 text-sm text-gray-400">Kỹ năng: {t.skills.join(", ")}</div>
                            <div className="mt-1 text-sm text-gray-400">Lượt làm: {t.attempts}</div>
                            <div className="mt-4 flex items-center gap-2">
                                <a className="btn-primary" href={`/tests/${t.id}/start`}>Bắt đầu</a>
                                <a className="btn-outline" href={`/results?test=${t.id}`}>Xem kết quả</a>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="card p-6 text-center text-gray-400 col-span-full">Không tìm thấy đề phù hợp.</div>
                    )}
                </div>
            </div>
        </div>
    );
}


