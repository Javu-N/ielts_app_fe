"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "../components/AppHeader";
import { Toast } from "../components/Feedback";
import { getCurrentLevel, getCurrentUser, getDisplayName, getInitials, getTargetBand, logout, setCurrentLevel, setDisplayName, setTargetBand } from "@/utils/auth";

export default function ProfilePage() {
    const router = useRouter();
    const [email, setEmail] = useState<string | undefined>();
    const [exp, setExp] = useState<number | undefined>();
    const [name, setName] = useState<string>("");
    const [targetBand, setTarget] = useState<string>("");
    const [level, setLevel] = useState<string>("");
    const [saved, setSaved] = useState<boolean>(false);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            router.replace("/login");
            return;
        }
        setEmail(user.email);
        setExp(user.exp);
        setName(getDisplayName() ?? (user.email?.split("@")[0] ?? ""));
        setTarget(getTargetBand() ?? "");
        setLevel(getCurrentLevel() ?? "");
    }, [router]);

    function handleLogout() {
        logout();
        router.replace("/login");
    }

    function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Tính năng đổi mật khẩu (placeholder)");
    }

    const expText = useMemo(() => (exp ? new Date(exp * 1000).toLocaleString() : "—"), [exp]);

    return (
        <div className="min-h-screen">
            <AppHeader />
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold">Hồ sơ người dùng</h1>
                <p className="text-gray-400 mt-1">Quản lý tài khoản của bạn.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="card p-6">
                        <h2 className="text-lg font-medium">Thông tin</h2>
                        <div className="mt-3 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.35)" }}>
                                <span className="font-semibold">{getInitials(name || email || "User", "U")}</span>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Tên hiển thị</div>
                                <div className="font-medium">{name || "—"}</div>
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-400">Email</div>
                        <div className="mt-1">{email ?? "—"}</div>
                        <div className="mt-3 text-sm text-gray-400">Token hết hạn</div>
                        <div className="mt-1">{expText}</div>

                        <button className="btn-outline mt-6" onClick={handleLogout}>Đăng xuất</button>
                    </div>

                    <form className="card p-6" onSubmit={handleChangePassword}>
                        <h2 className="text-lg font-medium">Đổi mật khẩu</h2>
                        <div className="mt-3">
                            <label className="label" htmlFor="old">Mật khẩu hiện tại</label>
                            <input id="old" type="password" className="input" required />
                        </div>
                        <div className="mt-3">
                            <label className="label" htmlFor="new">Mật khẩu mới</label>
                            <input id="new" type="password" className="input" required />
                        </div>
                        <div className="mt-3">
                            <label className="label" htmlFor="confirm">Xác nhận mật khẩu</label>
                            <input id="confirm" type="password" className="input" required />
                        </div>
                        <button className="btn-primary mt-4" type="submit">Cập nhật</button>
                    </form>
                </div>

                <form
                    className="card p-6 mt-4 max-w-md"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setDisplayName(name.trim());
                        if (targetBand) setTargetBand(targetBand.trim());
                        if (level) setCurrentLevel(level.trim());
                        setSaved(true);
                    }}
                >
                    <h2 className="text-lg font-medium">Cập nhật hồ sơ</h2>
                    <div className="mt-3">
                        <label className="label" htmlFor="displayName">Tên hiển thị</label>
                        <input id="displayName" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên của bạn" />
                    </div>
                    <div className="mt-3">
                        <label className="label" htmlFor="target">Mục tiêu điểm IELTS (ví dụ 6.5)</label>
                        <input id="target" className="input" value={targetBand} onChange={(e) => setTarget(e.target.value)} placeholder="6.5" />
                    </div>
                    <div className="mt-3">
                        <label className="label" htmlFor="level">Cấp độ hiện tại</label>
                        <select id="level" className="input" value={level} onChange={(e) => setLevel(e.target.value)}>
                            <option value="">Chọn cấp độ</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <button className="btn-primary mt-4" type="submit">Lưu</button>
                </form>
                {saved && <Toast message="Đã cập nhật hồ sơ" type="success" onClose={() => setSaved(false)} />}
            </div>
        </div>
    );
}


