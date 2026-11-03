"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { useGuestRecommendationSetting } from "@/features/guestRecommendation/application/hooks/useGuestRecommendationSetting";
import { useGuestRecommendationStart } from "@/features/guestRecommendation/application/hooks/useGuestRecommendationStart";

import { usePreferenceOptionList } from "@/features/preference/application/hooks/usePreferenceOptionList";
import { useLocationSearch } from "@/features/locationSetting/application/hooks/useLocationSearch";

import GuestPreferenceSettingSection from "@/features/guestRecommendation/ui/components/GuestPreferenceSettingSection";
import GuestPreferenceSettingSkeleton from "@/features/guestRecommendation/ui/components/GuestPreferenceSettingSkeleton";
import GuestLocationSettingSection from "@/features/guestRecommendation/ui/components/GuestLocationSettingSection";
import RecommendationLoadingView from "@/ui/components/RecommendationLoadingView";

import { guestRecommendationPageStyles } from "@/ui/styles/guestRecommendationPageStyles";

interface GuestRecommendationPageContentProps {
    readonly header: ReactNode;
    readonly intro: ReactNode;
}

export default function GuestRecommendationPageContent({
   header,
   intro,
}: GuestRecommendationPageContentProps) {
    const {
        preference,
        location,
        keyword,
        results,
        isSearching,
        searchErrorMessage,
        togglePreference,
        searchDislikedFood,
        addDislikedFood,
        removeDislikedFood,
        updateLocationCenter,
        updateLocationAddress,
        updateLocationRadius,
    } = useGuestRecommendationSetting();

    const { preferenceOptionState } = usePreferenceOptionList();

    const {
        inputKeyword,
        setInputKeyword,
        searchKeyword,
        searchErrorMessage: locationSearchErrorMessage,
        submitSearch,
        handleSearchFailed,
    } = useLocationSearch();

    const {
        canStartRecommendation,
        isCreating,
        startRecommendation,
    } = useGuestRecommendationStart({
        setting: {
            preference,
            location,
        },
    });

    if (isCreating) {
        return <RecommendationLoadingView />;
    }

    return (
        <main className={guestRecommendationPageStyles.page}>
            {header}

            <div className={guestRecommendationPageStyles.content}>
                {intro}

                {preferenceOptionState.status === "LOADING" && (
                    <GuestPreferenceSettingSkeleton />
                )}

                {preferenceOptionState.status === "ERROR" && (
                    <section className={guestRecommendationPageStyles.stateCard}>
                        <p className={guestRecommendationPageStyles.errorText}>
                            {preferenceOptionState.message}
                        </p>
                    </section>
                )}

                {preferenceOptionState.status === "SUCCESS" && (
                    <GuestPreferenceSettingSection
                        preference={preference}
                        options={preferenceOptionState.data}
                        searchKeyword={keyword}
                        searchResults={results}
                        isSearching={isSearching}
                        searchErrorMessage={searchErrorMessage}
                        onTogglePreference={togglePreference}
                        onSearch={searchDislikedFood}
                        onAddDislikedFood={addDislikedFood}
                        onRemoveDislikedFood={removeDislikedFood}
                    />
                )}

                <GuestLocationSettingSection
                    location={location}
                    inputKeyword={inputKeyword}
                    searchKeyword={searchKeyword}
                    searchErrorMessage={locationSearchErrorMessage}
                    onInputKeywordChange={setInputKeyword}
                    onSubmitSearch={submitSearch}
                    onSearchFailed={handleSearchFailed}
                    onCenterChange={updateLocationCenter}
                    onAddressChange={updateLocationAddress}
                    onRadiusChange={updateLocationRadius}
                />
            </div>

            <footer className={guestRecommendationPageStyles.footer}>
                <button
                    type="button"
                    onClick={() => void startRecommendation()}
                    disabled={!canStartRecommendation}
                    className={`${guestRecommendationPageStyles.startButton} ${
                        canStartRecommendation
                            ? guestRecommendationPageStyles.startButtonEnabled
                            : guestRecommendationPageStyles.startButtonDisabled
                    }`}
                >
                    메뉴 추천 시작
                    <ArrowRight size={18} aria-hidden="true" />
                </button>
            </footer>
        </main>
    );
}