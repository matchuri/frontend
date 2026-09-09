import type { GuestRecommendationSetting } from "@/features/guestRecommendation/domain/model/GuestRecommendationSetting";

import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";
import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

export function canStartGuestRecommendation(
    setting: GuestRecommendationSetting,
): boolean {
    const { preference, location } = setting;

    const hasPreference = hasRequiredPreference(preference);

    const hasLocation =
        location.address.trim().length > 0 &&
        Number.isFinite(location.latitude) &&
        Number.isFinite(location.longitude) &&
        isLocationRadiusMeters(location.radiusMeters);

    return hasPreference && hasLocation;
}