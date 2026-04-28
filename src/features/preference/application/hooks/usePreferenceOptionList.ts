"use client";

import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { preferenceOptionAtom } from "@/features/preference/application/atoms/preferenceOptionAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";

export function usePreferenceOptionList() {
    const [preferenceOptionState, setPreferenceOptionState] = useAtom(preferenceOptionAtom);

    const fetchPreferenceOptions = useCallback(async () => {
        setPreferenceOptionState({ status: "LOADING" });

        try {
            const data = await preferenceApi.fetchPreferenceOptions();

            setPreferenceOptionState({
                status: "SUCCESS",
                data,
            });
        } catch {
            setPreferenceOptionState({
                status: "ERROR",
                message: "취향 선택 옵션을 불러오는데 실패했습니다.",
            });
        }
    }, [setPreferenceOptionState]);

    useEffect(() => {
        fetchPreferenceOptions();
    }, [fetchPreferenceOptions]);

    return {
        preferenceOptionState,
        refetchPreferenceOptions: fetchPreferenceOptions,
    };
}