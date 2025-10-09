"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, type LoginRequest } from "@/utils/api";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState<LoginRequest>({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            const { token } = await login(form);
            if (typeof window !== "undefined") {
                localStorage.setItem("auth_token", token);
            }
            router.push("/");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md border rounded-xl p-6 bg-white/5">
                <h1 className="text-2xl font-semibold mb-1">Đăng nhập</h1>
                <p className="text-sm text-gray-500 mb-6">Trở lại luyện tập IELTS</p>

                {error ? (
                    <div className="mb-4 text-sm text-red-600" role="alert">
                        {error}
                    </div>
                ) : null}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-md border px-3 py-2 bg-transparent"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1" htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full rounded-md border px-3 py-2 bg-transparent"
                            placeholder="••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-black text-white py-2 disabled:opacity-50"
                    >
                        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                <div className="mt-4 text-sm">
                    Chưa có tài khoản? <a className="underline" href="/register">Đăng ký</a>
                </div>
            </div>
        </div>
    );
}


