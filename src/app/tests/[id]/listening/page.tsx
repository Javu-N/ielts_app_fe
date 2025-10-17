"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AnswerSheet } from "../../../components/AnswerSheet";

type Mode = "Practice" | "Mock";

type ListeningQuestion = {
    id: string;
    number: number;
    type: "MCQ" | "Blank";
    prompt: string;
    options?: string[]; // for MCQ
    answer?: string; // mock answer
};

const MOCK_LISTENING: ListeningQuestion[] = [
    { id: "q1", number: 1, type: "Blank", prompt: "Write ONE WORD ONLY: The lecture topic is _____.", answer: "migration" },
    { id: "q2", number: 2, type: "MCQ", prompt: "What is the main reason for delays?", options: ["Weather", "Staff shortage", "Road works"], answer: "Weather" },
    { id: "q3", number: 3, type: "Blank", prompt: "Complete: The museum opens at _____.", answer: "9am" },
    { id: "q4", number: 4, type: "MCQ", prompt: "Which bus goes to the city center?", options: ["Bus 14", "Bus 24", "Bus 44"], answer: "Bus 24" },
];

export default function ListeningPage() {
    const router = useRouter();
    const params = useParams();
    const search = useSearchParams();
    const testId = useMemo(() => String(params?.id ?? ""), [params]);

    // read config
    const mode = (search.get("mode") as Mode) || "Practice";
    const initialTime = Number(search.get("time") || 30); // minutes for demo
    const showAnswers = (search.get("showAnswers") ?? "true") === "true";

    // simple timer placeholder
    const [secondsLeft, setSecondsLeft] = useState<number>(initialTime * 60);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    useEffect(() => {
        const id = setInterval(() => {
            setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const ss = String(secondsLeft % 60).padStart(2, "0");

    const [currentNumber, setCurrentNumber] = useState<number>(1);
    const [answered, setAnswered] = useState<number[]>([]);
    const progress = Math.round(((answered.length) / MOCK_LISTENING.length) * 100);

    function markAnswered(n: number) {
        setAnswered((prev) => (prev.includes(n) ? prev : [...prev, n]));
    }

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Listening • Test {testId}</h1>
                    <p className="text-gray-400 text-sm mt-1">Mode: {mode} • Show answers: {String(showAnswers)}</p>
                </div>
                <div className="card px-4 py-2 text-lg">⏱ {mm}:{ss}</div>
            </div>

            <div className="card p-4 mt-4">
                <div className="text-sm text-gray-400">Tiến độ (placeholder)</div>
                <div className="w-full h-2 bg-white/10 rounded mt-2">
                    <div className="h-2 rounded" style={{ width: `${progress}%`, background: "var(--brand)" }} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_LISTENING.map((q) => (
                        <div key={q.id} id={`q-${q.number}`} className="card p-4">
                            <div className="text-sm text-gray-400">Question {q.number} • {q.type}</div>
                            <div className="mt-2">{q.prompt}</div>

                            {q.type === "Blank" && (
                                <input className="input mt-3" placeholder="Your answer" onChange={() => { markAnswered(q.number); setCurrentNumber(q.number); }} />
                            )}

                            {q.type === "MCQ" && q.options && (
                                <div className="mt-3 space-y-2">
                                    {q.options.map((op) => (
                                        <label key={op} className="flex items-center gap-2">
                                            <input type="radio" name={q.id} value={op} onChange={() => { markAnswered(q.number); setCurrentNumber(q.number); }} />
                                            <span>{op}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {showAnswers && (
                                <div className="mt-3 text-sm text-indigo-300">Answer: {q.answer}</div>
                            )}
                        </div>
                    ))}
                </div>

                <div>
                    <AnswerSheet total={MOCK_LISTENING.length} current={currentNumber} answered={answered} />
                </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
                <a className="btn-outline" href={`/tests/${testId}/start`}>Quay lại cấu hình</a>
                <button className="btn-primary" onClick={() => router.push(`/tests/${testId}/reading?mode=${mode}&time=${initialTime}&showAnswers=${showAnswers}`)}>
                    Tiếp tục Reading →
                </button>
            </div>
        </div>
    );
}


