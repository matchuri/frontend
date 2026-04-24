"use client";

import { useEffect } from "react";
import { authApi } from "@/features/auth/infrastructure/api/authApi";
import {
    clearAuth,
    setAuthenticated,
    setAuthLoading,
} from "@/features/auth/application/store/authStore";

export function useAuthInit() {
    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            setAuthLoading();

            try {
                const response = await authApi.refresh();
                const accessToken = response.data.accessToken;
                const onboarding = response.data.onboarding;

                if (!accessToken || !onboarding) {
                    if (!cancelled) {
                        clearAuth();
                    }
                    return;
                }

                if (!cancelled) {
                    setAuthenticated(accessToken, onboarding);
                }
            } catch {
                if (!cancelled) {
                    clearAuth();
                }
            }
        };

        init();

        return () => {
            cancelled = true;
        };
    }, []);
}