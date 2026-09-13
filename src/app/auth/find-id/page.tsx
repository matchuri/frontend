"use client";

import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

import {
    findIdAtom,
    initialFindIdState,
} from "@/features/findId/application/atoms/findIdAtom";
import FindIdForm from "@/features/findId/ui/components/FindIdForm";
import AuthPageHeader from "@/ui/components/AuthPageHeader";
import { authPageStyles } from "@/ui/styles/authPageStyles";

export default function FindIdPage() {
    const router = useRouter();
    const findIdState = useAtomValue(findIdAtom);
    const setFindIdState = useSetAtom(findIdAtom);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        setFindIdState(initialFindIdState);
    }, [setFindIdState]);

    const isResult =
        findIdState.status === "FOUND" ||
        findIdState.status === "NOT_FOUND" ||
        findIdState.status === "ERROR";

    const handleBack = () => {
        if (isResult) {
            setFindIdState(initialFindIdState);
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
                    isResult
                        ? "아이디 찾기 화면으로 돌아가기"
                        : "로그인 화면으로 돌아가기"
                }
                onBack={handleBack}
            />

            <div className={authPageStyles.flowContent}>
                <FindIdForm key={formKey} />
            </div>
        </main>
    );
}