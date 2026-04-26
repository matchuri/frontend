"use client";

import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";

import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";
import { preferenceApi } from "@/features/preference/infrastructure/api/preferenceApi";

export function useSavePreference() {
    const preferenceState = useAtomValue(preferenceAtom);
    const [isSaving, setIsSaving] = useState(false);

    const savePreference = useCallback(async () => {
        if (preferenceState.status !== "SUCCESS") return;

        setIsSaving(true);

        try {
            await preferenceApi.savePreference(preferenceState.data);
            alert("취향 정보가 저장되었습니다.");
        } catch {
            alert("취향 정보 저장에 실패했습니다.");
        } finally {
            setIsSaving(false);
        }
    }, [preferenceState]);

    return {
        isSaving,
        savePreference,
    };
}