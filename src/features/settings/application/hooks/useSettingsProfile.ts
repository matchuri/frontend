"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";
import { fetchSettingsProfile } from "@/features/settings/infrastructure/api/settingsApi";

export function useSettingsProfile(enabled: boolean) {
    const setSettings = useSetAtom(settingsAtom);

    useEffect(() => {
        if (!enabled) return;

        let cancelled = false;

        async function loadSettingsProfile() {
            setSettings((prev) => ({
                status: "LOADING",
                data: "data" in prev ? prev.data : undefined,
            }));

            try {
                const profile = await fetchSettingsProfile();

                if (!cancelled) {
                    setSettings({
                        status: "SUCCESS",
                        data: profile,
                    });
                }
            } catch (error) {
                if (!cancelled) {
                    setSettings((prev) => ({
                        status: "ERROR",
                        data: "data" in prev ? prev.data : undefined,
                        message:
                            error instanceof Error
                                ? error.message
                                : "회원 정보를 불러오지 못했습니다.",
                    }));
                }
            }
        }

        loadSettingsProfile();

        return () => {
            cancelled = true;
        };
    }, [enabled, setSettings]);
}