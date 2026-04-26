"use client";

import { useCallback } from "react";
import { useSetAtom } from "jotai";

import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";

// 취향 칩 선택/해제
export function usePreferenceSelection() {
    const setPreferenceState = useSetAtom(preferenceAtom);

    const togglePreference = useCallback(
        (category: PreferenceCategory, value: string) => {
            setPreferenceState((prev) => {
                if (prev.status !== "SUCCESS") return prev;

                const selectedValues = prev.data.selections[category];
                const isSelected = selectedValues.includes(value);

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        selections: {
                            ...prev.data.selections,
                            [category]: isSelected
                                ? selectedValues.filter((item) => item !== value)
                                : [...selectedValues, value],
                        },
                    },
                };
            });
        },
        [setPreferenceState],
    );

    return {
        togglePreference,
    };
}