"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "../components/AppHeader";

type Card = { id: string; front: string; back: string };
const MOCK_CARDS: Card[] = [
    { id: "c1", front: "alleviate", back: "to make less severe" },
    { id: "c2", front: "meticulous", back: "very careful and precise" },
];

export default function BookmarksPage() {
    const router = useRouter();
    const [reveal, setReveal] = useState<string | null>(null);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold">Bookmarks & Flashcards</h1>
                <p className="text-gray-400 mt-1">Ôn lại các mục đã lưu (mock).</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {MOCK_CARDS.map((c) => (
                        <div key={c.id} className="card p-4">
                            <div className="font-medium">{c.front}</div>
                            {reveal === c.id ? (
                                <div className="mt-2 text-gray-300">{c.back}</div>
                            ) : (
                                <button className="btn-outline mt-2" onClick={() => setReveal(c.id)}>Reveal</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


