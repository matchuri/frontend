"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthLoadingAtom,
    isAuthenticatedAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";

export function useHomeGuard() {
    const router = useRouter();

    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

    useEffect(() => {
        // 아직 인증 확인 중이면 대기
        if (isAuthLoading) return;

        // 로그인 안 되어 있으면 비로그인 메인 페이지로 이동
        if (!isAuthenticated) {
            router.replace("/");
            return;
        }

        // onboarding 정보 없음 → 대기
        if (!onboarding) return;

        const nextStep = onboarding.nextStep;

        // 온보딩 미완료 → 해당 단계로 이동
        if (nextStep === "REQUIRED_AGREEMENTS") {
            router.replace("/terms");
            return;
        }

        if (nextStep === "REQUIRED_NICKNAME") {
            router.replace("/signup/nickname");
            return;
        }

        // READY만 정상 접근 허용
    }, [isAuthLoading, isAuthenticated, onboarding, router]);

    return {
        isAuthLoading,
        isAuthenticated,
        onboarding,
        canAccess:
            !isAuthLoading &&
            isAuthenticated &&
            onboarding?.nextStep === "READY",
    };
}