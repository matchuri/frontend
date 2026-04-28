"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAtomValue } from "jotai";

import { nicknamePageStyles } from "@/ui/styles/nicknamePageStyles";
import { accountStorage } from "@/features/auth/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { authApi } from "@/features/auth/infrastructure/api/authApi";

import { onboardingAtom } from "@/features/auth/application/selectors/authSelectors";
import { useSubmitMyNickname } from "@/features/auth/application/hooks/useSubmitMyNickname";
import { useNicknameValidation } from "@/features/nickname/application/hooks/useNicknameValidation";

export default function NicknamePage() {
    const router = useRouter();
    const onboarding = useAtomValue(onboardingAtom);

    const { submit: submitMyNickname, isSubmitting } = useSubmitMyNickname();
    const isSocialOnboarding = onboarding?.nextStep === "REQUIRED_NICKNAME";

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
        const account = accountStorage.load();
        const savedAgreements = termsStorage.load();

        const isGeneralSignup =
            !!account && !!savedAgreements && savedAgreements.length > 0;

        if (isGeneralSignup) return;

        if (onboarding?.nextStep === "REQUIRED_NICKNAME") return;

        if (onboarding?.nextStep === "REQUIRED_AGREEMENTS") {
            router.replace("/terms");
            return;
        }

        if (onboarding?.nextStep === "READY") {
            router.replace("/home");
            return;
        }

        if (onboarding === null) {
            return;
        }

        router.replace("/signup");
    }, [router, onboarding]);

    const handleSubmit = async () => {
        if (!canSubmit) return;

        try {
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

            const payload = {
                loginId: account.id,
                password: account.password,
                nickname: nickname.trim(),
                agreements: savedAgreements
                    .filter((item) => item.agreed)
                    .map((item) => ({
                        agreementType: item.agreementType,
                        agreementVersion: item.agreementVersion,
                    })),
            };

            const response = await authApi.signup(payload);

            if (response.success) {
                accountStorage.clear();
                termsStorage.clear();

                router.push("/");
                return;
            }

            router.push("/login");
        } catch (error) {
            console.error("회원가입 실패:", error);
            router.push("/login");
        }
    };

    const getMessageColor = () => {
        switch (nicknameStatus) {
            case "AVAILABLE":
                return "text-blue-500";
            case "DUPLICATED":
            case "INVALID":
            case "ERROR":
                return "text-red-500";
            case "CHECKING":
                return "text-gray-400";
            default:
                return "";
        }
    };

    return (
        <div className={nicknamePageStyles.container}>
            <div className={nicknamePageStyles.card}>
                <div className="flex flex-col gap-1 w-full">
                    <h1 className={nicknamePageStyles.title}>닉네임 설정</h1>
                </div>

                <div className={nicknamePageStyles.formGroup}>
                    <div className={nicknamePageStyles.inputGroup}>
                        <label className={nicknamePageStyles.label}>닉네임</label>

                        <input
                            type="text"
                            className={nicknamePageStyles.input}
                            value={nickname}
                            onChange={(e) => {
                                const nextNickname = e.target.value;
                                handleNicknameChange(nextNickname);
                                validateNickname(nextNickname);
                            }}
                            placeholder="닉네임을 입력하세요"
                        />

                        {nicknameMessage && (
                            <p className={`mt-2 text-sm ${getMessageColor()}`}>
                                {nicknameMessage}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            className={
                                canSubmit
                                    ? nicknamePageStyles.button
                                    : `${nicknamePageStyles.button} opacity-50 cursor-not-allowed`
                            }
                        >
                            가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}