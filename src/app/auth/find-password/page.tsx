"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import ResetPasswordForm from "@/features/resetPassword/ui/components/ResetPasswordForm";
import {
    initialResetPasswordState,
    resetPasswordAtom,
} from "@/features/resetPassword/application/atoms/resetPasswordAtom";
import { resetPasswordPageStyles } from "@/ui/styles/resetPasswordPageStyles";

export default function FindPasswordPage() {
    const setResetPasswordState = useSetAtom(resetPasswordAtom);

    useEffect(() => {
        setResetPasswordState(initialResetPasswordState);
    }, [setResetPasswordState]);

    return (
        <main className={resetPasswordPageStyles.page}>
            <section className={resetPasswordPageStyles.card}>
                <h1 className={resetPasswordPageStyles.title}>비밀번호 찾기</h1>
                <ResetPasswordForm />
            </section>
        </main>
    );
}