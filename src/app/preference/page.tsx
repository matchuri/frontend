"use client";

import {
    ArrowLeft,
    SlidersHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { preferencePageStyles } from "@/ui/styles/preferencePageStyles";

import { useAuthGuard } from "@/features/routeGuard/application/hooks/useAuthGuard";
import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { usePreferenceOptionList } from "@/features/preference/application/hooks/usePreferenceOptionList";
import { usePreferenceSelection } from "@/features/preference/application/hooks/usePreferenceSelection";
import { useDislikedFoodSearch } from "@/features/preference/application/hooks/useDislikedFoodSearch";
import { useSavePreference } from "@/features/preference/application/hooks/useSavePreference";

import PreferenceSection from "@/features/preference/ui/components/PreferenceSection";
import DislikedFoodSearch from "@/features/preference/ui/components/DislikedFoodSearch";

import {
    createPreferenceGroups,
    optionalPreferenceGroupMeta,
    requiredPreferenceGroupMeta,
} from "@/features/preference/ui/config/preferenceOptions";

export default function PreferencePage() {
    const router = useRouter();

    const { isAuthLoading, canAccess } = useAuthGuard();
    const { preferenceState } = usePreferenceList();
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

    const {
        isSaving,
        savePreference,
    } = useSavePreference();

    const handleClickBack = () => {
        router.push("/settings");
    };

    if (isAuthLoading || !canAccess) {
        return (
            <main className={preferencePageStyles.stateContainer}>
                <p className={preferencePageStyles.stateText}>
                    인증 상태 확인 중...
                </p>
            </main>
        );
    }

    if (
        preferenceState.status === "LOADING" ||
        preferenceOptionState.status === "LOADING"
    ) {
        return (
            <main className={preferencePageStyles.stateContainer}>
                <p className={preferencePageStyles.stateText}>
                    취향 정보를 불러오는 중...
                </p>
            </main>
        );
    }

    if (preferenceState.status === "ERROR") {
        return (
            <main className={preferencePageStyles.stateContainer}>
                <p className={preferencePageStyles.errorText}>
                    {preferenceState.message}
                </p>
            </main>
        );
    }

    if (preferenceOptionState.status === "ERROR") {
        return (
            <main className={preferencePageStyles.stateContainer}>
                <p className={preferencePageStyles.errorText}>
                    {preferenceOptionState.message}
                </p>
            </main>
        );
    }

    const requiredPreferenceGroups =
        createPreferenceGroups(
            requiredPreferenceGroupMeta,
            preferenceOptionState.data,
        );

    const optionalPreferenceGroups =
        createPreferenceGroups(
            optionalPreferenceGroupMeta,
            preferenceOptionState.data,
        );

    return (
        <main className={preferencePageStyles.page}>
            <header className={preferencePageStyles.header}>
                <button
                    type="button"
                    onClick={handleClickBack}
                    className={preferencePageStyles.backButton}
                    aria-label="마이 페이지로 돌아가기"
                >
                    <ArrowLeft
                        size={22}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </button>

                <h1 className={preferencePageStyles.title}>
                    취향 프로필 설정
                </h1>

                <div
                    className={preferencePageStyles.headerSpacer}
                />
            </header>

            <div className={preferencePageStyles.content}>
                <section className={preferencePageStyles.introSection}>
                    <div className={preferencePageStyles.introIcon}>
                        <SlidersHorizontal
                            size={22}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </div>

                    <div>
                        <h2 className={preferencePageStyles.introTitle}>
                            나만의 취향을 알려주세요
                        </h2>

                        <p className={preferencePageStyles.introDescription}>
                            선택한 취향을 바탕으로 더 잘 맞는 메뉴를 추천해드려요.
                        </p>
                    </div>
                </section>

                <section className={preferencePageStyles.preferenceCard}>
                    <div className={preferencePageStyles.sectionHeader}>
                        <div>
                            <h2 className={preferencePageStyles.sectionTitle}>
                                필수 선택
                            </h2>

                            <p className={preferencePageStyles.sectionDescription}>
                                메뉴 추천에 꼭 필요한 취향이에요.
                            </p>
                        </div>

                        <span className={preferencePageStyles.requiredBadge}>
                            필수
                        </span>
                    </div>

                    <div className={preferencePageStyles.sectionGroup}>
                        {requiredPreferenceGroups.map((group) => (
                            <PreferenceSection
                                key={group.category}
                                title={group.title}
                                description={group.description}
                                category={group.category}
                                options={group.options}
                                selectedValues={
                                    preferenceState.data.selections[group.category] ?? []
                                }
                                onToggle={togglePreference}
                            />
                        ))}
                    </div>
                </section>

                <section className={preferencePageStyles.preferenceCard}>
                    <div className={preferencePageStyles.sectionHeader}>
                        <div>
                            <h2 className={preferencePageStyles.sectionTitle}>
                                추가 선택
                            </h2>

                            <p className={preferencePageStyles.sectionDescription}>
                                선택할수록 추천이 더 정교해져요.
                            </p>
                        </div>

                        <span className={preferencePageStyles.optionalBadge}>
                            선택
                        </span>
                    </div>

                    <div className={preferencePageStyles.sectionGroup}>
                        {optionalPreferenceGroups.map((group) => (
                            <PreferenceSection
                                key={group.category}
                                title={group.title}
                                description={group.description}
                                category={group.category}
                                options={group.options}
                                selectedValues={
                                    preferenceState.data.selections[group.category] ?? []
                                }
                                onToggle={togglePreference}
                            />
                        ))}

                        <DislikedFoodSearch
                            keyword={keyword}
                            results={results}
                            selectedFoods={
                                preferenceState.data.dislikedFoods
                            }
                            isSearching={isSearching}
                            searchErrorMessage={searchErrorMessage}
                            onSearch={search}
                            onSelect={addFood}
                            onRemove={removeFood}
                        />
                    </div>
                </section>

                <button
                    type="button"
                    onClick={() => {void savePreference();}}
                    disabled={isSaving}
                    className={preferencePageStyles.saveButton}
                >
                    {isSaving ? "저장 중..." : "취향 저장하기"}
                </button>
            </div>
        </main>
    );
}