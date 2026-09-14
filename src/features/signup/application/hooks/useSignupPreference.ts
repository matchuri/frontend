"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";
import { setAuthenticated } from "@/features/auth/application/store/authStore";
import { authApi } from "@/features/auth/infrastructure/api/authApi";
import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";
import { mapUserPreferenceToUpdateRequest } from "@/features/preference/infrastructure/api/mapper/preferenceUpdateRequestMapper";
import { CreateEmptyPreference } from "@/features/preference/domain/model/CreateEmptyPreference";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";

import { signupApi } from "@/features/signup/infrastructure/api/signupApi";
import { clearSignupData } from "@/features/signup/application/usecase/clearSignupData";
import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { nicknameStorage } from "@/features/signup/infrastructure/storage/nicknameStorage";
import { signupOnboardingModeStorage } from "@/features/signup/infrastructure/storage/signupOnboardingModeStorage";
import { signupTasteProfileStorage } from "@/features/signup/infrastructure/storage/signupTasteProfileStorage";

import { HttpError } from "@/infrastructure/http/httpClient";

function getSignupErrorMessage(error: unknown) {
    if (error instanceof HttpError) {
        return (
            error.body?.error?.message ??
            "회원가입에 실패했습니다. 다시 시도해 주세요."
        );
    }

    return error instanceof Error
        ? error.message
        : "회원가입에 실패했습니다. 다시 시도해 주세요.";
}

export function useSignupPreference() {
    const router = useRouter();
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);
    const preferenceState = useAtomValue(preferenceAtom);
    const setPreferenceState = useSetAtom(preferenceAtom);

    const [isSaving, setIsSaving] = useState(false);
    const isLeavingSignupRef = useRef(false);

    const signupMode = signupOnboardingModeStorage.load();
    const account = accountStorage.load();

    const isGeneralSignup =
        signupMode === "GENERAL" &&
        !!account;

    const isSocialSignup =
        isAuthenticated &&
        onboarding?.nextStep === "REQUIRED_TASTE_PROFILE";

    useEffect(() => {
        if (isLeavingSignupRef.current) {
            return;
        }

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

            const tasteProfile =
                mapUserPreferenceToUpdateRequest(preferenceState.data);

            setIsSaving(true);

            try {
                await signupApi.signup({
                    loginId: account.id,
                    password: account.password,
                    nickname,
                    email: account.email,
                    emailVerificationToken: account.emailVerificationToken,
                    agreements: agreements
                        .filter((agreement) => agreement.agreed)
                        .map((agreement) => ({
                            agreementType: agreement.agreementType,
                            agreementVersion: agreement.agreementVersion,
                        })),
                    tasteProfile,
                });

                isLeavingSignupRef.current = true;

                clearSignupData();

                alert("회원가입이 완료되었습니다. 로그인해 주세요.");

                router.replace("/login");
            } catch (error) {
                const errorMessage = getSignupErrorMessage(error);

                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        isLeavingSignupRef.current = true;

                        alert(
                            "이메일 인증 정보가 만료되었거나 유효하지 않습니다. 회원가입을 다시 진행해 주세요.",
                        );

                        clearSignupData();
                        router.replace("/signup");
                        return;
                    }

                    if (error.status === 409) {
                        isLeavingSignupRef.current = true;

                        alert(
                            `${errorMessage}\n회원가입을 다시 진행해 주세요.`,
                        );

                        clearSignupData();
                        router.replace("/signup");
                        return;
                    }
                }

                alert(errorMessage);
            } finally {
                setIsSaving(false);
            }

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

            const response = await authApi.refresh();

            setAuthenticated(
                response.data.accessToken,
                response.data.onboarding,
                response.data.member,
            );

            if (response.data.onboarding.nextStep !== "READY") {
                router.replace(
                    getOnboardingRoute(response.data.onboarding.nextStep),
                );
                return;
            }

            isLeavingSignupRef.current = true;

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
        isAuthLoading,
        isGeneralSignup,
        isSocialSignup,
        isSaving,
        saveSignupPreference,
    };
}