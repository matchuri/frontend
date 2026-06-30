"use client";

import { useOAuthCallback } from "@/features/auth/application/hooks/useOAuthCallback";

export default function OAuthCallbackPage() {
    useOAuthCallback();

    return (
        <div className="flex items-center justify-center h-screen">
            <p>로그인 처리 중...</p>
        </div>
    );
}