"use client";

import { useAtomValue } from "jotai";
import { findIdAtom } from "@/features/findId/application/atoms/findIdAtom";
import { useFindId } from "@/features/findId/application/hooks/useFindId";
import FindIdEmailInput from "@/features/findId/ui/components/FindIdEmailInput";
import FindIdCodeInput from "@/features/findId/ui/components/FindIdCodeInput";
import FindIdResult from "@/features/findId/ui/components/FindIdResult";

export default function FindIdForm() {
    const state = useAtomValue(findIdAtom);

    const {
        email,
        code,
        isLoading,
        setEmail,
        setCode,
        handleSendCode,
        handleFindId,
    } = useFindId();

    if (state.status === "CODE_INPUT") {
        return (
            <FindIdCodeInput
                code={code}
                isLoading={isLoading}
                onCodeChange={setCode}
                onSubmit={handleFindId}
            />
        );
    }

    if (
        state.status === "FOUND" ||
        state.status === "NOT_FOUND" ||
        state.status === "ERROR"
    ) {
        return <FindIdResult result={state} />;
    }

    return (
        <FindIdEmailInput
            email={email}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onSubmit={handleSendCode}
        />
    );
}