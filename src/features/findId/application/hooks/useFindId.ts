"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { findIdAtom } from "@/features/findId/application/atoms/findIdAtom";
import { sendEmailVerification } from "@/features/emailVerification/application/usecase/sendEmailVerification";
import { confirmEmailVerification } from "@/features/emailVerification/application/usecase/confirmEmailVerification";
import { findIdByVerificationToken } from "@/features/findId/application/usecase/findIdByVerificationToken";

export function useFindId() {
    const setFindIdState = useSetAtom(findIdAtom);

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendCode = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) return;

        setIsLoading(true);

        const result = await sendEmailVerification({
            email: trimmedEmail,
            purpose: "FIND_LOGIN_ID",
        });

        setIsLoading(false);

        if (!result.success) {
            setFindIdState({
                status: "ERROR",
                message: result.message,
            });
            return;
        }

        setFindIdState({
            status: "CODE_INPUT",
        });
    };

    const handleFindId = async () => {
        const trimmedEmail = email.trim();
        const trimmedCode = code.trim();

        if (!trimmedEmail || !trimmedCode) return;

        setIsLoading(true);

        const confirmResult = await confirmEmailVerification({
            email: trimmedEmail,
            code: trimmedCode,
            purpose: "FIND_LOGIN_ID",
        });

        if (!confirmResult.success) {
            setIsLoading(false);
            setFindIdState({
                status: "ERROR",
                message: confirmResult.message,
            });
            return;
        }

        const result = await findIdByVerificationToken({
            emailVerificationToken: confirmResult.emailVerificationToken,
        });

        setIsLoading(false);
        setFindIdState(result);
    };

    return {
        email,
        code,
        isLoading,
        setEmail,
        setCode,
        handleSendCode,
        handleFindId,
    };
}