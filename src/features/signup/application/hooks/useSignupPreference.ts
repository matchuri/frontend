"use client";

import { useCallback, useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";
import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";
import { mapUserPreferenceToUpdateRequest } from "@/features/preference/infrastructure/api/mapper/preferenceUpdateRequestMapper";
import { CreateEmptyPreference } from "@/features/preference/domain/model/CreateEmptyPreference";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";

import { clearSignupData } from "@/features/signup/application/usecase/clearSignupData";
import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { nicknameStorage } from "@/features/signup/infrastructure/storage/nicknameStorage";
import { signupOnboardingModeStorage } from "@/features/signup/infrastructure/storage/signupOnboardingModeStorage";
import { signupTasteProfileStorage } from "@/features/signup/infrastructure/storage/signupTasteProfileStorage";

export function useSignupPreference() {
    const router = useRouter();
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);
    const preferenceState = useAtomValue(preferenceAtom);
    const setPreferenceState = useSetAtom(preferenceAtom);

    const [isSaving, setIsSaving] = useState(false);

    const signupMode = signupOnboardingModeStorage.load();
    const account = accountStorage.load();

    const isGeneralSignup =
        signupMode === "GENERAL" &&
        !!account;

    const isSocialSignup =
        signupMode === "SOCIAL" &&
        isAuthenticated &&
        onboarding?.nextStep === "READY";

    useEffect(() => {
        if (isAuthLoading) {
            return;
        }

        if (isGeneralSignup) {
            const savedPreference = signupTasteProfileStorage.load();

            if (savedPreference) {
                setPreferenceState({
                    status: "SUCCESS",
                    data: savedPreference,
                });

                return;
            }

            setPreferenceState({
                status: "SUCCESS",
                data: CreateEmptyPreference(),
            });

            return;
        }

        if (isSocialSignup) {
            setPreferenceState({
                status: "SUCCESS",
                data: CreateEmptyPreference(),
            });

            return;
        }

        if (
            signupMode === "SOCIAL" &&
            isAuthenticated &&
            onboarding?.nextStep
        ) {
            router.replace(
                getOnboardingRoute(onboarding.nextStep),
            );
            return;
        }

        router.replace("/signup");
    }, [
        isAuthLoading,
        isAuthenticated,
        isGeneralSignup,
        isSocialSignup,
        onboarding,
        router,
        setPreferenceState,
        signupMode,
    ]);

    const saveSignupPreference = useCallback(async () => {
        if (preferenceState.status !== "SUCCESS") {
            return;
        }

        if (!hasRequiredPreference(preferenceState.data)) {
            alert("필수 취향 항목을 모두 선택해 주세요.");
            return;
        }

        if (isGeneralSignup) {
            const agreements = termsStorage.load();
            const nickname = nicknameStorage.load();

            if (
                !account ||
                !agreements ||
                agreements.length === 0 ||
                !nickname
            ) {
                router.replace("/signup");
                return;
            }

            signupTasteProfileStorage.save(preferenceState.data);

            /*
             * TODO:
             * POST /api/v2/members/signup 호출 후
             * mapUserPreferenceToUpdateRequest를 사용해 tasteProfile 변환
             * 임시 회원가입 데이터를 clear
             */

            return;
        }

        if (!isSocialSignup) {
            return;
        }

        const request =
            mapUserPreferenceToUpdateRequest(preferenceState.data);

        setIsSaving(true);

        try {
            await preferenceApi.savePreference(request);

            clearSignupData();
            router.replace("/home");
        } catch {
            alert("취향 정보 저장에 실패했습니다.");
        } finally {
            setIsSaving(false);
        }
    }, [
        account,
        isGeneralSignup,
        isSocialSignup,
        preferenceState,
        router,
    ]);

    return {
        preferenceState,
        isGeneralSignup,
        isSocialSignup,
        isSaving,
        saveSignupPreference,
    };
}