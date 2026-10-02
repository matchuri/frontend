"use client";

import {
    useCallback,
    useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";

import { homeAtom } from "@/features/home/application/atoms/homeAtom";
import { homeApi } from "@/features/home/infrastructure/api/homeApi";

import { HttpError } from "@/infrastructure/http/httpClient";

import {
    clearAuth,
    updateOnboarding,
} from "@/features/auth/application/store/authStore";

export function useHomeData(
    enabled: boolean,
) {
    const router = useRouter();
    const setHomeState = useSetAtom(homeAtom);

    const fetchHome = useCallback(async () => {
        if (!enabled) {
            return;
        }

        setHomeState((prev) => ({
            status: "LOADING",
            data:
                "data" in prev
                    ? prev.data
                    : undefined,
        }));

        try {
            const data = await homeApi.fetchHome();

            setHomeState({
                status: "SUCCESS",
                data,
            });
        } catch (error) {
            if (error instanceof HttpError) {
                const errorCode = error.body?.error?.code;

                if (error.status === 401) {
                    clearAuth();
                    router.replace("/");
                    return;
                }

                if (
                    error.status === 403 &&
                    errorCode === "MEMBER_AGREEMENT_REQUIRED"
                ) {
                    updateOnboarding({
                        requiredAgreementsCompleted: false,
                        nicknameCompleted: false,
                        tasteProfileCompleted: false,
                        completed: false,
                        nextStep: "REQUIRED_AGREEMENTS",
                    });

                    router.replace("/terms");
                    return;
                }

                if (
                    error.status === 403 &&
                    errorCode === "MEMBER_NICKNAME_REQUIRED"
                ) {
                    updateOnboarding({
                        requiredAgreementsCompleted: true,
                        nicknameCompleted: false,
                        tasteProfileCompleted: false,
                        completed: false,
                        nextStep: "REQUIRED_NICKNAME",
                    });

                    router.replace("/signup/nickname");
                    return;
                }

                if (
                    error.status === 403 &&
                    errorCode === "MEMBER_INACTIVE_MEMBER"
                ) {
                    clearAuth();
                    router.replace("/");
                    return;
                }
            }

            setHomeState((prev) => ({
                status: "ERROR",
                data:
                    "data" in prev
                        ? prev.data
                        : undefined,
                message:
                    error instanceof Error
                        ? error.message
                        : "홈 정보를 불러오지 못했습니다.",
            }));
        }
    }, [
        enabled,
        router,
        setHomeState,
    ]);

    useEffect(() => {
        void fetchHome();
    }, [fetchHome]);

    return {
        refetchHome: fetchHome,
    };
}