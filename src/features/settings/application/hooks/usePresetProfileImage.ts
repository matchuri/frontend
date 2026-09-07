"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import type {
    PresetProfileImage,
    UpdatedProfileImage,
} from "@/features/settings/domain/model/PresetProfileImage";

import {
    fetchPresetProfileImages,
    updatePresetProfileImage,
} from "@/features/settings/infrastructure/api/settingsApi";

interface UsePresetProfileImageParams {
    readonly enabled: boolean;
    readonly currentProfileImageUrl: string | null;
}

export function usePresetProfileImage({
    enabled,
    currentProfileImageUrl,
}: UsePresetProfileImageParams) {
    const [presetImages, setPresetImages] =
        useState<readonly PresetProfileImage[]>([]);

    const [
        selectedPresetProfileImageId,
        setSelectedPresetProfileImageId,
    ] = useState<number | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchPresetImages = useCallback(async () => {
        if (!enabled) {
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const images = await fetchPresetProfileImages();

            setPresetImages(images);

            const currentPreset =
                images.find(
                    (image) => image.imageUrl === currentProfileImageUrl
                ) ?? null;

            setSelectedPresetProfileImageId(
                currentPreset?.presetProfileImageId ?? null
            );
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "프로필 이미지 목록을 불러오지 못했습니다.",
            );
        } finally {
            setIsLoading(false);
        }
    }, [
        currentProfileImageUrl,
        enabled,
    ]);

    useEffect(() => {
        void fetchPresetImages();
    }, [fetchPresetImages]);

    const selectPresetImage = (
        presetProfileImageId: number,
    ) => {
        if (isSaving) {
            return;
        }

        setSelectedPresetProfileImageId(
            presetProfileImageId,
        );
    };

    const savePresetImage =
        async (): Promise<UpdatedProfileImage | null> => {
            if (
                selectedPresetProfileImageId === null || isSaving
            ) {
                return null;
            }

            setIsSaving(true);

            try {
                return await updatePresetProfileImage(
                    selectedPresetProfileImageId,
                );
            } catch (error) {
                alert(
                    error instanceof Error
                        ? error.message
                        : "프로필 이미지 변경에 실패했습니다.",
                );

                return null;
            } finally {
                setIsSaving(false);
            }
        };

    return {
        presetImages,
        selectedPresetProfileImageId,
        isLoading,
        isSaving,
        errorMessage,
        selectPresetImage,
        savePresetImage,
        refetchPresetImages: fetchPresetImages,
    };
}