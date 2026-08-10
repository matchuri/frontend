import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

interface PersonalRecommendationSearchRadiusStorageValue {
    readonly requestId: number;
    readonly candidateId: number;
    readonly radiusMeters: LocationRadiusMeters;
}

const STORAGE_KEY_PREFIX =
    "personalRecommendationSearchRadius";

function createStorageKey(
    requestId: number,
    candidateId: number,
) {
    return `${STORAGE_KEY_PREFIX}:${requestId}:${candidateId}`;
}

export const personalRecommendationSearchRadiusStorage = {
    save({
        requestId,
        candidateId,
        radiusMeters,
    }: PersonalRecommendationSearchRadiusStorageValue) {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.setItem(
            createStorageKey(
                requestId,
                candidateId,
            ),
            String(radiusMeters),
        );
    },

    get(
        requestId: number,
        candidateId: number,
    ): LocationRadiusMeters | null {
        if (typeof window === "undefined") {
            return null;
        }

        const storedValue =
            window.sessionStorage.getItem(
                createStorageKey(
                    requestId,
                    candidateId,
                ),
            );

        if (storedValue === null) {
            return null;
        }

        const radiusMeters =
            Number(storedValue);

        return isLocationRadiusMeters(radiusMeters)
            ? radiusMeters
            : null;
    },

    remove(
        requestId: number,
        candidateId: number,
    ) {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.removeItem(
            createStorageKey(
                requestId,
                candidateId,
            ),
        );
    },
};