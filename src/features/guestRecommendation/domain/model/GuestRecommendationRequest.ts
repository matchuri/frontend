import type { PreferenceSelectionIds } from "@/features/preference/domain/model/PreferenceSelectionIds";

export interface GuestRecommendationRequest
    extends PreferenceSelectionIds {
    readonly contextJson: Record<string, unknown>;
}