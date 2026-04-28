"use client";

import { useCallback, useState } from "react";
import { useSetAtom } from "jotai";

import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";
import type { DislikedFood } from "@/features/preference/domain/model/UserPreference";

// 비선호 음식 검색, 추가, 삭제
export function useDislikedFoodSearch() {
    const setPreferenceState = useSetAtom(preferenceAtom);

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<DislikedFood[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchErrorMessage, setSearchErrorMessage] = useState<string | null>(null);

    const search = useCallback(async (value: string) => {
        setKeyword(value);
        setSearchErrorMessage(null);

        const trimmedKeyword = value.trim();

        if (trimmedKeyword.length === 0) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        try {
            const searchedFoods = await preferenceApi.searchDislikedFoods(trimmedKeyword);
            setResults(searchedFoods);
        } catch {
            setResults([]);
            setSearchErrorMessage("검색 결과를 불러오는데 실패했습니다.");
        } finally {
            setIsSearching(false);
        }
    }, []);

    const addFood = useCallback(
        (food: DislikedFood) => {
            setPreferenceState((prev) => {
                if (prev.status !== "SUCCESS") return prev;

                const alreadySelected = prev.data.dislikedFoods.some(
                    (item) => item.type === food.type && item.id === food.id,
                );

                if (alreadySelected) return prev;

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        dislikedFoods: [...prev.data.dislikedFoods, food],
                    },
                };
            });

            setKeyword("");
            setResults([]);
            setSearchErrorMessage(null);
        },
        [setPreferenceState],
    );

    const removeFood = useCallback(
        (food: DislikedFood) => {
            setPreferenceState((prev) => {
                if (prev.status !== "SUCCESS") return prev;

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        dislikedFoods: prev.data.dislikedFoods.filter(
                            (item) => !(item.type === food.type && item.id === food.id),
                        ),
                    },
                };
            });
        },
        [setPreferenceState],
    );

    return {
        keyword,
        results,
        isSearching,
        searchErrorMessage,
        search,
        addFood,
        removeFood,
    };
}