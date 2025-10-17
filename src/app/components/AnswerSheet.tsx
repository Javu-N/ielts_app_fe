"use client";

export function AnswerSheet({ total = 40, current = 1, answered = [] as number[] }) {
    return (
        <aside className="card p-3 w-full sm:w-64">
            <div className="font-medium mb-2">Answer Sheet</div>
            <div className="grid grid-cols-5 gap-2 text-sm">
                {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
                    const isAnswered = answered.includes(n);
                    const isCurrent = n === current;
                    return (
                        <a
                            key={n}
                            href={`#q-${n}`}
                            className="flex items-center justify-center h-8 rounded"
                            style={{
                                background: isCurrent ? "rgba(99,102,241,0.3)" : isAnswered ? "rgba(34,197,94,0.2)" : "transparent",
                                border: "1px solid var(--card-border)",
                            }}
                        >
                            {n}
                        </a>
                    );
                })}
            </div>
        </aside>
    );
}


