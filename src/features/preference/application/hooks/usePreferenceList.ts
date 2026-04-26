"use client";

import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";

// 기존 취향 조회
export function usePreferenceList() {
    const [preferenceState, setPreferenceState] = useAtom(preferenceAtom);

    const fetchPreference = useCallback(async () => {
        setPreferenceState({ status: "LOADING" });

        try {
            const data = await preferenceApi.fetchMyPreference();
            setPreferenceState({ status: "SUCCESS", data });
        } catch {
            setPreferenceState({
                status: "ERROR",
                message: "취향 정보를 불러오는데 실패했습니다.",
            });
        }
    }, [setPreferenceState]);

    useEffect(() => {
        fetchPreference();
    }, [fetchPreference]);

    return {
        preferenceState,
        refetchPreference: fetchPreference,
    };
}