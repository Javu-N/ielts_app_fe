"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-semibold">IELTS Practice</h1>
        <p className="text-gray-500 mt-2">Đăng nhập hoặc tạo tài khoản để bắt đầu.</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="/login"
            className="rounded-md bg-black text-white px-5 py-2"
          >
            Đăng nhập
          </a>
          <a
            href="/register"
            className="rounded-md border px-5 py-2"
          >
            Đăng ký
          </a>
        </div>
      </main>
    </div>
  );
}
