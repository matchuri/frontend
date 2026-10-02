"use client";

import { X } from "lucide-react";

import { preferenceModalStyles } from "@/ui/styles/preferenceModalStyles";

import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { usePreferenceOptionList } from "@/features/preference/application/hooks/usePreferenceOptionList";
import { usePreferenceSelection } from "@/features/preference/application/hooks/usePreferenceSelection";
import { useDislikedFoodSearch } from "@/features/preference/application/hooks/useDislikedFoodSearch";
import { useSavePreference } from "@/features/preference/application/hooks/useSavePreference";

import PreferenceFormContent from "@/features/preference/ui/components/PreferenceFormContent";

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
                            <div className={preferenceModalStyles.loadingSpinner}/>

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
                        <PreferenceFormContent
                            preference={preferenceState.data}
                            options={preferenceOptionState.data}
                            onTogglePreference={togglePreference}
                            searchKeyword={keyword}
                            searchResults={results}
                            isSearching={isSearching}
                            searchErrorMessage={searchErrorMessage}
                            onSearch={search}
                            onAddDislikedFood={addFood}
                            onRemoveDislikedFood={removeFood}
                        />
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