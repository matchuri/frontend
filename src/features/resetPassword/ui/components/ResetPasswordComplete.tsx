"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

export default function ResetPasswordComplete() {
    return (
        <div className={authPageStyles.completionContainer}>
            <div className={authPageStyles.completionIcon}>
                <Check size={42} strokeWidth={2.2} aria-hidden="true" />
            </div>

            <h1 className={authPageStyles.completionTitle}>
                비밀번호 변경 완료
            </h1>

            <p className={authPageStyles.completionDescription}>
                비밀번호가 성공적으로 변경되었습니다.
                <br />
                새 비밀번호로 로그인해 주세요.
            </p>

            <Link
                href="/login"
                className={`${authPageStyles.primaryButton} ${authPageStyles.completionButton}`}
            >
                로그인
            </Link>
        </div>
    );
}