"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";
import { fetchSettingsProfile } from "@/features/settings/infrastructure/api/settingsApi";

export function useSettingsProfile(enabled: boolean) {
    const setSettings = useSetAtom(settingsAtom);

    useEffect(() => {
        if (!enabled) return;

        async function loadSettingsProfile() {
            setSettings({ status: "LOADING" });

            try {
                const profile = await fetchSettingsProfile();

                setSettings({
                    status: "SUCCESS",
                    data: profile,
                });
            } catch (error) {
                setSettings({
                    status: "ERROR",
                    message:
                        error instanceof Error
                            ? error.message
                            : "회원 정보를 불러오지 못했습니다.",
                });
            }
        }

        loadSettingsProfile();
    }, [enabled, setSettings]);
}