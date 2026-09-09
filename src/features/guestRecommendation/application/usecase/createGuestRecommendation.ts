import { HttpError } from "@/infrastructure/http/httpClient";

import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import { mapPreferenceToSelectionIds } from "@/features/preference/domain/mapper/mapPreferenceToSelectionIds";

import { guestRecommendationApi } from "@/features/guestRecommendation/infrastructure/api/guestRecommendationApi";
import {
    setGuestRecommendationError,
    setGuestRecommendationLoading,
    setGuestRecommendationSuccess,
} from "@/features/guestRecommendation/application/store/guestRecommendationStore";

const GUEST_RECOMMENDATION_ERROR_MESSAGE_BY_CODE: Readonly<
    Record<string, string>
> = {
    GUEST_RECOMMENDATION_DUPLICATE_ATTRIBUTE_CATEGORY:
        "중복된 취향 정보가 포함되어 있습니다.",
    GUEST_RECOMMENDATION_DUPLICATE_RESTRICTION_INGREDIENT:
        "중복된 비선호 재료가 포함되어 있습니다.",
    GUEST_RECOMMENDATION_DUPLICATE_DISLIKED_MENU_ITEM:
        "중복된 비선호 메뉴가 포함되어 있습니다.",
    GUEST_RECOMMENDATION_INVALID_ATTRIBUTE_CATEGORY:
        "사용할 수 없는 취향 정보가 포함되어 있습니다.",
    GUEST_RECOMMENDATION_INVALID_RESTRICTION_INGREDIENT:
        "사용할 수 없는 비선호 재료가 포함되어 있습니다.",
    GUEST_RECOMMENDATION_INVALID_DISLIKED_MENU_ITEM:
        "사용할 수 없는 비선호 메뉴가 포함되어 있습니다.",
};

function getGuestRecommendationErrorMessage(error: unknown): string {
    if (error instanceof HttpError) {
        const errorCode = error.body?.error?.code;

        if (errorCode) {
            const message = GUEST_RECOMMENDATION_ERROR_MESSAGE_BY_CODE[errorCode];

            if (message) {
                return message;
            }
        }

        return (
            error.body?.error?.message ??
            "비회원 메뉴 추천 요청에 실패했습니다."
        );
    }

    return error instanceof Error
        ? error.message
        : "비회원 메뉴 추천 요청에 실패했습니다.";
}

export async function createGuestRecommendation(
    preference: UserPreference,
) {
    setGuestRecommendationLoading();

    try {
        const selectionIds = mapPreferenceToSelectionIds(preference);

        const recommendation =
            await guestRecommendationApi.createRecommendation({
                ...selectionIds,
                contextJson: {},
            });

        setGuestRecommendationSuccess(recommendation);

        return recommendation;
    } catch (error) {
        const message = getGuestRecommendationErrorMessage(error);

        setGuestRecommendationError(message);

        throw new Error(message);
    }
}