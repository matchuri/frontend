"use client";

import { useAuth } from "../state/hooks/useAuth";

export default function StateTestPage() {
    const { user, isLoggedIn, login, logout } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Zustand 상태 테스트</h1>

            <div>
                <p>유저: {user ?? "없음"}</p>
                <p>로그인 여부: {isLoggedIn ? "true" : "false"}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => login("사용자1")}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    로그인
                </button>

                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}