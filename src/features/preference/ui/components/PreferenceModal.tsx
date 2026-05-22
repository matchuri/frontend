"use client";

import { X, ChevronLeft } from "lucide-react";

import { preferenceModalStyles } from "@/ui/styles/preferenceModalStyles";

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

interface PreferenceModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

export default function PreferenceModal({
    isOpen,
    onClose,
}: PreferenceModalProps) {
    const { preferenceState } = usePreferenceList();
    const { preferenceOptionState } = usePreferenceOptionList();

    const { togglePreference } = usePreferenceSelection();
    const { isSaving, savePreference } = useSavePreference();

    const {
        keyword,
        results,
        isSearching,
        searchErrorMessage,
        search,
        addFood,
        removeFood,
    } = useDislikedFoodSearch();

    if (!isOpen) return null;

    if (
        preferenceState.status === "LOADING" ||
        preferenceOptionState.status === "LOADING"
    ) {
        return (
            <div className={preferenceModalStyles.overlay}>
                <div className={preferenceModalStyles.loadingContainer}>
                    <p>취향 정보를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (preferenceState.status === "ERROR") {
        return (
            <div className={preferenceModalStyles.overlay}>
                <div className={preferenceModalStyles.errorContainer}>
                    <p>{preferenceState.message}</p>
                </div>
            </div>
        );
    }

    if (preferenceOptionState.status === "ERROR") {
        return (
            <div className={preferenceModalStyles.overlay}>
                <div className={preferenceModalStyles.errorContainer}>
                    <p>{preferenceOptionState.message}</p>
                </div>
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
        <div className={preferenceModalStyles.overlay}>
            <div className={preferenceModalStyles.modal}>
                <header className={preferenceModalStyles.header}>
                    <div className={preferenceModalStyles.headerLeft}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={preferenceModalStyles.iconButton}
                        >
                            <ChevronLeft size={22} />
                        </button>

                        <h2 className={preferenceModalStyles.title}>
                            취향 수정
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className={preferenceModalStyles.iconButton}
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className={preferenceModalStyles.content}>
                    <p className={preferenceModalStyles.description}>
                        메뉴 추천을 위해 선호하는 취향을 설정해주세요.
                    </p>

                    <section className={preferenceModalStyles.requiredSection}>
                        <h3 className={preferenceModalStyles.sectionTitle}>
                            필수 선택
                        </h3>

                        <div className={preferenceModalStyles.sectionGroup}>
                            {requiredPreferenceGroups.map((group) => (
                                <PreferenceSection
                                    key={group.category}
                                    title={group.title}
                                    category={group.category}
                                    options={group.options}
                                    selectedValues={
                                        preferenceState.data.selections[
                                            group.category
                                        ] ?? []
                                    }
                                    onToggle={togglePreference}
                                />
                            ))}
                        </div>
                    </section>

                    <section className={preferenceModalStyles.section}>
                        <h3 className={preferenceModalStyles.sectionTitle}>
                            추가 선택
                        </h3>

                        <div className={preferenceModalStyles.sectionGroup}>
                            {optionalPreferenceGroups.map((group) => (
                                <PreferenceSection
                                    key={group.category}
                                    title={group.title}
                                    category={group.category}
                                    options={group.options}
                                    selectedValues={
                                        preferenceState.data.selections[
                                            group.category
                                        ] ?? []
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
                </div>

                <footer className={preferenceModalStyles.footer}>
                    <button
                        type="button"
                        onClick={savePreference}
                        disabled={isSaving}
                        className={preferenceModalStyles.saveButton}
                    >
                        {isSaving ? "저장 중..." : "저장하기"}
                    </button>
                </footer>
            </div>
        </div>
    );
}