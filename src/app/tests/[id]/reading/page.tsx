"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AnswerSheet } from "../../../components/AnswerSheet";

type Mode = "Practice" | "Mock";

type ReadingQuestion = {
    id: string;
    number: number;
    type: "TFNG" | "MCQ" | "Completion";
    prompt: string;
    options?: string[];
    answer?: string;
};

const PASSAGE = `
The history of tea is long and complex, spreading across multiple cultures over the course of thousands of years.
According to legend, tea was discovered in China by Emperor Shen Nong.
As the popularity of tea spread, different preparation methods and ceremonies evolved.
In Britain, tea became a staple of social life, giving rise to the tradition of afternoon tea.
Modern research continues to investigate the health benefits and cultural significance of tea consumption.
`;

const MOCK_READING: ReadingQuestion[] = [
    { id: "r1", number: 1, type: "TFNG", prompt: "Tea was first discovered in Japan.", answer: "False" },
    { id: "r2", number: 2, type: "Completion", prompt: "Tea became a staple of ______ life in Britain.", answer: "social" },
    { id: "r3", number: 3, type: "MCQ", prompt: "Who is credited with discovering tea?", options: ["Emperor Qin Shi Huang", "Emperor Shen Nong", "Confucius"], answer: "Emperor Shen Nong" },
];

export default function ReadingPage() {
    const router = useRouter();
    const params = useParams();
    const search = useSearchParams();
    const testId = useMemo(() => String(params?.id ?? ""), [params]);

    const mode = (search.get("mode") as Mode) || "Practice";
    const initialTime = Number(search.get("time") || 60); // minutes
    const showAnswers = (search.get("showAnswers") ?? "true") === "true";

    const [secondsLeft, setSecondsLeft] = useState<number>(initialTime * 60);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    useEffect(() => {
        const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(id);
    }, []);

    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const ss = String(secondsLeft % 60).padStart(2, "0");

    const [currentNumber, setCurrentNumber] = useState<number>(1);
    const [answered, setAnswered] = useState<number[]>([]);
    function markAnswered(n: number) {
        setAnswered((prev) => (prev.includes(n) ? prev : [...prev, n]));
        setCurrentNumber(n);
    }

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Reading • Test {testId}</h1>
                    <p className="text-gray-400 text-sm mt-1">Mode: {mode} • Show answers: {String(showAnswers)}</p>
                </div>
                <div className="card px-4 py-2 text-lg">⏱ {mm}:{ss}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
                <div>
                    <article className="card p-4 leading-7 text-gray-200 whitespace-pre-wrap">
                        {PASSAGE}
                    </article>

                    <section className="space-y-4 mt-4">
                        {MOCK_READING.map((q) => (
                            <div key={q.id} className="card p-4">
                                <div className="text-sm text-gray-400">Question {q.number} • {q.type}</div>
                                <div className="mt-2">{q.prompt}</div>

                                {q.type === "Completion" && (
                                    <input className="input mt-3" placeholder="Your answer" onChange={() => markAnswered(q.number)} />
                                )}

                                {q.type === "TFNG" && (
                                    <div className="mt-3 flex gap-3 text-sm">
                                        {["True", "False", "Not Given"].map((op) => (
                                            <label key={op} className="flex items-center gap-2">
                                                <input type="radio" name={q.id} value={op} onChange={() => markAnswered(q.number)} />
                                                <span>{op}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {q.type === "MCQ" && q.options && (
                                    <div className="mt-3 space-y-2">
                                        {q.options.map((op) => (
                                            <label key={op} className="flex items-center gap-2">
                                                <input type="radio" name={q.id} value={op} onChange={() => markAnswered(q.number)} />
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
                        <div className="mt-4 flex items-center gap-2">
                            <a className="btn-outline" href={`/tests/${testId}/listening?mode=${mode}&time=${initialTime}&showAnswers=${showAnswers}`}>← Quay lại Listening</a>
                            <button className="btn-primary" onClick={() => router.push(`/tests/${testId}/writing?mode=${mode}&time=${initialTime}&showAnswers=${showAnswers}`)}>
                                Tiếp tục Writing →
                            </button>
                        </div>
                    </section>
                </div>

                <div>
                    <AnswerSheet total={MOCK_READING.length} current={currentNumber} answered={answered} />
                </div>
            </div>
        </div>
    );
}


