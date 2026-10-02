"use client";

import Image from "next/image";
import {
    Check,
    X,
} from "lucide-react";

import type { PresetProfileImage } from "@/features/settings/domain/model/PresetProfileImage";

import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

interface ProfileImageChangeModalProps {
    readonly isOpen: boolean;
    readonly presetImages: readonly PresetProfileImage[];
    readonly selectedPresetProfileImageId: number | null;
    readonly isLoading: boolean;
    readonly isSaving: boolean;
    readonly errorMessage: string | null;
    readonly onClose: () => void;
    readonly onSelect: (presetProfileImageId: number) => void;
    readonly onRetry: () => void;
    readonly onSave: () => void;
}

interface PresetImageButtonProps {
    readonly presetImage: PresetProfileImage;
    readonly selected: boolean;
    readonly disabled: boolean;
    readonly onSelect: (presetProfileImageId: number) => void;
}

function PresetImageButton({
    presetImage,
    selected,
    disabled,
    onSelect,
}: PresetImageButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect(presetImage.presetProfileImageId)}
            className={settingsPageStyles.presetImageButton}
            aria-label="프로필 이미지 선택"
            aria-pressed={selected}
        >
            <Image
                src={presetImage.imageUrl}
                alt="프리셋 프로필 이미지"
                fill
                sizes="92px"
                className={settingsPageStyles.presetImage}
            />

            {selected && (
                <span className={settingsPageStyles.selectedPresetOverlay}>
                    <Check
                        size={30}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </span>
            )}
        </button>
    );
}

export default function ProfileImageChangeModal({
    isOpen,
    presetImages,
    selectedPresetProfileImageId,
    isLoading,
    isSaving,
    errorMessage,
    onClose,
    onSelect,
    onRetry,
    onSave,
}: ProfileImageChangeModalProps) {
    if (!isOpen) {
        return null;
    }

    const selectedPreset =
        presetImages.find(
            (presetImage) =>
                presetImage.presetProfileImageId ===
                selectedPresetProfileImageId,
        ) ?? null;

    return (
        <div className={settingsPageStyles.profileImageModalOverlay}>
            <section
                className={settingsPageStyles.profileImageModal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="profile-image-modal-title"
            >
                <header
                    className={settingsPageStyles.profileImageModalHeader}
                >
                    <h2
                        id="profile-image-modal-title"
                        className={settingsPageStyles.profileImageModalTitle}
                    >
                        프로필 이미지
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className={settingsPageStyles.profileImageModalCloseButton}
                        aria-label="프로필 이미지 변경 닫기"
                    >
                        <X
                            size={28}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className={settingsPageStyles.profileImageModalContent}>
                    {isLoading ? (
                        <div className={settingsPageStyles.presetImageLoading}>
                            <div
                                className={settingsPageStyles.largePresetImageSkeleton}
                            />

                            <div className={settingsPageStyles.presetImageSkeletonGrid}>
                                {Array.from({
                                    length: 6,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={settingsPageStyles.presetImageSkeleton}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : errorMessage ? (
                        <div className={settingsPageStyles.presetImageError}>
                            <p>{errorMessage}</p>

                            <button
                                type="button"
                                onClick={onRetry}
                                className={settingsPageStyles.presetImageRetryButton}
                            >
                                다시 시도
                            </button>
                        </div>
                    ) : (
                        <>
                            {selectedPreset && (
                                <div className={settingsPageStyles.selectedPresetPreview}>
                                    <Image
                                        src={selectedPreset.imageUrl}
                                        alt="선택한 프로필 이미지"
                                        fill
                                        sizes="120px"
                                        className={settingsPageStyles.presetImage}
                                    />
                                </div>
                            )}

                            <div className={settingsPageStyles.presetImageGrid}>
                                {presetImages.map(
                                    (presetImage) => (
                                        <PresetImageButton
                                            key={presetImage.presetProfileImageId}
                                            presetImage={presetImage}
                                            selected={
                                                selectedPresetProfileImageId ===
                                                presetImage.presetProfileImageId
                                            }
                                            disabled={isSaving}
                                            onSelect={onSelect}
                                        />
                                    ),
                                )}
                            </div>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    disabled={
                        selectedPresetProfileImageId === null ||
                        isLoading ||
                        isSaving
                    }
                    onClick={onSave}
                    className={settingsPageStyles.profileImageSaveButton}
                >
                    {isSaving ? "변경 중..." : "변경하기"}
                </button>
            </section>
        </div>
    );
}