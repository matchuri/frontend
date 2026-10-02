"use client";

import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";

import {
    guestLocationAtom,
    guestPreferenceAtom,
} from "@/features/guestRecommendation/application/selectors/guestRecommendationSettingSelectors";

import {
    addGuestDislikedFood,
    removeGuestDislikedFood,
    toggleGuestPreference,
    updateGuestLocationAddress,
    updateGuestLocationCenter,
    updateGuestLocationRadius,
} from "@/features/guestRecommendation/application/store/guestRecommendationSettingStore";

import type { DislikedFood } from "@/features/preference/domain/model/UserPreference";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";

export function useGuestRecommendationSetting() {
    const preference = useAtomValue(guestPreferenceAtom);
    const location = useAtomValue(guestLocationAtom);

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<DislikedFood[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchErrorMessage, setSearchErrorMessage] = useState<string | null>(
        null,
    );

    const searchDislikedFood = useCallback(async (value: string) => {
        setKeyword(value);
        setSearchErrorMessage(null);

        const trimmedKeyword = value.trim();

        if (!trimmedKeyword) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        try {
            const searchedFoods = await preferenceApi.searchDislikedFoods(trimmedKeyword);

            setResults([...searchedFoods]);
        } catch {
            setResults([]);
            setSearchErrorMessage("검색 결과를 불러오는데 실패했습니다.");
        } finally {
            setIsSearching(false);
        }
    }, []);

    const addDislikedFood = useCallback((food: DislikedFood) => {
        addGuestDislikedFood(food);
        setKeyword("");
        setResults([]);
        setSearchErrorMessage(null);
    }, []);

    return {
        preference,
        location,

        keyword,
        results,
        isSearching,
        searchErrorMessage,

        togglePreference: toggleGuestPreference,
        searchDislikedFood,
        addDislikedFood,
        removeDislikedFood: removeGuestDislikedFood,

        updateLocationCenter: updateGuestLocationCenter,
        updateLocationAddress: updateGuestLocationAddress,
        updateLocationRadius: updateGuestLocationRadius,
    };
}