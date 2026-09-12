"use client";

import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

import ResetPasswordForm from "@/features/resetPassword/ui/components/ResetPasswordForm";
import {
    initialResetPasswordState,
    resetPasswordAtom,
} from "@/features/resetPassword/application/atoms/resetPasswordAtom";
import AuthPageHeader from "@/ui/components/AuthPageHeader";
import { authPageStyles } from "@/ui/styles/authPageStyles";

export default function FindPasswordPage() {
    const router = useRouter();
    const resetPasswordState = useAtomValue(resetPasswordAtom);
    const setResetPasswordState = useSetAtom(resetPasswordAtom);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        setResetPasswordState(initialResetPasswordState);
    }, [setResetPasswordState]);

    const handleBack = () => {
        if (resetPasswordState.status === "COMPLETE") {
            setResetPasswordState(initialResetPasswordState);
            setFormKey((prev) => prev + 1);
            return;
        }

        router.push("/login");
    };

    return (
        <main className={authPageStyles.page}>
            <AuthPageHeader
                backHref="/login"
                backLabel={
                    resetPasswordState.status === "COMPLETE"
                        ? "비밀번호 찾기 화면으로 돌아가기"
                        : "로그인 화면으로 돌아가기"
                }
                onBack={handleBack}
            />

            <div className={authPageStyles.flowContent}>
                <ResetPasswordForm key={formKey} />
            </div>
        </main>
    );
}