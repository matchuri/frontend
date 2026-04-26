"use client";

import { useCallback, useState } from "react";
import { useSetAtom } from "jotai";

import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";

// 비선호 음식 검색, 추가, 삭제
export function useDislikedFoodSearch() {
    const setPreferenceState = useSetAtom(preferenceAtom);
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const search = useCallback(async (value: string) => {
        setKeyword(value);

        if (value.trim().length === 0) {
            setResults([]);
            return;
        }

        const searchedFoods = await preferenceApi.searchDislikedFoods(value.trim());
        setResults(searchedFoods);
    }, []);

    const addFood = useCallback(
        (food: string) => {
            setPreferenceState((prev) => {
                if (prev.status !== "SUCCESS") return prev;
                if (prev.data.dislikedFoods.includes(food)) return prev;

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
        },
        [setPreferenceState],
    );

    const removeFood = useCallback(
        (food: string) => {
            setPreferenceState((prev) => {
                if (prev.status !== "SUCCESS") return prev;

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        dislikedFoods: prev.data.dislikedFoods.filter(
                            (item) => item !== food,
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
        search,
        addFood,
        removeFood,
    };
}