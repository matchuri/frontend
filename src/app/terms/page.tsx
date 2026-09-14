"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { Check } from "lucide-react";

import { getTerms } from "@/features/terms/domain/model/getTerms";
import TermGroupItem from "@/features/terms/ui/components/TermGroupItem";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";

import { onboardingAtom } from "@/features/auth/application/selectors/authSelectors";
import { useSubmitRequiredAgreements } from "@/features/auth/application/hooks/useSubmitRequiredAgreements";
import { logout } from "@/features/auth/application/usecase/logout";
import { useTermsGuard } from "@/features/routeGuard/application/hooks/useTermsGuard";

import { clearSignupData } from "@/features/signup/application/usecase/clearSignupData";
import { signupOnboardingModeStorage } from "@/features/signup/infrastructure/storage/signupOnboardingModeStorage";

import SignupProgress from "@/features/signup/ui/components/SignupProgress";
import AuthPageHeader from "@/ui/components/AuthPageHeader";
import AuthPageSkeleton from "@/features/auth/ui/components/AuthPageSkeleton";

import { authPageStyles } from "@/ui/styles/authPageStyles";
import { signupOnboardingStyles } from "@/ui/styles/signupOnboardingStyles";

export default function TermsPage() {
    const router = useRouter();
    const terms = getTerms();

    const { isAuthLoading, canAccess } = useTermsGuard();

    const onboarding = useAtomValue(onboardingAtom);
    const { submit, isSubmitting } = useSubmitRequiredAgreements();

    const signupMode = signupOnboardingModeStorage.load();
    const isSocialSignup = signupMode === "SOCIAL";

    const shouldSubmitAgreementsToServer =
        isSocialSignup &&
        onboarding?.nextStep === "REQUIRED_AGREEMENTS";

    const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(terms.map((t) => [t.name, false])),
    );

    const allChecked = terms.every((t) => checkedMap[t.name]);

    const requiredAllChecked = useMemo(
        () => terms.filter((t) => t.required).every((t) => checkedMap[t.name]),
        [terms, checkedMap],
    );

    const handleToggle = (name: string) => {
        setCheckedMap((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const handleToggleAll = () => {
        const next = !allChecked;
        setCheckedMap(Object.fromEntries(terms.map((t) => [t.name, next])));
    };

    const handleBack = async () => {
        if (!isSocialSignup) {
            router.push("/signup");
            return;
        }

        clearSignupData();
        await logout();
        router.replace("/");
    };

    const handleSubmit = async () => {
        const agreements = terms.map((term) => ({
            agreementType: term.type,
            agreementVersion: term.version,
            agreed: checkedMap[term.name],
        }));

        if (!isSocialSignup) {
            termsStorage.save(agreements);
            router.push("/signup/nickname");
            return;
        }

        if (!shouldSubmitAgreementsToServer) {
            router.push("/signup/nickname");
            return;
        }

        await submit(
            agreements
                .filter((agreement) => agreement.agreed)
                .map((agreement) => ({
                    agreementType: agreement.agreementType,
                    agreementVersion: agreement.agreementVersion,
                })),
        );
    };

    if (isAuthLoading) {
        return <AuthPageSkeleton variant="TERMS" />;
    }

    if (!canAccess) {
        return null;
    }

    return (
        <main className={authPageStyles.page}>
            <AuthPageHeader
                backHref={isSocialSignup ? "/" : "/signup"}
                backLabel={
                    isSocialSignup
                        ? "회원가입을 종료하고 돌아가기"
                        : "회원가입 화면으로 돌아가기"
                }
                onBack={() => void handleBack()}
            />

            <div className={signupOnboardingStyles.content}>
                <SignupProgress
                    label="회원가입 마무리"
                    step={1}
                    totalSteps={3}
                />

                <div className={signupOnboardingStyles.intro}>
                    <h1 className={signupOnboardingStyles.title}>
                        약관에 동의해주세요
                    </h1>

                    <p className={signupOnboardingStyles.description}>
                        맛추리 이용을 위해 필수 약관을 확인하고 동의해주세요.
                    </p>
                </div>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();

                        if (!requiredAllChecked || isSubmitting) {
                            return;
                        }

                        void handleSubmit();
                    }}
                >
                    <div className={signupOnboardingStyles.termList}>
                        <label className={signupOnboardingStyles.allAgreeRow}>
                            <input
                                type="checkbox"
                                checked={allChecked}
                                onChange={handleToggleAll}
                                className={signupOnboardingStyles.checkboxInput}
                            />

                            <span className={signupOnboardingStyles.checkboxVisual}>
                                <Check
                                    size={14}
                                    strokeWidth={3}
                                    aria-hidden="true"
                                />
                            </span>

                            <span className={signupOnboardingStyles.allAgreeLabel}>
                                전체 동의
                            </span>
                        </label>

                        {terms.map((termGroup) => (
                            <TermGroupItem
                                key={termGroup.name}
                                termGroup={termGroup}
                                checked={checkedMap[termGroup.name]}
                                onToggle={() => handleToggle(termGroup.name)}
                            />
                        ))}
                    </div>

                    <p className={signupOnboardingStyles.termGuide}>
                        필수 약관에 동의해야 회원가입을 계속할 수 있습니다.
                    </p>

                    <button
                        type="submit"
                        disabled={!requiredAllChecked || isSubmitting}
                        className={signupOnboardingStyles.primaryButton}
                    >
                        {isSubmitting ? "처리 중..." : "동의하고 계속"}
                    </button>
                </form>
            </div>
        </main>
    );
}