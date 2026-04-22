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

                if (!accessToken) {
                    if (!cancelled) {
                        clearAuth();
                    }
                    return;
                }

                if (!cancelled) {
                    setAuthenticated(accessToken);
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