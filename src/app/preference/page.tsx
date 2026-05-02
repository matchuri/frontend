"use client";

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
    const { isSaving, savePreference } = useSavePreference();

    if (isAuthLoading || !canAccess) {
        return (
            <div className={preferencePageStyles.loadingBox}>
                <p>인증 상태 확인 중...</p>
            </div>
        );
    }

    if (
        preferenceState.status === "LOADING" ||
        preferenceOptionState.status === "LOADING"
    ) {
        return (
            <div className={preferencePageStyles.loadingBox}>
                <p>취향 정보를 불러오는 중...</p>
            </div>
        );
    }

    if (preferenceState.status === "ERROR") {
        return (
            <div className={preferencePageStyles.errorBox}>
                <p className={preferencePageStyles.errorText}>
                    {preferenceState.message}
                </p>
            </div>
        );
    }

    if (preferenceOptionState.status === "ERROR") {
        return (
            <div className={preferencePageStyles.errorBox}>
                <p className={preferencePageStyles.errorText}>
                    {preferenceOptionState.message}
                </p>
            </div>
        );
    }

    const requiredPreferenceGroups = createPreferenceGroups(
        requiredPreferenceGroupMeta,
        preferenceOptionState.data,
    );

    const optionalPreferenceGroups = createPreferenceGroups(
        optionalPreferenceGroupMeta,
        preferenceOptionState.data,
    );

    return (
        <main className={preferencePageStyles.container}>
            <div className={preferencePageStyles.content}>
                <header className={preferencePageStyles.header}>
                    <h1 className={preferencePageStyles.title}>취향 관리</h1>
                    <p className={preferencePageStyles.description}>
                        메뉴 추천에 사용할 취향 정보를 선택해 주세요.
                    </p>
                </header>

                <div className={preferencePageStyles.sectionGroup}>
                    <h2 className={preferencePageStyles.sectionTitle}>필수 선택</h2>

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

                <div className={preferencePageStyles.sectionGroup}>
                    <h2 className={preferencePageStyles.sectionTitle}>추가 선택</h2>

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
                        selectedFoods={preferenceState.data.dislikedFoods}
                        isSearching={isSearching}
                        searchErrorMessage={searchErrorMessage}
                        onSearch={search}
                        onSelect={addFood}
                        onRemove={removeFood}
                    />
                </div>

                <button
                    type="button"
                    onClick={savePreference}
                    disabled={isSaving}
                    className={preferencePageStyles.saveButton}
                >
                    {isSaving ? "저장 중..." : "저장하기"}
                </button>
            </div>
        </main>
    );
}