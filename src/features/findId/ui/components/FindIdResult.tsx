"use client";

import Link from "next/link";
import { findIdPageStyles } from "@/ui/styles/findIdPageStyles";
import type { FindIdState } from "@/features/findId/domain/state/FindIdState";

interface FindIdResultProps {
    readonly result: FindIdState;
}

export default function FindIdResult({ result }: FindIdResultProps) {
    const isFound = result.status === "FOUND";

    const handlePreparePasswordPage = () => {
        alert("비밀번호 찾기 기능은 준비 중입니다.");
    };

    return (
        <div className={findIdPageStyles.resultBox}>
            {isFound ? (
                <>
                    <p className={findIdPageStyles.resultLabel}>
                        아이디 찾기가 완료되었습니다.
                    </p>
                    <p className={findIdPageStyles.resultValue}>
                        {result.loginId}
                    </p>
                </>
            ) : (
                <p className={findIdPageStyles.resultLabel}>
                    조회 결과가 없습니다.
                </p>
            )}

            <div className={findIdPageStyles.resultButtonGroup}>
                <Link href="/login" className={findIdPageStyles.resultButton}>
                    로그인
                </Link>

                <button
                    type="button"
                    onClick={handlePreparePasswordPage}
                    className={findIdPageStyles.secondaryResultButton}
                >
                    비밀번호 찾기
                </button>
            </div>
        </div>
    );
}