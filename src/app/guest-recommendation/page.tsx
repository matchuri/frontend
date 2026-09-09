"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useGuestRecommendationSetting } from "@/features/guestRecommendation/application/hooks/useGuestRecommendationSetting";

import { usePreferenceOptionList } from "@/features/preference/application/hooks/usePreferenceOptionList";
import { useLocationSearch } from "@/features/locationSetting/application/hooks/useLocationSearch";

import GuestPreferenceSettingSection from "@/features/guestRecommendation/ui/components/GuestPreferenceSettingSection";
import GuestLocationSettingSection from "@/features/guestRecommendation/ui/components/GuestLocationSettingSection";

import { guestRecommendationPageStyles } from "@/ui/styles/guestRecommendationPageStyles";

export default function GuestRecommendationPage() {
    const router = useRouter();

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

    const handleClickBack = () => {
        router.push("/");
    };

    return (
        <main className={guestRecommendationPageStyles.page}>
            <header className={guestRecommendationPageStyles.header}>
                <button
                    type="button"
                    onClick={handleClickBack}
                    className={guestRecommendationPageStyles.backButton}
                    aria-label="비로그인 메인으로 돌아가기"
                >
                    <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
                </button>

                <h1 className={guestRecommendationPageStyles.headerTitle}>
                    메뉴 추천 설정
                </h1>

                <div className={guestRecommendationPageStyles.headerSpacer} />
            </header>

            <div className={guestRecommendationPageStyles.content}>
                <section className={guestRecommendationPageStyles.intro}>
                    <h2 className={guestRecommendationPageStyles.introTitle}>
                        오늘의 메뉴를 찾아볼까요?
                    </h2>

                    <p className={guestRecommendationPageStyles.introDescription}>
                        취향과 식사할 위치를 설정하면 지금 먹기 좋은 메뉴를 추천해드릴게요.
                    </p>
                </section>

                {preferenceOptionState.status === "LOADING" && (
                    <section className={guestRecommendationPageStyles.stateCard}>
                        <div
                            className={
                                guestRecommendationPageStyles.loadingSpinner
                            }
                        />

                        <p className={guestRecommendationPageStyles.stateText}>
                            취향 선택 항목을 불러오는 중입니다.
                        </p>
                    </section>
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
                    className={guestRecommendationPageStyles.startButton}
                >
                    메뉴 추천 시작
                    <ArrowRight size={18} aria-hidden="true" />
                </button>
            </footer>
        </main>
    );
}