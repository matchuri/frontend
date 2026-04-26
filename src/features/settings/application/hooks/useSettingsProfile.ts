"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";
import { fetchSettingsProfile } from "@/features/settings/infrastructure/api/settingsApi";

export function useSettingsProfile() {
    const setSettings = useSetAtom(settingsAtom);

    useEffect(() => {
        async function loadSettingsProfile() {
            setSettings({ status: "LOADING" });

            try {
                const profile = await fetchSettingsProfile();

                setSettings({
                    status: "SUCCESS",
                    data: profile,
                });
            } catch {
                setSettings({
                    status: "ERROR",
                    message: "설정 정보를 불러오지 못했습니다.",
                });
            }
        }

        loadSettingsProfile();
    }, [setSettings]);
}