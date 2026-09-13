"use client";

import Link from "next/link";
import { Check, CircleAlert } from "lucide-react";

import { authPageStyles } from "@/ui/styles/authPageStyles";
import type { FindIdState } from "@/features/findId/domain/state/FindIdState";

interface FindIdResultProps {
    readonly result: FindIdState;
}

export default function FindIdResult({ result }: FindIdResultProps) {
    const isFound = result.status === "FOUND";

    return (
        <div className={authPageStyles.completionContainer}>
            <div
                className={
                    isFound
                        ? authPageStyles.completionIcon
                        : authPageStyles.completionErrorIcon
                }
            >
                {isFound ? (
                    <Check size={42} strokeWidth={2.2} aria-hidden="true" />
                ) : (
                    <CircleAlert size={42} strokeWidth={2} aria-hidden="true" />
                )}
            </div>

            <h1 className={authPageStyles.completionTitle}>
                {isFound ? "아이디 찾기 완료" : "아이디를 찾지 못했어요"}
            </h1>

            {isFound ? (
                <>
                    <p className={authPageStyles.completionDescription}>
                        가입한 아이디를 확인해 주세요.
                    </p>

                    <div className={authPageStyles.completionValueBox}>
                        <p className={authPageStyles.completionValue}>
                            {result.loginId}
                        </p>
                    </div>
                </>
            ) : (
                <p className={authPageStyles.completionDescription}>
                    조회 결과가 없습니다.
                </p>
            )}

            <div className={authPageStyles.completionButtonGroup}>
                <Link href="/login" className={authPageStyles.primaryButton}>
                    로그인
                </Link>

                {isFound && (
                    <Link
                        href="/auth/find-password"
                        className={authPageStyles.secondaryButton}
                    >
                        비밀번호 찾기
                    </Link>
                )}
            </div>
        </div>
    );
}