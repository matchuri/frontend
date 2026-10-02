import type {
    PresetProfileImage,
    UpdatedProfileImage,
} from "@/features/settings/domain/model/PresetProfileImage";

interface ApiErrorDetail {
    readonly source: string;
    readonly field: string;
    readonly reason: string;
}

interface ApiError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
    readonly details: readonly ApiErrorDetail[];
}

export interface PresetProfileImagesResponse {
    readonly success: boolean;
    readonly data: readonly PresetProfileImage[];
    readonly error: ApiError | null;
}

export interface UpdatePresetProfileImageResponse {
    readonly success: boolean;
    readonly data: UpdatedProfileImage;
    readonly error: ApiError | null;
}