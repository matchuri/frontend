export interface PresetProfileImage {
    readonly presetProfileImageId: number;
    readonly imageUrl: string;
    readonly isDefault: boolean;
}

export interface UpdatedProfileImage {
    readonly profileImageId: number;
    readonly presetProfileImageId: number;
    readonly imageUrl: string;
    readonly updatedAt: string;
}