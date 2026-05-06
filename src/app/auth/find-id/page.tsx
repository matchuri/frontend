"use client";

import FindIdForm from "@/features/findId/ui/components/FindIdForm";
import { findIdPageStyles } from "@/ui/styles/findIdPageStyles";

export default function FindIdPage() {
    return (
        <main className={findIdPageStyles.page}>
            <section className={findIdPageStyles.card}>
                <h1 className={findIdPageStyles.title}>아이디 찾기</h1>
                <FindIdForm />
            </section>
        </main>
    );
}