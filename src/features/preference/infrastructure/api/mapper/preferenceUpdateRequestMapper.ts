import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import type { PreferenceUpdateRequest } from "@/features/preference/infrastructure/api/dto/PreferenceUpdateRequest";

import { mapPreferenceToSelectionIds } from "@/features/preference/domain/mapper/mapPreferenceToSelectionIds";

export function mapUserPreferenceToUpdateRequest(
    preference: UserPreference,
): PreferenceUpdateRequest {
    return mapPreferenceToSelectionIds(preference);
}