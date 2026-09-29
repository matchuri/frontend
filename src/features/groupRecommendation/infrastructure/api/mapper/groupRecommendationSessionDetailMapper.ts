import type {
    GroupRecommendationSessionCandidate,
    GroupRecommendationSessionDetail,
    GroupRecommendationSessionLocation,
} from "@/features/groupRecommendation/domain/model/GroupRecommendationSessionDetail";
import type { GroupRecommendationSessionDetailResponse } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationSessionDetailResponse";

function mapLocationSnapshot(
    contextJson: string | null | undefined,
): GroupRecommendationSessionLocation | null {
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

        const context = parsed as Record<string, unknown>;
        const { latitude, longitude, radiusMeters, address } = context;

        if (
            typeof latitude !== "number" ||
            !Number.isFinite(latitude) ||
            latitude < -90 ||
            latitude > 90 ||
            typeof longitude !== "number" ||
            !Number.isFinite(longitude) ||
            longitude < -180 ||
            longitude > 180 ||
            typeof radiusMeters !== "number" ||
            !Number.isInteger(radiusMeters) ||
            radiusMeters <= 0 ||
            typeof address !== "string" ||
            address.trim().length === 0
        ) {
            return null;
        }

        return {
            latitude,
            longitude,
            radiusMeters,
            address,
        };
    } catch {
        return null;
    }
}

function mapCandidate(
    candidate: GroupRecommendationSessionDetailResponse["data"]["candidates"][number],
): GroupRecommendationSessionCandidate {
    return {
        ...candidate,
        thumbnailUrl:
            typeof candidate.thumbnailUrl === "string" && candidate.thumbnailUrl.trim().length > 0
                ? candidate.thumbnailUrl
                : null,
    };
}

export function mapGroupRecommendationSessionDetail(
    data: GroupRecommendationSessionDetailResponse["data"],
): GroupRecommendationSessionDetail {
    return {
        sessionId: data.sessionId,
        status: data.status,
        locationSnapshot: mapLocationSnapshot(data.contextJson),
        readiness: data.readiness ?? null,
        candidates: (data.candidates ?? []).map(mapCandidate),
        recommendationCategories: data.recommendationCategories?.map((category) => ({
            id: category.id,
            categoryType: category.categoryType,
            code: category.code,
            name: category.name,
            rankNo: category.rankNo,
            source: category.source,
        })) ?? null,
        voteProgress: data.voteProgress ?? null,
        memberVotes: data.memberVotes ?? [],
        finalCandidate: data.finalCandidate ? mapCandidate(data.finalCandidate) : null,
        createdAt: data.createdAt,
    };
}