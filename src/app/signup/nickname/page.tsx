"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthenticatedAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";

import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { nicknameStorage } from "@/features/signup/infrastructure/storage/nicknameStorage";

import { useSubmitMyNickname } from "@/features/auth/application/hooks/useSubmitMyNickname";
import { useNicknameValidation } from "@/features/nickname/application/hooks/useNicknameValidation";
import { useSignupNicknameGuard } from "@/features/signup/application/hooks/useSignupNicknameGuard";

import SignupProgress from "@/features/signup/ui/components/SignupProgress";
import AuthPageHeader from "@/ui/components/AuthPageHeader";

import { authPageStyles } from "@/ui/styles/authPageStyles";
import { signupOnboardingStyles } from "@/ui/styles/signupOnboardingStyles";

export default function NicknamePage() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useSignupNicknameGuard();

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

    const isSocialOnboarding =
        isAuthenticated &&
        !!onboarding;

    const {
        submit: submitMyNickname,
        isSubmitting,
    } = useSubmitMyNickname();

    const {
        nickname,
        status: nicknameStatus,
        message: nicknameMessage,
        canSaveNickname,
        handleNicknameChange,
        validateNickname,
    } = useNicknameValidation();

    const canSubmit = canSaveNickname && !isSubmitting;

    useEffect(() => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        if (
            nicknameStatus === "DUPLICATED" ||
            nicknameStatus === "INVALID" ||
            nicknameStatus === "ERROR"
        ) {
            input.setCustomValidity(nicknameMessage);
            return;
        }

        input.setCustomValidity("");
    }, [nicknameMessage, nicknameStatus]);

    const handleSubmit = async () => {
        if (!canSubmit) return;

        if (isSocialOnboarding) {
            await submitMyNickname(nickname.trim());
            return;
        }

        const account = accountStorage.load();
        const savedAgreements = termsStorage.load();

        if (!account || !savedAgreements || savedAgreements.length === 0) {
            router.replace("/signup");
            return;
        }

        nicknameStorage.save(nickname.trim());

        router.push("/signup/preference");
    };

    return (
        <main className={authPageStyles.page}>
            <AuthPageHeader
                backHref="/terms"
                backLabel="약관 동의 화면으로 돌아가기"
                onBack={() => router.push("/terms")}
            />

            <div className={signupOnboardingStyles.content}>
                <SignupProgress
                    label="회원가입 마무리"
                    step={2}
                    totalSteps={3}
                />

                <div className={signupOnboardingStyles.intro}>
                    <h1 className={signupOnboardingStyles.title}>
                        사용할 닉네임을 알려주세요
                    </h1>

                    <p className={signupOnboardingStyles.description}>
                        맛추리에서 사용할 나만의 닉네임을 설정해주세요.
                    </p>
                </div>

                <form
                    className={signupOnboardingStyles.form}
                    onSubmit={(event) => {
                        event.preventDefault();

                        if (!canSubmit) {
                            return;
                        }

                        void handleSubmit();
                    }}
                >
                    <div className={signupOnboardingStyles.inputGroup}>
                        <label
                            htmlFor="signup-nickname"
                            className={signupOnboardingStyles.label}
                        >
                            닉네임
                        </label>

                        <input
                            ref={inputRef}
                            id="signup-nickname"
                            type="text"
                            className={signupOnboardingStyles.input}
                            value={nickname}
                            onChange={(event) => {
                                const nextNickname = event.target.value;
                                handleNicknameChange(nextNickname);
                                validateNickname(nextNickname);
                            }}
                            placeholder="닉네임을 입력하세요"
                            autoComplete="nickname"
                            maxLength={100}
                            required
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={
                            !nickname.trim() ||
                            nicknameStatus === "CHECKING" ||
                            isSubmitting
                        }
                        className={signupOnboardingStyles.primaryButton}
                    >
                        {isSubmitting ? "처리 중..." : "계속"}
                    </button>
                </form>
            </div>
        </main>
    );
}