"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "../components/AppHeader";
import { Toast } from "../components/Feedback";

export default function SettingsPage() {
    const router = useRouter();
    const [theme, setTheme] = useState("dark");
    const [lang, setLang] = useState("vi");
    const [font, setFont] = useState("base");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) router.replace("/login");
    }, [router]);

    function save() {
        localStorage.setItem("pref_theme", theme);
        localStorage.setItem("pref_lang", lang);
        localStorage.setItem("pref_font", font);
        setSaved(true);
    }

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold">Cài đặt</h1>
                <p className="text-gray-400 mt-1">Theme, ngôn ngữ và cỡ chữ.</p>

                <div className="card p-6 mt-6 space-y-4">
                    <div>
                        <label className="label" htmlFor="theme">Theme</label>
                        <select id="theme" className="input" value={theme} onChange={(e) => setTheme(e.target.value)}>
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                    </div>
                    <div>
                        <label className="label" htmlFor="lang">Ngôn ngữ</label>
                        <select id="lang" className="input" value={lang} onChange={(e) => setLang(e.target.value)}>
                            <option value="vi">Tiếng Việt</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <div>
                        <label className="label" htmlFor="font">Cỡ chữ</label>
                        <select id="font" className="input" value={font} onChange={(e) => setFont(e.target.value)}>
                            <option value="sm">Small</option>
                            <option value="base">Base</option>
                            <option value="lg">Large</option>
                        </select>
                    </div>
                    <button className="btn-primary" onClick={save}>Lưu</button>
                </div>
                {saved && <Toast message="Đã lưu cài đặt" type="success" onClose={() => setSaved(false)} />}
            </div>
        </div>
    );
}


