"use client";

import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";

import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";
import { requiredPreferenceGroupMeta } from "@/features/preference/ui/config/preferenceOptions";

export function useSavePreference() {
    const preferenceState = useAtomValue(preferenceAtom);
    const [isSaving, setIsSaving] = useState(false);

    const validateRequiredSelections = useCallback((): boolean => {
        if (preferenceState.status !== "SUCCESS") return false;

        const selections = preferenceState.data.selections;

        // 필수 카테고리 검증
        for (const group of requiredPreferenceGroupMeta) {
            const values = selections[group.category];

            if (!values || values.length === 0) {
                return false;
            }
        }

        return true;
    }, [preferenceState]);

    const savePreference = useCallback(async () => {
        if (preferenceState.status !== "SUCCESS") return;

        const isValid = validateRequiredSelections();

        if (!isValid) {
            alert("필수 취향 항목을 모두 선택해 주세요.");
            return;
        }

        setIsSaving(true);

        try {
            await preferenceApi.savePreference(preferenceState.data);
            alert("취향 정보가 저장되었습니다.");
        } catch {
            alert("취향 정보 저장에 실패했습니다.");
        } finally {
            setIsSaving(false);
        }
    }, [preferenceState, validateRequiredSelections]);

    return {
        isSaving,
        savePreference,
    };
}