"use client";

import { useRouter } from "next/navigation";

import { usePreferenceOptionList } from "@/features/preference/application/hooks/usePreferenceOptionList";
import { usePreferenceSelection } from "@/features/preference/application/hooks/usePreferenceSelection";
import { useDislikedFoodSearch } from "@/features/preference/application/hooks/useDislikedFoodSearch";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";
import { useSignupPreference } from "@/features/signup/application/hooks/useSignupPreference";

import SignupPreferenceForm from "@/features/signup/ui/components/SignupPreferenceForm";
import SignupProgress from "@/features/signup/ui/components/SignupProgress";
import AuthPageSkeleton from "@/features/auth/ui/components/AuthPageSkeleton";

import AuthPageHeader from "@/ui/components/AuthPageHeader";

import { authPageStyles } from "@/ui/styles/authPageStyles";
import { signupOnboardingStyles } from "@/ui/styles/signupOnboardingStyles";

export default function SignupPreferencePage() {
    const router = useRouter();

    const {
        preferenceState,
        isAuthLoading,
        isSaving,
        saveSignupPreference,
    } = useSignupPreference();

    const { preferenceOptionState } = usePreferenceOptionList();
    const { togglePreference } = usePreferenceSelection();

    const {
        keyword,
        results,
        isSearching,
        searchErrorMessage,
        search,
        addFood,
        removeFood,
    } = useDislikedFoodSearch();

    const handleClickBack = () => {
        router.push("/signup/nickname");
    };

    if (isAuthLoading ||
        preferenceState.status === "LOADING" ||
        preferenceOptionState.status === "LOADING"
    ) {
        return <AuthPageSkeleton variant="PREFERENCE" />;
    }

    if (preferenceState.status === "ERROR") {
        return (
            <main className={signupOnboardingStyles.stateContainer}>
                <p className={signupOnboardingStyles.errorText}>
                    {preferenceState.message}
                </p>
            </main>
        );
    }

    if (preferenceOptionState.status === "ERROR") {
        return (
            <main className={signupOnboardingStyles.stateContainer}>
                <p className={signupOnboardingStyles.errorText}>
                    {preferenceOptionState.message}
                </p>
            </main>
        );
    }

    const canSubmit =
        hasRequiredPreference(preferenceState.data) &&
        !isSaving;

    return (
        <main className={authPageStyles.page}>
            <AuthPageHeader
                backHref="/signup/nickname"
                backLabel="닉네임 설정으로 돌아가기"
                onBack={handleClickBack}
            />

            <div className={signupOnboardingStyles.content}>
               <SignupProgress
                   label="회원가입 마무리"
                   step={2}
                   totalSteps={3}
               />

                <div className={signupOnboardingStyles.intro}>
                    <h1 className={signupOnboardingStyles.title}>
                        음식 취향을 알려주세요
                    </h1>

                    <p className={signupOnboardingStyles.description}>
                        선택한 취향을 바탕으로 나에게 더 잘 맞는 메뉴를 추천해드려요.
                    </p>
                </div>

                <SignupPreferenceForm
                    preference={preferenceState.data}
                    options={preferenceOptionState.data}
                    keyword={keyword}
                    results={results}
                    isSearching={isSearching}
                    searchErrorMessage={searchErrorMessage}
                    isSaving={isSaving}
                    canSubmit={canSubmit}
                    onToggle={togglePreference}
                    onSearch={search}
                    onSelectFood={addFood}
                    onRemoveFood={removeFood}
                    onSubmit={() => {void saveSignupPreference();}}
                />
            </div>
        </main>
    );
}