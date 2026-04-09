"use client";

import { googleButtonStyles } from "@/ui/styles/googleButtonStyles";

export default function GoogleLoginButton() {
    const handleGoogleLogin = () => {
        // TODO: 구글 로그인 연결 예정
    };

    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
            className={`${googleButtonStyles.base} ${googleButtonStyles.default}`}
        >
            Google 계정으로 계속하기
        </button>
    );
}
