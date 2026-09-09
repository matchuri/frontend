import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

export interface GuestRecommendationSetting {
    readonly preference: UserPreference;
    readonly location: LocationSetting;
}