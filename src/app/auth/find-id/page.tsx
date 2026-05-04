"use client";

import FindIdForm from "@/features/findId/ui/components/FindIdForm";
import { findIdPageStyles } from "@/ui/styles/findIdPageStyles";

export default function FindIdPage() {
    return (
        <main className={findIdPageStyles.page}>
            <section className={findIdPageStyles.card}>
                <h1 className={findIdPageStyles.title}>아이디 찾기</h1>
                <p className={findIdPageStyles.description}>
                    가입 시 사용한 이메일을 입력하세요
                </p>

                <FindIdForm />
            </section>
        </main>
    );
}