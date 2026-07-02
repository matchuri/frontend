"use client";

import { useEffect } from "react";

import { authAtom } from "@/features/auth/application/atom/authAtom";
import { authApi } from "@/features/auth/infrastructure/api/authApi";
import {
    clearAuth,
    setAuthenticated,
    setAuthLoading,
} from "@/features/auth/application/store/authStore";
import { jotaiStore } from "@/shared/lib/jotaiStore";

export function useAuthInit() {
    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            const currentAuth = jotaiStore.get(authAtom);

            if (currentAuth.status !== "AUTHENTICATED") {
                setAuthLoading();
            }

            try {
                const response = await authApi.refresh();
                const accessToken = response.data.accessToken;
                const onboarding = response.data.onboarding;
                const member = response.data.member;

                if (!accessToken || !onboarding) {
                    if (!cancelled) {
                        clearAuth();
                    }
                    return;
                }

                if (!cancelled) {
                    setAuthenticated(accessToken, onboarding, member);
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