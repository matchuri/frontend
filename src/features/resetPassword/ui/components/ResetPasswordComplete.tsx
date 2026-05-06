"use client";

import Link from "next/link";
import { resetPasswordPageStyles } from "@/ui/styles/resetPasswordPageStyles";

export default function ResetPasswordComplete() {
    return (
        <div className={resetPasswordPageStyles.resultBox}>
            <p className={resetPasswordPageStyles.resultLabel}>
                비밀번호 변경이 완료되었습니다.
            </p>

            <Link href="/login" className={resetPasswordPageStyles.resultButton}>
                로그인 화면으로 이동
            </Link>
        </div>
    );
}