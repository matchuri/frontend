"use client";

import FindIdForm from "@/features/findId/ui/components/FindIdForm";
import { findIdPageStyles } from "@/ui/styles/findIdPageStyles";
import HomeNavigationButton from "@/ui/components/HomeNavigationButton";

export default function FindIdPage() {
    return (
        <main className={findIdPageStyles.page}>
            <HomeNavigationButton />

            <section className={findIdPageStyles.card}>
                <h1 className={findIdPageStyles.title}>아이디 찾기</h1>
                <FindIdForm />
            </section>
        </main>
    );
}