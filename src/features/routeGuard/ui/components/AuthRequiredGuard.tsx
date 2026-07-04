"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

interface AuthRequiredGuardProps {
    children: ReactNode;
}

export default function AuthRequiredGuard({ children }: AuthRequiredGuardProps) {
    const router = useRouter();

    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

    useEffect(() => {
        if (isAuthLoading) return;

        if (!isAuthenticated) {
            alert("로그인이 필요한 페이지입니다.");
            router.replace("/");
            return;
        }

        if (!onboarding) return;

        if (onboarding.nextStep !== "READY") {
            router.replace(getOnboardingRoute(onboarding.nextStep));
        }
    }, [isAuthLoading, isAuthenticated, onboarding, router]);

    if (isAuthLoading || !isAuthenticated || onboarding?.nextStep !== "READY") {
        return null;
    }

    return <>{children}</>;
}