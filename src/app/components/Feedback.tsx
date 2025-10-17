"use client";

import { useEffect, useState } from "react";

export function Toast({ message, type = "info" as "info" | "success" | "error", onClose }: { message: string; type?: "info" | "success" | "error"; onClose?: () => void; }) {
    useEffect(() => {
        const id = setTimeout(() => onClose?.(), 2500);
        return () => clearTimeout(id);
    }, [onClose]);
    const color = type === "success" ? "rgba(34,197,94,0.9)" : type === "error" ? "rgba(239,68,68,0.9)" : "rgba(99,102,241,0.9)";
    return (
        <div className="fixed bottom-4 right-4 px-3 py-2 rounded text-sm text-white" style={{ background: color }}>
            {message}
        </div>
    );
}

export function Skeleton({ className = "h-6 w-full" }) {
    return <div className={className} style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 37%, rgba(255,255,255,0.06) 63%)", backgroundSize: "400% 100%", animation: "pulse 1.4s ease infinite" }} />;
}

export function EmptyState({ title, action }: { title: string; action?: React.ReactNode }) {
    return (
        <div className="card p-6 text-center text-gray-400">
            <div>{title}</div>
            {action && <div className="mt-3">{action}</div>}
        </div>
    );
}


