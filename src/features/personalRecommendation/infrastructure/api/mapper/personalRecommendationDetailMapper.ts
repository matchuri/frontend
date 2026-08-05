import {
    DEFAULT_LOCATION_RADIUS_METERS,
    isLocationRadiusMeters,
} from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

import type { PersonalRecommendation } from "@/features/personalRecommendation/domain/model/PersonalRecommendation";
import type { PersonalRecommendationDetailData } from "@/features/personalRecommendation/infrastructure/api/dto/PersonalRecommendationDetailResponse";

function mapLocationSnapshot(
    contextJson: Record<string, unknown> | null,
): LocationSetting | null {
    if (contextJson === null) {
        return null;
    }

    const latitude = Number(
        contextJson.latitude,
    );

    const longitude = Number(
        contextJson.longitude,
    );

    const radiusMetersValue = Number(
        contextJson.radiusMeters,
    );

    const address =
        typeof contextJson.address === "string"
            ? contextJson.address
            : "";

    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        address.trim().length === 0
    ) {
        return null;
    }

    const radiusMeters =
        isLocationRadiusMeters(radiusMetersValue)
            ? radiusMetersValue
            : DEFAULT_LOCATION_RADIUS_METERS;

    return {
        latitude,
        longitude,
        radiusMeters,
        address,
        level: DEFAULT_MAP_LEVEL,
    };
}

export function mapPersonalRecommendationDetail(
    data: PersonalRecommendationDetailData,
): PersonalRecommendation {
    return {
        requestId: data.id,
        status: data.status,
        requestedAt: "",
        closedAt: data.closedAt,
        selectedCandidateId:
            data.selectedCandidateId,
        locationSnapshot:
            mapLocationSnapshot(
                data.contextJson,
            ),
        candidates: data.candidates.map(
            (candidate) => ({
                id: candidate.id,
                menuId: candidate.menuId,
                menuName: candidate.menuName,
                rankNo: candidate.rankNo,
                score: candidate.score,
                thumbnailUrl:
                    candidate.thumbnailUrl,
            }),
        ),
    };
}