"use client";

import { X } from "lucide-react";

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
    readonly onSaved?: () => void;
}

export default function PreferenceModal({
    isOpen,
    onClose,
    onSaved,
}: PreferenceModalProps) {
    const { preferenceState } = usePreferenceList();
    const { preferenceOptionState } = usePreferenceOptionList();

    const { togglePreference } = usePreferenceSelection();

    const { isSaving, savePreference } = useSavePreference({
        onSuccess: onSaved,
    });

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

    const isLoading =
        preferenceState.status === "LOADING" ||
        preferenceOptionState.status === "LOADING";

    const errorMessage =
        preferenceState.status === "ERROR"
            ? preferenceState.message
            : preferenceOptionState.status === "ERROR"
              ? preferenceOptionState.message
              : null;

    const handleClose = () => {
        if (isSaving) {
            return;
        }

        onClose();
    };

    return (
        <div className={preferenceModalStyles.overlay}>
            <section
                className={preferenceModalStyles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="preference-modal-title"
            >
                <header className={preferenceModalStyles.header}>
                    <div>
                        <h2
                            id="preference-modal-title"
                            className={preferenceModalStyles.title}
                        >
                            취향 수정
                        </h2>

                        <p className={preferenceModalStyles.headerDescription}>
                            나에게 더 잘 맞는 메뉴를 추천받을 수 있도록 취향을 설정해주세요.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSaving}
                        className={preferenceModalStyles.closeButton}
                        aria-label="취향 수정 닫기"
                    >
                        <X
                            size={26}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className={preferenceModalStyles.content}>
                    {isLoading ? (
                        <div className={preferenceModalStyles.stateContainer}>
                            <div className={preferenceModalStyles.loadingSpinner} />

                            <p className={preferenceModalStyles.stateText}>
                                취향 정보를 불러오는 중...
                            </p>
                        </div>
                    ) : errorMessage ? (
                        <div className={preferenceModalStyles.stateContainer}>
                            <p className={preferenceModalStyles.errorText}>
                                {errorMessage}
                            </p>
                        </div>
                    ) : preferenceState.status === "SUCCESS" && preferenceOptionState.status === "SUCCESS" ? (
                        <>
                            <section className={preferenceModalStyles.preferenceCard}>
                                <div className={preferenceModalStyles.sectionHeader}>
                                    <div>
                                        <h3 className={preferenceModalStyles.sectionTitle}>
                                            필수 선택
                                        </h3>

                                        <p className={preferenceModalStyles.sectionDescription}>
                                            메뉴 추천에 꼭 필요한 취향이에요.
                                        </p>
                                    </div>

                                    <span className={preferenceModalStyles.requiredBadge}>
                                        필수
                                    </span>
                                </div>

                                <div className={preferenceModalStyles.sectionGroup}>
                                    {createPreferenceGroups(
                                        requiredPreferenceGroupMeta,
                                        preferenceOptionState.data,
                                    ).map((group) => (
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

                            <section className={preferenceModalStyles.preferenceCard}>
                                <div className={preferenceModalStyles.sectionHeader}>
                                    <div>
                                        <h3 className={preferenceModalStyles.sectionTitle}>
                                            추가 선택
                                        </h3>

                                        <p className={preferenceModalStyles.sectionDescription}>
                                            선택할수록 추천이 더 정교해져요.
                                        </p>
                                    </div>

                                    <span className={preferenceModalStyles.optionalBadge}>
                                        선택
                                    </span>
                                </div>

                                <div className={preferenceModalStyles.sectionGroup}>
                                    {createPreferenceGroups(
                                        optionalPreferenceGroupMeta,
                                        preferenceOptionState.data,
                                    ).map((group) => (
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
                            </section>
                        </>
                    ) : null}
                </div>

                {!isLoading && !errorMessage && (
                    <footer className={preferenceModalStyles.footer}>
                        <button
                            type="button"
                            onClick={() => {void savePreference();}}
                            disabled={isSaving}
                            className={preferenceModalStyles.saveButton}
                        >
                            {isSaving ? "저장 중..." : "취향 저장하기"}
                        </button>
                    </footer>
                )}
            </section>
        </div>
    );
}