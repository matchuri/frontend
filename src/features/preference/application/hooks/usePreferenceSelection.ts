"use client";

import { useCallback } from "react";
import { useSetAtom } from "jotai";

import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type { PreferenceOption } from "@/features/preference/domain/model/UserPreference";

export function usePreferenceSelection() {
    const setPreferenceState = useSetAtom(preferenceAtom);

    const togglePreference = useCallback(
        (category: PreferenceCategory, value: PreferenceOption) => {
            setPreferenceState((prev) => {
                if (prev.status !== "SUCCESS") return prev;

                const selectedValues = prev.data.selections[category];
                const isSelected = selectedValues.some(
                    (item) => item.code === value.code,
                );

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        selections: {
                            ...prev.data.selections,
                            [category]: isSelected
                                ? selectedValues.filter(
                                      (item) => item.code !== value.code,
                                  )
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