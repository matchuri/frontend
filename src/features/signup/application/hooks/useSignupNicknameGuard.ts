"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import { onboardingAtom } from "@/features/auth/application/selectors/authSelectors";
import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";

export function useSignupNicknameGuard() {
    const router = useRouter();
    const onboarding = useAtomValue(onboardingAtom);

    useEffect(() => {
        const account = accountStorage.load();
        const savedAgreements = termsStorage.load();

        // 일반 회원가입 플로우 조건
        const isGeneralSignup =
            !!account &&
            !!account.email &&
            !!account.emailVerificationToken &&
            !!savedAgreements &&
            savedAgreements.length > 0;

        // 일반 회원가입 정상 접근
        if (isGeneralSignup) return;

        // 소셜 온보딩 닉네임 단계
        if (onboarding?.nextStep === "REQUIRED_NICKNAME") return;

        // 소셜 온보딩 - 약관 단계면 이동
        if (onboarding?.nextStep === "REQUIRED_AGREEMENTS") {
            router.replace("/terms");
            return;
        }

        // 소셜 온보딩 완료 상태
        if (onboarding?.nextStep === "READY") {
            router.replace("/home");
            return;
        }

        // 아직 onboarding 정보 없음 (초기 로딩 상태)
        if (onboarding === null) {
            return;
        }

        // 그 외 잘못된 접근
        router.replace("/signup");
    }, [router, onboarding]);
}