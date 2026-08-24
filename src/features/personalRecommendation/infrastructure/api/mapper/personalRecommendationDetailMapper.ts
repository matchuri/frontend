import {
    isLocationRadiusMeters,
} from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

import type { PersonalRecommendation } from "@/features/personalRecommendation/domain/model/PersonalRecommendation";
import type { PersonalRecommendationDetailData } from "@/features/personalRecommendation/infrastructure/api/dto/PersonalRecommendationDetailResponse";

function parseContextJson(
    contextJson: string | null,
): Record<string, unknown> | null {
    if (!contextJson) {
        return null;
    }

    try {
        const parsed: unknown = JSON.parse(contextJson);

        if (
            typeof parsed !== "object" ||
            parsed === null ||
            Array.isArray(parsed)
        ) {
            return null;
        }

        return parsed as Record<string, unknown>;
    } catch {
        return null;
    }
}

function mapLocationSnapshot(
    contextJson: string | null,
): LocationSetting | null {
    const context = parseContextJson(contextJson);

    if (context === null) {
        return null;
    }

    const latitude = Number(context.latitude);
    const longitude = Number(context.longitude);
    const radiusMeters = Number(context.radiusMeters);

    const address =
        typeof context.address === "string"
            ? context.address
            : "";

    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        !isLocationRadiusMeters(radiusMeters) ||
        address.trim().length === 0
    ) {
        return null;
    }

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